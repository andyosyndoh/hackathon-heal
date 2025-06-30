# Heal - Mental Health Support Platform

A comprehensive mental health support platform that combines AI-powered assistance, crisis management, resource libraries, and real-time video conversations to provide accessible mental health care.

## 🌟 Features

- **AI-Powered Support**: Real-time conversational AI with video chat capabilities using Tavus
- **Gemini AI Chat**: Advanced conversational AI using Google's Gemini 1.5 Flash model with intelligent responses
- **Advanced Voice Features**: Multi-voice text-to-speech with male/female options using ElevenLabs
- **Persistent Chat History**: Messages are stored in the backend with full session management
- **Crisis Management**: 24/7 emergency support with location-based services and intelligent crisis detection
- **Resource Library**: Curated mental health resources with progress tracking and audio narration
- **User Dashboard**: Personalized analytics, mood tracking, and progress monitoring
- **Secure Authentication**: JWT-based authentication with privacy-first design
- **Video Conversations**: Face-to-face AI conversations using Daily.co integration
- **Mobile Responsive**: Optimized for all devices and screen sizes
- **Full-Stack Deployment**: Frontend and backend both deployable to Netlify

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

## 💬 **Enhanced Chat & AI Integration**

### **Gemini AI Integration**
✅ **Real AI Responses**: Powered by Google's Gemini 1.5 Flash model  
✅ **Mental Health Specialized**: Custom prompts optimized for mental health support  
✅ **Crisis Detection**: Intelligent detection of crisis keywords with appropriate responses  
✅ **Contextual Responses**: Tailored responses for anxiety, depression, stress, and other conditions  
✅ **Safety Settings**: Configured to block harmful content and maintain therapeutic boundaries  

### **Persistent Chat Sessions**
✅ **Session Management**: Create, view, and manage multiple chat sessions  
✅ **Message History**: All messages are stored in the backend database  
✅ **Session Switching**: Seamlessly switch between different chat conversations  
✅ **Auto-Save**: Messages are automatically saved as you chat  
✅ **Message Metadata**: Rich metadata support for AI responses and analytics  

### **Intelligent Fallback System**
✅ **Contextual Fallbacks**: Smart fallback responses when API is unavailable  
✅ **Crisis Support**: Crisis detection works even in fallback mode  
✅ **Graceful Degradation**: Seamless user experience regardless of API status  

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
│   ├── screens/              # Full-screen components for video chat
│   ├── hooks/                # Custom React hooks
│   ├── lib/                  # Utility libraries
│   │   ├── ai-services.ts   # Enhanced Gemini & ElevenLabs integration
│   │   ├── api.ts           # Enhanced API client with chat endpoints
│   │   ├── auth.ts          # Authentication manager
│   │   └── utils.ts         # Utility functions
│   ├── store/               # Jotai state management
│   └── types/               # TypeScript type definitions
├── backend/                 # Go backend API (production-ready)
│   ├── internal/
│   │   ├── config/         # Configuration management
│   │   ├── database/       # Database setup and migrations
│   │   ├── handlers/       # HTTP request handlers
│   │   ├── middleware/     # HTTP middleware
│   │   ├── models/         # Data models
│   │   └── services/       # Business logic
│   ├── main.go            # Application entry point
│   └── README.md          # Backend documentation
├── netlify/                # Netlify Functions (serverless backend)
│   └── functions/         # Node.js serverless functions
│       ├── shared-db.js   # Shared in-memory database
│       ├── auth-*.js      # Authentication functions
│       ├── chat-*.js      # Chat and messaging functions
│       ├── user-*.js      # User management functions
│       ├── resources.js   # Resource management
│       └── health.js      # Health check endpoint
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
  - Google Gemini 1.5 Flash for conversational responses
  - ElevenLabs for advanced text-to-speech with multiple voices
  - Tavus API for video AI conversations
- **Video/Audio**: Daily.co for real-time video conversations
- **Icons**: Lucide React
- **Animations**: Framer Motion

### Backend Options

#### Option 1: Netlify Functions (Serverless)
- **Language**: Node.js with JavaScript
- **Database**: In-memory SQLite with persistence
- **Authentication**: JWT tokens with bcryptjs
- **Deployment**: Serverless functions on Netlify
- **AI Integration**: Direct Gemini API integration

#### Option 2: Go Backend (Traditional)
- **Language**: Go 1.21+
- **Framework**: Gin (HTTP web framework)
- **Database**: SQLite (development) / PostgreSQL (production)
- **Authentication**: JWT tokens with bcrypt
- **Deployment**: Any Go-compatible hosting

### External Services
- **AI Text Generation**: Google Gemini 1.5 Flash
- **Text-to-Speech**: ElevenLabs with multiple voice models
- **Video AI**: Tavus API for conversational AI
- **Real-time Communication**: Daily.co for video/audio
- **Deployment**: Netlify (full-stack) or separate hosting

## 🚀 Getting Started

### Prerequisites

- **Node.js** 18+ and npm
- **Git**
- **API Keys**:
  - Google Gemini AI API key (required for chat)
  - ElevenLabs API key (for voice features)
  - Tavus API key (for video chat)
  - Daily.co API key (for video infrastructure)

### Quick Setup (Netlify Full-Stack)

1. **Clone and setup**:
   ```bash
   git clone https://github.com/andyosyndoh/hackathon-heal.git
   cd hackathon-heal
   npm install
   ```

2. **Set up environment variables**:
   Create a `.env.local` file:
   ```env
   # AI Services (Required)
   NEXT_PUBLIC_GEMINI_API_KEY=your-gemini-api-key-here
   NEXT_PUBLIC_ELEVENLABS_API_KEY=your-elevenlabs-api-key-here
   
   # Video Services (Required for video chat)
   NEXT_PUBLIC_TAVUS_API_KEY=your-tavus-api-key-here
   NEXT_PUBLIC_DAILY_API_KEY=your-daily-api-key-here
   
   # Backend API (auto-configured for Netlify)
   NEXT_PUBLIC_API_URL=http://localhost:8888/api/v1
   
   # Security (Required for backend)
   JWT_SECRET=your-super-secret-jwt-key-minimum-32-characters-long
   ```

3. **Get your API keys**:
   - **Gemini AI**: Get from [Google AI Studio](https://makersuite.google.com/app/apikey)
   - **ElevenLabs**: Get from [ElevenLabs Dashboard](https://elevenlabs.io/app/settings/api-keys)
   - **Tavus**: Get from [Tavus Dashboard](https://platform.tavus.io/)
   - **Daily.co**: Get from [Daily Dashboard](https://dashboard.daily.co/)


## 🏃‍♂️ Running the Project (Frontend + 3 Backend Options)


This project supports three backend configurations. **NestJS is the recommended and default backend.** Use the provided npm scripts for easy setup and running:

### 1. NestJS Backend (Monorepo Server) **[RECOMMENDED FOR BOLT.NEW]**
- Installs dependencies and runs the NestJS backend:
  ```bash
  npm run dev:nest
  ```
- In a separate terminal, start the frontend:
  ```bash
  npm run dev
  ```
  OR
  ```
  npm run dev:all
  ```
  > Make sure you have a `.env.local` in the root and a `.env` in `server/`.

### 2. Netlify Functions (Serverless Node.js)

 **Run locally with Netlify Functions**:
   ```bash
   # Install Netlify CLI
   npm install -g netlify-cli
   
   # Start development server with functions
   netlify dev
   ```

   This starts both frontend and backend functions locally.

- Installs dependencies and starts both frontend and Netlify Functions backend:
  ```bash
  npm run dev:netlify
  ```
  > Make sure you have a `.env.local` file in the root (see below).

### 3. Go Backend (Traditional)
- Installs Go dependencies and runs the Go backend:
  ```bash
  npm run install:go
  npm run dev:go
  ```
- In a separate terminal, start the frontend:
  ```bash
  npm run dev
  ```
  > Make sure you have a `.env.local` in the root and `.env` in `backend/`.

  ### Alternative: Separate Frontend/Backend

If you prefer to run the Go backend separately:

1. **Backend setup**:
   ```bash
   cd backend
   go mod tidy
   cp .env.example .env
   # Edit .env with your configuration
   go run main.go
   ```

2. **Frontend setup**:
   ```bash
   # In project root
   npm run dev
   ```

---

## 🛠️ Environment Variables

- **Frontend:** Create a `.env.local` file in the project root.
- **NestJS Backend:** Create a `.env` file in the `server/` directory.
- **Go Backend:** Create a `.env` file in the `backend/` directory.

See each backend's README or `.env.example` for required variables.

---

## 🌐 **Netlify Deployment (Recommended)**

### **Full-Stack Deployment**

1. **Connect to Netlify**:
   - Go to [Netlify](https://netlify.com)
   - Connect your Git repository
   - Netlify will auto-detect the configuration

2. **Set Environment Variables** in Netlify dashboard:
   ```env
   # AI Services (Required)
   NEXT_PUBLIC_GEMINI_API_KEY=your-gemini-api-key-here
   NEXT_PUBLIC_ELEVENLABS_API_KEY=your-elevenlabs-api-key-here
   
   # Video Services (Required)
   NEXT_PUBLIC_TAVUS_API_KEY=your-tavus-api-key-here
   NEXT_PUBLIC_DAILY_API_KEY=your-daily-api-key-here
   
   # Backend Security (Required)
   JWT_SECRET=your-super-secret-jwt-key-minimum-32-characters-long
   
   # Node Version
   NODE_VERSION=18
   ```

3. **Deploy**:
   - Push to your main branch
   - Netlify automatically builds and deploys
   - Both frontend and backend functions are deployed together

### **API Endpoints (Auto-configured)**

All API endpoints are automatically available at your Netlify URL:

```
Frontend: https://your-site.netlify.app
Backend:  https://your-site.netlify.app/api/v1

Health:   GET  /api/v1/health
Debug:    GET  /api/v1/debug
Auth:     POST /api/v1/auth/register
          POST /api/v1/auth/login
Chat:     POST /api/v1/chat/message
          GET  /api/v1/chat/history
          GET  /api/v1/chat/sessions
User:     GET  /api/v1/user/stats
          POST /api/v1/user/mood
Resources: GET  /api/v1/resources
```

## 📱 Key Features & Pages

### Authentication (`/auth`)
- User registration and login with JWT tokens
- Secure password hashing and validation
- Session management with refresh tokens

### Dashboard (`/dashboard`)
- Personalized user statistics and analytics
- Mood tracking with visual charts
- Quick access to all platform features
- Privacy and security status indicators

### AI Chat (`/chat`)
- **Enhanced Gemini AI Integration**: 
  - Real-time intelligent responses using Google's Gemini 1.5 Flash
  - Mental health specialized prompts and safety settings
  - Crisis detection with immediate intervention protocols
  - Contextual responses for anxiety, depression, stress, and other conditions
- **Advanced Session Management**: 
  - Multiple conversation support with persistent history
  - Session switching and deletion capabilities
  - Message storage with rich metadata
- **Multi-Voice Support**: 
  - Voice Off, Female Voice (Bella), Male Voice (Adam)
  - Real-time voice switching with visual feedback
  - Smart audio management and cleanup
- **Video AI**: Face-to-face conversations with Tavus AI integration

### Crisis Support (`/crisis`)
- Emergency contact management with local services
- Crisis intervention protocols with intelligent detection
- Safety planning tools and resources
- 24/7 support information for Kenya and international

### Resource Library (`/resources`)
- **Enhanced Audio Features**:
  - AI-generated narration for all resources using ElevenLabs
  - Audio previews for quick content browsing
  - Full playback controls (play, pause, stop, mute)
- Categorized mental health resources with filtering
- Progress tracking and completion analytics
- Personalized recommendations based on user activity

## 🤖 AI Integration Details

### Gemini AI (Text Chat)
- **Model**: Google Gemini 1.5 Flash
- **Specialization**: Mental health support with therapeutic boundaries
- **Features**:
  - Context-aware responses with conversation history
  - Crisis detection with appropriate intervention
  - Empathetic and professional tone
  - Safety settings to block harmful content
  - Intelligent fallback responses when API is unavailable

### ElevenLabs (Voice & Audio)
- **Multi-Voice Support**: 
  - Bella (Female) - Warm, empathetic voice for supportive conversations
  - Adam (Male) - Calm, supportive voice for comfortable interactions
- **Advanced Features**:
  - High-quality text-to-speech conversion
  - Smart text processing for natural speech patterns
  - Real-time voice switching capabilities
  - Resource narration with optimized speech synthesis

### Tavus (Video AI)
- Face-to-face AI conversations with natural interaction
- Real-time video and audio processing
- Integration with Daily.co for video infrastructure
- Customizable AI personas for different therapeutic approaches

## 💾 **Database Schema**

### **Core Tables**
```sql
-- Users and authentication
CREATE TABLE users (
    id TEXT PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    email_verified BOOLEAN DEFAULT FALSE,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Chat sessions for organizing conversations
CREATE TABLE chat_sessions (
    id TEXT PRIMARY KEY,
    user_id TEXT NOT NULL,
    title TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Individual chat messages with AI responses
CREATE TABLE chat_messages (
    id TEXT PRIMARY KEY,
    session_id TEXT NOT NULL,
    user_id TEXT NOT NULL,
    content TEXT NOT NULL,
    sender_type TEXT NOT NULL, -- 'user' or 'ai'
    message_type TEXT DEFAULT 'text',
    metadata TEXT, -- JSON for AI model info, timestamps, etc.
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Mood tracking and analytics
CREATE TABLE mood_logs (
    id TEXT PRIMARY KEY,
    user_id TEXT NOT NULL,
    mood_score INTEGER NOT NULL, -- 1-10 scale
    notes TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Mental health resources
CREATE TABLE resources (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    content TEXT NOT NULL,
    type TEXT NOT NULL, -- 'article', 'video', 'audio', 'exercise', 'contact'
    category TEXT NOT NULL,
    difficulty TEXT NOT NULL,
    duration_minutes INTEGER,
    rating REAL DEFAULT 0,
    featured BOOLEAN DEFAULT FALSE
);
```

## 🔒 Security Features

- **End-to-end encryption** for sensitive data transmission
- **JWT authentication** with secure token management and refresh
- **CORS protection** configured for cross-origin requests
- **Input validation** and sanitization on all endpoints
- **SQL injection prevention** with prepared statements
- **Password hashing** with bcrypt (12 rounds)
- **HIPAA-compliant** data handling practices
- **API key security** with environment variable management
- **Audio data protection** with secure blob handling and cleanup
- **Message privacy** with user-specific access controls
- **Crisis detection** with appropriate escalation protocols

## 🎯 **Testing Your Deployment**

### **Health Checks**
```bash
# Test health endpoint
curl https://your-site.netlify.app/api/v1/health

# Test debug endpoint (shows database status)
curl https://your-site.netlify.app/api/v1/debug
```

### **Authentication Testing**
```bash
# Test registration
curl -X POST https://your-site.netlify.app/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123",
    "confirmPassword": "password123",
    "firstName": "Test",
    "lastName": "User"
  }'

# Test login
curl -X POST https://your-site.netlify.app/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123"
  }'
```

### **Chat Testing**
```bash
# Test chat with Gemini AI (requires auth token)
curl -X POST https://your-site.netlify.app/api/v1/chat/message \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "content": "I am feeling anxious today",
    "sessionId": "",
    "messageType": "text"
  }'
```

## 🔧 **Troubleshooting**

### **Common Issues**

1. **Gemini AI not responding**:
   - Check `NEXT_PUBLIC_GEMINI_API_KEY` is set correctly
   - Verify API key has proper permissions
   - Check function logs for API errors
   - System falls back to intelligent responses if API fails

2. **Messages not saving**:
   - Verify JWT token is valid and not expired
   - Check authentication headers in requests
   - Use debug endpoint to verify database status

3. **Voice features not working**:
   - Ensure `NEXT_PUBLIC_ELEVENLABS_API_KEY` is configured
   - Check browser permissions for audio playback
   - Verify network connectivity for audio generation

4. **CORS errors**:
   - Ensure all functions have proper CORS headers
   - Check API URL configuration in environment variables
   - Clear browser cache and try again

### **Debug Tools**

- **Debug Endpoint**: `/api/v1/debug` shows system status
- **Function Logs**: Check Netlify dashboard → Functions tab
- **Browser Console**: Check for JavaScript errors
- **Network Tab**: Monitor API requests and responses

## 💰 **Cost Considerations**

### **Netlify Free Tier**
- **Bandwidth**: 100GB/month
- **Build minutes**: 300 minutes/month
- **Functions**: 125,000 requests/month
- **Function runtime**: 100 hours/month

### **AI Service Costs**
- **Gemini AI**: Free tier with generous limits
- **ElevenLabs**: Free tier with 10,000 characters/month
- **Tavus**: Usage-based pricing for video AI
- **Daily.co**: Free tier for development

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

### ✅ **Completed Features**
- [x] **Real Gemini AI Integration** with mental health specialization
- [x] **Persistent Chat Message Storage** with session management
- [x] **Multi-voice text-to-speech system** with ElevenLabs
- [x] **Resource audio narration** with playback controls
- [x] **Netlify full-stack deployment** with serverless functions
- [x] **Crisis detection and intervention** protocols
- [x] **User authentication and authorization** with JWT
- [x] **Mood tracking and analytics** with visual charts

### 🚧 **In Progress**
- [ ] Mobile app development (React Native)
- [ ] Advanced AI therapy modules with specialized models
- [ ] Integration with wearable devices for health monitoring
- [ ] Group therapy sessions with video conferencing

### 🔮 **Future Plans**
- [ ] Telehealth provider network integration
- [ ] Voice-to-text for voice messages
- [ ] Multi-language support with localized voices
- [ ] Offline mode capabilities
- [ ] Custom voice training for personalized experiences
- [ ] Voice emotion detection and response adaptation
- [ ] Advanced chat analytics and insights
- [ ] Message search and filtering capabilities
- [ ] Chat export functionality for therapy records

---

**⚠️ Important**: This platform is designed for informational and support purposes only and does not replace professional medical advice. If you're experiencing a mental health crisis, please contact emergency services immediately.

## 🎤 **Technology Credits**

- **AI Text Generation**: Powered by [Google Gemini](https://ai.google.dev/) 1.5 Flash
- **Text-to-Speech**: Powered by [ElevenLabs](https://elevenlabs.io/) AI voice synthesis
- **Video AI**: Powered by [Tavus](https://tavus.io/) conversational AI
- **Video Infrastructure**: Powered by [Daily.co](https://daily.co/) WebRTC platform
- **Deployment**: Hosted on [Netlify](https://netlify.com/) with serverless functions
- **Frontend**: Built with [Next.js](https://nextjs.org/) and [Tailwind CSS](https://tailwindcss.com/)
- **Backend**: Node.js serverless functions with in-memory SQLite database

## 🌐 **Deployment Status**

- **Frontend**: ✅ Deployed on Netlify with static site generation
- **Backend**: ✅ Deployed as Netlify Functions (serverless)
- **Database**: ✅ In-memory SQLite with persistence across function calls
- **AI Services**: ✅ Integrated with proper error handling and fallbacks
- **Authentication**: ✅ JWT-based with secure token management
- **CORS**: ✅ Properly configured for cross-origin requests
- **SSL**: ✅ Automatic HTTPS with Let's Encrypt certificates