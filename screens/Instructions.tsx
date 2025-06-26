import { createConversation } from "@/api/createConversation";
import {
  DialogWrapper,
  AnimatedTextBlockWrapper,
  StaticTextBlockWrapper,
} from "@/components/DialogWrapper";
import { screenAtom } from "@/store/screens";
import { conversationAtom } from "@/store/conversation";
import React, { useCallback, useMemo, useState } from "react";
import { useAtom, useAtomValue } from "jotai";
import { AlertTriangle, Mic, Video } from "lucide-react";
import { useDaily, useDailyEvent, useDevices } from "@daily-co/daily-react";
import { ConversationError } from "./ConversationError";
import { Button } from "@/components/ui/button";
import { apiTokenAtom } from "@/store/tokens";
import { quantum } from 'ldrs';

quantum.register();

const useCreateConversationMutation = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [, setScreenState] = useAtom(screenAtom);
  const [, setConversation] = useAtom(conversationAtom);
  const token = useAtomValue(apiTokenAtom);

  const createConversationRequest = async () => {
    console.log("token",apiTokenAtom)
    try {
      if (!token) {
        throw new Error("Token is required");
      }
      console.log("starting",token)
      const conversation = await createConversation(token);
      setConversation(conversation);
      setScreenState({ currentScreen: "conversation" });
    } catch (error) {
      setError(error as string);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    error,
    createConversationRequest,
  };
};

function hasDeviceId(obj: any): obj is MediaDeviceInfo {
  return obj && typeof obj.deviceId === 'string';
}

export function Instructions() {
  const daily = useDaily();
  const { currentMic, setMicrophone, setSpeaker } = useDevices();
  const { createConversationRequest } = useCreateConversationMutation();
  const [getUserMediaError, setGetUserMediaError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingConversation, setIsLoadingConversation] = useState(false);
  const [error, setError] = useState(false);
  const audio = useMemo(() => {
    if (typeof window !== 'undefined') {
      const audioObj = new Audio('/sounds/zoom.mp3');
      audioObj.volume = 0.7;
      return audioObj;
    }
    return null;
  }, []);
  const [isPlayingSound, setIsPlayingSound] = useState(false);

  useDailyEvent(
    "camera-error",
    useCallback(() => {
      setGetUserMediaError(true);
    }, []),
  );

  const handleClick = async () => {
    try {
      setIsLoading(true);
      setIsPlayingSound(true);
      if (audio) {
        audio.currentTime = 0;
        await audio.play();
      }
      await new Promise(resolve => setTimeout(resolve, 1000));
      setIsPlayingSound(false);
      setIsLoadingConversation(true);

      // Always prompt for permissions first
      try {
        await navigator.mediaDevices.getUserMedia({ audio: true, video: true });
        setGetUserMediaError(false);
      } catch {
        setGetUserMediaError(true);
        setIsLoading(false);
        setIsLoadingConversation(false);
        return;
      }

      // Now enumerate devices again or use Daily API
      let micDeviceId = currentMic?.device?.deviceId;
      if (!micDeviceId) {
        console.log('currentMic before startCamera:', currentMic);
        const res = await daily?.startCamera({
          startVideoOff: false,
          startAudioOff: false,
          audioSource: "default",
        });
        console.log('startCamera result:', res);
        const devices = await navigator.mediaDevices.enumerateDevices();
        const mics = devices.filter(d => d.kind === 'audioinput');
        micDeviceId = mics.length > 0 ? mics[0].deviceId : undefined;
        console.log('Selected mic deviceId:', micDeviceId);
      }
      
      if (micDeviceId) {
        await createConversationRequest();
      } else {
        setGetUserMediaError(true);
      }
    } catch (error) {
      setError(true);
    } finally {
      setIsLoading(false);
      setIsLoadingConversation(false);
    }
  };

  if (isPlayingSound || isLoadingConversation) {
    return (
      <DialogWrapper>
        <video
          src={"/video/gloria.mp4"}
          autoPlay
          muted
          loop
          playsInline
          className="fixed inset-0 h-full w-full object-cover"
        />
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" />
        <AnimatedTextBlockWrapper>
          <div className="flex flex-col items-center justify-center gap-4">
            <l-quantum size="45" speed="1.75" color="white"></l-quantum>
          </div>
        </AnimatedTextBlockWrapper>
      </DialogWrapper>
    );
  }

  if (error) {
    return <ConversationError onClick={handleClick} />;
  }

  return (
    <DialogWrapper>
      <video
        src={"/video/gloria.mp4"}
        autoPlay
        muted
        loop
        playsInline
        className="fixed inset-0 h-full w-full object-cover"
      />
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" />
      <AnimatedTextBlockWrapper>
        <h1 className="mb-4 pt-1 text-center text-3xl sm:text-4xl lg:text-5xl font-semibold">
          <span className="text-white">See AI?</span>{" "}
          <span style={{ color: '#9EEAFF' }}>Act Natural.</span>
        </h1>
        <p className="max-w-[650px] text-center text-base sm:text-lg text-gray-400 mb-12">
          Have a face-to-face conversation with an AI so real, it feels human—an intelligent agent ready to listen, respond, and act across countless use cases.
        </p>
        <Button
          onClick={handleClick}
          className="relative z-20 flex items-center justify-center gap-2 rounded-3xl border border-[rgba(255,255,255,0.3)] px-8 py-2 text-sm text-white transition-all duration-200 hover:text-primary mb-12 disabled:opacity-50"
          disabled={isLoading}
          style={{ height: '48px', transition: 'all 0.2s ease-in-out', backgroundColor: 'rgba(0,0,0,0.3)' }}
        >
          <Video className="size-5" />
          Start Video Chat
          {getUserMediaError && (
            <div className="absolute -top-1 left-0 right-0 flex items-center gap-1 text-wrap rounded-lg border bg-red-500 p-2 text-white backdrop-blur-sm">
              <AlertTriangle className="text-red size-4" />
              <p>
                To chat with the AI, please allow microphone access. Check your browser settings.
              </p>
            </div>
          )}
        </Button>
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:gap-8 text-gray-400 justify-center">
          <div className="flex items-center gap-3 bg-[rgba(0,0,0,0.2)] px-4 py-2 rounded-full">
            <Mic className="size-5 text-primary" />
            Mic access is required
          </div>
          <div className="flex items-center gap-3 bg-[rgba(0,0,0,0.2)] px-4 py-2 rounded-full">
            <Video className="size-5 text-primary" />
            Camera access is required
          </div>
        </div>
        <span className="absolute bottom-6 px-4 text-sm text-gray-500 sm:bottom-8 sm:px-8 text-center">
          By starting a conversation, I accept the{' '}
          <a href="#" className="text-primary hover:underline">Terms of Use</a> and acknowledge the{' '}
          <a href="#" className="text-primary hover:underline">Privacy Policy</a>.
        </span>
      </AnimatedTextBlockWrapper>
    </DialogWrapper>
  );
};

export const PositiveFeedback: React.FC = () => {
  return (
    <DialogWrapper>
      <AnimatedTextBlockWrapper>
        <StaticTextBlockWrapper
          imgSrc="/images/positive.png"
          title="Great Conversation!"
          titleClassName="sm:max-w-full bg-[linear-gradient(91deg,_#43BF8F_16.63%,_#FFF_86.96%)]"
          description="Thanks for the engaging discussion. Feel free to come back anytime for another chat!"
        />
      </AnimatedTextBlockWrapper>
    </DialogWrapper>
  );
};
