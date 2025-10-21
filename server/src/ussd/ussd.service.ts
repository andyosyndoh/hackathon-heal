import { Injectable } from '@nestjs/common';

// Define clear menu states for readability and type safety
type Menu =
  | 'language'
  | 'main'
  | 'chat'
  | 'report_phone'
  | 'report_location'
  | 'report_type';

interface UssdSession {
  phoneNumber: string;
  currentMenu: Menu;
  conversationHistory: string[];
  language: 'en' | 'sw' | null;
  reportData?: {
    phone?: string;
    location?: string;
    type?: string;
  };
}

@Injectable()
export class UssdService {
  private sessions: Map<string, UssdSession> = new Map();

  async handleSession(sessionId: string, phoneNumber: string, text: string): Promise<string> {
    // Initialize session if new
    if (!this.sessions.has(sessionId)) {
      this.sessions.set(sessionId, {
        phoneNumber,
        currentMenu: 'language',
        conversationHistory: [],
        language: null,
        reportData: {},
      });
    }

    const session = this.sessions.get(sessionId);
    const userInput = text.split('*').pop() || '';

    //  Language selection
    if (session.currentMenu === 'language') {
      if (text === '') {
        return `CON Welcome to HEAL - Your GBV Support Platform\n\n1. Continue in English\n2. Switch to Kiswahili`;
      }
      if (userInput === '1') {
        session.language = 'en';
        session.currentMenu = 'main';
        return this.getMainMenu('en');
      }
      if (userInput === '2') {
        session.language = 'sw';
        session.currentMenu = 'main';
        return this.getMainMenu('sw');
      }
      return `CON Invalid option.\n\n1. English\n2. Kiswahili`;
    }

    //  Main menu
    if (session.currentMenu === 'main') {
      if (userInput === '1') {
        session.currentMenu = 'chat';
        return `CON I'm Nia, your AI therapist.\nWhat's on your mind?`;
      }
      if (userInput === '2') {
        const response = this.getHelpResources(session.language);
        this.sessions.delete(sessionId); // Clean up session after END
        return response;
      }
      if (userInput === '3') {
        session.currentMenu = 'report_phone';
        return this.getPrompt(session.language, 'phone');
      }

      // Handle invalid input gracefully
      return `CON Invalid choice. Please try again.\n${this.getMainMenu(session.language)}`;
    }

    //  Report a case flow
    if (session.currentMenu === 'report_phone') {
      session.reportData.phone = userInput;
      session.currentMenu = 'report_location';
      return this.getPrompt(session.language, 'location');
    }

    if (session.currentMenu === 'report_location') {
      session.reportData.location = userInput;
      session.currentMenu = 'report_type';
      return this.getPrompt(session.language, 'type');
    }

    if (session.currentMenu === 'report_type') {
      session.reportData.type = userInput === '1' ? 'Physical' : 'Sexual';
      session.currentMenu = 'main';
      const response = this.getConfirmation(session.language);
      this.sessions.delete(sessionId); // Session cleanup
      return response;
    }

    // Chat flow
    if (session.currentMenu === 'chat') {
      if (userInput === '0') {
        session.currentMenu = 'main';
        return this.getMainMenu(session.language);
      }
      const aiResponse = await this.generateNiaResponse(userInput);
      return `CON ${this.truncateForUssd(aiResponse)}\n\nReply 0 to return to main menu`;
    }

    // Default fallback
    this.sessions.delete(sessionId);
    return `END Thank you for using HEAL. Stay safe.`;
  }

  //  Main menu (bilingual)
  private getMainMenu(lang: 'en' | 'sw'): string {
    if (lang === 'sw') {
      return `CON Karibu kwenye HEAL:\n\n1. Ongea na Nia (AI Msaidizi)\n2. Pata Msaada Sasa\n3. Ripoti Kisa`;
    }
    return `CON Main Menu:\n\n1. Chat with Nia (AI Therapist)\n2. Get Help Now\n3. Report a Case`;
  }

  //  Emergency resources
  private getHelpResources(lang: 'en' | 'sw'): string {
    if (lang === 'sw') {
      return `END MSAADA WA HARAKA:\n• Hotline ya GBV: 1195\n• Kituo cha Uokoaji: 0800 720 187\n• CHV Toll Free: 0800 720 553`;
    }
    return `END EMERGENCY HELP:\n• GBV Hotline: 1195\n• Rescue Center: 0800 720 187\n• CHV Toll-Free: 0800 720 553`;
  }

  // Prompts for report flow
  private getPrompt(lang: 'en' | 'sw', step: 'phone' | 'location' | 'type'): string {
    if (lang === 'sw') {
      if (step === 'phone') return `CON Tafadhali weka namba yako ya simu:`; 
      if (step === 'location') return `CON Weka eneo lako:`; 
      if (step === 'type') return `CON Aina ya unyanyasaji:\n1. Kimwili\n2. Kingono`;
    }
    if (step === 'phone') return `CON Please enter your phone number:`; 
    if (step === 'location') return `CON Enter your location:`; 
    if (step === 'type') return `CON Type of abuse:\n1. Physical\n2. Sexual`;
  }

  // Confirmation after reporting
  private getConfirmation(lang: 'en' | 'sw'): string {
    if (lang === 'sw') {
      return `END Asante kwa kuripoti. Timu yetu itawasiliana nawe hivi karibuni.`;
    }
    return `END Thank you for reporting. Our team will reach out soon.`;
  }

  // AI response with trauma-informed empathy
  private async generateNiaResponse(message: string): Promise<string> {
    const lowerMessage = message.toLowerCase();

    // Crisis detection
    const crisisKeywords = ['suicide', 'kill myself', 'hurt myself', 'rape', 'raped', 'assault', 'danger'];
    if (crisisKeywords.some(keyword => lowerMessage.includes(keyword))) {
      if (lowerMessage.includes('danger') || lowerMessage.includes('attack')) {
        return "Are you safe? Call 1195 or 999 NOW if in danger. I'm here with you.";
      }
      if (lowerMessage.includes('suicide') || lowerMessage.includes('kill myself')) {
        return "Your life has value. Kenya Mental Health: 0800 720 990. Befrienders: +254 722 178 177. You're not alone.";
      }
      return "I believe you. Not your fault. Kenya GBV Hotline: 1195 (24/7). You're not alone.";
    }

    // Emotion-based responses
    if (lowerMessage.includes('scared') || lowerMessage.includes('afraid')) {
      return "Your fear is valid. Safety first. Call 1195 if in danger. What would help you feel safer?";
    }

    if (lowerMessage.includes('sad') || lowerMessage.includes('depressed') || lowerMessage.includes('hopeless')) {
      return "I hear you. Your feelings make sense. Befrienders: +254 722 178 177. You have strength.";
    }

    if (lowerMessage.includes('abuse') || lowerMessage.includes('violence') || lowerMessage.includes('hurt')) {
      return "I believe you. Not your fault. Kenya GBV Hotline: 1195. FIDA Kenya: 0800 720 187. Support is available.";
    }

    // Default supportive responses
    const responses = [
      "I'm here to listen without judgment. You're safe here. What's on your mind?",
      "I believe you. Whatever you share stays between us. How can I support you?",
      "Your feelings are valid. You don't have to go through this alone.",
      "Thank you for trusting me. Take your time - I'm here. What would help you right now?",
    ];

    return responses[Math.floor(Math.random() * responses.length)];
  }

  // Keep USSD text short and readable
  private truncateForUssd(text: string, maxLength: number = 160): string {
    return text.length <= maxLength ? text : text.substring(0, maxLength - 3) + '...';
  }
}
