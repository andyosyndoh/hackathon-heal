"use client";
import { DailyProvider } from "@daily-co/daily-react";
import { useEffect, useState } from 'react';

export default function DailyClientProvider({ children }: { children: React.ReactNode }) {
  const [isSupported, setIsSupported] = useState(true);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    
    // Check if WebRTC is supported
    const checkWebRTCSupport = () => {
      try {
        const isWebRTCSupported = !!(
          window.RTCPeerConnection ||
          (window as any).webkitRTCPeerConnection ||
          (window as any).mozRTCPeerConnection ||
          (window as any).RTCIceGatherer
        );
        
        // Additional check for getUserMedia
        const isGetUserMediaSupported = !!(
          navigator.mediaDevices && 
          navigator.mediaDevices.getUserMedia
        );
        
        setIsSupported(isWebRTCSupported && isGetUserMediaSupported);
      } catch (error) {
        console.warn('WebRTC support check failed:', error);
        setIsSupported(false);
      }
    };

    checkWebRTCSupport();
  }, []);

  // Don't render DailyProvider on server or if WebRTC is not supported
  if (!isClient || !isSupported) {
    return <>{children}</>;
  }

  try {
    return <DailyProvider>{children}</DailyProvider>;
  } catch (error) {
    console.warn('DailyProvider initialization failed:', error);
    return <>{children}</>;
  }
}