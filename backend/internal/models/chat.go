package models

type ChatMessage struct {
	ID        string `json:"id"`
	Content   string `json:"content"`
	Sender    string `json:"sender"`
	Timestamp string `json:"timestamp"`
}
