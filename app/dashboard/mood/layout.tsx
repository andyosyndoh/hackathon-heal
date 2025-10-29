"use client";
import { useState } from 'react';
import type { Metadata } from 'next';
import Layout from '@/components/layout/Layout';
import { useAuth } from '@/hooks/use-auth';

export default function MoodLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = useAuth();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const handleToggle = (collapsed: boolean) => {
    setSidebarCollapsed(collapsed);
  };

  return (
    <Layout
      // user={user || { firstName: '' }}
      onToggle={handleToggle}
      sidebarCollapsed={sidebarCollapsed}
    >
      {children}
    </Layout>
  );
}