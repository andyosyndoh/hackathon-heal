import './globals.css';
import type { Metadata, Viewport } from 'next';
import localFont from 'next/font/local';
import DailyClientProvider from '@/components/DailyClientProvider';
import { FloatingBoltLogo } from '@/components/FloatingBoltLogo';

const acme = localFont({
  src: '../public/fonts/Acme-Regular.ttf',
  display: 'swap',
  variable: '--font-acme',
});

export const metadata: Metadata = {
  title: 'Heal - Mental Health Support Platform',
  description: 'Professional mental health support with AI-powered assistance, crisis management, and personalized care plans.',
  keywords: 'mental health, therapy, counseling, crisis support, AI therapy, emotional support',
  authors: [{ name: 'Heal Team' }],
  robots: 'index, follow',
  openGraph: {
    title: 'Heal - Mental Health Support Platform',
    description: 'Professional mental health support with AI-powered assistance',
    type: 'website',
    locale: 'en_US',
  },
  metadataBase: new URL('http://localhost:3000'), // or your production URL
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#3B82F6',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${acme.variable} scroll-smooth`}>
      <head>
        <meta name="application-name" content="Heal" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Heal" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <link rel='icon' type="image/png" href="/images/heal-logo.png" />
        <link rel="apple-touch-icon" href="/icon-192x192.png" />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body className="antialiased">
        <DailyClientProvider>
          <div id="root">
            {children}
            {/* <FloatingBoltLogo /> */}
          </div>
        </DailyClientProvider>
      </body>
    </html>
  );
}