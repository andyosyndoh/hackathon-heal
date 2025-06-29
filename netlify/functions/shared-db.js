// Shared in-memory database for Netlify Functions
// This simulates a database that persists across function calls

// Global storage with better structure
global.healDB = global.healDB || {
  users: [],
  userProfiles: [],
  chatSessions: [],
  chatMessages: [],
  moodLogs: [],
  resources: [],
  initialized: false
};

// Initialize sample data if empty
function initializeSampleData() {
  if (!global.healDB.initialized) {
    console.log('Initializing sample data...');
    
    global.healDB.resources = [
      {
        id: '1',
        title: 'Understanding Anxiety: A Complete Guide',
        description: 'Learn about anxiety symptoms, triggers, and evidence-based coping strategies.',
        content: 'Anxiety is a natural response to stress, but when it becomes overwhelming, it can significantly impact your daily life. This comprehensive guide covers the different types of anxiety disorders, common symptoms like racing thoughts and physical tension, and practical coping strategies including breathing exercises, grounding techniques, and cognitive behavioral therapy approaches. You\'ll learn how to identify your personal anxiety triggers and develop a toolkit of healthy responses.\n\nKey Topics Covered:\n• Understanding anxiety disorders\n• Recognizing symptoms and triggers\n• Breathing and relaxation techniques\n• Cognitive behavioral therapy strategies\n• Building long-term coping skills\n• When to seek professional help',
        type: 'article',
        category: 'anxiety',
        difficulty: 'beginner',
        duration_minutes: 15,
        rating: 4.8,
        featured: true,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      },
      {
        id: '2',
        title: 'Guided Meditation for Depression',
        description: 'A 20-minute guided meditation specifically designed for managing depressive symptoms.',
        content: 'This meditation focuses on self-compassion and gentle awareness, helping you navigate difficult emotions with kindness. The session includes breathing exercises, body awareness, and loving-kindness practices specifically tailored for those experiencing depression. Regular practice can help improve mood, reduce negative self-talk, and build emotional resilience.\n\nWhat You\'ll Experience:\n• Gentle breathing exercises\n• Body awareness and relaxation\n• Self-compassion practices\n• Loving-kindness meditation\n• Techniques for managing difficult emotions\n• Building emotional resilience',
        type: 'audio',
        category: 'depression',
        difficulty: 'beginner',
        duration_minutes: 20,
        rating: 4.9,
        featured: true,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      },
      {
        id: '3',
        title: 'Cognitive Behavioral Therapy Techniques',
        description: 'Interactive exercises to help identify and change negative thought patterns.',
        content: 'CBT is one of the most effective treatments for depression and anxiety. This resource provides practical exercises for identifying cognitive distortions, challenging negative thoughts, and developing more balanced thinking patterns. Includes thought records, behavioral activation techniques, and homework assignments to practice between sessions.\n\nTechniques Included:\n• Thought record worksheets\n• Cognitive distortion identification\n• Behavioral activation strategies\n• Problem-solving techniques\n• Mood monitoring tools\n• Relapse prevention planning',
        type: 'exercise',
        category: 'depression',
        difficulty: 'intermediate',
        duration_minutes: 30,
        rating: 4.7,
        featured: false,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      },
      {
        id: 'kenya-befrienders',
        title: 'Befrienders Kenya',
        description: 'Provides emotional support to those in distress through confidential listening.',
        content: 'Befrienders Kenya offers 24/7 emotional support through trained volunteers who provide a safe space to talk about your feelings. They offer confidential telephone support for people experiencing emotional distress, depression, or suicidal thoughts. Services are free and available in English and Kiswahili.\n\nServices Include:\n• 24/7 telephone support\n• Confidential listening\n• Emotional support\n• Crisis intervention\n• Referrals to professional services\n\nContact Information:\nCall: +254 722 178 177\nEmail: info@befrienderskenya.org\nWebsite: www.befrienderskenya.org\n\nAvailable in English and Kiswahili. All services are free and confidential.',
        type: 'contact',
        category: 'Crisis Support',
        difficulty: 'Easy',
        duration_minutes: 5,
        rating: 4.8,
        featured: true,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      },
      {
        id: 'kenya-eplus',
        title: 'Emergency Plus Medical Services (E-Plus)',
        description: 'Offers ambulance and pre-hospital emergency medical services across Kenya.',
        content: 'E-Plus provides 24/7 emergency medical services including ambulance services, emergency medical care, and crisis intervention. They have trained medical professionals who can respond to mental health emergencies and provide immediate support while connecting you to appropriate mental health services.\n\nServices Include:\n• 24/7 emergency medical response\n• Ambulance services\n• Mental health crisis intervention\n• Pre-hospital emergency care\n• Medical emergency consultation\n• Referrals to mental health facilities\n\nContact Information:\nEmergency Line: +254 700 395 395\nAlternative: +254 733 395 395\nWebsite: www.eplus.co.ke\n\nNationwide coverage with trained medical professionals.',
        type: 'contact',
        category: 'Crisis Support',
        difficulty: 'Easy',
        duration_minutes: 5,
        rating: 4.7,
        featured: true,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }
    ];
    
    global.healDB.initialized = true;
    console.log('Sample data initialized with', global.healDB.resources.length, 'resources');
  }
}

// Database operations with better error handling and logging
const db = {
  // Users
  createUser: (userData) => {
    try {
      global.healDB.users.push(userData);
      console.log('Created user:', userData.email);
      return userData;
    } catch (error) {
      console.error('Error creating user:', error);
      throw error;
    }
  },
  
  findUserByEmail: (email) => {
    try {
      const user = global.healDB.users.find(user => user.email === email);
      console.log('Found user by email:', email, !!user);
      return user;
    } catch (error) {
      console.error('Error finding user by email:', error);
      return null;
    }
  },
  
  findUserById: (id) => {
    try {
      const user = global.healDB.users.find(user => user.id === id);
      console.log('Found user by ID:', id, !!user);
      return user;
    } catch (error) {
      console.error('Error finding user by ID:', error);
      return null;
    }
  },
  
  // User Profiles
  createUserProfile: (profileData) => {
    try {
      global.healDB.userProfiles.push(profileData);
      console.log('Created user profile for:', profileData.user_id);
      return profileData;
    } catch (error) {
      console.error('Error creating user profile:', error);
      throw error;
    }
  },
  
  // Chat Sessions
  createChatSession: (sessionData) => {
    try {
      global.healDB.chatSessions.push(sessionData);
      console.log('Created chat session:', sessionData.id, 'for user:', sessionData.user_id);
      return sessionData;
    } catch (error) {
      console.error('Error creating chat session:', error);
      throw error;
    }
  },
  
  findChatSession: (sessionId, userId) => {
    try {
      const session = global.healDB.chatSessions.find(session => 
        session.id === sessionId && session.user_id === userId
      );
      console.log('Found chat session:', sessionId, 'for user:', userId, !!session);
      return session;
    } catch (error) {
      console.error('Error finding chat session:', error);
      return null;
    }
  },
  
  getUserChatSessions: (userId, limit = 20, offset = 0) => {
    try {
      const sessions = global.healDB.chatSessions
        .filter(session => session.user_id === userId)
        .sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at))
        .slice(offset, offset + limit);
      console.log('Found', sessions.length, 'chat sessions for user:', userId);
      return sessions;
    } catch (error) {
      console.error('Error getting user chat sessions:', error);
      return [];
    }
  },
  
  updateChatSession: (sessionId, updates) => {
    try {
      const sessionIndex = global.healDB.chatSessions.findIndex(s => s.id === sessionId);
      if (sessionIndex !== -1) {
        global.healDB.chatSessions[sessionIndex] = {
          ...global.healDB.chatSessions[sessionIndex],
          ...updates
        };
        console.log('Updated chat session:', sessionId);
        return global.healDB.chatSessions[sessionIndex];
      }
      console.log('Chat session not found for update:', sessionId);
      return null;
    } catch (error) {
      console.error('Error updating chat session:', error);
      return null;
    }
  },
  
  // Chat Messages
  createChatMessage: (messageData) => {
    try {
      // Ensure metadata is a string
      if (typeof messageData.metadata !== 'string') {
        messageData.metadata = JSON.stringify(messageData.metadata || {});
      }
      
      global.healDB.chatMessages.push(messageData);
      console.log('Created chat message:', messageData.id, 'in session:', messageData.session_id, 'from:', messageData.sender_type);
      return messageData;
    } catch (error) {
      console.error('Error creating chat message:', error);
      throw error;
    }
  },
  
  getChatMessages: (sessionId, limit = 50, offset = 0) => {
    try {
      const messages = global.healDB.chatMessages
        .filter(message => message.session_id === sessionId)
        .sort((a, b) => new Date(a.created_at) - new Date(b.created_at))
        .slice(offset, offset + limit);
      console.log('Found', messages.length, 'messages for session:', sessionId);
      return messages;
    } catch (error) {
      console.error('Error getting chat messages:', error);
      return [];
    }
  },
  
  // Mood Logs
  createMoodLog: (moodData) => {
    try {
      global.healDB.moodLogs.push(moodData);
      console.log('Created mood log:', moodData.id, 'for user:', moodData.user_id, 'score:', moodData.mood_score);
      return moodData;
    } catch (error) {
      console.error('Error creating mood log:', error);
      throw error;
    }
  },
  
  getUserMoodLogs: (userId, days = 30) => {
    try {
      const cutoffDate = new Date();
      cutoffDate.setDate(cutoffDate.getDate() - days);
      
      const logs = global.healDB.moodLogs
        .filter(log => 
          log.user_id === userId && 
          new Date(log.created_at) > cutoffDate
        )
        .sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
      console.log('Found', logs.length, 'mood logs for user:', userId, 'in last', days, 'days');
      return logs;
    } catch (error) {
      console.error('Error getting user mood logs:', error);
      return [];
    }
  },
  
  // Resources
  getResources: (filters = {}) => {
    try {
      initializeSampleData();
      
      let resources = [...global.healDB.resources];
      
      if (filters.category && filters.category !== 'all') {
        resources = resources.filter(r => r.category.toLowerCase() === filters.category.toLowerCase());
      }
      
      if (filters.type && filters.type !== 'all') {
        resources = resources.filter(r => r.type.toLowerCase() === filters.type.toLowerCase());
      }
      
      if (filters.difficulty && filters.difficulty !== 'all') {
        resources = resources.filter(r => r.difficulty.toLowerCase() === filters.difficulty.toLowerCase());
      }
      
      // Sort by featured, then rating, then created date
      resources.sort((a, b) => {
        if (a.featured !== b.featured) return b.featured - a.featured;
        if (a.rating !== b.rating) return b.rating - a.rating;
        return new Date(b.created_at) - new Date(a.created_at);
      });
      
      const limit = filters.limit || 20;
      const offset = filters.offset || 0;
      
      const result = resources.slice(offset, offset + limit);
      console.log('Found', result.length, 'resources with filters:', filters);
      return result;
    } catch (error) {
      console.error('Error getting resources:', error);
      return [];
    }
  },
  
  // Stats
  getUserStats: (userId) => {
    try {
      const totalSessions = global.healDB.chatSessions.filter(s => s.user_id === userId).length;
      
      const userMoodLogs = global.healDB.moodLogs.filter(log => log.user_id === userId);
      const moodScore = userMoodLogs.length > 0 
        ? userMoodLogs.reduce((sum, log) => sum + log.mood_score, 0) / userMoodLogs.length 
        : 0;
      
      const daysActive = new Set(
        global.healDB.chatSessions
          .filter(s => s.user_id === userId)
          .map(s => s.created_at.split('T')[0])
      ).size;
      
      const stats = {
        currentStreak: Math.min(daysActive, 7),
        totalSessions,
        moodScore: parseFloat(moodScore.toFixed(1)),
        resourcesViewed: 0,
        daysActive
      };
      
      console.log('Generated stats for user:', userId, stats);
      return stats;
    } catch (error) {
      console.error('Error getting user stats:', error);
      return {
        currentStreak: 0,
        totalSessions: 0,
        moodScore: 0,
        resourcesViewed: 0,
        daysActive: 0
      };
    }
  },

  // Debug methods
  getDebugInfo: () => {
    return {
      users: global.healDB.users.length,
      chatSessions: global.healDB.chatSessions.length,
      chatMessages: global.healDB.chatMessages.length,
      moodLogs: global.healDB.moodLogs.length,
      resources: global.healDB.resources.length,
      initialized: global.healDB.initialized
    };
  }
};

module.exports = db;