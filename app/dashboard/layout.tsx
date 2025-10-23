'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { useAuth } from '@/hooks/use-auth';
import { 
  MessageCircle, 
  BarChart3, 
  BookOpen, 
  Phone, 
  Settings, 
  User, 
  LogOut,
  Menu,
  X
} from 'lucide-react';
import { useState, useEffect } from 'react';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const { logout } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  // Prevent hydration mismatch
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  const navItems = [
    { name: 'AI Chat', href: '/dashboard/chat', icon: MessageCircle },
    { name: 'Mood Tracker', href: '/dashboard/mood', icon: BarChart3 },
    { name: 'Resources', href: '/dashboard/resources', icon: BookOpen },
    { name: 'Crisis Support', href: '/dashboard/crisis', icon: Phone },
  ];

  const isActive = (href: string) => pathname === href;

  return (
    <div className="min-h-screen w-full">
      {/* Background Image */}
      <div 
        className="fixed inset-0 -z-10"
        style={{
          backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.9)), url("/images/dashboard-bg.jpg")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
          backgroundRepeat: 'no-repeat'
        }}
      />
      {/* Mobile menu button */}
      <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="md:hidden fixed top-4 left-4 z-50 p-2 rounded-md text-gray-700 hover:bg-gray-100"
      >
        {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar */}
      <aside
        className={`
          fixed inset-y-0 left-0 z-40 w-64 
          bg-[#FAEFD9] text-[#0B3C49] shadow-[4px_0_12px_rgba(0,0,0,0.1)]
          flex flex-col justify-between transition-transform duration-300 ease-in-out
          ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} 
          md:translate-x-0
        `}
      >
        {/* Header / Logo */}
        <div className="px-6 py-6 border-b border-[#E6DCC1]/70">
        <Image
          src="/images/logo.png"
          alt="Logo"
          width={150}
          height={150}
          className="mx-auto"
        />
          {/* <h1 className="text-xl font-bold tracking-wide text-[#0B3C49] flex items-center justify-center gap-2">
            <span className="font-semibold">WELCOME TO</span>
            <span className="text-[#1E675B]">HEAL</span>
          </h1>
          <p className="text-xs text-center text-[#1E675B]/70 mt-1">Your Safe Space</p> */}
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-5 py-6 space-y-2">
          <Link
            href="/"
            className="flex items-center text-sm font-semibold text-[#0B3C49]/80 mb-4 hover:text-[#1E675B] transition-colors"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            ← Back Home
          </Link>

          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center px-4 py-3 rounded-xl transition-all duration-200 ${
                isActive(item.href)
                  ? 'bg-[#C2BCAE]/60 text-[#0B3C49] font-semibold shadow-inner'
                  : 'hover:bg-[#F3EAD1]/80 hover:text-[#1E675B]'
              }`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <item.icon className="w-5 h-5 mr-3 text-[#1E675B]" />
              {item.name}
            </Link>
          ))}
        </nav>

        {/* Bottom Section */}
        <div className="px-5 pb-6 border-t border-[#E6DCC1]/70">
          <div className="space-y-2 text-sm">
            <Link
              href="/dashboard/profile"
              className={`flex items-center px-4 py-3 rounded-xl transition-all ${
                isActive('/dashboard/profile')
                  ? 'bg-[#C2BCAE]/60 text-[#0B3C49]'
                  : 'hover:bg-[#F3EAD1]/80 hover:text-[#1E675B]'
              }`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <User className="w-5 h-5 mr-3 text-[#1E675B]" />
              Profile
            </Link>

            <Link
              href="/dashboard/settings"
              className={`flex items-center px-4 py-3 rounded-xl transition-all ${
                isActive('/dashboard/settings')
                  ? 'bg-[#C2BCAE]/60 text-[#0B3C49]'
                  : 'hover:bg-[#F3EAD1]/80 hover:text-[#1E675B]'
              }`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <Settings className="w-5 h-5 mr-3 text-[#1E675B]" />
              Settings
            </Link>

            <button
              onClick={logout}
              className="w-full flex items-center px-4 py-3 rounded-xl text-[#A33C2F] hover:bg-[#FBE5E2] transition-all"
            >
              <LogOut className="w-5 h-5 mr-3" />
              Sign out
            </button>
          </div>

          {/* Get Full Access CTA */}
          {/* <div className="mt-6 text-center">
            <Link
              href="/auth/signup"
              className="inline-block text-sm font-semibold text-[#1E675B] hover:underline"
            >
              Get Full Access →
            </Link>
          </div> */}
        </div>
      </aside>


      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden md:ml-64 min-h-screen">
        <main className="flex-1 overflow-y-auto p-4 md:p-8 bg-transparent">
          {children}
        </main>
      </div>
    </div>
  );
}
