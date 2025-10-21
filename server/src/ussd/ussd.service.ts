import { Injectable } from '@nestjs/common';

interface UssdSession {
  phoneNumber: string;
  currentMenu: string;
  conversationHistory: string[];
  language: 'en' | 'sw';
}

@Injectable()
export class UssdService {
  private sessions: Map<string, UssdSession> = new Map();

  constructor() {}

  async handleSession(
    sessionId: string,
    phoneNumber: string,
    text: string,
  ): Promise<string> {
    // Initialize session if new
    if (!this.sessions.has(sessionId)) {
      this.sessions.set(sessionId, {
        phoneNumber,
        currentMenu: 'main',
        conversationHistory: [],
        language: 'en',
      });
    }

    const session = this.sessions.get(sessionId);
    const userInput = text.split('*').pop() || ''; // Get last input

    // Main menu (when text is empty, it's the first request)
    if (text === '') {
      return this.getMainMenu(session.language);
    }

    // Route based on user selection
    const level = text.split('*').length;

    if (level === 1) {
      return await this.handleMainMenuSelection(sessionId, userInput);
    } else {
      return await this.handleSubMenu(sessionId, text, userInput);
    }
  }

  private getMainMenu(language: 'en' | 'sw'): string {
    if (language === 'sw') {
      return `CON Habari! Mimi ni Nia - nafasi yako salama.

1. Ongea na Nia (AI Chat)
2. Pata Msaada Sasa (Crisis)
3. Jifunze kuhusu GBV
4. Mpango wa Usalama
5. Badilisha Lugha (English)`;
    }

    return `CON Habari! I'm Nia - your safe space for GBV support.

1. Talk to Nia (AI Chat)
2. Get Help Now (Crisis Resources)
3. Learn About GBV
4. Safety Planning
5. Change Language (Kiswahili)`;
  }

  private async handleMainMenuSelection(
    sessionId: string,
    selection: string,
  ): Promise<string> {
    const session = this.sessions.get(sessionId);

    switch (selection) {
      case '1':
        // Talk to Nia - AI Chat
        session.currentMenu = 'chat';
        return `CON I'm here to listen. What's on your mind?

(Reply with your message)`;

      case '2':
        // Crisis Resources
        return this.getCrisisResources(session.language);

      case '3':
        // Learn About GBV
        return this.getGBVInfo(session.language);

      case '4':
        // Safety Planning
        return this.getSafetyPlanning(session.language);

      case '5':
        // Change Language
        session.language = session.language === 'en' ? 'sw' : 'en';
        return this.getMainMenu(session.language);

      default:
        return `CON Invalid selection. Please try again.

${this.getMainMenu(session.language)}`;
    }
  }

  private async handleSubMenu(
    sessionId: string,
    fullText: string,
    userInput: string,
  ): Promise<string> {
    const session = this.sessions.get(sessionId);

    if (session.currentMenu === 'chat') {
      // User is chatting with Nia AI
      try {
        // Generate AI response for USSD
        const aiResponse = await this.generateNiaResponse(userInput);

        // Truncate response to fit USSD (max 182 chars per screen)
        const truncated = this.truncateForUssd(aiResponse);

        session.conversationHistory.push(
          `User: ${userInput}`,
          `Nia: ${truncated}`,
        );

        return `CON ${truncated}

Reply 0 to return to main menu
Or continue chatting:`;
      } catch (error) {
        return `END Sorry, I couldn't process that. Please try again later.`;
      }
    }

    // Handle other sub-menu navigation
    if (userInput === '0') {
      session.currentMenu = 'main';
      return this.getMainMenu(session.language);
    }

    return `END Thank you for using Nia. Stay safe.`;
  }

  private getCrisisResources(language: 'en' | 'sw'): string {
    if (language === 'sw') {
      return `END MSAADA WA HARAKA:

• Hotline ya GBV Kenya: 1195
• Polisi (Gender Desk): 999/112
• Afya ya Akili: 0800 720 990
• FIDA Kenya: 0800 720 187

Unaweza. Una nguvu. Una haki ya kupona.`;
    }

    return `END IMMEDIATE HELP:

• Kenya GBV Hotline: 1195 (24/7)
• Police Gender Desk: 999/112
• Mental Health: 0800 720 990
• FIDA Kenya: 0800 720 187
• COVAW: 0800 720 553

You deserve support. You're not alone.`;
  }

  private getGBVInfo(language: 'en' | 'sw'): string {
    if (language === 'sw') {
      return `END UFAHAMU WA GBV:

GBV ni unyanyasaji wowote kwa sababu ya jinsia. Ni pamoja na:
• Unyanyasaji wa kimwili
• Unyanyasaji wa kingono
• Unyanyasaji wa kihisia
• Udhibiti wa kiuchumi

KUMBUKA: Sio kosa lako. Una haki ya kupona.

Piga 1195 kwa msaada.`;
    }

    return `END UNDERSTANDING GBV:

Gender-Based Violence (GBV) is ANY harm based on gender. Includes:
• Physical abuse
• Sexual violence
• Emotional abuse
• Economic control

REMEMBER: It's NOT your fault. You deserve healing.

Call 1195 for support.`;
  }

  private getSafetyPlanning(language: 'en' | 'sw'): string {
    if (language === 'sw') {
      return `END MPANGO WA USALAMA:

1. Weka namba za dharura (1195, 999)
2. Fikiria mahali salama pa kwenda
3. Weka hati muhimu mahali salama
4. Ambia mtu unayemwamini
5. Panga ishara ya hatari na jirani

Usalama wako ni muhimu. Piga 1195.`;
    }

    return `END SAFETY PLANNING:

1. Save emergency numbers (1195, 999)
2. Identify safe places to go
3. Keep important documents safe
4. Tell someone you trust
5. Plan danger signal with neighbor

Your safety matters. Call 1195 for help.`;
  }

  private async generateNiaResponse(message: string): Promise<string> {
    const lowerMessage = message.toLowerCase();

    // Crisis responses
    const crisisKeywords = ['suicide', 'kill myself', 'hurt myself', 'rape', 'raped', 'assault', 'danger'];
    if (crisisKeywords.some(keyword => lowerMessage.includes(keyword))) {
      if (lowerMessage.includes('danger') || lowerMessage.includes('attack')) {
        return "Uko salama? Call 1195 or 999 NOW if in danger. I'm here with you.";
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
      return "I hear you. Your feelings make sense. Befrienders: +254 722 178 177. You have strength. Una nguvu.";
    }

    if (lowerMessage.includes('abuse') || lowerMessage.includes('violence') || lowerMessage.includes('hurt')) {
      return "I believe you. Not your fault. Kenya GBV Hotline: 1195. FIDA Kenya: 0800 720 187. Support is available.";
    }

    // Default supportive responses
    const responses = [
      "I'm here to listen without judgment. You're safe here. What's on your mind?",
      "I believe you. Whatever you share stays between us. How can I support you?",
      "Your feelings are valid. You don't have to go through this alone. Uko salama.",
      "Thank you for trusting me. Take your time - I'm here. What would help you right now?",
    ];

    return responses[Math.floor(Math.random() * responses.length)];
  }

  private truncateForUssd(text: string, maxLength: number = 160): string {
    if (text.length <= maxLength) return text;

    // Truncate at last complete sentence before maxLength
    const truncated = text.substring(0, maxLength);
    const lastPeriod = truncated.lastIndexOf('.');
    const lastQuestion = truncated.lastIndexOf('?');
    const lastExclamation = truncated.lastIndexOf('!');

    const lastSentenceEnd = Math.max(lastPeriod, lastQuestion, lastExclamation);

    if (lastSentenceEnd > 0) {
      return truncated.substring(0, lastSentenceEnd + 1);
    }

    return truncated + '...';
  }

  // Clean up old sessions (call this periodically)
  cleanupSessions() {
    // Sessions older than 1 hour
    const oneHourAgo = Date.now() - 60 * 60 * 1000;
    // In production, you'd track timestamps and clean up
    // For now, we'll let them expire naturally
  }
}
