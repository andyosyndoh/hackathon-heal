package services

import (
	"database/sql"
	"fmt"
	"strings"
	"time"

	"github.com/google/uuid"
	"github.com/heal/internal/models"
)

type ChatService struct {
	db *sql.DB
}

func NewChatService(db *sql.DB) *ChatService {
	return &ChatService{db: db}
}

func (s *ChatService) SendMessage(userID string, req models.SendMessageRequest) (*models.ChatMessage, error) {
	// Create session if not provided
	sessionID := req.SessionID
	if sessionID == "" {
		session, err := s.createChatSession(userID, "New Chat")
		if err != nil {
			return nil, fmt.Errorf("failed to create chat session: %w", err)
		}
		sessionID = session.ID
	}

	// Save user message
	userMessage, err := s.saveMessage(sessionID, userID, req.Content, "user", req.MessageType)
	if err != nil {
		return nil, fmt.Errorf("failed to save user message: %w", err)
	}

	// Generate AI response
	aiResponse := s.generateAIResponse(req.Content)
	
	// Save AI message
	_, err = s.saveMessage(sessionID, userID, aiResponse, "ai", "text")
	if err != nil {
		return nil, fmt.Errorf("failed to save AI message: %w", err)
	}

	return userMessage, nil
}

func (s *ChatService) GetChatHistory(userID, sessionID string, limit, offset int) ([]models.ChatMessage, error) {
	query := `
		SELECT id, session_id, user_id, content, sender_type, message_type, metadata, created_at
		FROM chat_messages
		WHERE user_id = ? AND session_id = ?
		ORDER BY created_at ASC
		LIMIT ? OFFSET ?
	`

	rows, err := s.db.Query(query, userID, sessionID, limit, offset)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var messages []models.ChatMessage
	for rows.Next() {
		var msg models.ChatMessage
		err := rows.Scan(&msg.ID, &msg.SessionID, &msg.UserID, &msg.Content,
			&msg.SenderType, &msg.MessageType, &msg.Metadata, &msg.CreatedAt)
		if err != nil {
			return nil, err
		}
		messages = append(messages, msg)
	}

	return messages, nil
}

func (s *ChatService) GetChatSessions(userID string) ([]models.ChatSession, error) {
	query := `
		SELECT id, user_id, title, created_at, updated_at
		FROM chat_sessions
		WHERE user_id = ?
		ORDER BY updated_at DESC
	`

	rows, err := s.db.Query(query, userID)
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
	_, err := s.db.Exec("DELETE FROM chat_sessions WHERE id = ? AND user_id = ?", sessionID, userID)
	return err
}

func (s *ChatService) createChatSession(userID, title string) (*models.ChatSession, error) {
	sessionID := uuid.New().String()
	now := time.Now()

	_, err := s.db.Exec(`
		INSERT INTO chat_sessions (id, user_id, title, created_at, updated_at)
		VALUES (?, ?, ?, ?, ?)
	`, sessionID, userID, title, now, now)
	if err != nil {
		return nil, err
	}

	return &models.ChatSession{
		ID:        sessionID,
		UserID:    userID,
		Title:     title,
		CreatedAt: now,
		UpdatedAt: now,
	}, nil
}

func (s *ChatService) saveMessage(sessionID, userID, content, senderType, messageType string) (*models.ChatMessage, error) {
	messageID := uuid.New().String()
	now := time.Now()

	_, err := s.db.Exec(`
		INSERT INTO chat_messages (id, session_id, user_id, content, sender_type, message_type, created_at)
		VALUES (?, ?, ?, ?, ?, ?, ?)
	`, messageID, sessionID, userID, content, senderType, messageType, now)
	if err != nil {
		return nil, err
	}

	// Update session timestamp
	_, err = s.db.Exec("UPDATE chat_sessions SET updated_at = ? WHERE id = ?", now, sessionID)
	if err != nil {
		return nil, err
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

func (s *ChatService) generateAIResponse(userInput string) string {
	// Simple AI response generation (in production, this would integrate with actual AI services)
	input := strings.ToLower(userInput)
	
	responses := []string{
		"I understand how you're feeling. It takes courage to share what's on your mind. Can you tell me more about what's been bothering you?",
		"Thank you for opening up to me. Your feelings are completely valid. What would help you feel more supported right now?",
		"I'm here to listen without judgment. It sounds like you're going through a challenging time. How long have you been feeling this way?",
		"That sounds really difficult to deal with. You're not alone in this. What coping strategies have you tried before?",
		"I appreciate you trusting me with your feelings. Sometimes talking through our thoughts can help us process them better. What's one small thing that might help you feel a bit better today?",
	}

	// Simple keyword-based responses
	if strings.Contains(input, "anxious") || strings.Contains(input, "anxiety") {
		return "I hear that you're feeling anxious. Anxiety can be overwhelming, but there are techniques that can help. Would you like to try a breathing exercise together, or would you prefer to talk about what's making you feel this way?"
	}
	
	if strings.Contains(input, "sad") || strings.Contains(input, "depressed") || strings.Contains(input, "depression") {
		return "I'm sorry you're feeling this way. Depression can make everything feel more difficult. Remember that these feelings are temporary, even when they don't feel like it. What has helped you feel even slightly better in the past?"
	}
	
	if strings.Contains(input, "stress") || strings.Contains(input, "stressed") {
		return "Stress can really take a toll on both our minds and bodies. It sounds like you're dealing with a lot right now. Let's work together to identify some ways to manage this stress. What's the biggest source of stress for you right now?"
	}

	if strings.Contains(input, "help") || strings.Contains(input, "support") {
		return "I'm here to support you through this. Asking for help shows real strength. What kind of support would be most helpful for you right now? We can explore coping strategies, talk through your feelings, or I can help you find additional resources."
	}

	// Default responses
	return responses[len(userInput)%len(responses)]
}