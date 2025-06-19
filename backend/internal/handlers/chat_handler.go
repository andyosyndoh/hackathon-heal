package handlers

import (
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
	"github.com/gorilla/websocket"
	"github.com/heal/internal/models"
	"github.com/heal/internal/services"
)

type ChatHandler struct {
	chatService *services.ChatService
	authService *services.AuthService
	upgrader    websocket.Upgrader
}

func NewChatHandler(chatService *services.ChatService, authService *services.AuthService) *ChatHandler {
	return &ChatHandler{
		chatService: chatService,
		authService: authService,
		upgrader: websocket.Upgrader{
			CheckOrigin: func(r *http.Request) bool {
				return true // In production, implement proper origin checking
			},
		},
	}
}

func (h *ChatHandler) SendMessage(c *gin.Context) {
	userID := c.GetString("user_id")
	
	var req models.SendMessageRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	message, err := h.chatService.SendMessage(userID, req)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, message)
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

	sessions, err := h.chatService.GetChatSessions(userID)
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
	// Implementation for chat feedback
	c.JSON(http.StatusOK, gin.H{"message": "Feedback submitted successfully"})
}

func (h *ChatHandler) HandleWebSocket(c *gin.Context) {
	conn, err := h.upgrader.Upgrade(c.Writer, c.Request, nil)
	if err != nil {
		return
	}
	defer conn.Close()

	userID := c.GetString("user_id")
	
	for {
		var msg map[string]interface{}
		err := conn.ReadJSON(&msg)
		if err != nil {
			break
		}

		// Handle WebSocket message
		response := map[string]interface{}{
			"type":    "message",
			"content": "WebSocket message received",
			"userID":  userID,
		}

		err = conn.WriteJSON(response)
		if err != nil {
			break
		}
	}
}