type Bus = {
  master: GainNode;
  music: GainNode;
  sfx: GainNode;
  amb: GainNode;
};

let ctx: AudioContext | null = null;
let bus: Bus | null = null;
let unlocked = false;
let ambStarted = false;
let muted = false;
const buffers = new Map<string, AudioBuffer>();

function now() {
  return ctx?.currentTime ?? 0;
}

function makeCtx() {
  if (ctx) return ctx;
  const AC = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
  ctx = new AC({ latencyHint: "interactive" });
  const master = ctx.createGain();
  const music = ctx.createGain();
  const sfx = ctx.createGain();
  const amb = ctx.createGain();
  master.gain.value = 0.85;
  music.gain.value = 0.22;
  sfx.gain.value = 0.45;
  amb.gain.value = 0.28;
  music.connect(master);
  sfx.connect(master);
  amb.connect(master);
  master.connect(ctx.destination);
  bus = { master, music, sfx, amb };
  return ctx;
}

function noiseBuffer(seconds: number, kind: "white" | "brown" | "pink") {
  const c = makeCtx();
  const len = Math.floor(c.sampleRate * seconds);
  const buf = c.createBuffer(1, len, c.sampleRate);
  const data = buf.getChannelData(0);
  let last = 0;
  let b0 = 0, b1 = 0, b2 = 0;
  for (let i = 0; i < len; i++) {
    const white = Math.random() * 2 - 1;
    if (kind === "white") data[i] = white * 0.4;
    else if (kind === "brown") {
      last = (last + 0.02 * white) / 1.02;
      data[i] = last * 3.2;
    } else {
      b0 = 0.99765 * b0 + white * 0.099046;
      b1 = 0.963 * b1 + white * 0.2965;
      b2 = 0.57 * b2 + white * 1.0529;
      data[i] = (b0 + b1 + b2 + white * 0.1848) * 0.11;
    }
  }
  return buf;
}

function envGain(parent: AudioNode, attack: number, hold: number, release: number, peak = 1) {
  if (!ctx) return;
  const g = ctx.createGain();
  g.gain.setValueAtTime(0.0001, now());
  g.gain.exponentialRampToValueAtTime(peak, now() + attack);
  g.gain.setValueAtTime(peak, now() + attack + hold);
  g.gain.exponentialRampToValueAtTime(0.0001, now() + attack + hold + release);
  g.connect(parent);
  return g;
}

function playBuffer(name: string, dest: AudioNode, opts?: { rate?: number; when?: number }) {
  if (!ctx || !bus) return;
  const buf = buffers.get(name);
  if (!buf) return;
  const src = ctx.createBufferSource();
  src.buffer = buf;
  src.playbackRate.value = opts?.rate ?? 1;
  src.connect(dest);
  src.start(opts?.when ?? now());
  src.onended = () => src.disconnect();
}

function makeCreak() {
  const c = makeCtx();
  const len = Math.floor(c.sampleRate * 1.4);
  const buf = c.createBuffer(1, len, c.sampleRate);
  const d = buf.getChannelData(0);
  for (let i = 0; i < len; i++) {
    const t = i / c.sampleRate;
    const sweep = Math.sin(t * t * 90 + 8) * Math.exp(-t * 1.6);
    const grain = (Math.random() * 2 - 1) * 0.15 * Math.exp(-t * 2);
    d[i] = sweep * 0.55 + grain;
  }
  return buf;
}

function makeClick() {
  const c = makeCtx();
  const len = Math.floor(c.sampleRate * 0.08);
  const buf = c.createBuffer(1, len, c.sampleRate);
  const d = buf.getChannelData(0);
  for (let i = 0; i < len; i++) {
    const t = i / c.sampleRate;
    d[i] = Math.sin(2 * Math.PI * 1800 * t) * Math.exp(-t * 70) * 0.5
      + (Math.random() * 2 - 1) * Math.exp(-t * 90) * 0.2;
  }
  return buf;
}

function makeWhoosh() {
  const c = makeCtx();
  const len = Math.floor(c.sampleRate * 0.7);
  const buf = c.createBuffer(1, len, c.sampleRate);
  const d = buf.getChannelData(0);
  for (let i = 0; i < len; i++) {
    const t = i / c.sampleRate;
    const env = Math.sin((t / 0.7) * Math.PI);
    d[i] = (Math.random() * 2 - 1) * env * 0.35;
  }
  return buf;
}

function makePage() {
  const c = makeCtx();
  const len = Math.floor(c.sampleRate * 0.45);
  const buf = c.createBuffer(1, len, c.sampleRate);
  const d = buf.getChannelData(0);
  for (let i = 0; i < len; i++) {
    const t = i / c.sampleRate;
    d[i] = (Math.random() * 2 - 1) * Math.exp(-t * 8) * (0.3 + 0.7 * Math.sin(t * 40));
  }
  return buf;
}

function makeBoot() {
  const c = makeCtx();
  const len = Math.floor(c.sampleRate * 1.6);
  const buf = c.createBuffer(1, len, c.sampleRate);
  const d = buf.getChannelData(0);
  for (let i = 0; i < len; i++) {
    const t = i / c.sampleRate;
    const a = Math.sin(2 * Math.PI * (220 + t * 420) * t) * Math.min(1, t * 3) * Math.exp(-t * 1.1);
    const b = Math.sin(2 * Math.PI * 660 * t) * Math.exp(-t * 2.2) * 0.25;
    d[i] = (a + b) * 0.4;
  }
  return buf;
}

function startPad() {
  if (!ctx || !bus) return;
  const notes = [146.83, 220, 293.66, 329.63];
  notes.forEach((freq, i) => {
    const osc = ctx!.createOscillator();
    const g = ctx!.createGain();
    const f = ctx!.createBiquadFilter();
    osc.type = i % 2 === 0 ? "sine" : "triangle";
    osc.frequency.value = freq;
    osc.detune.value = (i - 1.5) * 6;
    f.type = "lowpass";
    f.frequency.value = 700 + i * 80;
    g.gain.value = 0.0001;
    osc.connect(f);
    f.connect(g);
    g.connect(bus!.music);
    osc.start();
    const t = now();
    g.gain.exponentialRampToValueAtTime(0.045 / (i + 1), t + 3 + i);
    const lfo = ctx!.createOscillator();
    const lg = ctx!.createGain();
    lfo.frequency.value = 0.05 + i * 0.02;
    lg.gain.value = 0.012;
    lfo.connect(lg);
    lg.connect(g.gain);
    lfo.start();
  });
}

function startAmbience() {
  if (!ctx || !bus || ambStarted) return;
  ambStarted = true;
  const brown = ctx.createBufferSource();
  brown.buffer = buffers.get("brown")!;
  brown.loop = true;
  const bp = ctx.createBiquadFilter();
  bp.type = "lowpass";
  bp.frequency.value = 380;
  const g = ctx.createGain();
  g.gain.value = 0.35;
  brown.connect(bp);
  bp.connect(g);
  g.connect(bus.amb);
  brown.start();

  const wind = ctx.createBufferSource();
  wind.buffer = buffers.get("pink")!;
  wind.loop = true;
  const wbp = ctx.createBiquadFilter();
  wbp.type = "bandpass";
  wbp.frequency.value = 900;
  wbp.Q.value = 0.7;
  const wg = ctx.createGain();
  wg.gain.value = 0.12;
  wind.connect(wbp);
  wbp.connect(wg);
  wg.connect(bus.amb);
  wind.start();
  const lfo = ctx.createOscillator();
  const lg = ctx.createGain();
  lfo.frequency.value = 0.07;
  lg.gain.value = 0.08;
  lfo.connect(lg);
  lg.connect(wg.gain);
  lfo.start();

  startPad();
  scheduleCreaks();
}

function scheduleCreaks() {
  if (!ctx || !bus) return;
  const wait = 8 + Math.random() * 14;
  window.setTimeout(() => {
    if (!muted && ambStarted) play("creak", { rate: 0.85 + Math.random() * 0.3 });
    scheduleCreaks();
  }, wait * 1000);
}

let rainNode: { src: AudioBufferSourceNode; g: GainNode } | null = null;

export const audio = {
  unlock() {
    makeCtx();
    if (!ctx) return;
    if (ctx.state === "suspended") void ctx.resume();
    if (!unlocked) {
      buffers.set("brown", noiseBuffer(2.4, "brown"));
      buffers.set("pink", noiseBuffer(2.4, "pink"));
      buffers.set("white", noiseBuffer(1.2, "white"));
      buffers.set("creak", makeCreak());
      buffers.set("click", makeClick());
      buffers.set("whoosh", makeWhoosh());
      buffers.set("page", makePage());
      buffers.set("boot", makeBoot());
      unlocked = true;
    }
    startAmbience();
  },
  resume() {
    if (ctx?.state === "suspended") void ctx.resume();
  },
  setMuted(v: boolean) {
    muted = v;
    if (!bus || !ctx) return;
    bus.master.gain.setTargetAtTime(v ? 0.0001 : 0.85, now(), 0.04);
  },
  setMusic(v: number) {
    if (!bus || !ctx) return;
    bus.music.gain.setTargetAtTime(Math.max(0.0001, v * v * 0.4), now(), 0.08);
  },
  play(name: "creak" | "click" | "whoosh" | "page" | "boot" | "hover" | "key", opts?: { rate?: number }) {
    if (!ctx || !bus || muted) return;
    if (name === "hover") {
      const osc = ctx.createOscillator();
      const g = envGain(bus.sfx, 0.005, 0.02, 0.08, 0.04);
      if (!g) return;
      osc.type = "sine";
      osc.frequency.value = 880 + Math.random() * 200;
      osc.connect(g);
      osc.start();
      osc.stop(now() + 0.12);
      return;
    }
    if (name === "key") {
      const osc = ctx.createOscillator();
      const g = envGain(bus.sfx, 0.001, 0.01, 0.05, 0.08);
      if (!g) return;
      osc.type = "square";
      osc.frequency.value = 420 + Math.random() * 180;
      const f = ctx.createBiquadFilter();
      f.type = "bandpass";
      f.frequency.value = 1800;
      osc.connect(f);
      f.connect(g);
      osc.start();
      osc.stop(now() + 0.07);
      return;
    }
    const dest = ctx.createGain();
    dest.gain.value = name === "creak" ? 0.35 : 0.7;
    dest.connect(bus.sfx);
    playBuffer(name, dest, { rate: (opts?.rate ?? 1) * (0.96 + Math.random() * 0.08) });
  },
  setRain(on: boolean) {
    if (!ctx || !bus) return;
    if (on && !rainNode) {
      const src = ctx.createBufferSource();
      src.buffer = buffers.get("white")!;
      src.loop = true;
      const f = ctx.createBiquadFilter();
      f.type = "highpass";
      f.frequency.value = 1800;
      const g = ctx.createGain();
      g.gain.value = 0.0001;
      src.connect(f);
      f.connect(g);
      g.connect(bus.amb);
      src.start();
      g.gain.setTargetAtTime(0.18, now(), 0.4);
      rainNode = { src, g };
    } else if (!on && rainNode) {
      rainNode.g.gain.setTargetAtTime(0.0001, now(), 0.35);
      const node = rainNode;
      rainNode = null;
      window.setTimeout(() => {
        try {
          node.src.stop();
          node.src.disconnect();
        } catch {
          /* already stopped */
        }
      }, 800);
    }
  },
};

export function play(name: Parameters<typeof audio.play>[0], opts?: { rate?: number }) {
  audio.play(name, opts);
}
