// Shared in-memory database for Netlify Functions
// This simulates a database that persists across function calls

// Global storage
global.healDB = global.healDB || {
  users: [],
  userProfiles: [],
  chatSessions: [],
  chatMessages: [],
  moodLogs: [],
  resources: []
};

// Initialize sample data if empty
function initializeSampleData() {
  if (global.healDB.resources.length === 0) {
    global.healDB.resources = [
      {
        id: '1',
        title: 'Understanding Anxiety: A Complete Guide',
        description: 'Learn about anxiety symptoms, triggers, and evidence-based coping strategies.',
        content: 'Anxiety is a natural response to stress, but when it becomes overwhelming, it can significantly impact your daily life. This comprehensive guide covers the different types of anxiety disorders, common symptoms like racing thoughts and physical tension, and practical coping strategies including breathing exercises, grounding techniques, and cognitive behavioral therapy approaches.',
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
        content: 'This meditation focuses on self-compassion and gentle awareness, helping you navigate difficult emotions with kindness. The session includes breathing exercises, body awareness, and loving-kindness practices specifically tailored for those experiencing depression.',
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
        id: 'kenya-befrienders',
        title: 'Befrienders Kenya',
        description: 'Provides emotional support to those in distress through confidential listening.',
        content: 'Befrienders Kenya offers 24/7 emotional support through trained volunteers who provide a safe space to talk about your feelings. Call: +254 722 178 177 for free confidential support.',
        type: 'contact',
        category: 'Crisis Support',
        difficulty: 'Easy',
        duration_minutes: 5,
        rating: 4.8,
        featured: true,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }
    ];
  }
}

// Database operations
const db = {
  // Users
  createUser: (userData) => {
    global.healDB.users.push(userData);
    return userData;
  },
  
  findUserByEmail: (email) => {
    return global.healDB.users.find(user => user.email === email);
  },
  
  findUserById: (id) => {
    return global.healDB.users.find(user => user.id === id);
  },
  
  // User Profiles
  createUserProfile: (profileData) => {
    global.healDB.userProfiles.push(profileData);
    return profileData;
  },
  
  // Chat Sessions
  createChatSession: (sessionData) => {
    global.healDB.chatSessions.push(sessionData);
    return sessionData;
  },
  
  findChatSession: (sessionId, userId) => {
    return global.healDB.chatSessions.find(session => 
      session.id === sessionId && session.user_id === userId
    );
  },
  
  getUserChatSessions: (userId, limit = 20, offset = 0) => {
    return global.healDB.chatSessions
      .filter(session => session.user_id === userId)
      .sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at))
      .slice(offset, offset + limit);
  },
  
  updateChatSession: (sessionId, updates) => {
    const sessionIndex = global.healDB.chatSessions.findIndex(s => s.id === sessionId);
    if (sessionIndex !== -1) {
      global.healDB.chatSessions[sessionIndex] = {
        ...global.healDB.chatSessions[sessionIndex],
        ...updates
      };
      return global.healDB.chatSessions[sessionIndex];
    }
    return null;
  },
  
  // Chat Messages
  createChatMessage: (messageData) => {
    global.healDB.chatMessages.push(messageData);
    return messageData;
  },
  
  getChatMessages: (sessionId, limit = 50, offset = 0) => {
    return global.healDB.chatMessages
      .filter(message => message.session_id === sessionId)
      .sort((a, b) => new Date(a.created_at) - new Date(b.created_at))
      .slice(offset, offset + limit);
  },
  
  // Mood Logs
  createMoodLog: (moodData) => {
    global.healDB.moodLogs.push(moodData);
    return moodData;
  },
  
  getUserMoodLogs: (userId, days = 30) => {
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - days);
    
    return global.healDB.moodLogs
      .filter(log => 
        log.user_id === userId && 
        new Date(log.created_at) > cutoffDate
      )
      .sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
  },
  
  // Resources
  getResources: (filters = {}) => {
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
    
    return resources.slice(offset, offset + limit);
  },
  
  // Stats
  getUserStats: (userId) => {
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
    
    return {
      currentStreak: Math.min(daysActive, 7),
      totalSessions,
      moodScore: parseFloat(moodScore.toFixed(1)),
      resourcesViewed: 0,
      daysActive
    };
  }
};

module.exports = db;