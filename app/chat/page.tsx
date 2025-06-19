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
  User
} from 'lucide-react';
import Link from 'next/link';

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'ai';
  timestamp: Date;
  mood?: string;
  type: 'text' | 'audio' | 'video';
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
  const [isSoundEnabled, setIsSoundEnabled] = useState(true);
  const [isVideoEnabled, setIsVideoEnabled] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputMessage,
      sender: 'user',
      timestamp: new Date(),
      type: 'text'
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: generateAIResponse(inputMessage),
        sender: 'ai',
        timestamp: new Date(),
        type: 'text'
      };
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const generateAIResponse = (userInput: string): string => {
    const responses = [
      "I understand how you're feeling. It takes courage to share what's on your mind. Can you tell me more about what's been bothering you?",
      "Thank you for opening up to me. Your feelings are completely valid. What would help you feel more supported right now?",
      "I'm here to listen without judgment. It sounds like you're going through a challenging time. How long have you been feeling this way?",
      "That sounds really difficult to deal with. You're not alone in this. What coping strategies have you tried before?",
      "I appreciate you trusting me with your feelings. Sometimes talking through our thoughts can help us process them better. What's one small thing that might help you feel a bit better today?"
    ];
    return responses[Math.floor(Math.random() * responses.length)];
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const toggleRecording = () => {
    setIsRecording(!isRecording);
    // Here you would implement actual voice recording functionality
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
                <p className="text-sm text-green-600">Online • Secure Session</p>
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setIsSoundEnabled(!isSoundEnabled)}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              title={isSoundEnabled ? 'Mute sounds' : 'Enable sounds'}
            >
              {isSoundEnabled ? 
                <Volume2 className="h-5 w-5 text-gray-600" /> : 
                <VolumeX className="h-5 w-5 text-gray-600" />
              }
            </button>
            <button
              onClick={() => setIsVideoEnabled(!isVideoEnabled)}
              className={`p-2 hover:bg-gray-100 rounded-lg transition-colors ${
                isVideoEnabled ? 'bg-blue-100 text-blue-600' : 'text-gray-600'
              }`}
              title={isVideoEnabled ? 'Disable video' : 'Enable video chat'}
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

      {/* Video Section (when enabled) */}
      {isVideoEnabled && (
        <div className="bg-gray-900 h-48 flex items-center justify-center">
          <div className="text-white text-center">
            <Video className="h-12 w-12 mx-auto mb-2 opacity-50" />
            <p className="text-sm opacity-75">AI Video Agent will appear here</p>
            <p className="text-xs opacity-50">Powered by Tavus AI</p>
          </div>
        </div>
      )}

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-6 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`flex items-start space-x-3 max-w-xs sm:max-w-md lg:max-w-lg ${
              message.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''
            }`}>
              {/* Avatar */}
              <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                message.sender === 'user' 
                  ? 'bg-blue-500' 
                  : 'bg-gradient-to-r from-blue-500 to-green-500'
              }`}>
                {message.sender === 'user' ? 
                  <User className="h-4 w-4 text-white" /> : 
                  <Bot className="h-4 w-4 text-white" />
                }
              </div>
              
              {/* Message Bubble */}
              <div className={`heal-chat-bubble ${
                message.sender === 'user' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-white text-gray-900 border border-gray-200'
              }`}>
                <p className="text-sm leading-relaxed">{message.content}</p>
                <p className={`text-xs mt-1 ${
                  message.sender === 'user' ? 'text-blue-100' : 'text-gray-500'
                }`}>
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
            </div>
          </div>
        ))}
        
        {/* Typing Indicator */}
        {isTyping && (
          <div className="flex justify-start">
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-green-500 flex items-center justify-center">
                <Bot className="h-4 w-4 text-white" />
              </div>
              <div className="heal-chat-bubble bg-white border border-gray-200">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              </div>
            </div>
          </div>
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

      {/* Input Area */}
      <div className="bg-white border-t border-gray-200 px-4 py-4">
        <div className="flex items-end space-x-3">
          <button
            onClick={toggleRecording}
            className={`p-3 rounded-full transition-all duration-200 ${
              isRecording 
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
            />
          </div>
          
          <button
            onClick={sendMessage}
            disabled={!inputMessage.trim()}
            className={`p-3 rounded-full transition-all duration-200 ${
              inputMessage.trim()
                ? 'bg-blue-600 text-white hover:bg-blue-700 transform hover:scale-105'
                : 'bg-gray-100 text-gray-400 cursor-not-allowed'
            }`}
            title="Send message"
          >
            <Send className="h-5 w-5" />
          </button>
        </div>
        
        {/* Quick Responses */}
        <div className="flex flex-wrap gap-2 mt-3">
          {['I need support', 'Feeling anxious', 'Having a hard day', 'Need coping strategies'].map((quickResponse, index) => (
            <button
              key={index}
              onClick={() => setInputMessage(quickResponse)}
              className="px-3 py-1 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm rounded-full transition-colors"
            >
              {quickResponse}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}