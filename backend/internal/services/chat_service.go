package services

import (
	"database/sql"
	"fmt"
	"os"
	"time"

	"context"
	"strings"

	"github.com/google/uuid"
	"github.com/heal/internal/models"

	"github.com/tmc/langchaingo/llms"
	"github.com/tmc/langchaingo/llms/googleai"
)

type ChatService struct {
	db *sql.DB
}

func NewChatService(db *sql.DB) *ChatService {
	return &ChatService{db: db}
}

const niaSystemPrompt = `
You are Nia ("purpose" in Swahili), a trauma-informed AI companion for Gender-Based Violence (GBV) survivors in Kenya/East Africa.

IDENTITY: Warm, gentle, non-judgmental, deeply trauma-informed. Bilingual (English/Kiswahili - respond in language used). Embody Ubuntu: healing through connection, liberation through action.

CORE APPROACH - SURVIVOR-CENTERED:
• BELIEVE: "I believe you. Not your fault."
• VALIDATE: All emotions welcome, no judgment
• EMPOWER: Illuminate options without pressure
• GUIDE: From pain → awareness → action → liberation
• BOUNDARIES: Stay focused on GBV/mental health support. Gently redirect other topics.

LANGUAGE - TRAUMA-INFORMED & EMPOWERING:
• Survivor-centered (never "victim")
• Help-seeking = strength: "Speaking up is brave. Support is self-care."
• Plant seeds: "Have you thought about...?" "Some survivors find..."
• Affirm agency: "You deserve support. Your voice matters. You don't carry this alone."
• Frame action as liberation: "Each step toward support is reclaiming your power."

GBV SUPPORT FRAMEWORK:
1. Safety & belief first
2. Normalize trauma responses
3. Gently introduce options: medical care, counseling, legal support, safe spaces
4. Acknowledge barriers (stigma, family pressure, patriarchy) with compassion
5. Honor their timeline: "No rush. Options are here when ready."
6. Celebrate every act of courage

KEY KENYA/EAST AFRICA RESOURCES (share contextually):
• CRISIS: Kenya GBV Hotline 1195, Police 999/112 (Gender Desk)
• LEGAL: FIDA Kenya 0800 720 187, COVAW 0800 720 553
• MEDICAL: GBVRC at hospitals, PEP, documentation
• COUNSELING: Healthcare Assistance Kenya +254 719 639 392
• MENTAL HEALTH: 0800 720 990

CRISIS PROTOCOL:
Immediate danger → "Uko salama? Your safety first. Call 1195 or 999 now."
Self-harm/suicide → "Your life matters. Kenya Mental Health: 0800 720 990. Befrienders: +254 722 178 177. Please reach out now."

REMEMBER: Brief (<150 words), empowering, option-focused, never pressure. Guide survivors to recognize their strength and available pathways. "Unaweza. Una nguvu. Una haki ya kupona." (You can. You have strength. You deserve healing.)
`

func (s *ChatService) GetAIResponse(ctx context.Context, message string, previous []string) (string, error) {
	apiKey := os.Getenv("NEXT_PUBLIC_GEMINI_API_KEY")
	if apiKey == "" {
		return "", fmt.Errorf("NEXT_PUBLIC_GEMINI_API_KEY not set in environment")
	}
	llm, err := googleai.New(ctx, googleai.WithAPIKey(apiKey))
	if err != nil {
		return "", fmt.Errorf("failed to initialize GoogleAI: %w", err)
	}

	// Build conversation history for context
	var history strings.Builder
	for _, prev := range previous {
		history.WriteString("User: ")
		history.WriteString(prev)
		history.WriteString("\n")
	}
	history.WriteString("User: ")
	history.WriteString(message)
	history.WriteString("\n")

	prompt := niaSystemPrompt + "\n\nConversation so far:\n" + history.String() + "\nNia:"

	resp, err := llm.Call(ctx, prompt,
		llms.WithMaxTokens(300),
		llms.WithTemperature(0.7),
	)
	if err != nil {
		return "", err
	}
	return strings.TrimSpace(resp), nil
}

func (s *ChatService) GetOrCreateSession(userID, sessionID string) (*models.ChatSession, error) {
	// If sessionID is provided, try to get existing session
	if sessionID != "" {
		session, err := s.getChatSession(userID, sessionID)
		if err == nil {
			return session, nil
		}
		// If session not found, create new one with provided ID
	}

	// Create new session
	if sessionID == "" {
		sessionID = uuid.New().String()
	}

	now := time.Now()
	title := fmt.Sprintf("Chat Session - %s", now.Format("Jan 2, 2006 3:04 PM"))

	_, err := s.db.Exec(`
		INSERT INTO chat_sessions (id, user_id, title, created_at, updated_at)
		VALUES (?, ?, ?, ?, ?)
	`, sessionID, userID, title, now, now)
	if err != nil {
		return nil, fmt.Errorf("failed to create chat session: %w", err)
	}

	return &models.ChatSession{
		ID:        sessionID,
		UserID:    userID,
		Title:     title,
		CreatedAt: now,
		UpdatedAt: now,
	}, nil
}

func (s *ChatService) getChatSession(userID, sessionID string) (*models.ChatSession, error) {
	session := &models.ChatSession{}
	err := s.db.QueryRow(`
		SELECT id, user_id, title, created_at, updated_at
		FROM chat_sessions
		WHERE id = ? AND user_id = ?
	`, sessionID, userID).Scan(&session.ID, &session.UserID, &session.Title,
		&session.CreatedAt, &session.UpdatedAt)
	if err != nil {
		return nil, err
	}
	return session, nil
}

func (s *ChatService) SaveMessage(sessionID, userID, content, senderType, messageType string) (*models.ChatMessage, error) {
	messageID := uuid.New().String()
	now := time.Now()

	_, err := s.db.Exec(`
		INSERT INTO chat_messages (id, session_id, user_id, content, sender_type, message_type, created_at)
		VALUES (?, ?, ?, ?, ?, ?, ?)
	`, messageID, sessionID, userID, content, senderType, messageType, now)
	if err != nil {
		return nil, fmt.Errorf("failed to save message: %w", err)
	}

	// Update session timestamp
	_, err = s.db.Exec(`
		UPDATE chat_sessions SET updated_at = ? WHERE id = ?
	`, now, sessionID)
	if err != nil {
		// Log error but don't fail the message save
		fmt.Printf("Warning: failed to update session timestamp: %v\n", err)
	}

	return &models.ChatMessage{
		ID:          messageID,
		SessionID:   sessionID,
		UserID:      userID,
		Content:     content,
		SenderType:  senderType,
		MessageType: messageType,
		CreatedAt:   now,
	}, nil
}

func (s *ChatService) GetChatHistory(userID, sessionID string, limit, offset int) ([]models.ChatMessage, error) {
	// Verify session belongs to user
	_, err := s.getChatSession(userID, sessionID)
	if err != nil {
		return nil, fmt.Errorf("session not found or access denied")
	}

	query := `
		SELECT id, session_id, user_id, content, sender_type, message_type, 
		       COALESCE(metadata, '{}'), created_at
		FROM chat_messages
		WHERE session_id = ?
		ORDER BY created_at ASC
		LIMIT ? OFFSET ?
	`

	rows, err := s.db.Query(query, sessionID, limit, offset)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var messages []models.ChatMessage
	for rows.Next() {
		var message models.ChatMessage
		err := rows.Scan(&message.ID, &message.SessionID, &message.UserID,
			&message.Content, &message.SenderType, &message.MessageType,
			&message.Metadata, &message.CreatedAt)
		if err != nil {
			return nil, err
		}
		messages = append(messages, message)
	}

	return messages, nil
}

func (s *ChatService) GetChatSessions(userID string, limit, offset int) ([]models.ChatSession, error) {
	query := `
		SELECT id, user_id, title, created_at, updated_at
		FROM chat_sessions
		WHERE user_id = ?
		ORDER BY updated_at DESC
		LIMIT ? OFFSET ?
	`

	rows, err := s.db.Query(query, userID, limit, offset)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var sessions []models.ChatSession
	for rows.Next() {
		var session models.ChatSession
		err := rows.Scan(&session.ID, &session.UserID, &session.Title,
			&session.CreatedAt, &session.UpdatedAt)
		if err != nil {
			return nil, err
		}
		sessions = append(sessions, session)
	}

	return sessions, nil
}

func (s *ChatService) DeleteChatSession(userID, sessionID string) error {
	// Verify session belongs to user
	_, err := s.getChatSession(userID, sessionID)
	if err != nil {
		return fmt.Errorf("session not found or access denied")
	}

	// Delete messages first (due to foreign key constraint)
	_, err = s.db.Exec("DELETE FROM chat_messages WHERE session_id = ?", sessionID)
	if err != nil {
		return fmt.Errorf("failed to delete messages: %w", err)
	}

	// Delete session
	_, err = s.db.Exec("DELETE FROM chat_sessions WHERE id = ? AND user_id = ?", sessionID, userID)
	if err != nil {
		return fmt.Errorf("failed to delete session: %w", err)
	}

	return nil
}

func (s *ChatService) SubmitFeedback(userID, sessionID, messageID string, rating int, feedback string) error {
	// Verify session belongs to user
	_, err := s.getChatSession(userID, sessionID)
	if err != nil {
		return fmt.Errorf("session not found or access denied")
	}

	// For now, we'll store feedback in the message metadata
	// In a production system, you might want a separate feedback table
	feedbackJSON := fmt.Sprintf(`{"rating": %d, "feedback": "%s", "submitted_at": "%s"}`,
		rating, feedback, time.Now().Format(time.RFC3339))

	_, err = s.db.Exec(`
		UPDATE chat_messages 
		SET metadata = ? 
		WHERE id = ? AND session_id = ?
	`, feedbackJSON, messageID, sessionID)
	if err != nil {
		return fmt.Errorf("failed to save feedback: %w", err)
	}

	return nil
}
