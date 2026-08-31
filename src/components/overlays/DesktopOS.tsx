import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Award,
  BookOpen,
  Briefcase,
  Folder,
  GraduationCap,
  Mail,
  Monitor,
  Sparkles,
  User,
} from "lucide-react";
import { useWorld } from "@/lib/store";
import { play } from "@/lib/audio";
import {
  CERTS,
  EDUCATION,
  EXPERIENCE,
  PERSON,
  PROJECTS,
  SKILL_GROUPS,
} from "@/lib/portfolio-data";
import { cn } from "@/lib/cn";
import { CloseBtn } from "./CloseBtn";

const APPS = [
  { id: "about", label: "Resume", icon: User },
  { id: "projects", label: "Projects", icon: Folder },
  { id: "skills", label: "Skills", icon: Sparkles },
  { id: "experience", label: "Experience", icon: Briefcase },
  { id: "education", label: "Education", icon: GraduationCap },
  { id: "certs", label: "Seals", icon: Award },
  { id: "contact", label: "Contact", icon: Mail },
] as const;

type AppId = (typeof APPS)[number]["id"];

export function DesktopOS() {
  const open = useWorld((s) => s.desktopOpen);
  const wallpaper = useWorld((s) => s.wallpaper);
  const [app, setApp] = useState<AppId | "home">("home");

  const walls = [
    "radial-gradient(1200px 600px at 80% 10%, #c4843a55, transparent), linear-gradient(160deg,#1a120c,#2a1c14 40%,#0e1c1c)",
    "radial-gradient(900px 500px at 20% 80%, #3d6b6b66, transparent), linear-gradient(180deg,#0e1418,#1a2428)",
    "radial-gradient(800px 400px at 70% 30%, #8a3b2255, transparent), linear-gradient(200deg,#140e12,#241018)",
  ];

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="pointer-events-auto absolute inset-0 z-30 flex flex-col bg-ink"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.2 } }}
        >
          <div className="relative min-h-0 flex-1 overflow-hidden" style={{ background: walls[wallpaper] }}>
            <header className="flex items-center justify-between px-4 py-3 md:px-6">
              <button
                type="button"
                className="font-display text-lg text-paper"
                onClick={() => {
                  play("click");
                  useWorld.getState().cycleWallpaper();
                }}
              >
                Vasanth OS
              </button>
              <div className="flex items-center gap-2">
                <span className="hidden text-xs text-muted md:inline">click the title to change wallpaper</span>
                <CloseBtn
                  className="text-paper"
                  onClick={() => {
                    play("whoosh");
                    useWorld.getState().setDesktop(false, null);
                    setApp("home");
                  }}
                />
              </div>
            </header>

            <AnimatePresence mode="wait">
              {app === "home" ? (
                <motion.div
                  key="home"
                  className="grid grid-cols-3 gap-4 px-6 py-8 sm:grid-cols-4 md:grid-cols-7 md:px-10"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                >
                  {APPS.map((a, i) => (
                    <motion.button
                      key={a.id}
                      type="button"
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.04 }}
                      onClick={() => {
                        play("click");
                        setApp(a.id);
                      }}
                      className="group flex flex-col items-center gap-2"
                    >
                      <span className="grid size-14 place-items-center rounded-2xl border border-line bg-glass/70 text-paper transition-transform duration-150 group-hover:border-amber group-active:scale-[0.96]">
                        <a.icon className="size-5" strokeWidth={1.6} />
                      </span>
                      <span className="text-xs text-paper-dim">{a.label}</span>
                    </motion.button>
                  ))}
                </motion.div>
              ) : (
                <Window key={app} id={app} onClose={() => setApp("home")} />
              )}
            </AnimatePresence>
          </div>
          <nav className="flex items-center justify-center gap-1 border-t border-line bg-ink-soft/90 px-2 py-2">
            <button
              type="button"
              className="grid size-11 place-items-center rounded-xl text-paper-dim hover:text-paper"
              onClick={() => setApp("home")}
              aria-label="Desktop"
            >
              <Monitor className="size-4" />
            </button>
            {APPS.map((a) => (
              <button
                key={a.id}
                type="button"
                aria-label={a.label}
                onClick={() => {
                  play("hover");
                  setApp(a.id);
                }}
                className={cn(
                  "grid size-11 place-items-center rounded-xl",
                  app === a.id ? "bg-paper/10 text-paper" : "text-paper-dim hover:text-paper",
                )}
              >
                <a.icon className="size-4" />
              </button>
            ))}
          </nav>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function Window({ id, onClose }: { id: AppId; onClose: () => void }) {
  const title = APPS.find((a) => a.id === id)?.label ?? id;
  return (
    <motion.section
      className="glass-panel mx-3 mb-3 max-h-[calc(100%-1rem)] overflow-hidden rounded-[22px] md:mx-8"
      initial={{ opacity: 0, y: 12, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 8, scale: 0.99 }}
      transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
    >
      <header className="flex items-center justify-between border-b border-line px-5 py-3">
        <div className="flex items-center gap-2">
          <BookOpen className="size-4 text-amber" />
          <h2 className="font-display text-xl text-paper">{title}</h2>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="text-xs tracking-wide text-muted uppercase hover:text-paper"
        >
          Back
        </button>
      </header>
      <div className="max-h-[min(70dvh,640px)] overflow-y-auto p-5 md:p-7">
        <AppBody id={id} />
      </div>
    </motion.section>
  );
}

function AppBody({ id }: { id: AppId }) {
  if (id === "about") {
    return (
      <div className="grid gap-8 md:grid-cols-[200px_1fr]">
        <div className="grid place-items-center rounded-2xl border border-line bg-ink-soft py-8">
          <span className="font-display text-7xl text-amber">V</span>
          <p className="mt-2 text-xs tracking-[0.2em] text-muted uppercase">Profile</p>
        </div>
        <div>
          <p className="font-display text-4xl text-paper">{PERSON.fullName}</p>
          <p className="mt-1 text-sm text-muted">
            {PERSON.title} · {PERSON.location}
          </p>
          <p className="mt-5 max-w-prose text-sm leading-relaxed text-paper-dim">{PERSON.summary}</p>
          <dl className="mt-6 grid grid-cols-2 gap-3 text-sm">
            <Stat k="Years" v={`${PERSON.years}+`} />
            <Stat k="Focus" v="Real-time story" />
            <Stat k="Status" v={PERSON.availability} />
            <Stat k="Mail" v={PERSON.email} />
          </dl>
        </div>
      </div>
    );
  }
  if (id === "projects") {
    return (
      <div className="grid gap-4 md:grid-cols-2">
        {PROJECTS.map((p) => (
          <article key={p.id} className="rounded-2xl border border-line bg-ink-soft/60 p-5">
            <div className="flex items-baseline justify-between">
              <h3 className="font-display text-2xl text-paper">{p.name}</h3>
              <span className="text-xs text-muted">{p.year}</span>
            </div>
            <p className="mt-2 text-sm leading-relaxed text-paper-dim">{p.blurb}</p>
            <div className="mt-4 flex flex-wrap gap-1.5">
              {p.stack.map((s) => (
                <span key={s} className="rounded-full border border-line px-2 py-0.5 text-[11px] text-amber">
                  {s}
                </span>
              ))}
            </div>
          </article>
        ))}
      </div>
    );
  }
  if (id === "skills") {
    return (
      <div className="space-y-8">
        {SKILL_GROUPS.map((g) => (
          <section key={g.name}>
            <h3 className="font-display text-2xl text-paper">{g.name}</h3>
            <div className="mt-4 grid gap-3">
              {g.skills.map((s) => (
                <div key={s.name}>
                  <div className="flex justify-between text-sm text-paper-dim">
                    <span>{s.name}</span>
                    <span className="tabular-nums">{s.level}</span>
                  </div>
                  <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-paper/10">
                    <motion.div
                      className="h-full rounded-full bg-amber"
                      initial={{ width: 0 }}
                      animate={{ width: `${s.level}%` }}
                      transition={{ duration: 0.7 }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>
    );
  }
  if (id === "experience") {
    return (
      <div className="space-y-6">
        {EXPERIENCE.map((job) => (
          <article key={job.company} className="rounded-2xl border border-line p-5">
            <p className="text-xs text-muted">{job.years}</p>
            <h3 className="font-display text-2xl text-paper">{job.role}</h3>
            <p className="text-sm text-amber">
              {job.company} · {job.place}
            </p>
            <ul className="mt-3 space-y-1 text-sm text-paper-dim">
              {job.points.map((pt) => (
                <li key={pt}>{pt}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    );
  }
  if (id === "education") {
    return (
      <div className="space-y-4">
        {EDUCATION.map((ed) => (
          <article key={ed.place} className="rounded-2xl border border-line p-5">
            <p className="text-xs text-muted">{ed.years}</p>
            <h3 className="font-display text-2xl text-paper">{ed.credential}</h3>
            <p className="text-sm text-amber">{ed.place}</p>
            <p className="mt-2 text-sm text-paper-dim">{ed.note}</p>
          </article>
        ))}
      </div>
    );
  }
  if (id === "certs") {
    return (
      <ul className="grid gap-3 sm:grid-cols-2">
        {CERTS.map((c) => (
          <li key={c.name} className="rounded-2xl border border-line px-4 py-4">
            <p className="font-display text-xl text-paper">{c.name}</p>
            <p className="text-sm text-muted">
              {c.by} · {c.year}
            </p>
          </li>
        ))}
      </ul>
    );
  }
  return <ContactForm />;
}

function Stat({ k, v }: { k: string; v: string }) {
  return (
    <div className="rounded-xl border border-line px-3 py-2">
      <dt className="text-[11px] tracking-wide text-muted uppercase">{k}</dt>
      <dd className="mt-0.5 text-sm text-paper">{v}</dd>
    </div>
  );
}

function ContactForm() {
  const [sent, setSent] = useState(false);
  const [name, setName] = useState("");
  const [note, setNote] = useState("");
  const stamp = useMemo(() => new Date().toISOString().slice(0, 10), []);
  return (
    <div className="max-w-lg">
      <p className="font-display text-3xl text-paper">Leave a note on the desk.</p>
      <p className="mt-2 text-sm text-paper-dim">
        It stays on this machine — a paperweight, not a server. For real mail: {PERSON.email}
      </p>
      {sent ? (
        <p className="mt-8 font-display text-xl text-amber">Tucked under the keyboard. Thank you, {name || "friend"}.</p>
      ) : (
        <form
          className="mt-6 space-y-3"
          onSubmit={(e) => {
            e.preventDefault();
            play("boot");
            try {
              localStorage.setItem("vasanth-note", JSON.stringify({ name, note, stamp }));
            } catch {
              /* ignore quota */
            }
            setSent(true);
          }}
        >
          <label className="block text-xs tracking-wide text-muted uppercase">
            Name
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 min-h-11 w-full rounded-xl border border-line bg-ink-soft px-3 text-sm text-paper outline-none focus:border-amber"
            />
          </label>
          <label className="block text-xs tracking-wide text-muted uppercase">
            Note
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              rows={4}
              className="mt-1 w-full rounded-xl border border-line bg-ink-soft px-3 py-2 text-sm text-paper outline-none focus:border-amber"
            />
          </label>
          <button
            type="submit"
            className="min-h-11 rounded-full bg-paper px-5 text-sm text-ink transition-transform duration-150 active:scale-[0.96]"
          >
            Place on the desk
          </button>
        </form>
      )}
    </div>
  );
}
