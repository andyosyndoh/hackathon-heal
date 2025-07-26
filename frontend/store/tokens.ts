import { atom } from "jotai";

const getInitialToken = (): string | null => {
  if (typeof window !== 'undefined') {
    // First try to get from environment variable
    const envToken = process.env.NEXT_PUBLIC_TAVUS_API_KEY;
    if (envToken) {
      return envToken;
    }
    
    // Fallback to localStorage for backward compatibility
    const savedToken = localStorage.getItem('tavus-token');
    return savedToken || null;
  }
  return process.env.NEXT_PUBLIC_TAVUS_API_KEY || null;
};

export const apiTokenAtom = atom<string | null>(getInitialToken());
export const isValidatingTokenAtom = atom(false);
export const hasTokenAtom = atom((get) => get(apiTokenAtom) !== null);
export const setApiTokenAtom = atom(null, (_, set, token: string) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('tavus-token', token);
  }
  set(apiTokenAtom, token);
});
export const clearApiTokenAtom = atom(null, (_, set) => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('tavus-token');
  }
  set(apiTokenAtom, null);
});