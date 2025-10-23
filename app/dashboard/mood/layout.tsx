import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Mood Tracker - Heal',
  description: 'Track your daily mood and emotional wellbeing with our comprehensive mood tracking system.',
};

export default function MoodLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}