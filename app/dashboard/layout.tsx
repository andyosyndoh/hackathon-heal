'use client';

import { useState } from 'react';
import { useAuth } from '@/hooks/use-auth';
import Layout from '@/components/layout/Layout';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = useAuth();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-gray-600">Loading...</div>
      </div>
    );
  }

  return (
    <Layout user={user} onToggle={setSidebarCollapsed} sidebarCollapsed={sidebarCollapsed}>
      {children}
    </Layout>
  );
}
