import { atom } from "jotai";

interface Settings {
  name: string;
  language: string;
  interruptSensitivity: string;
  greeting: string;
  context: string;
  persona: string;
  replica: string;
}

const getInitialSettings = (): Settings => {
  if (typeof window !== 'undefined') {
    const savedSettings = localStorage.getItem('tavus-settings');
    if (savedSettings) {
      return JSON.parse(savedSettings);
    }
  }
  return {
    name: "",
    language: "en",
    interruptSensitivity: "medium",
    greeting: "",
    context: "",
    persona: "p6efee2a4ee3",
    replica: "r6ca16dbe104",
  };
};

export const settingsAtom = atom<Settings>(getInitialSettings());
export const settingsSavedAtom = atom<boolean>(false); 