"use client";
import { DailyProvider } from "@daily-co/daily-react";

export default function DailyClientProvider({ children }: { children: React.ReactNode }) {
  return <DailyProvider>{children}</DailyProvider>;
}