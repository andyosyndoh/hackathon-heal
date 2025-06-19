# Heal Backend API

A comprehensive Go backend for the Heal mental health support application.

## Features

- **Authentication**: JWT-based authentication with registration, login, and token management
- **Chat System**: Real-time messaging with AI responses and session management
- **Resource Management**: Mental health resources with progress tracking and recommendations
- **Crisis Support**: Emergency contact management, crisis alerts, and safety planning
- **User Management**: Profile management, mood tracking, and statistics

## API Endpoints

### Authentication (`/api/v1/auth`)
- `POST /register` - User registration
- `POST /login` - User login
- `POST /logout` - User logout
- `POST /refresh` - Token refresh
- `POST /forgot-password` - Password reset request
- `POST /reset-password` - Password reset
- `GET /verify-email/:token` - Email verification

### User Management (`/api/v1/user`)
- `GET /profile` - Get user profile
- `PUT /profile` - Update user profile
- `GET /stats` - Get user statistics
- `POST /mood` - Log mood entry
- `GET /mood-history` - Get mood history

### Chat (`/api/v1/chat`)
- `POST /message` - Send chat message
- `GET /history` - Get chat history
- `GET /sessions` - Get chat sessions
- `DELETE /session/:id` - Delete chat session
- `POST /feedback` - Submit chat feedback
- `GET /ws` - WebSocket connection for real-time chat

### Resources (`/api/v1/resources`)
- `GET /` - Get resources (with filtering)
- `GET /:id` - Get specific resource
- `GET /categories` - Get resource categories
- `POST /:id/progress` - Update resource progress
- `GET /recommendations` - Get personalized recommendations
- `POST /:id/favorite` - Toggle resource favorite

### Crisis Support (`/api/v1/crisis`)
- `POST /alert` - Create crisis alert
- `GET /contacts` - Get emergency contacts
- `POST /contacts` - Add emergency contact
- `GET /services` - Get local emergency services
- `POST /safety-plan` - Create/update safety plan
- `GET /safety-plan` - Get safety plan

## Setup

1. **Install Dependencies**:
   ```bash
   cd backend
   go mod tidy
   ```

2. **Environment Configuration**:
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

3. **Run the Server**:
   ```bash
   go run main.go
   ```

The server will start on port 8080 (or the port specified in your environment).

## Database

The application uses SQLite for simplicity and portability. The database is automatically initialized with the required tables and sample data on first run.

### Tables
- `users` - User accounts
- `user_profiles` - Extended user information
- `chat_sessions` - Chat conversation sessions
- `chat_messages` - Individual chat messages
- `resources` - Mental health resources
- `user_resource_progress` - User progress on resources
- `mood_logs` - User mood tracking
- `crisis_alerts` - Crisis situation alerts
- `safety_plans` - User safety plans
- `emergency_contacts` - User emergency contacts

## Security

- JWT tokens for authentication
- Password hashing with bcrypt
- CORS protection
- Input validation and sanitization
- SQL injection prevention with prepared statements

## Development

### Adding New Endpoints

1. Define models in `internal/models/`
2. Implement business logic in `internal/services/`
3. Create handlers in `internal/handlers/`
4. Register routes in `main.go`

### Testing

```bash
# Run tests
go test ./...

# Run with coverage
go test -cover ./...
```

## Production Deployment

1. Set strong JWT secret
2. Configure proper database (PostgreSQL recommended for production)
3. Enable HTTPS
4. Set up proper logging
5. Configure monitoring and health checks
6. Set up backup procedures

## API Documentation

The API follows RESTful conventions and returns JSON responses. All protected endpoints require a Bearer token in the Authorization header.

### Response Format

Success responses:
```json
{
  "data": {...},
  "message": "Success message"
}
```

Error responses:
```json
{
  "error": "Error message"
}
```

### Authentication

Include the JWT token in the Authorization header:
```
Authorization: Bearer <your-jwt-token>
```

## Contributing

1. Follow Go conventions and best practices
2. Add tests for new functionality
3. Update documentation
4. Ensure security considerations are addressed