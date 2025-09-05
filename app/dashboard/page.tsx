'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import {
  Heart,
  Home,
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
  ChevronDown,
  Trophy,
  Image,
  Menu
} from 'lucide-react';
import Link from 'next/link';
import NextImage from 'next/image';
import { useAuth } from '@/hooks/use-auth';
import { apiClient } from '@/lib/api';
import { MoodWidget } from '@/components/MoodWidget';
import userImage from '@/public/images/heal-logo.png';

export default function DashboardPage() {
  const router = useRouter();
  const { user, isAuthenticated, isLoading: authLoading, logout } = useAuth();
  const [stats, setStats] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

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
      <div className="h-screen bg-gray-50 bg-cover bg-center bg-no-repeat flexflex items-center justify-center" style={{ backgroundImage: "url('/images/forestbg.jpg')" }}>
        <div className="flex items-center space-x-2">
          <Loader2 className="h-5 w-5 sm:h-6 sm:w-6 animate-spin text-blue-600" />
          <span className="text-gray-600text-sm sm:text-base">Loading dashboard...</span>
        </div>
      </div>
    );
  }

  if (!isAuthenticated || !user) {
    return null;
  }

  return (
    <div className="h-screen overflow-hidden bg-cover bg-center bg-no-repeat flex"
      style={{ backgroundImage: "linear-gradient(rgba(254, 240, 211, 0.3), rgba(254, 240, 211, 0.3)), url('/images/forestbg.jpg')" }}>

      <Sidebar onToggle={setSidebarCollapsed} user={user.firstName} />

      {/* Main Content Area */}
      <div className={`flex-1 transition-all duration-300 ease-in-out ${sidebarCollapsed ? 'ml-0' : 'ml-0'} relative`}>

        {/* Background overlay for readability */}
        <div className="absolute inset-0 bg-black/20 backdrop-blur-[0.5px]"></div>

        {/* Scrollable Content Container */}
        <div className="relative z-10 h-full overflow-y-auto">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">

            {/* Welcome Section */}
            <div className="mb-6 sm:mb-8">
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-2 drop-shadow-lg">
                Welcome back, {user.firstName}!
              </h1>
              <p className="text-white/90 text-sm sm:text-base drop-shadow">
                {stats ? (
                  `You're on a ${stats.currentStreak || 0}-day streak. Keep up the great work on your mental health journey.`
                ) : (
                  'Loading your progress...'
                )}
              </p>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6 mb-6 sm:mb-8">
              <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-4 sm:p-6 shadow-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs sm:text-sm text-white/80 mb-1">Current Streak</p>
                    <p className="text-lg sm:text-2xl font-bold text-blue-300">{stats?.currentStreak || 0} days</p>
                  </div>
                  <div className="w-8 h-8 sm:w-12 sm:h-12 bg-blue-500/20 rounded-lg flex items-center justify-center">
                    <TrendingUp className="h-4 w-4 sm:h-6 sm:w-6 text-blue-300" />
                  </div>
                </div>
              </div>

              <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-4 sm:p-6 shadow-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs sm:text-sm text-white/80 mb-1">Total Sessions</p>
                    <p className="text-lg sm:text-2xl font-bold text-green-300">{stats?.totalSessions || 0}</p>
                  </div>
                  <div className="w-8 h-8 sm:w-12 sm:h-12 bg-green-500/20 rounded-lg flex items-center justify-center">
                    <MessageCircle className="h-4 w-4 sm:h-6 sm:w-6 text-green-300" />
                  </div>
                </div>
              </div>

              <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-4 sm:p-6 shadow-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs sm:text-sm text-white/80 mb-1">Mood Score</p>
                    <p className="text-lg sm:text-2xl font-bold text-purple-300">{stats?.moodScore?.toFixed(1) || '0.0'}/10</p>
                  </div>
                  <div className="w-8 h-8 sm:w-12 sm:h-12 bg-purple-500/20 rounded-lg flex items-center justify-center">
                    <Star className="h-4 w-4 sm:h-6 sm:w-6 text-purple-300" />
                  </div>
                </div>
              </div>

              <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-4 sm:p-6 shadow-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs sm:text-sm text-white/80 mb-1">Days Active</p>
                    <p className="text-base sm:text-lg font-semibold text-white">{stats?.daysActive || 0}</p>
                  </div>
                  <div className="w-8 h-8 sm:w-12 sm:h-12 bg-white/20 rounded-lg flex items-center justify-center">
                    <Calendar className="h-4 w-4 sm:h-6 sm:w-6 text-white" />
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
              {/* Quick Actions */}
              <div className="lg:col-span-2">
                <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 sm:mb-6 drop-shadow">Quick Actions</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-6 sm:mb-8">
                  {quickActions.map((action, index) => (
                    <Link
                      key={index}
                      href={action.href}
                      className={`bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-4 sm:p-6 hover:bg-white/20 transition-all duration-200 transform hover:scale-105 shadow-lg ${action.urgent ? 'ring-2 ring-red-400/50 border-red-300/50' : ''
                        }`}
                    >
                      <div className="flex items-center space-x-3 sm:space-x-4">
                        <div className={`w-10 h-10 sm:w-12 sm:h-12 ${action.color} rounded-lg flex items-center justify-center shadow-lg ${action.urgent ? 'pulse-glow' : ''
                          }`}>
                          <action.icon className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-white mb-1 text-sm sm:text-base drop-shadow">{action.title}</h3>
                          <p className="text-xs sm:text-sm text-white/80">{action.description}</p>
                          {action.urgent && (
                            <div className="flex items-center mt-2">
                              <AlertTriangle className="h-3 w-3 sm:h-4 sm:w-4 text-red-300 mr-1" />
                              <span className="text-xs text-red-300 font-medium">Available 24/7</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>

                {/* Recent Activity */}
                <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 sm:mb-6 drop-shadow">Recent Activity</h2>
                <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-4 sm:p-6 shadow-lg">
                  <p className="text-white/80 text-center py-6 sm:py-8 text-sm sm:text-base">
                    Your recent activities will appear here once you start using the platform.
                  </p>
                </div>
              </div>

              {/* Right Sidebar */}
              <div className="space-y-4 sm:space-y-6">
                {/* Mood Widget */}
                <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-4 sm:p-6 shadow-lg">
                  <MoodWidget />
                </div>

                {/* Today's Reminder */}
                <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-4 sm:p-6 shadow-lg">
                  <h3 className="font-semibold text-white mb-3 sm:mb-4 text-sm sm:text-base drop-shadow">Today's Reminder</h3>
                  <div className="bg-blue-500/20 border border-blue-400/30 rounded-lg p-3 sm:p-4">
                    <p className="text-xs sm:text-sm text-blue-200 mb-2">
                      "Progress, not perfection, is the goal."
                    </p>
                    <p className="text-xs text-blue-300">
                      Take a moment to appreciate how far you've come.
                    </p>
                  </div>
                </div>

                {/* Upcoming */}
                <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-4 sm:p-6 shadow-lg">
                  <h3 className="font-semibold text-white mb-3 sm:mb-4 text-sm sm:text-base drop-shadow">Upcoming</h3>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <div className="w-6 h-6 sm:w-8 sm:h-8 bg-green-500/20 rounded-lg flex items-center justify-center">
                        <Clock className="h-3 w-3 sm:h-4 sm:w-4 text-green-300" />
                      </div>
                      <div>
                        <p className="text-xs sm:text-sm font-medium text-white">Mood Check-in</p>
                        <p className="text-xs text-white/70">Daily reminder at 7:00 PM</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Privacy Status */}
                <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-4 sm:p-6 shadow-lg">
                  <h3 className="font-semibold text-white mb-3 sm:mb-4 text-sm sm:text-base drop-shadow">Privacy & Security</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Shield className="h-3 w-3 sm:h-4 sm:w-4 text-green-300" />
                        <span className="text-xs sm:text-sm text-white/90">End-to-End Encryption</span>
                      </div>
                      <span className="text-xs text-green-300 font-medium">Active</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Shield className="h-3 w-3 sm:h-4 sm:w-4 text-green-300" />
                        <span className="text-xs sm:text-sm text-white/90">Data Anonymization</span>
                      </div>
                      <span className="text-xs text-green-300 font-medium">Active</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Shield className="h-3 w-3 sm:h-4 sm:w-4 text-green-300" />
                        <span className="text-xs sm:text-sm text-white/90">HIPAA Compliant</span>
                      </div>
                      <span className="text-xs text-green-300 font-medium">Verified</span>
                    </div>
                  </div>
                </div>

                {/* Emergency Contact */}
                <div className="bg-red-500/20 backdrop-blur-md border border-red-400/30 rounded-xl p-4 sm:p-6 shadow-lg">
                  <h3 className="font-semibold text-red-200 mb-2 text-sm sm:text-base drop-shadow">Emergency Support</h3>
                  <p className="text-xs sm:text-sm text-red-300 mb-3 sm:mb-4">
                    If you're having thoughts of self-harm or suicide, please reach out immediately.
                  </p>
                  <div className="space-y-2">
                    <Link href="/crisis" className="block w-full bg-red-600 hover:bg-red-700 text-white text-center py-2 px-3 sm:px-4 rounded-lg text-xs sm:text-sm font-medium transition-colors shadow-lg">
                      Get Crisis Support
                    </Link>
                    <p className="text-xs text-red-300 text-center">
                      Or call 999 (Suicide & Crisis Lifeline)
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

interface SidebarProps {
  onToggle: (collapsed: boolean) => void;
  user: string;
}

const Sidebar: React.FC<SidebarProps> = ({ onToggle, user }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const sidebarRef = useRef<HTMLDivElement>(null);

  const navigationItems = [
    { icon: Home, label: 'Dashboard', active: true, hasSubmenu: true },
    { icon: Heart, label: 'Mood Tracker' },
    { icon: BarChart3, label: 'Report' },
    { icon: BookOpen, label: 'Resources' },
    { icon: Bell, label: 'Notifications' },
    { icon: Settings, label: 'Settings' }

  ];

  const dashboardSubItems = [
    { icon: Shield, label: 'Safe Space' },
    { icon: MessageCircle, label: 'Anonymous Chat' },
    { icon: Trophy, label: 'Champions' }
  ];

  const chatHistory = [
    'GBV Signs...',
    'All Is Said...'
  ];

  // Handle clicks outside sidebar
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target as Node)) {
        setIsCollapsed(true);
        onToggle(true);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onToggle]);

  const toggleSidebar = () => {
    const newCollapsed = !isCollapsed;
    setIsCollapsed(newCollapsed);
    onToggle(newCollapsed);
  };

  return (
    <div className="flex relative z-20">
      {/* Toggle Button for collapsed state */}
      {isCollapsed && (
        <button
          onClick={toggleSidebar}
          className="fixed top-4 left-4 z-50 p-2 bg-white/20 backdrop-blur-sm hover:bg-white/30 rounded-lg shadow-lg transition-colors"
        >
          <Menu size={20} className="text-white" />
        </button>
      )}

      {/* Sidebar */}
      <div
        ref={sidebarRef}
        className={`${isCollapsed ? 'w-0' : 'w-64'
          } h-screen relative flex flex-col shadow-2xl transition-all duration-300 ease-in-out overflow-hidden`}
      >
        {/* Main sidebar content with gradient background */}
        <div className="absolute w-[13rem] h-full inset-0 bg-[#FEF0D3]"></div>

        {/* All-around fade overlay with rounded effect */}
        <div className="absolute inset-0">
          <div className="absolute top-0 bottom-0 right-0 w-12 bg-gradient-to-r from-[#FEF0D3] pointer-events-none"></div>
        </div>

        {/* Sidebar content */}
        <div className="relative z-10 flex flex-col h-full">
          {/* Header with toggle button */}
          <div className="flex items-center justify-between p-4">
            <div className={`flex items-center space-x-3 transition-opacity duration-300 ${isCollapsed ? 'opacity-0' : 'opacity-100'}`}>
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-400 to-red-500 flex items-center justify-center shadow-lg">
                <span className="text-white font-semibold text-sm">{user.charAt(0).toUpperCase()}</span>
              </div>
              <div>
                <p className="text-xs text-gray-600 font-medium">WELCOME TO HEAL</p>
                <p className="text-sm font-semibold text-gray-800">{user}</p>
              </div>
            </div>
            <button
              onClick={toggleSidebar}
              className="p-1 hover:bg-orange-100/50 rounded transition-colors"
            >
              <Menu size={18} className="text-gray-600" />
            </button>
          </div>

          {/* Navigation Menu */}
          <nav className={`flex-1 py-4 transition-opacity duration-300 ${isCollapsed ? 'opacity-0' : 'opacity-100'}`}>
            <ul className="space-y-1 px-3">
              {navigationItems.map((item, index) => (
                <li key={index}>
                  <div className={`flex items-center justify-between px-3 py-2 rounded-lg cursor-pointer transition-colors ${item.active ? 'bg-gradient-to-r from-[#e2c68e] text-orange-800 shadow-sm' : 'text-gray-700 hover:bg-orange-50/40'
                    }`}>
                    <div className="flex items-center space-x-3">
                      <item.icon size={18} />
                      <span className="text-sm font-medium">{item.label}</span>
                    </div>
                    {item.hasSubmenu && <ChevronDown size={16} className="text-gray-500" />}
                  </div>

                  {/* Dashboard Submenu */}
                  {item.active && item.hasSubmenu && (
                    <ul className="ml-6 mt-2 space-y-1">
                      {dashboardSubItems.map((subItem, subIndex) => (
                        <li key={subIndex}>
                          <div className="flex items-center space-x-3 px-3 py-2 text-sm text-gray-600 hover:text-orange-600 cursor-pointer transition-colors rounded-md hover:bg-orange-50/30">
                            <subItem.icon size={16} />
                            <span>{subItem.label}</span>
                          </div>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>

            {/* Chat History Section */}
            <div className="mt-8 px-3">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide">Chat History</h3>
                <Plus size={16} className="text-gray-500 cursor-pointer hover:text-orange-600 transition-colors" />
              </div>

              <ul className="space-y-2">
                {chatHistory.map((chat, index) => (
                  <li key={index} className="px-3 py-2 text-sm text-gray-600 hover:bg-orange-50/40 rounded-lg cursor-pointer transition-colors">
                    {chat}
                  </li>
                ))}
              </ul>
            </div>
          </nav>

          {/* Media Section */}
          <div className={`px-3 py-4 transition-opacity duration-300 ${isCollapsed ? 'opacity-0' : 'opacity-100'}`}>
            <div className="flex items-center space-x-3 px-3 py-2 text-gray-700 hover:bg-orange-50/40 rounded-lg cursor-pointer transition-colors">
              <Image size={18} />
              <span className="text-sm font-medium">Media</span>
            </div>
          </div>

          {/* Logout Section */}
          <div className={`p-3 pr-7 flex h-20 justify-between items-center transition-opacity duration-300 ${isCollapsed ? 'opacity-0' : 'opacity-100'}`}>
            <div className="flex items-center space-x-3 px-3 py-2 text-gray-700 hover:bg-red-50/40 hover:text-red-600 rounded-lg cursor-pointer transition-colors">
              <LogOut size={18} />
              <span className="text-sm font-medium">Logout</span>
            </div>
            <div>
              <NextImage src={userImage} alt="User" width={40} height={40} className="rounded-full" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};