import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY || '');

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export class GeminiService {
  private model: any;
  private chatHistory: ChatMessage[] = [];

  constructor() {
    if (process.env.NEXT_PUBLIC_GEMINI_API_KEY) {
      this.model = genAI.getGenerativeModel({ 
        model: 'gemini-1.5-flash',
        systemInstruction: `You are a compassionate AI mental health companion named Heal. Your role is to:

1. Provide empathetic, supportive responses to users experiencing mental health challenges
2. Use active listening techniques and validate emotions
3. Offer evidence-based coping strategies when appropriate
4. Maintain professional boundaries while being warm and understanding
5. Recognize crisis situations and guide users to professional help
6. Never provide medical diagnoses or replace professional therapy
7. Keep responses conversational, supportive, and under 150 words
8. Use person-first language and avoid stigmatizing terms

If a user expresses thoughts of self-harm or suicide, immediately provide crisis resources and encourage them to seek professional help.

Remember: You're here to support, not to diagnose or treat. Always encourage professional help when needed.`
      });
    }
  }

  async sendMessage(message: string): Promise<string> {
    if (!this.model) {
      throw new Error('Gemini API key not configured. Please set NEXT_PUBLIC_GEMINI_API_KEY in your environment variables.');
    }

    try {
      // Add user message to history
      this.chatHistory.push({
        role: 'user',
        content: message,
        timestamp: new Date()
      });

      // Create context from recent chat history (last 10 messages)
      const recentHistory = this.chatHistory.slice(-10);
      const contextMessages = recentHistory.map(msg => 
        `${msg.role === 'user' ? 'User' : 'Assistant'}: ${msg.content}`
      ).join('\n');

      const prompt = `Previous conversation context:\n${contextMessages}\n\nUser: ${message}\n\nAssistant:`;

      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();

      // Add assistant response to history
      this.chatHistory.push({
        role: 'assistant',
        content: text,
        timestamp: new Date()
      });

      return text;
    } catch (error) {
      console.error('Error generating AI response:', error);
      throw new Error('Failed to generate AI response. Please try again.');
    }
  }

  clearHistory() {
    this.chatHistory = [];
  }

  getHistory(): ChatMessage[] {
    return [...this.chatHistory];
  }
}

export class ElevenLabsService {
  private apiKey: string;
  
  // Voice configurations for different options
  private voiceConfigs = {
    female: {
      voiceId: 'EXAVITQu4vr4xnSDxMaL', // Bella - warm and empathetic female voice
      name: 'Bella',
      description: 'Warm, empathetic female voice'
    },
    male: {
      voiceId: 'pNInz6obpgDQGcFmaJgB', // Adam - calm and supportive male voice  
      name: 'Adam',
      description: 'Calm, supportive male voice'
    }
  };

  constructor() {
    this.apiKey = process.env.NEXT_PUBLIC_ELEVENLABS_API_KEY || '';
  }

  async textToSpeech(text: string, voiceId?: string | null): Promise<ArrayBuffer> {
    if (!this.apiKey) {
      throw new Error('ElevenLabs API key not configured. Please set NEXT_PUBLIC_ELEVENLABS_API_KEY in your environment variables.');
    }

    // Use provided voiceId or default to female voice
    const selectedVoiceId = voiceId || this.voiceConfigs.female.voiceId;

    try {
      const response = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${selectedVoiceId}`, {
        method: 'POST',
        headers: {
          'Accept': 'audio/mpeg',
          'Content-Type': 'application/json',
          'xi-api-key': this.apiKey,
        },
        body: JSON.stringify({
          text: text,
          model_id: 'eleven_monolingual_v1',
          voice_settings: {
            stability: 0.5,
            similarity_boost: 0.5,
            style: 0.3,
            use_speaker_boost: true
          }
        }),
      });

      if (!response.ok) {
        throw new Error(`ElevenLabs API error: ${response.status}`);
      }

      return await response.arrayBuffer();
    } catch (error) {
      console.error('Error generating speech:', error);
      throw new Error('Failed to generate speech. Please try again.');
    }
  }

  async playAudio(audioBuffer: ArrayBuffer): Promise<void> {
    return new Promise((resolve, reject) => {
      try {
        const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
        
        audioContext.decodeAudioData(audioBuffer, (buffer) => {
          const source = audioContext.createBufferSource();
          source.buffer = buffer;
          source.connect(audioContext.destination);
          
          source.onended = () => resolve();
          source.start(0);
        }, (error) => {
          reject(new Error('Failed to decode audio data'));
        });
      } catch (error) {
        reject(new Error('Failed to play audio'));
      }
    });
  }

  // Get available voice configurations
  getVoiceConfigs() {
    return this.voiceConfigs;
  }

  // Get voice info by type
  getVoiceInfo(voiceType: 'female' | 'male') {
    return this.voiceConfigs[voiceType];
  }
}

// Singleton instances
export const geminiService = new GeminiService();
export const elevenLabsService = new ElevenLabsService();