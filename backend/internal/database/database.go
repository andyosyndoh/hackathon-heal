package database

import (
	"database/sql"
	"fmt"

	_ "github.com/mattn/go-sqlite3"
)

func Initialize(databaseURL string) (*sql.DB, error) {
	db, err := sql.Open("sqlite3", databaseURL)
	if err != nil {
		return nil, fmt.Errorf("failed to open database: %w", err)
	}

	if err := db.Ping(); err != nil {
		return nil, fmt.Errorf("failed to ping database: %w", err)
	}

	if err := createTables(db); err != nil {
		return nil, fmt.Errorf("failed to create tables: %w", err)
	}

	return db, nil
}

func createTables(db *sql.DB) error {
	queries := []string{
		`CREATE TABLE IF NOT EXISTS users (
			id TEXT PRIMARY KEY,
			email TEXT UNIQUE NOT NULL,
			password_hash TEXT NOT NULL,
			first_name TEXT NOT NULL,
			last_name TEXT NOT NULL,
			email_verified BOOLEAN DEFAULT FALSE,
			created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
			updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
		)`,

		`CREATE TABLE IF NOT EXISTS user_profiles (
			user_id TEXT PRIMARY KEY,
			avatar_url TEXT,
			phone TEXT,
			date_of_birth DATE,
			emergency_contact_name TEXT,
			emergency_contact_phone TEXT,
			preferences TEXT, -- JSON
			FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
		)`,

		`CREATE TABLE IF NOT EXISTS chat_sessions (
			id TEXT PRIMARY KEY,
			user_id TEXT NOT NULL,
			title TEXT,
			created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
			updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
			FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
		)`,

		`CREATE TABLE IF NOT EXISTS chat_messages (
			id TEXT PRIMARY KEY,
			session_id TEXT NOT NULL,
			user_id TEXT NOT NULL,
			content TEXT NOT NULL,
			sender_type TEXT NOT NULL, -- 'user' or 'ai'
			message_type TEXT DEFAULT 'text', -- 'text', 'audio', 'video'
			metadata TEXT, -- JSON for additional data
			created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
			FOREIGN KEY (session_id) REFERENCES chat_sessions(id) ON DELETE CASCADE,
			FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
		)`,

		`CREATE TABLE IF NOT EXISTS resources (
			id TEXT PRIMARY KEY,
			title TEXT NOT NULL,
			description TEXT NOT NULL,
			content TEXT NOT NULL,
			type TEXT NOT NULL, -- 'article', 'video', 'audio', 'exercise', 'assessment'
			category TEXT NOT NULL,
			difficulty TEXT NOT NULL, -- 'beginner', 'intermediate', 'advanced'
			duration_minutes INTEGER,
			rating REAL DEFAULT 0,
			featured BOOLEAN DEFAULT FALSE,
			created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
			updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
		)`,

		`CREATE TABLE IF NOT EXISTS user_resource_progress (
			id TEXT PRIMARY KEY,
			user_id TEXT NOT NULL,
			resource_id TEXT NOT NULL,
			progress REAL DEFAULT 0, -- 0-100
			completed BOOLEAN DEFAULT FALSE,
			favorited BOOLEAN DEFAULT FALSE,
			last_accessed DATETIME DEFAULT CURRENT_TIMESTAMP,
			FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
			FOREIGN KEY (resource_id) REFERENCES resources(id) ON DELETE CASCADE,
			UNIQUE(user_id, resource_id)
		)`,

		`CREATE TABLE IF NOT EXISTS mood_logs (
			id TEXT PRIMARY KEY,
			user_id TEXT NOT NULL,
			mood_score INTEGER NOT NULL, -- 1-10
			notes TEXT,
			created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
			FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
		)`,

		`CREATE TABLE IF NOT EXISTS crisis_alerts (
			id TEXT PRIMARY KEY,
			user_id TEXT NOT NULL,
			severity TEXT NOT NULL, -- 'low', 'medium', 'high', 'critical'
			message TEXT,
			location TEXT, -- JSON with lat/lng
			status TEXT DEFAULT 'active', -- 'active', 'resolved', 'escalated'
			created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
			resolved_at DATETIME,
			FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
		)`,

		`CREATE TABLE IF NOT EXISTS safety_plans (
			id TEXT PRIMARY KEY,
			user_id TEXT NOT NULL,
			warning_signs TEXT, -- JSON array
			coping_strategies TEXT, -- JSON array
			support_contacts TEXT, -- JSON array
			professional_contacts TEXT, -- JSON array
			environment_safety TEXT, -- JSON
			created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
			updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
			FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
		)`,

		`CREATE TABLE IF NOT EXISTS emergency_contacts (
			id TEXT PRIMARY KEY,
			user_id TEXT NOT NULL,
			name TEXT NOT NULL,
			phone TEXT NOT NULL,
			relationship TEXT,
			is_primary BOOLEAN DEFAULT FALSE,
			created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
			FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
		)`,
	}

	for _, query := range queries {
		if _, err := db.Exec(query); err != nil {
			return fmt.Errorf("failed to execute query: %s, error: %w", query, err)
		}
	}

	// Insert sample resources
	if err := insertSampleData(db); err != nil {
		return fmt.Errorf("failed to insert sample data: %w", err)
	}

	return nil
}

func insertSampleData(db *sql.DB) error {
	// Check if resources already exist
	var count int
	err := db.QueryRow("SELECT COUNT(*) FROM resources").Scan(&count)
	if err != nil {
		return err
	}

	if count > 0 {
		return nil // Data already exists
	}

	resources := []struct {
		id          string
		title       string
		description string
		content     string
		rType       string
		category    string
		difficulty  string
		duration    int
		rating      float64
		featured    bool
	}{
		{
			"1", "Understanding Anxiety: A Complete Guide",
			"Learn about anxiety symptoms, triggers, and evidence-based coping strategies.",
			"Anxiety is a natural response to stress, but when it becomes overwhelming...",
			"article", "anxiety", "beginner", 15, 4.8, true,
		},
		{
			"2", "Guided Meditation for Depression",
			"A 20-minute guided meditation specifically designed for managing depressive symptoms.",
			"This meditation focuses on self-compassion and gentle awareness...",
			"audio", "depression", "beginner", 20, 4.9, true,
		},
		{
			"3", "Cognitive Behavioral Therapy Techniques",
			"Interactive exercises to help identify and change negative thought patterns.",
			"CBT is one of the most effective treatments for depression and anxiety...",
			"exercise", "depression", "intermediate", 30, 4.7, false,
		},
		{
			"4", "Building Healthy Relationships",
			"Video series on communication skills and boundary setting.",
			"Healthy relationships are fundamental to mental wellbeing...",
			"video", "relationships", "beginner", 25, 4.6, true,
		},
		{
			"5", "Stress Assessment Quiz",
			"Evaluate your stress levels and get personalized recommendations.",
			"This assessment helps identify your stress patterns...",
			"assessment", "stress", "beginner", 10, 4.5, false,
		},
		{
			"6", "Advanced Mindfulness Practices",
			"Deep dive into mindfulness techniques for experienced practitioners.",
			"These advanced practices build on basic mindfulness skills...",
			"exercise", "self-care", "advanced", 45, 4.8, false,
		},
	}

	for _, r := range resources {
		_, err := db.Exec(`
			INSERT INTO resources (id, title, description, content, type, category, difficulty, duration_minutes, rating, featured)
			VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
		`, r.id, r.title, r.description, r.content, r.rType, r.category, r.difficulty, r.duration, r.rating, r.featured)
		if err != nil {
			return err
		}
	}

	return nil
}