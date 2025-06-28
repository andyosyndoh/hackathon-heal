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
  Loader2
} from 'lucide-react';
import Link from 'next/link';
import { useAtom } from 'jotai';
import { screenAtom } from '@/store/screens';
import { Instructions } from '@/screens/Instructions';
import { Conversation } from '@/screens/Conversation';
import { ConversationError } from '@/screens/ConversationError';
import { geminiService, elevenLabsService } from '@/lib/ai-services';

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'ai';
  timestamp: Date;
  mood?: string;
  type: 'text' | 'audio' | 'video';
  isLoading?: boolean;
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: "Hello! I'm your AI companion. I'm here to provide emotional support and help you through whatever you're experiencing. How are you feeling today?",
      sender: 'ai',
      timestamp: new Date(),
      type: 'text'
    }
  ]);

  const [inputMessage, setInputMessage] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [isVoiceEnabled, setIsVoiceEnabled] = useState(true); // Voice toggle state
  const [showVideoModal, setShowVideoModal] = useState(false);
  const [showVideoConversation, setShowVideoConversation] = useState(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [currentAudio, setCurrentAudio] = useState<HTMLAudioElement | null>(null);
  const [, setScreenState] = useAtom(screenAtom);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Cleanup audio on unmount
  useEffect(() => {
    return () => {
      if (currentAudio) {
        currentAudio.pause();
        currentAudio.src = '';
      }
    };
  }, [currentAudio]);

  const playAIResponse = async (text: string) => {
    if (!isVoiceEnabled || !process.env.NEXT_PUBLIC_ELEVENLABS_API_KEY) return;
    
    try {
      setIsPlayingAudio(true);
      
      // Stop any currently playing audio
      if (currentAudio) {
        currentAudio.pause();
        currentAudio.src = '';
      }

      console.log('Generating speech for AI response');
      
      // Clean text for better speech synthesis
      const cleanText = text
        .replace(/\*\*(.*?)\*\*/g, '$1') // Remove markdown bold
        .replace(/\*(.*?)\*/g, '$1') // Remove markdown italic
        .replace(/`(.*?)`/g, '$1') // Remove code blocks
        .replace(/\n+/g, '. ') // Replace newlines with periods
        .replace(/\s+/g, ' ') // Replace multiple spaces
        .trim();

      const audioBuffer = await elevenLabsService.textToSpeech(cleanText);
      
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
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputMessage,
      sender: 'user',
      timestamp: new Date(),
      type: 'text'
    };

    // Add user message
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
      // Get AI response using Gemini
      const aiResponse = await geminiService.sendMessage(inputMessage);
      
      // Remove loading message and add actual response
      setMessages(prev => {
        const filtered = prev.filter(msg => !msg.isLoading);
        return [...filtered, {
          id: (Date.now() + 2).toString(),
          content: aiResponse,
          sender: 'ai',
          timestamp: new Date(),
          type: 'text'
        }];
      });

      // Play audio response if voice is enabled
      if (isVoiceEnabled) {
        // Small delay to ensure message is rendered before audio starts
        setTimeout(() => {
          playAIResponse(aiResponse);
        }, 500);
      }

    } catch (error) {
      console.error('Error sending message to AI:', error);
      
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

  const toggleVoice = () => {
    const newVoiceState = !isVoiceEnabled;
    setIsVoiceEnabled(newVoiceState);
    
    // Stop current audio if disabling voice
    if (!newVoiceState && isPlayingAudio) {
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
                      Speaking...
                    </>
                  ) : (
                    'Online • Secure Session'
                  )}
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={toggleVoice}
              className={`p-2 rounded-lg transition-colors ${
                isVoiceEnabled 
                  ? 'bg-green-100 text-green-600 hover:bg-green-200' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
              title={isVoiceEnabled ? 'Voice responses enabled' : 'Voice responses disabled'}
            >
              {isVoiceEnabled ?
                <Volume2 className="h-5 w-5" /> :
                <VolumeX className="h-5 w-5" />
              }
            </button>
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
      {isVoiceEnabled && process.env.NEXT_PUBLIC_ELEVENLABS_API_KEY && (
        <div className="bg-green-50 border-b border-green-200 px-4 py-2">
          <div className="flex items-center justify-center space-x-2 text-sm text-green-700">
            <Volume2 className="h-4 w-4" />
            <span>Voice responses enabled • AI will speak responses aloud</span>
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
              {messages.map((message) => (
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
                            {message.sender === 'ai' && isVoiceEnabled && !message.isLoading && (
                              <div className="flex items-center space-x-1">
                                {isPlayingAudio ? (
                                  <Volume2 className="h-3 w-3 text-green-600" />
                                ) : (
                                  <Volume2 className="h-3 w-3 text-gray-400" />
                                )}
                              </div>
                            )}
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              ))}

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
              onClick={toggleVoice}
              className={`p-3 rounded-full transition-all duration-200 ${
                isVoiceEnabled
                  ? 'bg-green-500 text-white hover:bg-green-600'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
              title={isVoiceEnabled ? 'Voice responses enabled - click to disable' : 'Voice responses disabled - click to enable'}
            >
              {isVoiceEnabled ? <Mic className="h-5 w-5" /> : <MicOff className="h-5 w-5" />}
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
              <div className={`w-2 h-2 rounded-full ${isVoiceEnabled ? 'bg-green-500' : 'bg-gray-400'}`}></div>
              <span>{isVoiceEnabled ? 'Voice ON' : 'Voice OFF'}</span>
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
                <span>Voice</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}