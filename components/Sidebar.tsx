
'use client';

import React, { useState, useRef, useEffect } from 'react';
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
  ChevronDown,
  Trophy,
  Image,
  Menu
} from 'lucide-react';
import NextImage from 'next/image';
import userImage from '@/public/images/heal-logo.png';
import { link } from 'fs';

interface SidebarProps {
  onToggle: (collapsed: boolean) => void;
  user: string;
}

const Sidebar: React.FC<SidebarProps> = ({ onToggle, user }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const sidebarRef = useRef<HTMLDivElement>(null);

  const navigationItems = [
    { icon: Home, label: 'Dashboard', active: true, hasSubmenu: true, link: '/dashboard' },
    { icon: Heart, label: 'Mood Tracker', link: '/mood' },
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

  const handleItemClick = (link: string, active: boolean) => {
    window.location.href = link;
    active = true;
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
                  <div 
                  className={`flex items-center justify-between px-3 py-2 rounded-lg cursor-pointer transition-colors ${item.active ? 'bg-gradient-to-r from-[#e2c68e] text-orange-800 shadow-sm' : 'text-gray-700 hover:bg-orange-50/40'}`}
                  onClick={() => handleItemClick(item?.link || '', item?.active || false)}
                  >
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

export default Sidebar;
