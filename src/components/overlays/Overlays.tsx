import { AnimatePresence, motion } from "framer-motion";
import {
  BookOpen,
  CloudRain,
  Columns2,
  Lamp,
  Monitor,
  Moon,
  Sun,
  Volume2,
  VolumeX,
} from "lucide-react";
import { useWorld, type Focus } from "@/lib/store";
import { play } from "@/lib/audio";
import { BOOKS } from "@/lib/portfolio-data";
import { BookReader } from "./BookReader";
import { DesktopOS } from "./DesktopOS";
import { cn } from "@/lib/cn";

export function Overlays() {
  const phase = useWorld((s) => s.phase);
  const progress = useWorld((s) => s.loadProgress);
  const introTitle = useWorld((s) => s.introTitle);
  const hint = useWorld((s) => s.hint);
  const isMobile = useWorld((s) => s.isMobile);
  const rain = useWorld((s) => s.rain);
  const focus = useWorld((s) => s.focus);
  const openBook = useWorld((s) => s.openBook);
  const desktopOpen = useWorld((s) => s.desktopOpen);

  return (
    <div className="pointer-events-none absolute inset-0 z-50">
      <div className="letterbox absolute inset-x-0 top-0 h-8 bg-gradient-to-b from-ink to-transparent md:h-10" />
      <div className="letterbox absolute inset-x-0 bottom-0 h-8 bg-gradient-to-t from-ink to-transparent md:h-10" />

      <AnimatePresence>{phase === "boot" && <Boot progress={progress} />}</AnimatePresence>
      <AnimatePresence>{phase === "door" && <DoorCopy />}</AnimatePresence>
      <AnimatePresence>{introTitle && phase !== "boot" && <WelcomeTitle />}</AnimatePresence>
      <AnimatePresence>{phase === "room" && <Hud />}</AnimatePresence>
      <AnimatePresence>
        {phase === "room" && focus === "bookshelf" && !openBook && !desktopOpen && <ShelfGuide />}
      </AnimatePresence>
      <AnimatePresence>
        {phase === "room" && focus === "window" && !openBook && !desktopOpen && <WindowGuide />}
      </AnimatePresence>
      <AnimatePresence>{hint && phase !== "boot" && <Hint text={hint} />}</AnimatePresence>
      {rain && phase === "room" && <RainOverlay />}
      <BookReader />
      <DesktopOS />
      {isMobile && phase === "room" && <MobileNav />}
    </div>
  );
}

function Boot({ progress }: { progress: number }) {
  return (
    <motion.div
      className="pointer-events-auto absolute inset-0 flex flex-col items-center justify-center bg-ink px-6"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }}
    >
      <p className="font-display text-sm tracking-[0.32em] text-amber uppercase">A room, waiting</p>
      <h2 className="mt-4 max-w-xl text-center font-display text-4xl font-medium leading-tight text-paper md:text-6xl">
        Every room tells a story.
      </h2>
      <p className="mt-4 max-w-md text-center text-sm text-muted">
        Lighting the lamps, dusting the shelves, warming the wood.
      </p>
      <div className="mt-10 h-px w-48 overflow-hidden bg-line">
        <motion.div
          className="h-full bg-amber"
          style={{ width: `${progress}%` }}
          transition={{ duration: 0.2 }}
        />
      </div>
      <p className="mt-3 font-sans text-xs tabular-nums tracking-widest text-muted">{Math.round(progress)}%</p>
    </motion.div>
  );
}

function DoorCopy() {
  return (
    <motion.div
      className="pointer-events-none absolute inset-x-0 bottom-16 flex flex-col items-center px-6 md:bottom-20"
      initial={{ opacity: 0, y: 12, filter: "blur(4px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      exit={{ opacity: 0, y: -8, filter: "blur(4px)" }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    >
      <p className="font-display text-3xl text-paper md:text-4xl">Vasanth's World</p>
      <p className="mt-2 text-sm text-muted">Click the handle. The light will do the rest.</p>
      <button
        type="button"
        className="pointer-events-auto mt-6 rounded-full border border-line bg-ink-soft/70 px-5 py-2.5 text-sm text-paper transition-transform duration-150 ease-out hover:border-amber active:scale-[0.96]"
        onClick={() => {
          play("creak");
          useWorld.getState().openTheDoor();
        }}
      >
        Enter
      </button>
    </motion.div>
  );
}

function WelcomeTitle() {
  return (
    <motion.div
      className="absolute inset-0 flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, filter: "blur(6px)", transition: { duration: 1.1 } }}
    >
      <div className="text-center">
        <motion.p
          className="font-display text-sm tracking-[0.4em] text-amber uppercase"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          Welcome to
        </motion.p>
        <motion.h2
          className="mt-2 font-display text-5xl text-paper md:text-7xl"
          initial={{ opacity: 0, y: 16, filter: "blur(6px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ delay: 0.7, duration: 1 }}
        >
          Vasanth's World
        </motion.h2>
      </div>
    </motion.div>
  );
}

function Hint({ text }: { text: string }) {
  return (
    <motion.div
      className="absolute bottom-24 left-1/2 -translate-x-1/2 rounded-full border border-line bg-ink-soft/80 px-4 py-1.5 text-xs tracking-wide text-paper-dim"
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 4 }}
    >
      {text}
    </motion.div>
  );
}

function ShelfGuide() {
  return (
    <>
      <motion.aside
        className="pointer-events-auto absolute top-1/2 left-4 z-20 hidden w-56 -translate-y-1/2 md:block lg:left-8"
        initial={{ opacity: 0, x: -16 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -12 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      >
        <p className="font-display text-sm tracking-[0.28em] text-amber uppercase">The shelf</p>
        <p className="mt-1 mb-3 text-xs text-muted">Every book is a chapter. Click one.</p>
        <ul className="space-y-1.5">
          {BOOKS.map((b) => (
            <li key={b.id}>
              <button
                type="button"
                onClick={() => {
                  play("page");
                  useWorld.getState().setBook(b.id);
                }}
                className="flex min-h-11 w-full items-center gap-3 rounded-xl border border-line bg-ink-soft/80 px-3 text-left backdrop-blur-md transition-colors duration-150 hover:border-amber hover:bg-ink-soft"
              >
                <span className="size-2.5 shrink-0 rounded-full" style={{ background: b.color }} />
                <span className="flex-1">
                  <span className="block font-display text-base text-paper">{b.title}</span>
                  <span className="block text-[11px] text-muted">{b.subtitle}</span>
                </span>
              </button>
            </li>
          ))}
        </ul>
      </motion.aside>
      <motion.div
        className="pointer-events-auto absolute inset-x-3 top-16 z-20 md:hidden"
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -6 }}
      >
        <p className="mb-2 text-center font-display text-xs tracking-[0.28em] text-amber uppercase">The shelf</p>
        <div className="flex gap-1.5 overflow-x-auto pb-1">
          {BOOKS.map((b) => (
            <button
              key={b.id}
              type="button"
              onClick={() => {
                play("page");
                useWorld.getState().setBook(b.id);
              }}
              className="min-h-11 shrink-0 rounded-full border border-line bg-ink-soft/85 px-3 text-xs text-paper"
            >
              {b.title}
            </button>
          ))}
        </div>
      </motion.div>
    </>
  );
}

function WindowGuide() {
  const open = useWorld((s) => s.curtainsOpen);
  return (
    <motion.div
      className="pointer-events-auto absolute top-20 left-1/2 z-20 -translate-x-1/2"
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -6 }}
    >
      <button
        type="button"
        onClick={() => {
          play("whoosh");
          useWorld.getState().toggleCurtains();
        }}
        className="rounded-full border border-line bg-ink-soft/80 px-5 py-2.5 text-sm text-paper backdrop-blur-md transition-transform duration-150 hover:border-amber active:scale-[0.96]"
      >
        {open ? "Close the curtains" : "Open the curtains"}
      </button>
    </motion.div>
  );
}

const PLACES: Array<{ id: Focus; label: string; icon: typeof BookOpen }> = [
  { id: "overview", label: "Room", icon: Sun },
  { id: "bookshelf", label: "Books", icon: BookOpen },
  { id: "desk", label: "Desk", icon: Monitor },
  { id: "window", label: "Window", icon: CloudRain },
  { id: "bed", label: "Bed", icon: Lamp },
];

function Hud() {
  const focus = useWorld((s) => s.focus);
  const muted = useWorld((s) => s.muted);
  const lampOn = useWorld((s) => s.lampOn);
  const rain = useWorld((s) => s.rain);
  const mood = useWorld((s) => s.mood);
  const desktopOpen = useWorld((s) => s.desktopOpen);
  const openBook = useWorld((s) => s.openBook);
  const curtainsOpen = useWorld((s) => s.curtainsOpen);
  if (desktopOpen || openBook) return null;

  return (
    <motion.div
      className="pointer-events-auto absolute inset-x-0 bottom-6 hidden items-end justify-between px-5 md:flex lg:px-8"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 8 }}
    >
      <div className="flex gap-1 rounded-full border border-line bg-ink-soft/75 p-1 backdrop-blur-md">
        {PLACES.map((p) => (
          <button
            key={p.id}
            type="button"
            onClick={() => {
              play("whoosh");
              useWorld.getState().setFocus(p.id);
              if (p.id === "window") useWorld.getState().setCurtains(true);
            }}
            className={cn(
              "flex items-center gap-2 rounded-full px-3 py-2 text-xs transition-colors duration-200",
              focus === p.id ? "bg-paper text-ink" : "text-paper-dim hover:text-paper",
            )}
          >
            <p.icon className="size-3.5" strokeWidth={1.75} />
            {p.label}
          </button>
        ))}
      </div>
      <div className="flex gap-1 rounded-full border border-line bg-ink-soft/75 p-1 backdrop-blur-md">
        <IconBtn
          label={muted ? "Unmute" : "Mute"}
          onClick={() => useWorld.getState().toggleMute()}
        >
          {muted ? <VolumeX className="size-4" /> : <Volume2 className="size-4" />}
        </IconBtn>
        <IconBtn label="Lamp" onClick={() => useWorld.getState().toggleLamp()}>
          <Lamp className={cn("size-4", lampOn && "text-amber")} />
        </IconBtn>
        <IconBtn
          label={curtainsOpen ? "Close curtains" : "Open curtains"}
          onClick={() => {
            useWorld.getState().setFocus("window");
            useWorld.getState().toggleCurtains();
          }}
        >
          <Columns2 className={cn("size-4", curtainsOpen && "text-amber")} />
        </IconBtn>
        <IconBtn label="Rain" onClick={() => useWorld.getState().toggleRain()}>
          <CloudRain className={cn("size-4", rain && "text-amber")} />
        </IconBtn>
        <IconBtn
          label="Night"
          onClick={() => useWorld.getState().setMood(mood === "night" ? "golden" : "night")}
        >
          {mood === "night" ? <Moon className="size-4 text-amber" /> : <Sun className="size-4" />}
        </IconBtn>
      </div>
    </motion.div>
  );
}

function IconBtn({
  children,
  onClick,
  label,
}: {
  children: React.ReactNode;
  onClick: () => void;
  label: string;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={() => {
        play("click");
        onClick();
      }}
      className="grid size-10 place-items-center rounded-full text-paper-dim transition-colors duration-150 hover:text-paper"
    >
      {children}
    </button>
  );
}

function RainOverlay() {
  return (
    <div
      className="pointer-events-none absolute inset-0 opacity-35"
      style={{
        backgroundImage:
          "repeating-linear-gradient(185deg, transparent 0 14px, rgba(197,208,224,0.2) 14px 15px)",
      }}
    />
  );
}

function MobileNav() {
  const focus = useWorld((s) => s.focus);
  const desktopOpen = useWorld((s) => s.desktopOpen);
  const openBook = useWorld((s) => s.openBook);
  if (desktopOpen || openBook) return null;
  return (
    <div className="pointer-events-auto absolute inset-x-3 bottom-4 flex gap-1 overflow-x-auto rounded-full border border-line bg-ink-soft/85 p-1 md:hidden">
      {PLACES.map((p) => (
        <button
          key={p.id}
          type="button"
          onClick={() => {
            useWorld.getState().setFocus(p.id);
            if (p.id === "window") useWorld.getState().setCurtains(true);
          }}
          className={cn(
            "min-h-11 flex-1 rounded-full px-2 text-xs",
            focus === p.id ? "bg-paper text-ink" : "text-paper-dim",
          )}
        >
          {p.label}
        </button>
      ))}
    </div>
  );
}
