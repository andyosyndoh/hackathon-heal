import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Donate - Support Mental Health | Heal',
  description: 'Make transparent cryptocurrency donations to support mental health initiatives worldwide. Track your impact with blockchain technology.',
  keywords: 'donate, mental health, cryptocurrency, stellar, blockchain, transparency',
};

export default function DonateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}