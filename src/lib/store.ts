import { create } from "zustand";
import type { BookId } from "@/lib/portfolio-data";

export type Phase = "boot" | "door" | "entering" | "room";
export type Focus = "overview" | "bookshelf" | "desk" | "window" | "bed";
export type Mood = "golden" | "night" | "storm";
export type Quality = "high" | "low";

type Store = {
  phase: Phase;
  loadProgress: number;
  focus: Focus;
  transitioning: boolean;
  doorOpen: boolean;
  curtainsOpen: boolean;
  openBook: BookId | null;
  desktopOpen: boolean;
  desktopApp: string | null;
  mood: Mood;
  lampOn: boolean;
  rain: boolean;
  muted: boolean;
  hovered: string | null;
  hint: string;
  introTitle: boolean;
  monitorsOn: boolean;
  wallpaper: number;
  globeClicks: number;
  booksEnchanted: boolean;
  quality: Quality;
  reduceMotion: boolean;
  isMobile: boolean;
  setPhase: (phase: Phase) => void;
  setProgress: (n: number) => void;
  setFocus: (focus: Focus) => void;
  setTransitioning: (v: boolean) => void;
  openTheDoor: () => void;
  setBook: (id: BookId | null) => void;
  setDesktop: (open: boolean, app?: string | null) => void;
  setMood: (mood: Mood) => void;
  toggleLamp: () => void;
  toggleRain: () => void;
  toggleMute: () => void;
  toggleCurtains: () => void;
  setCurtains: (open: boolean) => void;
  setHovered: (id: string | null, hint?: string) => void;
  setIntroTitle: (v: boolean) => void;
  cycleWallpaper: () => void;
  tapGlobe: () => void;
  hydrate: () => void;
};

export const useWorld = create<Store>((set, get) => ({
  phase: "boot",
  loadProgress: 0,
  focus: "overview",
  transitioning: false,
  doorOpen: false,
  curtainsOpen: true,
  openBook: null,
  desktopOpen: false,
  desktopApp: null,
  mood: "golden",
  lampOn: true,
  rain: false,
  muted: false,
  hovered: null,
  hint: "",
  introTitle: false,
  monitorsOn: false,
  wallpaper: 0,
  globeClicks: 0,
  booksEnchanted: false,
  quality: "low",
  reduceMotion: false,
  isMobile: false,
  setPhase: (phase) => set({ phase }),
  setProgress: (loadProgress) => set({ loadProgress }),
  setFocus: (focus) =>
    set({
      focus,
      monitorsOn: focus === "desk" || get().desktopOpen,
    }),
  setTransitioning: (transitioning) => set({ transitioning }),
  openTheDoor: () => {
    if (get().phase !== "door") return;
    set({ phase: "entering", doorOpen: true, introTitle: true });
  },
  setBook: (openBook) =>
    set({
      openBook,
      focus: openBook ? "bookshelf" : get().focus,
    }),
  setDesktop: (desktopOpen, app) =>
    set({
      desktopOpen,
      desktopApp: app === undefined ? get().desktopApp : app,
      monitorsOn: desktopOpen || get().focus === "desk",
      focus: desktopOpen ? "desk" : get().focus,
    }),
  setMood: (mood) => set({ mood, rain: mood === "storm" ? true : get().rain }),
  toggleLamp: () => set({ lampOn: !get().lampOn }),
  toggleRain: () => {
    const rain = !get().rain;
    set({ rain, mood: rain ? "storm" : get().mood === "storm" ? "golden" : get().mood });
  },
  toggleMute: () => set({ muted: !get().muted }),
  toggleCurtains: () => set({ curtainsOpen: !get().curtainsOpen }),
  setCurtains: (curtainsOpen) => set({ curtainsOpen }),
  setHovered: (hovered, hint = "") => set({ hovered, hint }),
  setIntroTitle: (introTitle) => set({ introTitle }),
  cycleWallpaper: () => set({ wallpaper: (get().wallpaper + 1) % 3 }),
  tapGlobe: () => {
    const globeClicks = get().globeClicks + 1;
    set({
      globeClicks,
      booksEnchanted: globeClicks >= 3 ? !get().booksEnchanted : get().booksEnchanted,
    });
  },
  hydrate: () => {
    if (typeof window === "undefined") return;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isMobile = window.innerWidth < 768 || window.matchMedia("(pointer: coarse)").matches;
    set({ reduceMotion, isMobile, quality: "low" });
  },
}));
