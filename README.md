# Heal - Mental Health Support Platform

A comprehensive mental health support platform that combines AI-powered assistance, crisis management, resource libraries, and real-time video conversations to provide accessible mental health care.

## 🌟 Features

- **AI-Powered Support**: Real-time conversational AI with video chat capabilities using Tavus
- **Text Chat with Gemini AI**: Advanced conversational AI using Google's Gemini model
- **Voice Responses**: Text-to-speech using ElevenLabs for natural voice interactions
- **Crisis Management**: 24/7 emergency support with location-based services
- **Resource Library**: Curated mental health resources with progress tracking
- **User Dashboard**: Personalized analytics, mood tracking, and progress monitoring
- **Secure Authentication**: JWT-based authentication with privacy-first design
- **Video Conversations**: Face-to-face AI conversations using Daily.co integration
- **Mobile Responsive**: Optimized for all devices and screen sizes

## 🏗️ Project Structure

```
heal/
├── frontend/                    # Next.js React application
│   ├── app/                    # Next.js 13+ app directory
│   │   ├── api/               # API routes (chat endpoint)
│   │   ├── auth/              # Authentication pages
│   │   ├── chat/              # Chat interface
│   │   ├── crisis/            # Crisis support pages
│   │   ├── dashboard/         # User dashboard
│   │   ├── resources/         # Resource library
│   │   └── globals.css        # Global styles
│   ├── components/            # Reusable React components
│   │   ├── ui/               # shadcn/ui components
│   │   ├── DailyClientProvider.tsx
│   │   ├── DialogWrapper.tsx
│   │   ├── Timer.tsx
│   │   └── Video.tsx
│   ├── screens/              # Full-screen components
│   │   ├── Conversation.tsx
│   │   ├── ConversationError.tsx
│   │   └── Instructions.tsx
│   ├── hooks/                # Custom React hooks
│   ├── lib/                  # Utility libraries
│   │   ├── ai-services.ts   # Gemini & ElevenLabs integration
│   │   ├── api.ts           # API client
│   │   ├── auth.ts          # Authentication manager
│   │   └── utils.ts         # Utility functions
│   ├── store/               # Jotai state management
│   ├── api/                 # API integration functions
│   └── types/               # TypeScript type definitions
├── backend/                 # Go backend API
│   ├── internal/
│   │   ├── config/         # Configuration management
│   │   ├── database/       # Database setup and migrations
│   │   ├── handlers/       # HTTP request handlers
│   │   ├── middleware/     # HTTP middleware
│   │   ├── models/         # Data models
│   │   └── services/       # Business logic
│   ├── main.go            # Application entry point
│   ├── go.mod             # Go module dependencies
│   └── README.md          # Backend documentation
└── README.md              # This file
```

## 🛠️ Technologies Used

### Frontend
- **Framework**: Next.js 13+ with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS with custom design system
- **UI Components**: shadcn/ui component library
- **State Management**: Jotai for atomic state management
- **AI Services**: 
  - Google Gemini AI for conversational responses
  - ElevenLabs for text-to-speech
  - Tavus API for video AI conversations
- **Video/Audio**: Daily.co for real-time video conversations
- **Icons**: Lucide React
- **Animations**: Framer Motion
- **HTTP Client**: Custom API client with fetch

### Backend
- **Language**: Go 1.21+
- **Framework**: Gin (HTTP web framework)
- **Database**: SQLite (development) / PostgreSQL (production ready)
- **Authentication**: JWT tokens with bcrypt password hashing
- **CORS**: Gin CORS middleware
- **Environment**: godotenv for configuration
- **UUID**: Google UUID for unique identifiers

### External Services
- **AI Text Generation**: Google Gemini AI
- **Text-to-Speech**: ElevenLabs
- **Video AI**: Tavus API for conversational AI
- **Real-time Communication**: Daily.co for video/audio
- **Deployment**: Netlify (frontend) / Any Go-compatible hosting (backend)

## 🚀 Getting Started

### Prerequisites

- **Node.js** 18+ and npm
- **Go** 1.21+
- **Git**
- **API Keys**:
  - Google Gemini AI API key
  - ElevenLabs API key
  - Tavus API key
  - Daily.co API key

### Backend Setup

1. **Navigate to backend directory**:
   ```bash
   cd backend
   ```

2. **Install Go dependencies**:
   ```bash
   go mod tidy
   ```

3. **Set up environment variables**:
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` with your configuration:
   ```env
   DATABASE_URL=heal.db
   JWT_SECRET=your-super-secret-jwt-key-change-in-production
   PORT=8080
   ENVIRONMENT=development
   ```

4. **Run the backend server**:
   ```bash
   go run main.go
   ```

   The backend will start on `http://localhost:8080`

### Frontend Setup

1. **Navigate to project root** (frontend is in root directory):
   ```bash
   cd ../  # if coming from backend directory
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Set up environment variables**:
   Create a `.env.local` file in the root directory:
   ```env
   # Backend API
   NEXT_PUBLIC_API_URL=http://localhost:8080/api/v1
   
   # AI Services
   NEXT_PUBLIC_GEMINI_API_KEY=your-gemini-api-key-here
   NEXT_PUBLIC_ELEVENLABS_API_KEY=your-elevenlabs-api-key-here
   
   # Video Services
   NEXT_PUBLIC_TAVUS_API_KEY=your-tavus-api-key-here
   NEXT_PUBLIC_DAILY_API_KEY=your-daily-api-key-here
   ```

4. **Get your API keys**:
   - **Gemini AI**: Get from [Google AI Studio](https://makersuite.google.com/app/apikey)
   - **ElevenLabs**: Get from [ElevenLabs Dashboard](https://elevenlabs.io/app/settings/api-keys)
   - **Tavus**: Get from [Tavus Dashboard](https://platform.tavus.io/)
   - **Daily.co**: Get from [Daily Dashboard](https://dashboard.daily.co/)

5. **Run the development server**:
   ```bash
   npm run dev
   ```

   The frontend will start on `http://localhost:3000`

### Full Stack Development

To run both frontend and backend simultaneously:

1. **Terminal 1 - Backend**:
   ```bash
   cd backend
   go run main.go
   ```

2. **Terminal 2 - Frontend**:
   ```bash
   npm run dev
   ```

3. **Access the application**:
   - Frontend: `http://localhost:3000`
   - Backend API: `http://localhost:8080`
   - API Health Check: `http://localhost:8080/health`

## 📱 Key Features & Pages

### Authentication (`/auth`)
- User registration and login
- JWT-based session management
- Password reset functionality
- Email verification (ready for implementation)

### Dashboard (`/dashboard`)
- Personalized user statistics
- Mood tracking and analytics
- Quick access to all features
- Privacy and security status

### AI Chat (`/chat`)
- **Text Chat**: Powered by Google Gemini AI for intelligent responses
- **Voice Responses**: ElevenLabs text-to-speech for natural voice interactions
- **Video AI**: Face-to-face conversations with Tavus AI
- Real-time messaging with typing indicators
- Crisis detection and intervention
- Audio playback controls

### Crisis Support (`/crisis`)
- Emergency contact management
- Local emergency services finder
- Crisis intervention protocols
- Safety planning tools

### Resource Library (`/resources`)
- Categorized mental health resources
- Progress tracking
- Personalized recommendations
- Favorite resources

## 🔧 API Endpoints

### Authentication
- `POST /api/v1/auth/register` - User registration
- `POST /api/v1/auth/login` - User login
- `POST /api/v1/auth/logout` - User logout

### User Management
- `GET /api/v1/user/profile` - Get user profile
- `PUT /api/v1/user/profile` - Update profile
- `GET /api/v1/user/stats` - Get user statistics
- `POST /api/v1/user/mood` - Log mood entry

### Chat
- `POST /api/chat` - Send message to Gemini AI (Next.js API route)

### Resources
- `GET /api/v1/resources` - Get resources (with filtering)
- `GET /api/v1/resources/:id` - Get specific resource
- `POST /api/v1/resources/:id/progress` - Update progress

### Crisis Support
- `POST /api/v1/crisis/alert` - Create crisis alert
- `GET /api/v1/crisis/contacts` - Get emergency contacts
- `GET /api/v1/crisis/services` - Get local services

## 🤖 AI Integration

### Gemini AI (Text Chat)
- Advanced conversational AI for mental health support
- Context-aware responses with conversation history
- Crisis detection and appropriate responses
- Empathetic and professional tone

### ElevenLabs (Voice)
- High-quality text-to-speech conversion
- Natural, empathetic voice (Bella voice)
- Configurable voice settings for optimal experience
- Audio playback with visual indicators

### Tavus (Video AI)
- Face-to-face AI conversations
- Real-time video and audio processing
- Natural conversation flow with visual cues
- Integration with Daily.co for video infrastructure

## 🔒 Security Features

- **End-to-end encryption** for sensitive data
- **JWT authentication** with secure token management
- **CORS protection** for cross-origin requests
- **Input validation** and sanitization
- **SQL injection prevention** with prepared statements
- **Password hashing** with bcrypt
- **HIPAA-compliant** data handling practices
- **API key security** with environment variable management

## 🚀 Deployment

### Frontend (Netlify)
1. Connect your repository to Netlify
2. Set build command: `npm run build`
3. Set publish directory: `out`
4. Add environment variables in Netlify dashboard:
   - `NEXT_PUBLIC_API_URL`
   - `NEXT_PUBLIC_GEMINI_API_KEY`
   - `NEXT_PUBLIC_ELEVENLABS_API_KEY`
   - `NEXT_PUBLIC_TAVUS_API_KEY`
   - `NEXT_PUBLIC_DAILY_API_KEY`

### Backend (Any Go hosting)
1. Build the binary: `go build -o heal-api main.go`
2. Set production environment variables
3. Deploy to your preferred Go hosting service
4. Ensure database is properly configured for production

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

If you need help or have questions:

- Check the [Issues](https://github.com/your-repo/heal/issues) page
- Create a new issue for bugs or feature requests
- For crisis support, please contact local emergency services

## 🔮 Roadmap

- [ ] Mobile app development (React Native)
- [ ] Advanced AI therapy modules
- [ ] Integration with wearable devices
- [ ] Telehealth provider network
- [ ] Group therapy sessions
- [ ] Advanced analytics and insights
- [ ] Voice-to-text for voice messages
- [ ] Multi-language support
- [ ] Offline mode capabilities

---

**⚠️ Important**: This platform is designed for informational and support purposes only and does not replace professional medical advice. If you're experiencing a mental health crisis, please contact emergency services immediately.