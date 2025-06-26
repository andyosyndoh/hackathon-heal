import { atom } from "jotai";

const getInitialToken = (): string | null => {
  if (typeof window !== 'undefined') {
    const savedToken = 'd0f3f513305b489e8cd1ae7cd846ce0b';
    return savedToken || null;
  }
  return null;
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