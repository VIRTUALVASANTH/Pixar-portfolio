import { useEffect, useState, type ComponentType } from "react";
import { useWorld } from "@/lib/store";
import { audio } from "@/lib/audio";
import { Overlays } from "@/components/overlays/Overlays";

export function Experience() {
  const [World, setWorld] = useState<ComponentType | null>(null);
  const hydrate = useWorld((s) => s.hydrate);
  const setProgress = useWorld((s) => s.setProgress);
  const setPhase = useWorld((s) => s.setPhase);
  const muted = useWorld((s) => s.muted);
  const rain = useWorld((s) => s.rain);
  const phase = useWorld((s) => s.phase);

  useEffect(() => {
    hydrate();
    (window as unknown as { __world: typeof useWorld }).__world = useWorld;
    let alive = true;
    void import("@/components/world/World").then((m) => {
      if (alive) setWorld(() => m.World);
    });
    return () => {
      alive = false;
    };
  }, [hydrate]);

  useEffect(() => {
    let p = 4;
    const id = window.setInterval(() => {
      p = Math.min(100, p + 7 + Math.random() * 9);
      setProgress(p);
      if (p >= 100) {
        window.clearInterval(id);
        window.setTimeout(() => {
          if (useWorld.getState().phase === "boot") setPhase("door");
        }, 420);
      }
    }, 160);
    return () => window.clearInterval(id);
  }, [setPhase, setProgress]);

  useEffect(() => {
    const unlock = () => audio.unlock();
    window.addEventListener("pointerdown", unlock, { once: true });
    window.addEventListener("keydown", unlock, { once: true });
    const vis = () => {
      if (document.visibilityState === "visible") audio.resume();
    };
    document.addEventListener("visibilitychange", vis);
    return () => {
      window.removeEventListener("pointerdown", unlock);
      window.removeEventListener("keydown", unlock);
      document.removeEventListener("visibilitychange", vis);
    };
  }, []);

  useEffect(() => {
    audio.setMuted(muted);
  }, [muted]);

  useEffect(() => {
    audio.setRain(rain);
  }, [rain]);

  useEffect(() => {
    audio.setMusic(phase === "room" ? 0.55 : phase === "door" ? 0.85 : 0.4);
  }, [phase]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const s = useWorld.getState();
      if (e.key === "Enter" && s.phase === "door") s.openTheDoor();
      if (e.key === "Escape") {
        if (s.openBook) s.setBook(null);
        else if (s.desktopOpen) s.setDesktop(false, null);
        else if (s.phase === "room") s.setFocus("overview");
      }
      if (s.phase !== "room") return;
      if (e.key === "1") s.setFocus("overview");
      if (e.key === "2") s.setFocus("bookshelf");
      if (e.key === "3") s.setFocus("desk");
      if (e.key === "4") s.setFocus("window");
      if (e.key === "5") s.setFocus("bed");
      if (e.key === "m" || e.key === "M") s.toggleMute();
      if (e.key === "l" || e.key === "L") s.toggleLamp();
      if (e.key === "r" || e.key === "R") s.toggleRain();
      if (e.key === "c" || e.key === "C") {
        s.setFocus("window");
        s.toggleCurtains();
      }
      if (e.key === "n" || e.key === "N") s.setMood(s.mood === "night" ? "golden" : "night");
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <main className="relative h-dvh w-full overflow-hidden bg-ink text-paper">
      <h1 className="sr-only">Vasanth G — Backend Java Developer, an immersive cinematic portfolio</h1>
      {World ? <World /> : <div className="absolute inset-0 bg-ink" />}
      <Overlays />
    </main>
  );
}
