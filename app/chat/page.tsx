'use client';

import { useState, useRef, useEffect } from 'react';
import {
  Heart,
  Send,
  Mic,
  MicOff,
  ArrowLeft,
  Settings,
  Shield,
  Volume2,
  VolumeX,
  MoreVertical,
  Phone,
  Video,
  Bot,
  User,
  Loader2,
  ChevronDown,
  MessageSquare,
  Trash2
} from 'lucide-react';
import Link from 'next/link';
import { useAtom } from 'jotai';
import { screenAtom } from '@/store/screens';
import { Instructions } from '@/screens/Instructions';
import { Conversation } from '@/screens/Conversation';
import { ConversationError } from '@/screens/ConversationError';
import { geminiService, elevenLabsService } from '@/lib/ai-services';
import { apiClient } from '@/lib/api';
import { useAuth } from '@/hooks/use-auth';

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'ai';
  timestamp: Date;
  mood?: string;
  type: 'text' | 'audio' | 'video';
  isLoading?: boolean;
  sessionId?: string;
}

interface ChatSession {
  id: string;
  title: string;
  createdAt: string;
  updatedAt: string;
}

type VoiceOption = 'off' | 'female' | 'male';

export default function ChatPage() {
  const { user, isAuthenticated } = useAuth();
  const [currentSessionId, setCurrentSessionId] = useState<string | null>(null);
  const [sessions, setSessions] = useState<ChatSession[]>([]);
  const [showSessions, setShowSessions] = useState(false);
  const [loadingSessions, setLoadingSessions] = useState(false);
  
  const [messages, setMessages] = useState<Message[]>([]);
  const [loadingHistory, setLoadingHistory] = useState(false);

  const [inputMessage, setInputMessage] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [voiceOption, setVoiceOption] = useState<VoiceOption>('female');
  const [showVoiceDropdown, setShowVoiceDropdown] = useState(false);
  const [showVideoModal, setShowVideoModal] = useState(false);
  const [showVideoConversation, setShowVideoConversation] = useState(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [currentAudio, setCurrentAudio] = useState<HTMLAudioElement | null>(null);
  const [, setScreenState] = useAtom(screenAtom);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const sessionsRef = useRef<HTMLDivElement>(null);

  // Voice configuration
  const voiceConfigs = {
    off: { 
      label: 'Voice Off', 
      icon: VolumeX, 
      color: 'text-gray-600 bg-gray-100',
      voiceId: null 
    },
    female: { 
      label: 'Female Voice', 
      icon: Volume2, 
      color: 'text-pink-600 bg-pink-100',
      voiceId: 'EXAVITQu4vr4xnSDxMaL' // Bella - warm and empathetic female voice
    },
    male: { 
      label: 'Male Voice', 
      icon: Volume2, 
      color: 'text-blue-600 bg-blue-100',
      voiceId: 'pNInz6obpgDQGcFmaJgB' // Adam - calm and supportive male voice
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Load chat sessions on mount
  useEffect(() => {
    if (isAuthenticated) {
      loadChatSessions();
    }
  }, [isAuthenticated]);

  // Load chat history when session changes
  useEffect(() => {
    if (currentSessionId && isAuthenticated) {
      loadChatHistory(currentSessionId);
    }
  }, [currentSessionId, isAuthenticated]);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowVoiceDropdown(false);
      }
      if (sessionsRef.current && !sessionsRef.current.contains(event.target as Node)) {
        setShowSessions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Cleanup audio on unmount
  useEffect(() => {
    return () => {
      if (currentAudio) {
        currentAudio.pause();
        currentAudio.src = '';
      }
    };
  }, [currentAudio]);

  const loadChatSessions = async () => {
    try {
      setLoadingSessions(true);
      const response = await apiClient.getChatSessions();
      if (response.data?.sessions) {
        setSessions(response.data.sessions);
      }
    } catch (error) {
      console.error('Failed to load chat sessions:', error);
    } finally {
      setLoadingSessions(false);
    }
  };

  const loadChatHistory = async (sessionId: string) => {
    try {
      setLoadingHistory(true);
      const response = await apiClient.getChatHistory(sessionId);
      if (response.data?.messages) {
        const formattedMessages = response.data.messages.map((msg: any) => ({
          id: msg.id,
          content: msg.content,
          sender: msg.senderType,
          timestamp: new Date(msg.createdAt),
          type: msg.messageType || 'text',
          sessionId: msg.sessionId
        }));
        setMessages(formattedMessages);
      }
    } catch (error) {
      console.error('Failed to load chat history:', error);
    } finally {
      setLoadingHistory(false);
    }
  };

  const createNewSession = () => {
    setCurrentSessionId(null);
    setMessages([{
      id: '1',
      content: "Hello! I'm your AI companion. I'm here to provide emotional support and help you through whatever you're experiencing. How are you feeling today?",
      sender: 'ai',
      timestamp: new Date(),
      type: 'text'
    }]);
    setShowSessions(false);
  };

  const selectSession = (sessionId: string) => {
    setCurrentSessionId(sessionId);
    setShowSessions(false);
  };

  const deleteSession = async (sessionId: string, event: React.MouseEvent) => {
    event.stopPropagation();
    
    if (!confirm('Are you sure you want to delete this chat session?')) {
      return;
    }

    try {
      await apiClient.deleteChatSession(sessionId);
      setSessions(prev => prev.filter(s => s.id !== sessionId));
      
      if (currentSessionId === sessionId) {
        createNewSession();
      }
    } catch (error) {
      console.error('Failed to delete session:', error);
    }
  };

  const playAIResponse = async (text: string) => {
    if (voiceOption === 'off' || !process.env.NEXT_PUBLIC_ELEVENLABS_API_KEY) return;
    
    try {
      setIsPlayingAudio(true);
      
      // Stop any currently playing audio
      if (currentAudio) {
        currentAudio.pause();
        currentAudio.src = '';
      }

      console.log(`Generating speech with ${voiceOption} voice for AI response`);
      
      // Clean text for better speech synthesis
      const cleanText = text
        .replace(/\*\*(.*?)\*\*/g, '$1') // Remove markdown bold
        .replace(/\*(.*?)\*/g, '$1') // Remove markdown italic
        .replace(/`(.*?)`/g, '$1') // Remove code blocks
        .replace(/\n+/g, '. ') // Replace newlines with periods
        .replace(/\s+/g, ' ') // Replace multiple spaces
        .trim();

      const voiceId = voiceConfigs[voiceOption].voiceId;
      const audioBuffer = await elevenLabsService.textToSpeech(cleanText, voiceId);
      
      // Create audio blob and URL
      const audioBlob = new Blob([audioBuffer], { type: 'audio/mpeg' });
      const audioUrl = URL.createObjectURL(audioBlob);
      
      // Create and configure audio element
      const audio = new Audio(audioUrl);
      audio.volume = 0.7;
      
      audio.onended = () => {
        setIsPlayingAudio(false);
        setCurrentAudio(null);
        URL.revokeObjectURL(audioUrl);
      };
      
      audio.onerror = () => {
        console.error('Audio playback error');
        setIsPlayingAudio(false);
        setCurrentAudio(null);
        URL.revokeObjectURL(audioUrl);
      };

      setCurrentAudio(audio);
      await audio.play();
      
    } catch (error) {
      console.warn('Failed to play audio:', error);
      setIsPlayingAudio(false);
    }
  };

  const stopCurrentAudio = () => {
    if (currentAudio) {
      currentAudio.pause();
      currentAudio.currentTime = 0;
      setIsPlayingAudio(false);
    }
  };

  const sendMessage = async () => {
    if (!inputMessage.trim() || !isAuthenticated) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputMessage,
      sender: 'user',
      timestamp: new Date(),
      type: 'text'
    };

    // Add user message to UI immediately
    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Stop any currently playing audio when user sends a new message
    stopCurrentAudio();

    // Add loading message
    const loadingMessage: Message = {
      id: (Date.now() + 1).toString(),
      content: '',
      sender: 'ai',
      timestamp: new Date(),
      type: 'text',
      isLoading: true
    };
    setMessages(prev => [...prev, loadingMessage]);

    try {
      // Send message to backend
      const response = await apiClient.sendMessage(currentSessionId || '', inputMessage);
      
      if (response.error) {
        throw new Error(response.error);
      }

      // Update session ID if this was a new session
      if (!currentSessionId && response.data?.session?.id) {
        setCurrentSessionId(response.data.session.id);
        // Reload sessions to include the new one
        loadChatSessions();
      }

      // Remove loading message and add actual AI response
      setMessages(prev => {
        const filtered = prev.filter(msg => !msg.isLoading);
        return [...filtered, {
          id: response.data?.aiMessage?.id || (Date.now() + 2).toString(),
          content: response.data?.response || "I'm sorry, I'm having trouble connecting right now.",
          sender: 'ai',
          timestamp: new Date(),
          type: 'text',
          sessionId: response.data?.session?.id
        }];
      });

      // Play audio response if voice is enabled
      if (voiceOption !== 'off' && response.data?.response) {
        // Small delay to ensure message is rendered before audio starts
        setTimeout(() => {
          playAIResponse(response.data.response);
        }, 500);
      }

    } catch (error) {
      console.error('Error sending message:', error);
      
      // Remove loading message and add error message
      setMessages(prev => {
        const filtered = prev.filter(msg => !msg.isLoading);
        return [...filtered, {
          id: (Date.now() + 2).toString(),
          content: "I'm sorry, I'm having trouble connecting right now. Please try again later.",
          sender: 'ai',
          timestamp: new Date(),
          type: 'text'
        }];
      });
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const handleVoiceOptionChange = (option: VoiceOption) => {
    setVoiceOption(option);
    setShowVoiceDropdown(false);
    
    // Stop current audio if switching to off or changing voice
    if (isPlayingAudio) {
      stopCurrentAudio();
    }
  };

  const toggleRecording = () => {
    setIsRecording(!isRecording);
    // Here you would implement actual voice recording functionality
  };

  const [{ currentScreen }] = useAtom(screenAtom)

  const renderScreen = () => {
    switch (currentScreen) {
      case "settings":
        return <Settings />;
      case "introLoading":
        return <Instructions />;
      case "conversation":
        return <Conversation />;
      default:
        return <Instructions />;
    }
  };

  const currentVoiceConfig = voiceConfigs[voiceOption];
  const VoiceIcon = currentVoiceConfig.icon;

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Please Sign In</h2>
          <p className="text-gray-600 mb-6">You need to be signed in to access the chat.</p>
          <Link href="/auth" className="heal-button">
            Sign In
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200 px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/dashboard" className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <ArrowLeft className="h-5 w-5 text-gray-600" />
            </Link>
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-green-500 rounded-full flex items-center justify-center">
                <Bot className="h-5 w-5 text-white" />
              </div>
              <div>
                <h1 className="font-semibold text-gray-900">AI Companion</h1>
                <p className="text-sm text-green-600 flex items-center">
                  {isPlayingAudio ? (
                    <>
                      <Volume2 className="h-3 w-3 mr-1" />
                      Speaking ({voiceOption} voice)...
                    </>
                  ) : (
                    'Online • Secure Session'
                  )}
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            {/* Chat Sessions Dropdown */}
            <div className="relative" ref={sessionsRef}>
              <button
                onClick={() => setShowSessions(!showSessions)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors flex items-center space-x-1"
                title="Chat Sessions"
              >
                <MessageSquare className="h-5 w-5 text-gray-600" />
                <ChevronDown className="h-3 w-3 text-gray-600" />
              </button>

              {showSessions && (
                <div className="absolute right-0 top-full mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50 max-h-96 overflow-y-auto">
                  <div className="px-3 py-2 text-xs font-medium text-gray-500 border-b border-gray-100 flex items-center justify-between">
                    <span>Chat Sessions</span>
                    <button
                      onClick={createNewSession}
                      className="text-blue-600 hover:text-blue-700 text-xs"
                    >
                      New Chat
                    </button>
                  </div>
                  
                  {loadingSessions ? (
                    <div className="p-4 text-center">
                      <Loader2 className="h-4 w-4 animate-spin mx-auto" />
                    </div>
                  ) : sessions.length === 0 ? (
                    <div className="p-4 text-center text-gray-500 text-sm">
                      No chat sessions yet
                    </div>
                  ) : (
                    sessions.map((session) => (
                      <div
                        key={session.id}
                        className={`px-3 py-2 hover:bg-gray-50 cursor-pointer flex items-center justify-between group ${
                          currentSessionId === session.id ? 'bg-blue-50 text-blue-700' : 'text-gray-700'
                        }`}
                        onClick={() => selectSession(session.id)}
                      >
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium truncate">{session.title}</p>
                          <p className="text-xs text-gray-500">
                            {new Date(session.updatedAt).toLocaleDateString()}
                          </p>
                        </div>
                        <button
                          onClick={(e) => deleteSession(session.id, e)}
                          className="opacity-0 group-hover:opacity-100 p-1 hover:bg-red-100 rounded text-red-600 transition-opacity"
                          title="Delete session"
                        >
                          <Trash2 className="h-3 w-3" />
                        </button>
                      </div>
                    ))
                  )}
                </div>
              )}
            </div>

            {/* Voice Selection Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setShowVoiceDropdown(!showVoiceDropdown)}
                className={`p-2 rounded-lg transition-colors flex items-center space-x-1 ${currentVoiceConfig.color}`}
                title={`Current: ${currentVoiceConfig.label}`}
              >
                <VoiceIcon className="h-5 w-5" />
                <ChevronDown className="h-3 w-3" />
              </button>

              {showVoiceDropdown && (
                <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                  <div className="px-3 py-2 text-xs font-medium text-gray-500 border-b border-gray-100">
                    Voice Options
                  </div>
                  {Object.entries(voiceConfigs).map(([key, config]) => {
                    const OptionIcon = config.icon;
                    return (
                      <button
                        key={key}
                        onClick={() => handleVoiceOptionChange(key as VoiceOption)}
                        className={`w-full px-3 py-2 text-left hover:bg-gray-50 flex items-center space-x-3 transition-colors ${
                          voiceOption === key ? 'bg-blue-50 text-blue-700' : 'text-gray-700'
                        }`}
                      >
                        <OptionIcon className="h-4 w-4" />
                        <span className="text-sm">{config.label}</span>
                        {voiceOption === key && (
                          <div className="ml-auto w-2 h-2 bg-blue-600 rounded-full"></div>
                        )}
                      </button>
                    );
                  })}
                  <div className="px-3 py-2 text-xs text-gray-500 border-t border-gray-100 mt-1">
                    {process.env.NEXT_PUBLIC_ELEVENLABS_API_KEY 
                      ? 'Powered by ElevenLabs AI' 
                      : 'API key required for voice'
                    }
                  </div>
                </div>
              )}
            </div>

            <button
              onClick={() => setShowVideoConversation(true)}
              className={`p-2 hover:bg-gray-100 rounded-lg transition-colors text-gray-600`}
              title={'Start video conversation'}
            >
              <Video className="h-5 w-5" />
            </button>
            <Link href="/crisis" className="p-2 hover:bg-gray-100 rounded-lg transition-colors text-red-600">
              <Phone className="h-5 w-5" />
            </Link>
            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <MoreVertical className="h-5 w-5 text-gray-600" />
            </button>
          </div>
        </div>
      </div>

      {/* Privacy Notice */}
      <div className="bg-blue-50 border-b border-blue-200 px-4 py-2">
        <div className="flex items-center justify-center space-x-2 text-sm text-blue-700">
          <Shield className="h-4 w-4" />
          <span>End-to-end encrypted • Your conversation is private and secure</span>
        </div>
      </div>

      {/* Voice Status Banner */}
      {voiceOption !== 'off' && process.env.NEXT_PUBLIC_ELEVENLABS_API_KEY && (
        <div className={`border-b px-4 py-2 ${
          voiceOption === 'female' ? 'bg-pink-50 border-pink-200' : 'bg-blue-50 border-blue-200'
        }`}>
          <div className={`flex items-center justify-center space-x-2 text-sm ${
            voiceOption === 'female' ? 'text-pink-700' : 'text-blue-700'
          }`}>
            <VoiceIcon className="h-4 w-4" />
            <span>{currentVoiceConfig.label} enabled • AI will speak responses aloud</span>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-0">
        {showVideoConversation ? (
          <div className="flex-1 flex flex-col min-h-0 justify-center items-center relative bg-black">
            <div className="absolute inset-0 flex flex-col h-full items-center justify-center">
              {renderScreen()}
              <button
                onClick={() => setShowVideoConversation(false)}
                className="absolute top-4 right-4 bg-white/80 hover:bg-white text-gray-700 rounded-full p-3 shadow-lg z-10 transition-all duration-200"
                aria-label="Close video conversation"
              >
                ✕
              </button>
            </div>
          </div>
        ) : (
          <>
            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-4 py-6 space-y-4">
              {loadingHistory ? (
                <div className="flex items-center justify-center py-8">
                  <div className="flex items-center space-x-2">
                    <Loader2 className="h-5 w-5 animate-spin text-blue-600" />
                    <span className="text-gray-600">Loading chat history...</span>
                  </div>
                </div>
              ) : (
                messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`flex items-start space-x-3 max-w-xs sm:max-w-md lg:max-w-lg ${message.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''
                      }`}>
                      {/* Avatar */}
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${message.sender === 'user'
                        ? 'bg-blue-500'
                        : 'bg-gradient-to-r from-blue-500 to-green-500'
                        }`}>
                        {message.sender === 'user' ?
                          <User className="h-4 w-4 text-white" /> :
                          <Bot className="h-4 w-4 text-white" />
                        }
                      </div>

                      {/* Message Bubble */}
                      <div className={`heal-chat-bubble ${message.sender === 'user'
                        ? 'bg-blue-600 text-white'
                        : 'bg-white text-gray-900 border border-gray-200'
                        }`}>
                        {message.isLoading ? (
                          <div className="flex items-center space-x-2">
                            <Loader2 className="h-4 w-4 animate-spin" />
                            <span className="text-sm">Thinking...</span>
                          </div>
                        ) : (
                          <>
                            <p className="text-sm leading-relaxed">{message.content}</p>
                            <div className="flex items-center justify-between mt-1">
                              <p className={`text-xs ${message.sender === 'user' ? 'text-blue-100' : 'text-gray-500'
                                }`}>
                                {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                              </p>
                              {/* Audio indicator for AI messages */}
                              {message.sender === 'ai' && voiceOption !== 'off' && !message.isLoading && (
                                <div className="flex items-center space-x-1">
                                  {isPlayingAudio ? (
                                    <Volume2 className={`h-3 w-3 ${
                                      voiceOption === 'female' ? 'text-pink-600' : 'text-blue-600'
                                    }`} />
                                  ) : (
                                    <VoiceIcon className="h-3 w-3 text-gray-400" />
                                  )}
                                </div>
                              )}
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                ))
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Crisis Support Banner */}
            <div className="bg-red-50 border-t border-red-200 px-4 py-2">
              <div className="flex items-center justify-between">
                <p className="text-sm text-red-700">
                  If you're having thoughts of self-harm, please get help immediately.
                </p>
                <Link href="/crisis" className="text-sm font-medium text-red-600 hover:text-red-700">
                  Crisis Support →
                </Link>
              </div>
            </div>
          </>
        )}

        {/* Input Area */}
        <div className="bg-white border-t border-gray-200 px-4 py-4">
          <div className="flex items-end space-x-3">
            <button
              onClick={toggleRecording}
              className={`p-3 rounded-full transition-all duration-200 ${isRecording
                ? 'bg-red-500 text-white pulse-glow'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              title={isRecording ? 'Stop recording' : 'Start voice message'}
            >
              {isRecording ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
            </button>

            <div className="flex-1 relative">
              <textarea
                ref={inputRef}
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message... (Press Enter to send)"
                className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none max-h-32 bg-gray-50"
                rows={1}
                style={{ minHeight: '44px' }}
                disabled={isTyping}
              />
            </div>

            <button
              onClick={sendMessage}
              disabled={!inputMessage.trim() || isTyping}
              className={`p-3 rounded-full transition-all duration-200 ${inputMessage.trim() && !isTyping
                ? 'bg-blue-600 text-white hover:bg-blue-700 transform hover:scale-105'
                : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                }`}
              title="Send message"
            >
              {isTyping ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                <Send className="h-5 w-5" />
              )}
            </button>
          </div>

          {/* Voice Status Indicator */}
          <div className="flex items-center justify-between mt-3">
            <div className="flex flex-wrap gap-2">
              {['I need support', 'Feeling anxious', 'Having a hard day', 'Need coping strategies'].map((quickResponse, index) => (
                <button
                  key={index}
                  onClick={() => setInputMessage(quickResponse)}
                  className="px-3 py-1 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm rounded-full transition-colors disabled:opacity-50"
                  disabled={isTyping}
                >
                  {quickResponse}
                </button>
              ))}
            </div>

            {/* Voice Status */}
            <div className="flex items-center space-x-2 text-xs text-gray-500">
              <div className={`w-2 h-2 rounded-full ${
                voiceOption === 'off' ? 'bg-gray-400' : 
                voiceOption === 'female' ? 'bg-pink-500' : 'bg-blue-500'
              }`}></div>
              <span>{currentVoiceConfig.label}</span>
            </div>
          </div>

          {/* AI Service Status */}
          <div className="flex items-center justify-center mt-2 text-xs text-gray-500">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1">
                <div className={`w-2 h-2 rounded-full ${process.env.NEXT_PUBLIC_GEMINI_API_KEY ? 'bg-green-500' : 'bg-red-500'}`}></div>
                <span>Gemini AI</span>
              </div>
              <div className="flex items-center space-x-1">
                <div className={`w-2 h-2 rounded-full ${process.env.NEXT_PUBLIC_ELEVENLABS_API_KEY ? 'bg-green-500' : 'bg-red-500'}`}></div>
                <span>Voice ({voiceOption})</span>
              </div>
              <div className="flex items-center space-x-1">
                <div className={`w-2 h-2 rounded-full ${isAuthenticated ? 'bg-green-500' : 'bg-red-500'}`}></div>
                <span>Backend</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}