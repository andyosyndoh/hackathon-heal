# Heal - Mental Health Support Platform

A comprehensive mental health support platform that combines AI-powered assistance, crisis management, resource libraries, and real-time video conversations to provide accessible mental health care.

## 🌟 Features

- **AI-Powered Support**: Real-time conversational AI with video chat capabilities using Tavus
- **Text Chat with Gemini AI**: Advanced conversational AI using Google's Gemini model
- **Advanced Voice Features**: Multi-voice text-to-speech with male/female options using ElevenLabs
- **Persistent Chat History**: Messages are stored in the backend with session management
- **Crisis Management**: 24/7 emergency support with location-based services
- **Resource Library**: Curated mental health resources with progress tracking and audio narration
- **User Dashboard**: Personalized analytics, mood tracking, and progress monitoring
- **Secure Authentication**: JWT-based authentication with privacy-first design
- **Video Conversations**: Face-to-face AI conversations using Daily.co integration
- **Mobile Responsive**: Optimized for all devices and screen sizes

## 🎤 **Voice & Audio Features**

### **Multi-Voice Chat Experience**
✅ **Voice Off**: Complete silence mode for text-only conversations  
✅ **Female Voice**: Warm, empathetic female voice (Bella) for supportive interactions  
✅ **Male Voice**: Calm, supportive male voice (Adam) for comfortable conversations  
✅ **Smart Voice Switching**: Seamless switching between voice options during chat  
✅ **Visual Feedback**: Color-coded UI indicators for current voice selection  

### **Resource Audio Narration**
✅ **AI-Generated Narration**: All resources can be listened to with high-quality voice synthesis  
✅ **Audio Previews**: Quick audio previews for resource browsing  
✅ **Playback Controls**: Play, pause, stop, and mute controls for audio content  
✅ **Smart Text Processing**: Optimized text preparation for natural-sounding speech  

### **Voice Control Features**
✅ **Dropdown Voice Selection**: Easy-to-use voice picker with visual indicators  
✅ **Real-time Voice Status**: Live status indicators showing current voice mode  
✅ **Audio Management**: Intelligent audio interruption and cleanup  
✅ **Accessibility**: Full keyboard navigation and screen reader support  

## 💬 **Chat & Message Storage**

### **Persistent Chat Sessions**
✅ **Session Management**: Create, view, and manage multiple chat sessions  
✅ **Message History**: All messages are stored in the backend database  
✅ **Session Switching**: Seamlessly switch between different chat conversations  
✅ **Auto-Save**: Messages are automatically saved as you chat  

### **Chat Features**
✅ **Real-time Messaging**: Instant message delivery with typing indicators  
✅ **Message Persistence**: Chat history is preserved across sessions  
✅ **Session Deletion**: Users can delete chat sessions and all associated messages  
✅ **Message Metadata**: Support for different message types (text, audio, video)  

### **Backend Integration**
✅ **RESTful API**: Complete chat API with session and message management  
✅ **Database Storage**: SQLite/PostgreSQL storage for all chat data  
✅ **User Authentication**: Secure access to chat history per user  
✅ **Data Privacy**: User messages are encrypted and securely stored  

## 🏗️ Project Structure

```
heal/
├── frontend/                    # Next.js React application
│   ├── app/                    # Next.js 13+ app directory
│   │   ├── api/               # API routes (chat endpoint)
│   │   ├── auth/              # Authentication pages
│   │   ├── chat/              # Enhanced chat interface with session management
│   │   ├── crisis/            # Crisis support pages
│   │   ├── dashboard/         # User dashboard
│   │   ├── resources/         # Resource library with audio narration
│   │   └── globals.css        # Global styles with voice UI components
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
│   │   ├── ai-services.ts   # Enhanced Gemini & ElevenLabs integration
│   │   ├── api.ts           # Enhanced API client with chat endpoints
│   │   ├── auth.ts          # Authentication manager
│   │   └── utils.ts         # Utility functions
│   ├── store/               # Jotai state management
│   ├── api/                 # API integration functions
│   └── types/               # TypeScript type definitions
├── backend/                 # Go backend API
│   ├── internal/
│   │   ├── config/         # Configuration management
│   │   ├── database/       # Database setup and migrations
│   │   ├── handlers/       # HTTP request handlers (enhanced chat handler)
│   │   ├── middleware/     # HTTP middleware
│   │   ├── models/         # Data models (enhanced with chat models)
│   │   └── services/       # Business logic (enhanced chat service)
│   ├── main.go            # Application entry point (updated routes)
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
  - ElevenLabs for advanced text-to-speech with multiple voices
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
- **Text-to-Speech**: ElevenLabs with multiple voice models
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
  - ElevenLabs API key (for voice features)
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
- **Enhanced Chat Interface**: 
  - Session management with chat history
  - Multiple conversation support
  - Session switching and deletion
  - Persistent message storage
- **Advanced Voice Controls**: 
  - Voice Off mode for silent conversations
  - Female Voice (Bella) - warm and empathetic
  - Male Voice (Adam) - calm and supportive
  - Real-time voice switching with visual feedback
- **Video AI**: Face-to-face conversations with Tavus AI
- Real-time messaging with typing indicators
- Crisis detection and intervention
- Smart audio management and cleanup

### Crisis Support (`/crisis`)
- Emergency contact management
- Local emergency services finder
- Crisis intervention protocols
- Safety planning tools

### Resource Library (`/resources`)
- **Enhanced Audio Features**:
  - AI-generated narration for all resources
  - Audio previews for quick browsing
  - Playback controls (play, pause, stop, mute)
  - High-quality voice synthesis
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

### Chat (Enhanced)
- `POST /api/v1/chat/message` - Send message and get AI response
- `GET /api/v1/chat/history` - Get chat history for a session
- `GET /api/v1/chat/sessions` - Get all user chat sessions
- `DELETE /api/v1/chat/session/:id` - Delete a chat session
- `POST /api/v1/chat/feedback` - Submit feedback for AI responses

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

### ElevenLabs (Voice & Audio)
- **Multi-Voice Support**: 
  - Bella (Female) - Warm, empathetic voice for supportive conversations
  - Adam (Male) - Calm, supportive voice for comfortable interactions
- **Advanced Features**:
  - High-quality text-to-speech conversion
  - Smart text processing for natural speech
  - Real-time voice switching
  - Audio playback controls with visual feedback
- **Resource Narration**:
  - AI-generated narration for all mental health resources
  - Audio previews for quick content browsing
  - Optimized speech synthesis for educational content

### Tavus (Video AI)
- Face-to-face AI conversations
- Real-time video and audio processing
- Natural conversation flow with visual cues
- Integration with Daily.co for video infrastructure

## 💾 **Database Schema**

### **Chat Tables**
```sql
-- Chat sessions for organizing conversations
CREATE TABLE chat_sessions (
    id TEXT PRIMARY KEY,
    user_id TEXT NOT NULL,
    title TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Individual chat messages
CREATE TABLE chat_messages (
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
);
```

### **Key Features**
- **Session Management**: Organize conversations into sessions
- **Message Persistence**: All messages stored with timestamps
- **User Privacy**: Messages tied to authenticated users
- **Metadata Support**: Extensible JSON metadata for future features
- **Cascade Deletion**: Clean up when users or sessions are deleted

## 🎨 **Voice UI Design System**

### **Color-Coded Voice States**
- **Voice Off**: Gray theme with muted indicators
- **Female Voice**: Pink theme with warm accents
- **Male Voice**: Blue theme with calm accents

### **Visual Feedback Elements**
- **Header Status**: Real-time voice activity indicators
- **Dropdown Menu**: Clean voice selection interface
- **Message Indicators**: Voice icons on AI responses
- **Status Banners**: Colored banners for active voice modes
- **Playback Controls**: Intuitive audio control buttons

### **Accessibility Features**
- **Keyboard Navigation**: Full keyboard support for voice controls
- **Screen Reader Support**: Proper ARIA labels and descriptions
- **Visual Indicators**: Clear visual feedback for all voice states
- **Error Handling**: Graceful fallbacks for voice generation failures

## 🔒 Security Features

- **End-to-end encryption** for sensitive data
- **JWT authentication** with secure token management
- **CORS protection** for cross-origin requests
- **Input validation** and sanitization
- **SQL injection prevention** with prepared statements
- **Password hashing** with bcrypt
- **HIPAA-compliant** data handling practices
- **API key security** with environment variable management
- **Audio data protection** with secure blob handling and cleanup
- **Message privacy** with user-specific access controls

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

## 🎧 **Voice Feature Usage**

### **Chat Voice Controls**
1. **Access Voice Menu**: Click the voice icon in the chat header
2. **Select Voice Option**: Choose from Voice Off, Female Voice, or Male Voice
3. **Real-time Switching**: Change voices during conversation without interruption
4. **Visual Feedback**: See current voice status in header and input area

### **Resource Audio Narration**
1. **Browse Resources**: Navigate to any resource in the library
2. **Play Audio**: Click the "Listen" button to hear AI narration
3. **Control Playback**: Use play, pause, stop, and mute controls
4. **Preview Mode**: Quick audio previews available on resource cards

### **Voice Quality Settings**
- **Optimized for Mental Health**: Voices selected for warmth and empathy
- **Natural Speech Patterns**: Smart text processing for conversational flow
- **Consistent Quality**: High-fidelity audio generation across all features
- **Responsive Performance**: Efficient audio generation and playback

## 💬 **Chat System Usage**

### **Session Management**
1. **Create New Chat**: Click "New Chat" to start a fresh conversation
2. **Switch Sessions**: Use the chat sessions dropdown to switch between conversations
3. **View History**: All previous messages are automatically loaded when switching sessions
4. **Delete Sessions**: Remove unwanted chat sessions and all associated messages

### **Message Features**
- **Auto-Save**: Messages are automatically saved as you type and send
- **Persistent History**: Chat history is preserved across browser sessions
- **Real-time Updates**: Messages appear instantly with typing indicators
- **Voice Integration**: AI responses can be spoken aloud with voice controls

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
- [x] ✅ **Multi-voice text-to-speech system**
- [x] ✅ **Resource audio narration**
- [x] ✅ **Voice control interface**
- [x] ✅ **Persistent chat message storage**
- [x] ✅ **Chat session management**
- [x] ✅ **Message history and retrieval**
- [ ] Voice-to-text for voice messages
- [ ] Multi-language support with localized voices
- [ ] Offline mode capabilities
- [ ] Custom voice training for personalized experiences
- [ ] Voice emotion detection and response adaptation
- [ ] Advanced chat analytics and insights
- [ ] Message search and filtering
- [ ] Chat export functionality

---

**⚠️ Important**: This platform is designed for informational and support purposes only and does not replace professional medical advice. If you're experiencing a mental health crisis, please contact emergency services immediately.

## 🎤 **Voice Technology Credits**

- **Text-to-Speech**: Powered by [ElevenLabs](https://elevenlabs.io/) AI voice synthesis
- **Voice Models**: 
  - Bella (Female Voice) - Optimized for empathetic mental health support
  - Adam (Male Voice) - Calibrated for calm, supportive interactions
- **Audio Processing**: Advanced speech synthesis with natural language optimization
- **Accessibility**: Full compliance with web accessibility standards for audio content

## 💾 **Data Storage Credits**

- **Backend Framework**: Built with [Go](https://golang.org/) and [Gin](https://gin-gonic.com/)
- **Database**: SQLite for development, PostgreSQL-ready for production
- **Message Storage**: Secure, encrypted storage with user privacy protection
- **Session Management**: Efficient chat session organization and retrieval