import { AnimatePresence, motion } from "framer-motion";
import { useWorld } from "@/lib/store";
import { play } from "@/lib/audio";
import {
  ABOUT_PAGES,
  BOOKS,
  CERTS,
  EDUCATION,
  EXPERIENCE,
  PERSON,
  PROJECTS,
  SKILL_GROUPS,
  type BookId,
} from "@/lib/portfolio-data";
import { CloseBtn } from "./CloseBtn";

export function BookReader() {
  const id = useWorld((s) => s.openBook);
  const book = BOOKS.find((b) => b.id === id);
  return (
    <AnimatePresence>
      {book && (
        <motion.div
          className="pointer-events-auto absolute inset-0 z-20 flex items-center justify-center bg-ink/55 px-3 py-6 md:px-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.2 } }}
        >
          <motion.article
            className="paper-grain relative flex max-h-[min(92dvh,820px)] w-full max-w-4xl flex-col overflow-hidden rounded-[28px] text-ink shadow-[0_40px_120px_rgba(0,0,0,0.55)]"
            initial={{ opacity: 0, y: 18, scale: 0.96, filter: "blur(6px)" }}
            animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: 10, scale: 0.98, filter: "blur(4px)" }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          >
            <header className="flex items-start justify-between gap-4 border-b border-ink/10 px-6 py-5 md:px-10">
              <div>
                <p className="text-xs tracking-[0.28em] text-wood uppercase">{book.spine}</p>
                <h2 className="mt-1 font-display text-4xl text-ink md:text-5xl">{book.title}</h2>
                <p className="mt-1 text-sm text-wood/80">{book.subtitle}</p>
              </div>
              <CloseBtn
                className="text-ink"
                onClick={() => {
                  play("page");
                  useWorld.getState().setBook(null);
                }}
              />
            </header>
            <div className="min-h-0 flex-1 overflow-y-auto px-6 py-6 md:px-10 md:py-8">
              <Pages id={book.id} />
            </div>
          </motion.article>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function Pages({ id }: { id: BookId }) {
  if (id === "about") {
    return (
      <div className="grid gap-8 md:grid-cols-2">
        <div>
          <p className="font-display text-3xl text-ink">{PERSON.fullName}</p>
          <p className="mt-1 text-sm text-wood">
            {PERSON.title} · {PERSON.location}
          </p>
          <p className="mt-6 text-base leading-relaxed text-ink/80">{PERSON.summary}</p>
        </div>
        <div className="space-y-5">
          {ABOUT_PAGES.map((p) => (
            <p key={p} className="font-display text-xl leading-relaxed text-ink/85 italic">
              {p}
            </p>
          ))}
        </div>
      </div>
    );
  }
  if (id === "skills") {
    return (
      <div className="grid gap-8 md:grid-cols-3">
        {SKILL_GROUPS.map((g) => (
          <section key={g.name}>
            <h3 className="font-display text-2xl">{g.name}</h3>
            <ul className="mt-4 space-y-4">
              {g.skills.map((s) => (
                <li key={s.name}>
                  <div className="flex justify-between text-sm">
                    <span>{s.name}</span>
                    <span className="tabular-nums text-wood">{s.level}</span>
                  </div>
                  <div className="mt-1.5 h-1 overflow-hidden rounded-full bg-ink/10">
                    <motion.div
                      className="h-full bg-amber-deep"
                      initial={{ width: 0 }}
                      animate={{ width: `${s.level}%` }}
                      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                    />
                  </div>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    );
  }
  if (id === "projects") {
    return (
      <div className="grid gap-4 md:grid-cols-2">
        {PROJECTS.map((p) => (
          <article key={p.id} className="rounded-2xl border border-ink/10 bg-paper/40 p-5">
            <div className="flex items-baseline justify-between gap-3">
              <h3 className="font-display text-2xl">{p.name}</h3>
              <span className="text-xs tabular-nums text-wood">{p.year}</span>
            </div>
            <p className="mt-1 text-xs tracking-wide text-wood uppercase">{p.role}</p>
            <p className="mt-3 text-sm leading-relaxed text-ink/80">{p.blurb}</p>
            <p className="mt-4 text-xs text-wood">{p.stack.join(" · ")}</p>
          </article>
        ))}
      </div>
    );
  }
  if (id === "experience") {
    return (
      <ol className="relative space-y-8 border-l border-ink/15 pl-6">
        {EXPERIENCE.map((job) => (
          <li key={job.company}>
            <span className="absolute -left-1.5 mt-1.5 size-3 rounded-full bg-amber-deep" />
            <p className="text-xs tabular-nums text-wood">{job.years}</p>
            <h3 className="font-display text-2xl">{job.role}</h3>
            <p className="text-sm text-wood">
              {job.company} · {job.place}
            </p>
            <ul className="mt-3 space-y-1.5 text-sm leading-relaxed text-ink/80">
              {job.points.map((pt) => (
                <li key={pt}>{pt}</li>
              ))}
            </ul>
          </li>
        ))}
      </ol>
    );
  }
  if (id === "education") {
    return (
      <div className="space-y-6">
        {EDUCATION.map((ed) => (
          <article key={ed.place} className="rounded-2xl border border-ink/10 p-5">
            <p className="text-xs tabular-nums text-wood">{ed.years}</p>
            <h3 className="font-display text-2xl">{ed.credential}</h3>
            <p className="text-sm text-wood">{ed.place}</p>
            <p className="mt-3 text-sm leading-relaxed text-ink/80">{ed.note}</p>
          </article>
        ))}
      </div>
    );
  }
  if (id === "certs") {
    return (
      <ul className="grid gap-3 md:grid-cols-2">
        {CERTS.map((c) => (
          <li key={c.name} className="rounded-2xl border border-ink/10 px-5 py-4">
            <p className="font-display text-xl">{c.name}</p>
            <p className="mt-1 text-sm text-wood">
              {c.by} · {c.year}
            </p>
          </li>
        ))}
      </ul>
    );
  }
  return (
    <div className="max-w-lg">
      <p className="font-display text-3xl">{PERSON.availability}</p>
      <p className="mt-4 text-base leading-relaxed text-ink/80">
        Write to <span className="text-wood">{PERSON.email}</span> or call{" "}
        <span className="text-wood">{PERSON.phone}</span>. Banking platforms, auth,
        latency — tell me what is on fire.
      </p>
      <div className="mt-8 flex flex-wrap gap-3">
        <a
          href={`mailto:${PERSON.email}`}
          className="inline-flex min-h-11 items-center rounded-full bg-ink px-5 text-sm text-paper transition-transform duration-150 active:scale-[0.96]"
        >
          Send a letter
        </a>
        <a
          href={PERSON.phoneHref}
          className="inline-flex min-h-11 items-center rounded-full border border-ink/20 px-5 text-sm text-ink transition-transform duration-150 active:scale-[0.96]"
        >
          Call
        </a>
      </div>
    </div>
  );
}
