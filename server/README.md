# Heal NestJS Backend

A production-ready NestJS backend for the Heal mental health platform, designed to run seamlessly in Bolt and other Node.js environments.

## Features

- **NestJS Framework**: Modern, scalable Node.js framework with TypeScript
- **SQLite Database**: Lightweight database with TypeORM for easy development
- **JWT Authentication**: Secure user authentication and authorization
- **Swagger Documentation**: Auto-generated API documentation
- **Real AI Integration**: Google Gemini AI for intelligent chat responses
- **Mental Health Focus**: Specialized endpoints for mental health support
- **Crisis Detection**: Built-in crisis keyword detection and intervention
- **Modular Architecture**: Clean, maintainable code structure

## Quick Start

1. **Install dependencies**:
   ```bash
   cd server
   npm install
   ```

2. **Set up environment**:
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

3. **Start development server**:
   ```bash
   npm run start:dev
   ```

4. **Access API documentation**:
   - API: http://localhost:8080/api/v1
   - Docs: http://localhost:8080/api/docs

## API Endpoints

### Authentication
- `POST /api/v1/auth/register` - Register new user
- `POST /api/v1/auth/login` - Login user
- `POST /api/v1/auth/logout` - Logout user
- `GET /api/v1/auth/profile` - Get current user profile

### Chat (with AI Integration)
- `POST /api/v1/chat/message` - Send message and get AI response
- `GET /api/v1/chat/history` - Get chat history for session
- `GET /api/v1/chat/sessions` - Get all user chat sessions
- `DELETE /api/v1/chat/session/:id` - Delete chat session

### User Management
- `GET /api/v1/user/profile` - Get user profile
- `PUT /api/v1/user/profile` - Update user profile
- `GET /api/v1/user/stats` - Get user statistics

### Mood Tracking
- `POST /api/v1/user/mood` - Log mood entry
- `GET /api/v1/user/mood-history` - Get mood history

### Resources
- `GET /api/v1/resources` - Get mental health resources
- `GET /api/v1/resources/:id` - Get specific resource

### Crisis Support
- `GET /api/v1/crisis/services` - Get local crisis services

### Health & Debug
- `GET /api/v1/health` - Health check
- `GET /api/v1/debug` - Debug information

## Environment Variables

```env
# Required
JWT_SECRET=your-super-secret-jwt-key-minimum-32-characters
PORT=8080

# Optional (for enhanced AI features)
NEXT_PUBLIC_GEMINI_API_KEY=your-gemini-api-key
```

## Database

The backend uses SQLite with TypeORM for easy development and deployment. The database schema includes:

- **Users & Profiles**: User authentication and profile management
- **Chat Sessions & Messages**: Persistent chat history with AI responses
- **Mood Logs**: Daily mood tracking and analytics
- **Resources**: Mental health resources and content

## AI Integration

- **Google Gemini 1.5 Flash**: For intelligent, context-aware responses
- **Crisis Detection**: Automatic detection of crisis keywords
- **Fallback Responses**: Intelligent fallback when AI is unavailable
- **Mental Health Focus**: Specialized prompts for therapeutic conversations

## Production Ready

- **TypeScript**: Full type safety and modern JavaScript features
- **Validation**: Input validation with class-validator
- **Security**: JWT authentication, CORS protection, input sanitization
- **Documentation**: Auto-generated Swagger API documentation
- **Error Handling**: Comprehensive error handling and logging
- **Modular Design**: Clean architecture for easy maintenance and scaling