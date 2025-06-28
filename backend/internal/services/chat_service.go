package services

import (
	"math/rand"
	"time"
)

type ChatService struct {
	// In a real application, this would hold a client for an AI API (e.g., Google Gemini, OpenAI)
}

func NewChatService() *ChatService {
	return &ChatService{}
}

func (s *ChatService) GetAIResponse(message string) (string, error) {
	// Simulate AI response for now
	rand.Seed(time.Now().UnixNano())
	responses := []string{
		"I understand how you're feeling. It takes courage to share what's on your mind. Can you tell me more about what's been bothering you?",
		"Thank you for opening up to me. Your feelings are completely valid. What would help you feel more supported right now?",
		"I'm here to listen without judgment. It sounds like you're going through a challenging time. How long have you been feeling this way?",
		"That sounds really difficult to deal with. You're not alone in this. What coping strategies have you tried before?",
		"I appreciate you trusting me with your feelings. Sometimes talking through our thoughts can help us process them better. What's one small thing that might help you feel a bit better today?",
	}
	return responses[rand.Intn(len(responses))], nil
}
