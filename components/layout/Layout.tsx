
import React from 'react';
import Sidebar from '../Sidebar';
import { useAuth } from '@/hooks/use-auth';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

interface LayoutProps {
  children: React.ReactNode;
  onToggle: (collapsed: boolean) => void;
  sidebarCollapsed: boolean;
}

function Layout({ children, onToggle, sidebarCollapsed }: LayoutProps) {

  const { user, isAuthenticated, isLoading: authLoading } = useAuth();
  const router = useRouter();

  // Redirect if not authenticated
    useEffect(() => {
      if (!authLoading && !isAuthenticated) {
        router.push('/auth');
      }
    }, [isAuthenticated, authLoading, router]);
    
  return (
    <div className="h-screen overflow-hidden bg-cover bg-center bg-no-repeat flex"
      style={{ backgroundImage: "linear-gradient(rgba(254, 240, 211, 0.3), rgba(254, 240, 211, 0.3)), url('/images/forestbg.jpg')" }}>

      <Sidebar onToggle={onToggle} user={user?.firstName || ''} />

      {/* Main Content Area */}
      <div className={`flex-1 transition-all duration-300 ease-in-out ${sidebarCollapsed ? 'ml-0' : 'ml-0'} relative`}>

        {/* Background overlay for readability */}
        <div className="absolute inset-0 bg-black/20 backdrop-blur-[0.5px]"></div>

        {/* Scrollable Content Container */}
        <div className="relative z-10 h-full overflow-y-auto">
          {children}
        </div>
      </div>
    </div>
  )
}

export default Layout;
