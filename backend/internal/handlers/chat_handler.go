package handlers

import (
	"fmt"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
	"github.com/heal/internal/models"
	"github.com/heal/internal/services"
)

type ChatHandler struct {
	chatService *services.ChatService
}

func NewChatHandler(chatService *services.ChatService) *ChatHandler {
	return &ChatHandler{chatService: chatService}
}

// func (h *ChatHandler) HandleChat(c *gin.Context) {
// 	var request struct {
// 		Message string `json:"message" binding:"required"`
// 	}

// 	if err := c.ShouldBindJSON(&request); err != nil {
// 		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
// 		return
// 	}

// 	response, err := h.chatService.GetAIResponse(request.Message)
// 	if err != nil {
// 		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
// 		return
// 	}

// 	c.JSON(http.StatusOK, gin.H{"response": response})
// }

func (h *ChatHandler) SendMessage(c *gin.Context) {
	userID := c.GetString("user_id")

	var req models.SendMessageRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// Create or get chat session
	session, err := h.chatService.GetOrCreateSession(userID, req.SessionID)
	if err != nil {
		fmt.Println("getsession")
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	// Save user message
	userMessage, err := h.chatService.SaveMessage(session.ID, userID, req.Content, "user", req.MessageType)
	if err != nil {
		fmt.Println("saveusermessage")
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	// Fetch previous messages for context
	// We fetch with a limit of 10, you can adjust this
	previousMessages, err := h.chatService.GetChatHistory(userID, session.ID, 10, 0)
	if err != nil {
		fmt.Println("getchathistory")
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch chat history: " + err.Error()})
		return
	}

	var history []string
	for _, msg := range previousMessages {
		history = append(history, msg.Content)
	}

	// Get AI response
	aiResponse, err := h.chatService.GetAIResponse(c.Request.Context(), req.Content, history)
	if err != nil {
		fmt.Println("getAIresponse")
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	// Save AI message
	aiMessage, err := h.chatService.SaveMessage(session.ID, userID, aiResponse, "ai", "text")
	if err != nil {
		fmt.Println("saveaimessage")
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"session":     session,
		"userMessage": userMessage,
		"aiMessage":   aiMessage,
		"response":    aiResponse,
	})
}

func (h *ChatHandler) GetChatHistory(c *gin.Context) {
	userID := c.GetString("user_id")
	sessionID := c.Query("session_id")
	limit, _ := strconv.Atoi(c.DefaultQuery("limit", "50"))
	offset, _ := strconv.Atoi(c.DefaultQuery("offset", "0"))

	if sessionID == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "session_id is required"})
		return
	}

	messages, err := h.chatService.GetChatHistory(userID, sessionID, limit, offset)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"messages": messages})
}

func (h *ChatHandler) GetChatSessions(c *gin.Context) {
	userID := c.GetString("user_id")
	limit, _ := strconv.Atoi(c.DefaultQuery("limit", "20"))
	offset, _ := strconv.Atoi(c.DefaultQuery("offset", "0"))

	sessions, err := h.chatService.GetChatSessions(userID, limit, offset)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"sessions": sessions})
}

func (h *ChatHandler) DeleteChatSession(c *gin.Context) {
	userID := c.GetString("user_id")
	sessionID := c.Param("id")

	err := h.chatService.DeleteChatSession(userID, sessionID)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Session deleted successfully"})
}

func (h *ChatHandler) SubmitFeedback(c *gin.Context) {
	userID := c.GetString("user_id")

	var req struct {
		SessionID string `json:"sessionId" binding:"required"`
		MessageID string `json:"messageId" binding:"required"`
		Rating    int    `json:"rating" binding:"required,min=1,max=5"`
		Feedback  string `json:"feedback"`
	}

	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	err := h.chatService.SubmitFeedback(userID, req.SessionID, req.MessageID, req.Rating, req.Feedback)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Feedback submitted successfully"})
}