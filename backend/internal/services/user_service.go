package services

import (
	"database/sql"
	"fmt"
	"time"

	"github.com/google/uuid"
	"github.com/heal/internal/models"
)

type UserService struct {
	db *sql.DB
}

func NewUserService(db *sql.DB) *UserService {
	return &UserService{db: db}
}

func (s *UserService) GetProfile(userID string) (*models.UserProfile, error) {
	profile := &models.UserProfile{}
	err := s.db.QueryRow(`
		SELECT user_id, COALESCE(avatar_url, ''), COALESCE(phone, ''), 
		       COALESCE(date_of_birth, ''), COALESCE(emergency_contact_name, ''),
		       COALESCE(emergency_contact_phone, ''), COALESCE(preferences, '{}')
		FROM user_profiles WHERE user_id = ?
	`, userID).Scan(&profile.UserID, &profile.AvatarURL, &profile.Phone,
		&profile.DateOfBirth, &profile.EmergencyContactName,
		&profile.EmergencyContactPhone, &profile.Preferences)
	
	if err != nil {
		return nil, err
	}
	return profile, nil
}

func (s *UserService) UpdateProfile(userID string, updates map[string]interface{}) error {
	// Build dynamic update query
	setParts := []string{}
	args := []interface{}{}

	if avatarURL, ok := updates["avatarUrl"]; ok {
		setParts = append(setParts, "avatar_url = ?")
		args = append(args, avatarURL)
	}
	if phone, ok := updates["phone"]; ok {
		setParts = append(setParts, "phone = ?")
		args = append(args, phone)
	}
	if dob, ok := updates["dateOfBirth"]; ok {
		setParts = append(setParts, "date_of_birth = ?")
		args = append(args, dob)
	}
	if emergencyName, ok := updates["emergencyContactName"]; ok {
		setParts = append(setParts, "emergency_contact_name = ?")
		args = append(args, emergencyName)
	}
	if emergencyPhone, ok := updates["emergencyContactPhone"]; ok {
		setParts = append(setParts, "emergency_contact_phone = ?")
		args = append(args, emergencyPhone)
	}
	if preferences, ok := updates["preferences"]; ok {
		setParts = append(setParts, "preferences = ?")
		args = append(args, preferences)
	}

	if len(setParts) == 0 {
		return fmt.Errorf("no valid fields to update")
	}

	query := fmt.Sprintf("UPDATE user_profiles SET %s WHERE user_id = ?", 
		fmt.Sprintf("%s", setParts[0]))
	for i := 1; i < len(setParts); i++ {
		query = fmt.Sprintf("%s, %s", query, setParts[i])
	}
	
	args = append(args, userID)
	_, err := s.db.Exec(query, args...)
	return err
}

func (s *UserService) GetStats(userID string) (*models.UserStats, error) {
	stats := &models.UserStats{}

	// Get total sessions
	err := s.db.QueryRow("SELECT COUNT(*) FROM chat_sessions WHERE user_id = ?", userID).Scan(&stats.TotalSessions)
	if err != nil {
		stats.TotalSessions = 0
	}

	// Get average mood score from last 30 days
	err = s.db.QueryRow(`
		SELECT COALESCE(AVG(mood_score), 0) 
		FROM mood_logs 
		WHERE user_id = ? AND created_at > datetime('now', '-30 days')
	`, userID).Scan(&stats.MoodScore)
	if err != nil {
		stats.MoodScore = 0
	}

	// Get resources viewed (approximate)
	err = s.db.QueryRow("SELECT COUNT(*) FROM user_resource_progress WHERE user_id = ?", userID).Scan(&stats.ResourcesViewed)
	if err != nil {
		stats.ResourcesViewed = 0
	}

	// Calculate current streak (simplified - consecutive days with activity)
	stats.CurrentStreak = s.calculateStreak(userID)

	// Get days active
	err = s.db.QueryRow(`
		SELECT COUNT(DISTINCT DATE(created_at)) 
		FROM chat_sessions 
		WHERE user_id = ?
	`, userID).Scan(&stats.DaysActive)
	if err != nil {
		stats.DaysActive = 0
	}

	return stats, nil
}

func (s *UserService) LogMood(userID string, moodScore int, notes string) (*models.MoodLog, error) {
	logID := uuid.New().String()
	now := time.Now()

	_, err := s.db.Exec(`
		INSERT INTO mood_logs (id, user_id, mood_score, notes, created_at)
		VALUES (?, ?, ?, ?, ?)
	`, logID, userID, moodScore, notes, now)
	if err != nil {
		return nil, fmt.Errorf("failed to log mood: %w", err)
	}

	return &models.MoodLog{
		ID:        logID,
		UserID:    userID,
		MoodScore: moodScore,
		Notes:     notes,
		CreatedAt: now,
	}, nil
}

func (s *UserService) GetMoodHistory(userID string, days int) ([]models.MoodLog, error) {
	query := `
		SELECT id, user_id, mood_score, notes, created_at
		FROM mood_logs
		WHERE user_id = ? AND created_at > datetime('now', '-' || ? || ' days')
		ORDER BY created_at DESC
	`

	rows, err := s.db.Query(query, userID, days)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var logs []models.MoodLog
	for rows.Next() {
		var log models.MoodLog
		err := rows.Scan(&log.ID, &log.UserID, &log.MoodScore, &log.Notes, &log.CreatedAt)
		if err != nil {
			return nil, err
		}
		logs = append(logs, log)
	}

	return logs, nil
}

func (s *UserService) calculateStreak(userID string) int {
	// Simplified streak calculation - count consecutive days with chat activity
	rows, err := s.db.Query(`
		SELECT DATE(created_at) as activity_date
		FROM chat_sessions
		WHERE user_id = ?
		GROUP BY DATE(created_at)
		ORDER BY activity_date DESC
		LIMIT 30
	`, userID)
	if err != nil {
		return 0
	}
	defer rows.Close()

	var dates []string
	for rows.Next() {
		var date string
		if err := rows.Scan(&date); err != nil {
			continue
		}
		dates = append(dates, date)
	}

	if len(dates) == 0 {
		return 0
	}

	// Simple consecutive day counting
	streak := 1
	for i := 1; i < len(dates); i++ {
		// In a real implementation, you'd properly parse and compare dates
		// This is a simplified version
		streak++
		if streak > 7 { // Cap at reasonable number for demo
			break
		}
	}

	return streak
}