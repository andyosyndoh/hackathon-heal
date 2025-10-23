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
  House,
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
          backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0.5)), url("/images/dashboard-bg.jpg")',
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
          heal-bg-primary heal-text-primary shadow-[4px_0_12px_rgba(0,0,0,0.1)]
          flex flex-col justify-between transition-transform duration-300 ease-in-out
          ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} 
          md:translate-x-0
        `}
      >

        <Image src="/images/decoration.png" alt="Decoration" 
                      className="absolute top-1/5 left-1/4 w-auto h-auto opacity-70 -rotate-12"
                      width={80}
                      height={80}
                      priority />
              <Image src="/images/decoration.png" alt="Decoration" 
                      className="absolute top-1/3 right-1/5 w-auto h-auto opacity-60 rotate-25"
                      width={70}
                      height={70}
                      priority />
              <Image src="/images/decoration.png" alt="Decoration" 
                      className="absolute bottom-1/3 left-1/2 w-auto h-auto opacity-50 -rotate-15"
                      width={90}
                      height={90}
                      priority />
              <Image src="/images/decoration.png" alt="Decoration" 
                      className="absolute bottom-1/4 right-1/3 w-auto h-auto opacity-70 rotate-15"
                      width={60}
                      height={60}
                      priority />
        {/* Header / Logo */}
        <div className="px-6 py-6 border-b" style={{borderColor: 'var(--heal-beige)'}}>
        <Image
          src="/images/logo.png"
          alt="Logo"
          width={150}
          height={150}
          className="mx-auto"
        />
          <h1 className="text-xl font-bold tracking-wide text-[#0B3C49] flex items-center justify-center gap-2">
            <span className="font-semibold">WELCOME TO</span>
            <span className="text-[#1E675B]">HEAL</span>
          </h1>
          <p className="text-xs text-center text-[#1E675B]/70 mt-1">Your Safe Space</p>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-5 py-6 space-y-2">
          <Link
            href="/"
            className="flex items-center text-sm font-semibold heal-text-secondary mb-4 hover:heal-text-light-teal transition-colors"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <House className="w-5 h-5 mr-3" /> Back Home
          </Link>

          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center px-4 py-3 rounded-xl transition-all duration-200 ${
                isActive(item.href)
                  ? 'heal-text-primary font-semibold shadow-inner'
                  : 'heal-text-secondary hover:heal-text-light-teal'
              }`}
              style={{
                backgroundColor: isActive(item.href) ? 'var(--heal-beige)' : 'transparent'
              }}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <item.icon className="w-5 h-5 mr-3" style={{color: 'var(--heal-light-teal)'}} />
              {item.name}
            </Link>
          ))}
        </nav>

        {/* Bottom Section */}
        <div className="px-5 pb-6 border-t" style={{borderColor: 'var(--heal-beige)'}}>
          <div className="space-y-2 text-sm">
            <Link
              href="/dashboard/profile"
              className={`flex items-center px-4 py-3 rounded-xl transition-all ${
                isActive('/dashboard/profile')
                  ? 'heal-text-primary'
                  : 'heal-text-secondary hover:heal-text-light-teal'
              }`}
              style={{
                backgroundColor: isActive('/dashboard/profile') ? 'var(--heal-beige)' : 'transparent'
              }}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <User className="w-5 h-5 mr-3" style={{color: 'var(--heal-light-teal)'}} />
              Profile
            </Link>

            <Link
              href="/dashboard/settings"
              className={`flex items-center px-4 py-3 rounded-xl transition-all ${
                isActive('/dashboard/settings')
                  ? 'heal-text-primary'
                  : 'heal-text-secondary hover:heal-text-light-teal'
              }`}
              style={{
                backgroundColor: isActive('/dashboard/settings') ? 'var(--heal-beige)' : 'transparent'
              }}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <Settings className="w-5 h-5 mr-3" style={{color: 'var(--heal-light-teal)'}} />
              Settings
            </Link>

            <button
              onClick={logout}
              className="w-full flex items-center px-4 py-3 rounded-xl text-red-600 hover:bg-red-50 transition-all"
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
