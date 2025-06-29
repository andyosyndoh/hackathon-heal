'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Heart,
  MessageCircle,
  BookOpen,
  Phone,
  BarChart3,
  Settings,
  User,
  Bell,
  Shield,
  LogOut,
  Plus,
  TrendingUp,
  Calendar,
  Clock,
  Star,
  AlertTriangle,
  Loader2,
  Menu,
  X
} from 'lucide-react';
import Link from 'next/link';
import { useAuth } from '@/hooks/use-auth';
import { apiClient } from '@/lib/api';
import { MoodWidget } from '@/components/MoodWidget';

export default function DashboardPage() {
  const router = useRouter();
  const { user, isAuthenticated, isLoading: authLoading, logout } = useAuth();
  const [stats, setStats] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Redirect if not authenticated
  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push('/auth');
    }
  }, [isAuthenticated, authLoading, router]);

  // Load user stats
  useEffect(() => {
    const loadStats = async () => {
      if (!isAuthenticated) return;
      
      try {
        const response = await apiClient.getUserStats();
        if (response.data) {
          setStats(response.data);
        }
      } catch (error) {
        console.error('Failed to load stats:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadStats();
  }, [isAuthenticated]);

  const handleLogout = async () => {
    await logout();
    router.push('/');
  };

  const quickActions = [
    { 
      title: 'Start AI Chat', 
      description: 'Talk to your AI companion', 
      icon: MessageCircle, 
      href: '/chat',
      color: 'bg-blue-500',
      urgent: false
    },
    { 
      title: 'Track Mood', 
      description: 'Log your daily mood', 
      icon: BarChart3, 
      href: '/mood',
      color: 'bg-purple-500',
      urgent: false
    },
    { 
      title: 'Resource Library', 
      description: 'Browse self-help resources', 
      icon: BookOpen, 
      href: '/resources',
      color: 'bg-green-500',
      urgent: false
    },
    { 
      title: 'Crisis Support', 
      description: 'Get immediate help', 
      icon: Phone, 
      href: '/crisis',
      color: 'bg-red-500',
      urgent: true
    }
  ];

  if (authLoading || isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center mobile-container">
        <div className="flex items-center space-x-2">
          <Loader2 className="h-6 w-6 animate-spin text-blue-600" />
          <span className="text-gray-600 mobile-text-responsive">Loading dashboard...</span>
        </div>
      </div>
    );
  }

  if (!isAuthenticated || !user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 overflow-x-hidden">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b border-gray-200">
        <div className="mobile-container">
          <div className="flex justify-between items-center h-14 sm:h-16">
            <div className="flex items-center space-x-3 sm:space-x-4">
              <div className="flex items-center space-x-2">
                <Heart className="h-6 w-6 sm:h-8 sm:w-8 text-blue-600" />
                <span className="text-lg sm:text-xl font-bold text-gray-900">Heal</span>
              </div>
              <div className="hidden md:block">
                <span className="text-gray-500 text-sm sm:text-base">Dashboard</span>
              </div>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-3 sm:space-x-4">
              <button 
                className="mobile-touch-target text-gray-400 hover:text-gray-600 relative"
                aria-label="Notifications"
              >
                <Bell className="h-5 w-5" />
                <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
              </button>
              <button 
                className="mobile-touch-target text-gray-400 hover:text-gray-600"
                aria-label="Settings"
              >
                <Settings className="h-5 w-5" />
              </button>
              <div className="flex items-center space-x-2">
                <div className="w-6 h-6 sm:w-8 sm:h-8 bg-blue-500 rounded-full flex items-center justify-center">
                  <User className="h-3 w-3 sm:h-4 sm:w-4 text-white" />
                </div>
                <span className="text-sm font-medium text-gray-700">
                  {user.firstName}
                </span>
              </div>
              <button
                onClick={handleLogout}
                className="mobile-touch-target text-gray-400 hover:text-gray-600"
                aria-label="Logout"
              >
                <LogOut className="h-5 w-5" />
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden mobile-touch-target text-gray-600"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

          {/* Mobile Navigation Menu */}
          {isMobileMenuOpen && (
            <div className="md:hidden bg-white border-t border-gray-200 py-4">
              <div className="flex flex-col space-y-4">
                <div className="flex items-center space-x-3 px-4 py-2">
                  <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                    <User className="h-4 w-4 text-white" />
                  </div>
                  <span className="font-medium text-gray-700">{user.firstName}</span>
                </div>
                <button 
                  className="flex items-center space-x-3 px-4 py-2 text-gray-600 hover:text-gray-900 mobile-touch-target"
                  aria-label="Notifications"
                >
                  <Bell className="h-5 w-5" />
                  <span>Notifications</span>
                  <span className="ml-auto w-2 h-2 bg-red-500 rounded-full"></span>
                </button>
                <button 
                  className="flex items-center space-x-3 px-4 py-2 text-gray-600 hover:text-gray-900 mobile-touch-target"
                  aria-label="Settings"
                >
                  <Settings className="h-5 w-5" />
                  <span>Settings</span>
                </button>
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-3 px-4 py-2 text-gray-600 hover:text-gray-900 mobile-touch-target"
                  aria-label="Logout"
                >
                  <LogOut className="h-5 w-5" />
                  <span>Logout</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </nav>

      <div className="mobile-container py-6 sm:py-8">
        {/* Welcome Section */}
        <div className="mb-6 sm:mb-8">
          <h1 className="mobile-heading-responsive font-bold text-gray-900 mb-2">
            Welcome back, {user.firstName}!
          </h1>
          <p className="mobile-text-responsive text-gray-600">
            {stats ? (
              `You're on a ${stats.currentStreak || 0}-day streak. Keep up the great work on your mental health journey.`
            ) : (
              'Loading your progress...'
            )}
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 mb-6 sm:mb-8">
          <div className="heal-card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs sm:text-sm text-gray-600 mb-1">Current Streak</p>
                <p className="text-lg sm:text-2xl font-bold text-blue-600">{stats?.currentStreak || 0} days</p>
              </div>
              <div className="w-8 h-8 sm:w-12 sm:h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="h-4 w-4 sm:h-6 sm:w-6 text-blue-600" />
              </div>
            </div>
          </div>
          
          <div className="heal-card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs sm:text-sm text-gray-600 mb-1">Total Sessions</p>
                <p className="text-lg sm:text-2xl font-bold text-green-600">{stats?.totalSessions || 0}</p>
              </div>
              <div className="w-8 h-8 sm:w-12 sm:h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <MessageCircle className="h-4 w-4 sm:h-6 sm:w-6 text-green-600" />
              </div>
            </div>
          </div>
          
          <div className="heal-card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs sm:text-sm text-gray-600 mb-1">Mood Score</p>
                <p className="text-lg sm:text-2xl font-bold text-purple-600">{stats?.moodScore?.toFixed(1) || '0.0'}/10</p>
              </div>
              <div className="w-8 h-8 sm:w-12 sm:h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <Star className="h-4 w-4 sm:h-6 sm:w-6 text-purple-600" />
              </div>
            </div>
          </div>
          
          <div className="heal-card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs sm:text-sm text-gray-600 mb-1">Days Active</p>
                <p className="text-base sm:text-lg font-semibold text-gray-700">{stats?.daysActive || 0}</p>
              </div>
              <div className="w-8 h-8 sm:w-12 sm:h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                <Calendar className="h-4 w-4 sm:h-6 sm:w-6 text-gray-600" />
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
          {/* Quick Actions */}
          <div className="lg:col-span-2">
            <h2 className="mobile-heading-responsive font-semibold text-gray-900 mb-4 sm:mb-6">Quick Actions</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-6 sm:mb-8">
              {quickActions.map((action, index) => (
                <Link
                  key={index}
                  href={action.href}
                  className={`heal-card hover:shadow-lg transition-all duration-200 transform hover:scale-105 ${
                    action.urgent ? 'ring-2 ring-red-200 border-red-200' : ''
                  }`}
                >
                  <div className="flex items-center space-x-3 sm:space-x-4">
                    <div className={`w-10 h-10 sm:w-12 sm:h-12 ${action.color} rounded-lg flex items-center justify-center ${
                      action.urgent ? 'pulse-glow' : ''
                    }`}>
                      <action.icon className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-gray-900 mb-1 text-sm sm:text-base">{action.title}</h3>
                      <p className="text-xs sm:text-sm text-gray-600">{action.description}</p>
                      {action.urgent && (
                        <div className="flex items-center mt-2">
                          <AlertTriangle className="h-3 w-3 sm:h-4 sm:w-4 text-red-500 mr-1" />
                          <span className="text-xs text-red-600 font-medium">Available 24/7</span>
                        </div>
                      )}
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {/* Recent Activity Placeholder */}
            <h2 className="mobile-heading-responsive font-semibold text-gray-900 mb-4 sm:mb-6">Recent Activity</h2>
            <div className="heal-card">
              <p className="mobile-text-responsive text-gray-600 text-center py-6 sm:py-8">
                Your recent activities will appear here once you start using the platform.
              </p>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="space-y-4 sm:space-y-6">
            {/* Mood Widget */}
            <MoodWidget />

            {/* Today's Reminder */}
            <div className="heal-card">
              <h3 className="font-semibold text-gray-900 mb-4 text-sm sm:text-base">Today's Reminder</h3>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 sm:p-4">
                <p className="text-xs sm:text-sm text-blue-800 mb-2">
                  "Progress, not perfection, is the goal."
                </p>
                <p className="text-xs text-blue-600">
                  Take a moment to appreciate how far you've come.
                </p>
              </div>
            </div>

            {/* Upcoming */}
            <div className="heal-card">
              <h3 className="font-semibold text-gray-900 mb-4 text-sm sm:text-base">Upcoming</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 sm:w-8 sm:h-8 bg-green-100 rounded-lg flex items-center justify-center">
                    <Clock className="h-3 w-3 sm:h-4 sm:w-4 text-green-600" />
                  </div>
                  <div>
                    <p className="text-xs sm:text-sm font-medium text-gray-900">Mood Check-in</p>
                    <p className="text-xs text-gray-600">Daily reminder at 7:00 PM</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Privacy Status */}
            <div className="heal-card">
              <h3 className="font-semibold text-gray-900 mb-4 text-sm sm:text-base">Privacy & Security</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Shield className="h-3 w-3 sm:h-4 sm:w-4 text-green-600" />
                    <span className="text-xs sm:text-sm text-gray-700">End-to-End Encryption</span>
                  </div>
                  <span className="text-xs text-green-600 font-medium">Active</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Shield className="h-3 w-3 sm:h-4 sm:w-4 text-green-600" />
                    <span className="text-xs sm:text-sm text-gray-700">Data Anonymization</span>
                  </div>
                  <span className="text-xs text-green-600 font-medium">Active</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Shield className="h-3 w-3 sm:h-4 sm:w-4 text-green-600" />
                    <span className="text-xs sm:text-sm text-gray-700">HIPAA Compliant</span>
                  </div>
                  <span className="text-xs text-green-600 font-medium">Verified</span>
                </div>
              </div>
            </div>

            {/* Emergency Contact */}
            <div className="heal-card border-red-200 bg-red-50">
              <h3 className="font-semibold text-red-900 mb-2 text-sm sm:text-base">Emergency Support</h3>
              <p className="text-xs sm:text-sm text-red-700 mb-4">
                If you're having thoughts of self-harm or suicide, please reach out immediately.
              </p>
              <div className="space-y-2">
                <Link href="/crisis" className="block w-full bg-red-600 hover:bg-red-700 text-white text-center py-2 px-4 rounded-lg text-xs sm:text-sm font-medium transition-colors mobile-touch-target">
                  Get Crisis Support
                </Link>
                <p className="text-xs text-red-600 text-center">
                  Or call 988 (Suicide & Crisis Lifeline)
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}