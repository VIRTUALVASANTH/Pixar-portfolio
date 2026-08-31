import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/react+react-three__drei.mjs";
import { U as require_jsx_runtime } from "../_libs/@react-three/fiber+[...].mjs";
import { t as create } from "../_libs/zustand.mjs";
import { _ as Award, c as Moon, d as Lamp, f as GraduationCap, g as BookOpen, h as Briefcase, i as User, l as Monitor, m as CloudRain, n as VolumeX, o as Sun, p as Folder, r as Volume2, s as Sparkles, t as X, u as Mail } from "../_libs/lucide-react.mjs";
import { n as AnimatePresence, t as motion } from "../_libs/framer-motion+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-DCVEtJCA.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var __defProp = Object.defineProperty;
var __exportAll = (all, no_symbols) => {
	let target = {};
	for (var name in all) __defProp(target, name, {
		get: all[name],
		enumerable: true
	});
	if (!no_symbols) __defProp(target, Symbol.toStringTag, { value: "Module" });
	return target;
};
var useWorld = create((set, get) => ({
	phase: "boot",
	loadProgress: 0,
	focus: "overview",
	transitioning: false,
	doorOpen: false,
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
	setFocus: (focus) => set({
		focus,
		monitorsOn: focus === "desk" || get().desktopOpen
	}),
	setTransitioning: (transitioning) => set({ transitioning }),
	openTheDoor: () => {
		if (get().phase !== "door") return;
		set({
			phase: "entering",
			doorOpen: true,
			introTitle: true
		});
	},
	setBook: (openBook) => set({
		openBook,
		focus: openBook ? "bookshelf" : get().focus
	}),
	setDesktop: (desktopOpen, app) => set({
		desktopOpen,
		desktopApp: app === void 0 ? get().desktopApp : app,
		monitorsOn: desktopOpen || get().focus === "desk",
		focus: desktopOpen ? "desk" : get().focus
	}),
	setMood: (mood) => set({
		mood,
		rain: mood === "storm" ? true : get().rain
	}),
	toggleLamp: () => set({ lampOn: !get().lampOn }),
	toggleRain: () => {
		const rain = !get().rain;
		set({
			rain,
			mood: rain ? "storm" : get().mood === "storm" ? "golden" : get().mood
		});
	},
	toggleMute: () => set({ muted: !get().muted }),
	setHovered: (hovered, hint = "") => set({
		hovered,
		hint
	}),
	setIntroTitle: (introTitle) => set({ introTitle }),
	cycleWallpaper: () => set({ wallpaper: (get().wallpaper + 1) % 3 }),
	tapGlobe: () => {
		const globeClicks = get().globeClicks + 1;
		set({
			globeClicks,
			booksEnchanted: globeClicks >= 3 ? !get().booksEnchanted : get().booksEnchanted
		});
	},
	hydrate: () => {
		if (typeof window === "undefined") return;
		const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
		set({
			reduceMotion,
			isMobile: window.innerWidth < 768 || window.matchMedia("(pointer: coarse)").matches,
			quality: "low"
		});
	}
}));
var PERSON = {
	name: "Vasanth",
	fullName: "Vasanth Kumar",
	title: "Creative Technologist",
	tagline: "I build rooms you can feel.",
	location: "Chennai · Remote",
	email: "hello@vasanth.world",
	availability: "Open to cinematic collaborations",
	years: 7,
	summary: "I design and engineer immersive digital spaces — the kind that linger after the tab is closed. Seven years across product, film-adjacent web, and real-time 3D, always chasing the moment a interface becomes a place."
};
var BOOKS = [
	{
		id: "about",
		title: "About Me",
		spine: "About",
		subtitle: "A short letter from the desk",
		color: "#6b3a24",
		accent: "#e8c9a0",
		shelf: 2,
		slot: 1
	},
	{
		id: "skills",
		title: "Skills",
		spine: "Skills",
		subtitle: "Craft, tools, and instincts",
		color: "#1f4a4a",
		accent: "#b7e0d4",
		shelf: 1,
		slot: 2
	},
	{
		id: "projects",
		title: "Projects",
		spine: "Works",
		subtitle: "Worlds that shipped",
		color: "#8a3b22",
		accent: "#f0c08a",
		shelf: 2,
		slot: 4
	},
	{
		id: "experience",
		title: "Experience",
		spine: "Years",
		subtitle: "Rooms I have worked in",
		color: "#2d4a2a",
		accent: "#c5d9b0",
		shelf: 3,
		slot: 1
	},
	{
		id: "education",
		title: "Education",
		spine: "Study",
		subtitle: "Where the light came in",
		color: "#24344d",
		accent: "#c5d4ee",
		shelf: 1,
		slot: 5
	},
	{
		id: "certs",
		title: "Certifications",
		spine: "Seals",
		subtitle: "Marks of practice",
		color: "#5c2438",
		accent: "#f0c0cc",
		shelf: 3,
		slot: 4
	},
	{
		id: "contact",
		title: "Contact",
		spine: "Write",
		subtitle: "Leave the door ajar",
		color: "#2a2420",
		accent: "#e8dcc8",
		shelf: 4,
		slot: 2
	}
];
var SKILL_GROUPS = [
	{
		name: "Real-time & 3D",
		skills: [
			{
				name: "Three.js / R3F",
				level: 94
			},
			{
				name: "WebGL / GLSL",
				level: 86
			},
			{
				name: "Blender look-dev",
				level: 78
			},
			{
				name: "Lighting & cinematography",
				level: 90
			}
		]
	},
	{
		name: "Product engineering",
		skills: [
			{
				name: "React / TypeScript",
				level: 96
			},
			{
				name: "Motion (GSAP / FM)",
				level: 92
			},
			{
				name: "Node / Python",
				level: 80
			},
			{
				name: "Design systems",
				level: 88
			}
		]
	},
	{
		name: "Story & sound",
		skills: [
			{
				name: "Interactive narrative",
				level: 91
			},
			{
				name: "Spatial / adaptive audio",
				level: 76
			},
			{
				name: "Art direction",
				level: 84
			},
			{
				name: "Prototyping",
				level: 92
			}
		]
	}
];
var PROJECTS = [
	{
		id: "lantern",
		name: "Paper Lantern",
		year: "2025",
		role: "Director of engineering",
		blurb: "A WebGL story engine for illustrated books. Pages breathe, ink dries, and chapters remember how you held them.",
		stack: [
			"Three.js",
			"GSAP",
			"Web Audio",
			"React"
		],
		hue: "#c4843a"
	},
	{
		id: "atlas",
		name: "Northwind Atlas",
		year: "2024",
		role: "Creative technologist",
		blurb: "A 3D climate-data experience that turns satellite years into a single golden afternoon over the polar sea.",
		stack: [
			"R3F",
			"d3",
			"Mapbox",
			"GLSL"
		],
		hue: "#3d6b6b"
	},
	{
		id: "ember",
		name: "Ember Terminal",
		year: "2024",
		role: "Solo",
		blurb: "A cinematic desktop metaphor for portfolios — windows as memories, folders as rooms, boot-up as overture.",
		stack: [
			"React",
			"Framer Motion",
			"Canvas"
		],
		hue: "#8a3b22"
	},
	{
		id: "orbit",
		name: "Quiet Orbit",
		year: "2023",
		role: "Sound + visuals",
		blurb: "A spatial-audio meditation where constellations rearrange around your cursor and the room hushes with you.",
		stack: [
			"Web Audio",
			"Three.js",
			"Tone.js"
		],
		hue: "#24344d"
	},
	{
		id: "grain",
		name: "Frame & Grain",
		year: "2023",
		role: "Open source",
		blurb: "A film-look toolkit for the web: halation, gate weave, and print stock as CSS and shader primitives.",
		stack: [
			"GLSL",
			"Postprocessing",
			"CSS"
		],
		hue: "#5c2438"
	}
];
var EXPERIENCE = [
	{
		company: "Studio North",
		role: "Senior Creative Technologist",
		years: "2023 — Present",
		place: "Remote",
		points: [
			"Lead immersive web for film, culture, and product launches.",
			"Shipped three award-listed 3D brand worlds with 60fps on mid-range laptops.",
			"Built an in-house lighting rig and camera language now used across the studio."
		]
	},
	{
		company: "Frame & Folly",
		role: "Interactive developer",
		years: "2021 — 2023",
		place: "Bengaluru",
		points: [
			"Crafted scroll-driven stories and WebGL product configurators.",
			"Partnered with directors to translate animatics into real-time scenes.",
			"Mentored a small frontend pod on motion, accessibility, and performance."
		]
	},
	{
		company: "Helix Labs",
		role: "Frontend engineer",
		years: "2019 — 2021",
		place: "Chennai",
		points: ["Designed the component system behind a design-ops platform.", "Introduced cinematic onboarding that lifted activation 18%."]
	}
];
var EDUCATION = [{
	place: "National Institute of Technology",
	credential: "B.Tech, Computer Science",
	years: "2015 — 2019",
	note: "Thesis on real-time global illumination approximations for the browser."
}, {
	place: "CGMA",
	credential: "Lighting for Animation",
	years: "2020",
	note: "Cinematic lighting, color script, and mood — the language this room speaks."
}];
var CERTS = [
	{
		name: "Three.js Journey",
		by: "Bruno Simon",
		year: "2022"
	},
	{
		name: "Google UX Design",
		by: "Coursera",
		year: "2021"
	},
	{
		name: "AWS Cloud Practitioner",
		by: "Amazon",
		year: "2023"
	},
	{
		name: "Advanced WebGL",
		by: "The Book of Shaders lab",
		year: "2024"
	}
];
var ABOUT_PAGES = [
	"I grew up in rooms like this one — late light, a desk that hummed, books that were more doors than objects. I never really left.",
	"My work sits where software meets set design. I care about the weight of a camera move, the honesty of a material, the way a click can feel like turning a key.",
	"If you are building something that should feel alive — a product, a film companion, a place on the web — the kettle is on. Come in."
];
var ctx = null;
var bus = null;
var unlocked = false;
var ambStarted = false;
var muted = false;
var buffers = /* @__PURE__ */ new Map();
function now() {
	return ctx?.currentTime ?? 0;
}
function makeCtx() {
	if (ctx) return ctx;
	ctx = new (window.AudioContext || window.webkitAudioContext)({ latencyHint: "interactive" });
	const master = ctx.createGain();
	const music = ctx.createGain();
	const sfx = ctx.createGain();
	const amb = ctx.createGain();
	master.gain.value = .85;
	music.gain.value = .22;
	sfx.gain.value = .45;
	amb.gain.value = .28;
	music.connect(master);
	sfx.connect(master);
	amb.connect(master);
	master.connect(ctx.destination);
	bus = {
		master,
		music,
		sfx,
		amb
	};
	return ctx;
}
function noiseBuffer(seconds, kind) {
	const c = makeCtx();
	const len = Math.floor(c.sampleRate * seconds);
	const buf = c.createBuffer(1, len, c.sampleRate);
	const data = buf.getChannelData(0);
	let last = 0;
	let b0 = 0, b1 = 0, b2 = 0;
	for (let i = 0; i < len; i++) {
		const white = Math.random() * 2 - 1;
		if (kind === "white") data[i] = white * .4;
		else if (kind === "brown") {
			last = (last + .02 * white) / 1.02;
			data[i] = last * 3.2;
		} else {
			b0 = .99765 * b0 + white * .099046;
			b1 = .963 * b1 + white * .2965;
			b2 = .57 * b2 + white * 1.0529;
			data[i] = (b0 + b1 + b2 + white * .1848) * .11;
		}
	}
	return buf;
}
function envGain(parent, attack, hold, release, peak = 1) {
	if (!ctx) return;
	const g = ctx.createGain();
	g.gain.setValueAtTime(1e-4, now());
	g.gain.exponentialRampToValueAtTime(peak, now() + attack);
	g.gain.setValueAtTime(peak, now() + attack + hold);
	g.gain.exponentialRampToValueAtTime(1e-4, now() + attack + hold + release);
	g.connect(parent);
	return g;
}
function playBuffer(name, dest, opts) {
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
		const grain = (Math.random() * 2 - 1) * .15 * Math.exp(-t * 2);
		d[i] = sweep * .55 + grain;
	}
	return buf;
}
function makeClick() {
	const c = makeCtx();
	const len = Math.floor(c.sampleRate * .08);
	const buf = c.createBuffer(1, len, c.sampleRate);
	const d = buf.getChannelData(0);
	for (let i = 0; i < len; i++) {
		const t = i / c.sampleRate;
		d[i] = Math.sin(2 * Math.PI * 1800 * t) * Math.exp(-t * 70) * .5 + (Math.random() * 2 - 1) * Math.exp(-t * 90) * .2;
	}
	return buf;
}
function makeWhoosh() {
	const c = makeCtx();
	const len = Math.floor(c.sampleRate * .7);
	const buf = c.createBuffer(1, len, c.sampleRate);
	const d = buf.getChannelData(0);
	for (let i = 0; i < len; i++) {
		const t = i / c.sampleRate;
		const env = Math.sin(t / .7 * Math.PI);
		d[i] = (Math.random() * 2 - 1) * env * .35;
	}
	return buf;
}
function makePage() {
	const c = makeCtx();
	const len = Math.floor(c.sampleRate * .45);
	const buf = c.createBuffer(1, len, c.sampleRate);
	const d = buf.getChannelData(0);
	for (let i = 0; i < len; i++) {
		const t = i / c.sampleRate;
		d[i] = (Math.random() * 2 - 1) * Math.exp(-t * 8) * (.3 + .7 * Math.sin(t * 40));
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
		const b = Math.sin(2 * Math.PI * 660 * t) * Math.exp(-t * 2.2) * .25;
		d[i] = (a + b) * .4;
	}
	return buf;
}
function startPad() {
	if (!ctx || !bus) return;
	[
		146.83,
		220,
		293.66,
		329.63
	].forEach((freq, i) => {
		const osc = ctx.createOscillator();
		const g = ctx.createGain();
		const f = ctx.createBiquadFilter();
		osc.type = i % 2 === 0 ? "sine" : "triangle";
		osc.frequency.value = freq;
		osc.detune.value = (i - 1.5) * 6;
		f.type = "lowpass";
		f.frequency.value = 700 + i * 80;
		g.gain.value = 1e-4;
		osc.connect(f);
		f.connect(g);
		g.connect(bus.music);
		osc.start();
		const t = now();
		g.gain.exponentialRampToValueAtTime(.045 / (i + 1), t + 3 + i);
		const lfo = ctx.createOscillator();
		const lg = ctx.createGain();
		lfo.frequency.value = .05 + i * .02;
		lg.gain.value = .012;
		lfo.connect(lg);
		lg.connect(g.gain);
		lfo.start();
	});
}
function startAmbience() {
	if (!ctx || !bus || ambStarted) return;
	ambStarted = true;
	const brown = ctx.createBufferSource();
	brown.buffer = buffers.get("brown");
	brown.loop = true;
	const bp = ctx.createBiquadFilter();
	bp.type = "lowpass";
	bp.frequency.value = 380;
	const g = ctx.createGain();
	g.gain.value = .35;
	brown.connect(bp);
	bp.connect(g);
	g.connect(bus.amb);
	brown.start();
	const wind = ctx.createBufferSource();
	wind.buffer = buffers.get("pink");
	wind.loop = true;
	const wbp = ctx.createBiquadFilter();
	wbp.type = "bandpass";
	wbp.frequency.value = 900;
	wbp.Q.value = .7;
	const wg = ctx.createGain();
	wg.gain.value = .12;
	wind.connect(wbp);
	wbp.connect(wg);
	wg.connect(bus.amb);
	wind.start();
	const lfo = ctx.createOscillator();
	const lg = ctx.createGain();
	lfo.frequency.value = .07;
	lg.gain.value = .08;
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
		if (!muted && ambStarted) play("creak", { rate: .85 + Math.random() * .3 });
		scheduleCreaks();
	}, wait * 1e3);
}
var rainNode = null;
var audio = {
	unlock() {
		makeCtx();
		if (!ctx) return;
		if (ctx.state === "suspended") ctx.resume();
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
		if (ctx?.state === "suspended") ctx.resume();
	},
	setMuted(v) {
		muted = v;
		if (!bus || !ctx) return;
		bus.master.gain.setTargetAtTime(v ? 1e-4 : .85, now(), .04);
	},
	setMusic(v) {
		if (!bus || !ctx) return;
		bus.music.gain.setTargetAtTime(Math.max(1e-4, v * v * .4), now(), .08);
	},
	play(name, opts) {
		if (!ctx || !bus || muted) return;
		if (name === "hover") {
			const osc = ctx.createOscillator();
			const g = envGain(bus.sfx, .005, .02, .08, .04);
			if (!g) return;
			osc.type = "sine";
			osc.frequency.value = 880 + Math.random() * 200;
			osc.connect(g);
			osc.start();
			osc.stop(now() + .12);
			return;
		}
		if (name === "key") {
			const osc = ctx.createOscillator();
			const g = envGain(bus.sfx, .001, .01, .05, .08);
			if (!g) return;
			osc.type = "square";
			osc.frequency.value = 420 + Math.random() * 180;
			const f = ctx.createBiquadFilter();
			f.type = "bandpass";
			f.frequency.value = 1800;
			osc.connect(f);
			f.connect(g);
			osc.start();
			osc.stop(now() + .07);
			return;
		}
		const dest = ctx.createGain();
		dest.gain.value = name === "creak" ? .35 : .7;
		dest.connect(bus.sfx);
		playBuffer(name, dest, { rate: (opts?.rate ?? 1) * (.96 + Math.random() * .08) });
	},
	setRain(on) {
		if (!ctx || !bus) return;
		if (on && !rainNode) {
			const src = ctx.createBufferSource();
			src.buffer = buffers.get("white");
			src.loop = true;
			const f = ctx.createBiquadFilter();
			f.type = "highpass";
			f.frequency.value = 1800;
			const g = ctx.createGain();
			g.gain.value = 1e-4;
			src.connect(f);
			f.connect(g);
			g.connect(bus.amb);
			src.start();
			g.gain.setTargetAtTime(.18, now(), .4);
			rainNode = {
				src,
				g
			};
		} else if (!on && rainNode) {
			rainNode.g.gain.setTargetAtTime(1e-4, now(), .35);
			const node = rainNode;
			rainNode = null;
			window.setTimeout(() => {
				try {
					node.src.stop();
					node.src.disconnect();
				} catch {}
			}, 800);
		}
	}
};
function play(name, opts) {
	audio.play(name, opts);
}
function cn(...parts) {
	return parts.filter(Boolean).join(" ");
}
function CloseBtn({ onClick, className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		type: "button",
		"aria-label": "Close",
		onClick,
		className: cn("grid size-11 shrink-0 place-items-center rounded-full border border-current/20 transition-transform duration-150 hover:border-amber-deep active:scale-[0.96]", className),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-4" })
	});
}
function BookReader() {
	const id = useWorld((s) => s.openBook);
	const book = BOOKS.find((b) => b.id === id);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, { children: book && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
		className: "pointer-events-auto absolute inset-0 z-20 flex items-center justify-center bg-ink/55 px-3 py-6 md:px-8",
		initial: { opacity: 0 },
		animate: { opacity: 1 },
		exit: {
			opacity: 0,
			transition: { duration: .2 }
		},
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.article, {
			className: "paper-grain relative flex max-h-[min(92dvh,820px)] w-full max-w-4xl flex-col overflow-hidden rounded-[28px] text-ink shadow-[0_40px_120px_rgba(0,0,0,0.55)]",
			initial: {
				opacity: 0,
				y: 18,
				scale: .96,
				filter: "blur(6px)"
			},
			animate: {
				opacity: 1,
				y: 0,
				scale: 1,
				filter: "blur(0px)"
			},
			exit: {
				opacity: 0,
				y: 10,
				scale: .98,
				filter: "blur(4px)"
			},
			transition: {
				duration: .45,
				ease: [
					.22,
					1,
					.36,
					1
				]
			},
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "flex items-start justify-between gap-4 border-b border-ink/10 px-6 py-5 md:px-10",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs tracking-[0.28em] text-wood uppercase",
						children: book.spine
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mt-1 font-display text-4xl text-ink md:text-5xl",
						children: book.title
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-sm text-wood/80",
						children: book.subtitle
					})
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CloseBtn, {
					className: "text-ink",
					onClick: () => {
						play("page");
						useWorld.getState().setBook(null);
					}
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "min-h-0 flex-1 overflow-y-auto px-6 py-6 md:px-10 md:py-8",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pages, { id: book.id })
			})]
		})
	}) });
}
function Pages({ id }) {
	if (id === "about") return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid gap-8 md:grid-cols-2",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-display text-3xl text-ink",
				children: PERSON.fullName
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-1 text-sm text-wood",
				children: [
					PERSON.title,
					" · ",
					PERSON.location
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-6 text-base leading-relaxed text-ink/80",
				children: PERSON.summary
			})
		] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "space-y-5",
			children: ABOUT_PAGES.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-display text-xl leading-relaxed text-ink/85 italic",
				children: p
			}, p))
		})]
	});
	if (id === "skills") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "grid gap-8 md:grid-cols-3",
		children: SKILL_GROUPS.map((g) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
			className: "font-display text-2xl",
			children: g.name
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
			className: "mt-4 space-y-4",
			children: g.skills.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex justify-between text-sm",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: s.name }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "tabular-nums text-wood",
					children: s.level
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-1.5 h-1 overflow-hidden rounded-full bg-ink/10",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
					className: "h-full bg-amber-deep",
					initial: { width: 0 },
					animate: { width: `${s.level}%` },
					transition: {
						duration: .8,
						ease: [
							.22,
							1,
							.36,
							1
						]
					}
				})
			})] }, s.name))
		})] }, g.name))
	});
	if (id === "projects") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "grid gap-4 md:grid-cols-2",
		children: PROJECTS.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
			className: "rounded-2xl border border-ink/10 bg-paper/40 p-5",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-baseline justify-between gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "font-display text-2xl",
						children: p.name
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-xs tabular-nums text-wood",
						children: p.year
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-xs tracking-wide text-wood uppercase",
					children: p.role
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 text-sm leading-relaxed text-ink/80",
					children: p.blurb
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-4 text-xs text-wood",
					children: p.stack.join(" · ")
				})
			]
		}, p.id))
	});
	if (id === "experience") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
		className: "relative space-y-8 border-l border-ink/15 pl-6",
		children: EXPERIENCE.map((job) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "absolute -left-1.5 mt-1.5 size-3 rounded-full bg-amber-deep" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs tabular-nums text-wood",
				children: job.years
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
				className: "font-display text-2xl",
				children: job.role
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "text-sm text-wood",
				children: [
					job.company,
					" · ",
					job.place
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "mt-3 space-y-1.5 text-sm leading-relaxed text-ink/80",
				children: job.points.map((pt) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: pt }, pt))
			})
		] }, job.company))
	});
	if (id === "education") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "space-y-6",
		children: EDUCATION.map((ed) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
			className: "rounded-2xl border border-ink/10 p-5",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs tabular-nums text-wood",
					children: ed.years
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "font-display text-2xl",
					children: ed.credential
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-wood",
					children: ed.place
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 text-sm leading-relaxed text-ink/80",
					children: ed.note
				})
			]
		}, ed.place))
	});
	if (id === "certs") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
		className: "grid gap-3 md:grid-cols-2",
		children: CERTS.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
			className: "rounded-2xl border border-ink/10 px-5 py-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-display text-xl",
				children: c.name
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-1 text-sm text-wood",
				children: [
					c.by,
					" · ",
					c.year
				]
			})]
		}, c.name))
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "max-w-lg",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-display text-3xl",
				children: PERSON.availability
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-4 text-base leading-relaxed text-ink/80",
				children: [
					"Write to ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-wood",
						children: PERSON.email
					}),
					". Tell me about the room you want to build — a product, a film companion, a place that should feel like it has a pulse."
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
				href: `mailto:${PERSON.email}`,
				className: "mt-8 inline-flex min-h-11 items-center rounded-full bg-ink px-5 text-sm text-paper transition-transform duration-150 active:scale-[0.96]",
				children: "Send a letter"
			})
		]
	});
}
var APPS = [
	{
		id: "about",
		label: "Resume",
		icon: User
	},
	{
		id: "projects",
		label: "Projects",
		icon: Folder
	},
	{
		id: "skills",
		label: "Skills",
		icon: Sparkles
	},
	{
		id: "experience",
		label: "Experience",
		icon: Briefcase
	},
	{
		id: "education",
		label: "Education",
		icon: GraduationCap
	},
	{
		id: "certs",
		label: "Seals",
		icon: Award
	},
	{
		id: "contact",
		label: "Contact",
		icon: Mail
	}
];
function DesktopOS() {
	const open = useWorld((s) => s.desktopOpen);
	const wallpaper = useWorld((s) => s.wallpaper);
	const [app, setApp] = (0, import_react.useState)("home");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, { children: open && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
		className: "pointer-events-auto absolute inset-0 z-30 flex flex-col bg-ink",
		initial: { opacity: 0 },
		animate: { opacity: 1 },
		exit: {
			opacity: 0,
			transition: { duration: .2 }
		},
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative min-h-0 flex-1 overflow-hidden",
			style: { background: [
				"radial-gradient(1200px 600px at 80% 10%, #c4843a55, transparent), linear-gradient(160deg,#1a120c,#2a1c14 40%,#0e1c1c)",
				"radial-gradient(900px 500px at 20% 80%, #3d6b6b66, transparent), linear-gradient(180deg,#0e1418,#1a2428)",
				"radial-gradient(800px 400px at 70% 30%, #8a3b2255, transparent), linear-gradient(200deg,#140e12,#241018)"
			][wallpaper] },
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "flex items-center justify-between px-4 py-3 md:px-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: "font-display text-lg text-paper",
					onClick: () => {
						play("click");
						useWorld.getState().cycleWallpaper();
					},
					children: "Vasanth OS"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "hidden text-xs text-muted md:inline",
						children: "click the title to change wallpaper"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CloseBtn, {
						className: "text-paper",
						onClick: () => {
							play("whoosh");
							useWorld.getState().setDesktop(false, null);
							setApp("home");
						}
					})]
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, {
				mode: "wait",
				children: app === "home" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
					className: "grid grid-cols-3 gap-4 px-6 py-8 sm:grid-cols-4 md:grid-cols-7 md:px-10",
					initial: {
						opacity: 0,
						y: 10
					},
					animate: {
						opacity: 1,
						y: 0
					},
					exit: {
						opacity: 0,
						y: -8
					},
					children: APPS.map((a, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.button, {
						type: "button",
						initial: {
							opacity: 0,
							y: 8
						},
						animate: {
							opacity: 1,
							y: 0
						},
						transition: { delay: i * .04 },
						onClick: () => {
							play("click");
							setApp(a.id);
						},
						className: "group flex flex-col items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "grid size-14 place-items-center rounded-2xl border border-line bg-glass/70 text-paper transition-transform duration-150 group-hover:border-amber group-active:scale-[0.96]",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(a.icon, {
								className: "size-5",
								strokeWidth: 1.6
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-xs text-paper-dim",
							children: a.label
						})]
					}, a.id))
				}, "home") : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Window, {
					id: app,
					onClose: () => setApp("home")
				}, app)
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
			className: "flex items-center justify-center gap-1 border-t border-line bg-ink-soft/90 px-2 py-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				className: "grid size-11 place-items-center rounded-xl text-paper-dim hover:text-paper",
				onClick: () => setApp("home"),
				"aria-label": "Desktop",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Monitor, { className: "size-4" })
			}), APPS.map((a) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				"aria-label": a.label,
				onClick: () => {
					play("hover");
					setApp(a.id);
				},
				className: cn("grid size-11 place-items-center rounded-xl", app === a.id ? "bg-paper/10 text-paper" : "text-paper-dim hover:text-paper"),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(a.icon, { className: "size-4" })
			}, a.id))]
		})]
	}) });
}
function Window({ id, onClose }) {
	const title = APPS.find((a) => a.id === id)?.label ?? id;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.section, {
		className: "glass-panel mx-3 mb-3 max-h-[calc(100%-1rem)] overflow-hidden rounded-[22px] md:mx-8",
		initial: {
			opacity: 0,
			y: 12,
			scale: .97
		},
		animate: {
			opacity: 1,
			y: 0,
			scale: 1
		},
		exit: {
			opacity: 0,
			y: 8,
			scale: .99
		},
		transition: {
			duration: .28,
			ease: [
				.22,
				1,
				.36,
				1
			]
		},
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
			className: "flex items-center justify-between border-b border-line px-5 py-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BookOpen, { className: "size-4 text-amber" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-xl text-paper",
					children: title
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				onClick: onClose,
				className: "text-xs tracking-wide text-muted uppercase hover:text-paper",
				children: "Back"
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "max-h-[min(70dvh,640px)] overflow-y-auto p-5 md:p-7",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppBody, { id })
		})]
	});
}
function AppBody({ id }) {
	if (id === "about") return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid gap-8 md:grid-cols-[200px_1fr]",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid place-items-center rounded-2xl border border-line bg-ink-soft py-8",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "font-display text-7xl text-amber",
				children: "V"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-xs tracking-[0.2em] text-muted uppercase",
				children: "Profile"
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-display text-4xl text-paper",
				children: PERSON.fullName
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-1 text-sm text-muted",
				children: [
					PERSON.title,
					" · ",
					PERSON.location
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-5 max-w-prose text-sm leading-relaxed text-paper-dim",
				children: PERSON.summary
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
				className: "mt-6 grid grid-cols-2 gap-3 text-sm",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						k: "Years",
						v: `${PERSON.years}+`
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						k: "Focus",
						v: "Real-time story"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						k: "Status",
						v: PERSON.availability
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						k: "Mail",
						v: PERSON.email
					})
				]
			})
		] })]
	});
	if (id === "projects") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "grid gap-4 md:grid-cols-2",
		children: PROJECTS.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
			className: "rounded-2xl border border-line bg-ink-soft/60 p-5",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-baseline justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "font-display text-2xl text-paper",
						children: p.name
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-xs text-muted",
						children: p.year
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm leading-relaxed text-paper-dim",
					children: p.blurb
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-4 flex flex-wrap gap-1.5",
					children: p.stack.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "rounded-full border border-line px-2 py-0.5 text-[11px] text-amber",
						children: s
					}, s))
				})
			]
		}, p.id))
	});
	if (id === "skills") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "space-y-8",
		children: SKILL_GROUPS.map((g) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
			className: "font-display text-2xl text-paper",
			children: g.name
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-4 grid gap-3",
			children: g.skills.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex justify-between text-sm text-paper-dim",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: s.name }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "tabular-nums",
					children: s.level
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-1 h-1.5 overflow-hidden rounded-full bg-paper/10",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
					className: "h-full rounded-full bg-amber",
					initial: { width: 0 },
					animate: { width: `${s.level}%` },
					transition: { duration: .7 }
				})
			})] }, s.name))
		})] }, g.name))
	});
	if (id === "experience") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "space-y-6",
		children: EXPERIENCE.map((job) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
			className: "rounded-2xl border border-line p-5",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs text-muted",
					children: job.years
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "font-display text-2xl text-paper",
					children: job.role
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-sm text-amber",
					children: [
						job.company,
						" · ",
						job.place
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "mt-3 space-y-1 text-sm text-paper-dim",
					children: job.points.map((pt) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: pt }, pt))
				})
			]
		}, job.company))
	});
	if (id === "education") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "space-y-4",
		children: EDUCATION.map((ed) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
			className: "rounded-2xl border border-line p-5",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs text-muted",
					children: ed.years
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "font-display text-2xl text-paper",
					children: ed.credential
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-amber",
					children: ed.place
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-paper-dim",
					children: ed.note
				})
			]
		}, ed.place))
	});
	if (id === "certs") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
		className: "grid gap-3 sm:grid-cols-2",
		children: CERTS.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
			className: "rounded-2xl border border-line px-4 py-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-display text-xl text-paper",
				children: c.name
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "text-sm text-muted",
				children: [
					c.by,
					" · ",
					c.year
				]
			})]
		}, c.name))
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ContactForm, {});
}
function Stat({ k, v }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-xl border border-line px-3 py-2",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
			className: "text-[11px] tracking-wide text-muted uppercase",
			children: k
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
			className: "mt-0.5 text-sm text-paper",
			children: v
		})]
	});
}
function ContactForm() {
	const [sent, setSent] = (0, import_react.useState)(false);
	const [name, setName] = (0, import_react.useState)("");
	const [note, setNote] = (0, import_react.useState)("");
	const stamp = (0, import_react.useMemo)(() => (/* @__PURE__ */ new Date()).toISOString().slice(0, 10), []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "max-w-lg",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-display text-3xl text-paper",
				children: "Leave a note on the desk."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-2 text-sm text-paper-dim",
				children: ["It stays on this machine — a paperweight, not a server. For real mail: ", PERSON.email]
			}),
			sent ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-8 font-display text-xl text-amber",
				children: [
					"Tucked under the keyboard. Thank you, ",
					name || "friend",
					"."
				]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				className: "mt-6 space-y-3",
				onSubmit: (e) => {
					e.preventDefault();
					play("boot");
					try {
						localStorage.setItem("vasanth-note", JSON.stringify({
							name,
							note,
							stamp
						}));
					} catch {}
					setSent(true);
				},
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "block text-xs tracking-wide text-muted uppercase",
						children: ["Name", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							value: name,
							onChange: (e) => setName(e.target.value),
							className: "mt-1 min-h-11 w-full rounded-xl border border-line bg-ink-soft px-3 text-sm text-paper outline-none focus:border-amber"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "block text-xs tracking-wide text-muted uppercase",
						children: ["Note", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
							value: note,
							onChange: (e) => setNote(e.target.value),
							rows: 4,
							className: "mt-1 w-full rounded-xl border border-line bg-ink-soft px-3 py-2 text-sm text-paper outline-none focus:border-amber"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "submit",
						className: "min-h-11 rounded-full bg-paper px-5 text-sm text-ink transition-transform duration-150 active:scale-[0.96]",
						children: "Place on the desk"
					})
				]
			})
		]
	});
}
function Overlays() {
	const phase = useWorld((s) => s.phase);
	const progress = useWorld((s) => s.loadProgress);
	const introTitle = useWorld((s) => s.introTitle);
	const hint = useWorld((s) => s.hint);
	const isMobile = useWorld((s) => s.isMobile);
	const rain = useWorld((s) => s.rain);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "pointer-events-none absolute inset-0 z-50",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "letterbox absolute inset-x-0 top-0 h-8 bg-gradient-to-b from-ink to-transparent md:h-10" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "letterbox absolute inset-x-0 bottom-0 h-8 bg-gradient-to-t from-ink to-transparent md:h-10" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, { children: phase === "boot" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Boot, { progress }) }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, { children: phase === "door" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DoorCopy, {}) }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, { children: introTitle && phase !== "boot" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WelcomeTitle, {}) }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, { children: phase === "room" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Hud, {}) }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, { children: hint && phase !== "boot" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Hint, { text: hint }) }),
			rain && phase === "room" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RainOverlay, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BookReader, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DesktopOS, {}),
			isMobile && phase === "room" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MobileNav, {})
		]
	});
}
function Boot({ progress }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
		className: "pointer-events-auto absolute inset-0 flex flex-col items-center justify-center bg-ink px-6",
		initial: { opacity: 1 },
		exit: {
			opacity: 0,
			transition: {
				duration: .8,
				ease: [
					.22,
					1,
					.36,
					1
				]
			}
		},
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-display text-sm tracking-[0.32em] text-amber uppercase",
				children: "A room, waiting"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "mt-4 max-w-xl text-center font-display text-4xl font-medium leading-tight text-paper md:text-6xl",
				children: "Every room tells a story."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-4 max-w-md text-center text-sm text-muted",
				children: "Lighting the lamps, dusting the shelves, warming the wood."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-10 h-px w-48 overflow-hidden bg-line",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
					className: "h-full bg-amber",
					style: { width: `${progress}%` },
					transition: { duration: .2 }
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-3 font-sans text-xs tabular-nums tracking-widest text-muted",
				children: [Math.round(progress), "%"]
			})
		]
	});
}
function DoorCopy() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
		className: "pointer-events-none absolute inset-x-0 bottom-16 flex flex-col items-center px-6 md:bottom-20",
		initial: {
			opacity: 0,
			y: 12,
			filter: "blur(4px)"
		},
		animate: {
			opacity: 1,
			y: 0,
			filter: "blur(0px)"
		},
		exit: {
			opacity: 0,
			y: -8,
			filter: "blur(4px)"
		},
		transition: {
			duration: .7,
			ease: [
				.22,
				1,
				.36,
				1
			]
		},
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-display text-3xl text-paper md:text-4xl",
				children: "Vasanth's World"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-sm text-muted",
				children: "Click the handle. The light will do the rest."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				className: "pointer-events-auto mt-6 rounded-full border border-line bg-ink-soft/70 px-5 py-2.5 text-sm text-paper transition-transform duration-150 ease-out hover:border-amber active:scale-[0.96]",
				onClick: () => {
					play("creak");
					useWorld.getState().openTheDoor();
				},
				children: "Enter"
			})
		]
	});
}
function WelcomeTitle() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
		className: "absolute inset-0 flex items-center justify-center",
		initial: { opacity: 0 },
		animate: { opacity: 1 },
		exit: {
			opacity: 0,
			filter: "blur(6px)",
			transition: { duration: 1.1 }
		},
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "text-center",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.p, {
				className: "font-display text-sm tracking-[0.4em] text-amber uppercase",
				initial: {
					opacity: 0,
					y: 10
				},
				animate: {
					opacity: 1,
					y: 0
				},
				transition: {
					delay: .4,
					duration: .8
				},
				children: "Welcome to"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.h2, {
				className: "mt-2 font-display text-5xl text-paper md:text-7xl",
				initial: {
					opacity: 0,
					y: 16,
					filter: "blur(6px)"
				},
				animate: {
					opacity: 1,
					y: 0,
					filter: "blur(0px)"
				},
				transition: {
					delay: .7,
					duration: 1
				},
				children: "Vasanth's World"
			})]
		})
	});
}
function Hint({ text }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
		className: "absolute bottom-24 left-1/2 -translate-x-1/2 rounded-full border border-line bg-ink-soft/80 px-4 py-1.5 text-xs tracking-wide text-paper-dim",
		initial: {
			opacity: 0,
			y: 6
		},
		animate: {
			opacity: 1,
			y: 0
		},
		exit: {
			opacity: 0,
			y: 4
		},
		children: text
	});
}
var PLACES = [
	{
		id: "overview",
		label: "Room",
		icon: Sun
	},
	{
		id: "bookshelf",
		label: "Books",
		icon: BookOpen
	},
	{
		id: "desk",
		label: "Desk",
		icon: Monitor
	},
	{
		id: "window",
		label: "Window",
		icon: CloudRain
	},
	{
		id: "bed",
		label: "Bed",
		icon: Lamp
	}
];
function Hud() {
	const focus = useWorld((s) => s.focus);
	const muted = useWorld((s) => s.muted);
	const lampOn = useWorld((s) => s.lampOn);
	const rain = useWorld((s) => s.rain);
	const mood = useWorld((s) => s.mood);
	const desktopOpen = useWorld((s) => s.desktopOpen);
	const openBook = useWorld((s) => s.openBook);
	if (desktopOpen || openBook) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
		className: "pointer-events-auto absolute inset-x-0 bottom-6 hidden items-end justify-between px-5 md:flex lg:px-8",
		initial: {
			opacity: 0,
			y: 10
		},
		animate: {
			opacity: 1,
			y: 0
		},
		exit: {
			opacity: 0,
			y: 8
		},
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "flex gap-1 rounded-full border border-line bg-ink-soft/75 p-1 backdrop-blur-md",
			children: PLACES.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				type: "button",
				onClick: () => {
					play("whoosh");
					useWorld.getState().setFocus(p.id);
				},
				className: cn("flex items-center gap-2 rounded-full px-3 py-2 text-xs transition-colors duration-200", focus === p.id ? "bg-paper text-ink" : "text-paper-dim hover:text-paper"),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(p.icon, {
					className: "size-3.5",
					strokeWidth: 1.75
				}), p.label]
			}, p.id))
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex gap-1 rounded-full border border-line bg-ink-soft/75 p-1 backdrop-blur-md",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconBtn, {
					label: muted ? "Unmute" : "Mute",
					onClick: () => useWorld.getState().toggleMute(),
					children: muted ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(VolumeX, { className: "size-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Volume2, { className: "size-4" })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconBtn, {
					label: "Lamp",
					onClick: () => useWorld.getState().toggleLamp(),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lamp, { className: cn("size-4", lampOn && "text-amber") })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconBtn, {
					label: "Rain",
					onClick: () => useWorld.getState().toggleRain(),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CloudRain, { className: cn("size-4", rain && "text-amber") })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconBtn, {
					label: "Night",
					onClick: () => useWorld.getState().setMood(mood === "night" ? "golden" : "night"),
					children: mood === "night" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Moon, { className: "size-4 text-amber" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sun, { className: "size-4" })
				})
			]
		})]
	});
}
function IconBtn({ children, onClick, label }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		type: "button",
		"aria-label": label,
		onClick: () => {
			play("click");
			onClick();
		},
		className: "grid size-10 place-items-center rounded-full text-paper-dim transition-colors duration-150 hover:text-paper",
		children
	});
}
function RainOverlay() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "pointer-events-none absolute inset-0 opacity-35",
		style: { backgroundImage: "repeating-linear-gradient(185deg, transparent 0 14px, rgba(197,208,224,0.2) 14px 15px)" }
	});
}
function MobileNav() {
	const focus = useWorld((s) => s.focus);
	const desktopOpen = useWorld((s) => s.desktopOpen);
	const openBook = useWorld((s) => s.openBook);
	if (desktopOpen || openBook) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "pointer-events-auto absolute inset-x-3 bottom-4 flex gap-1 overflow-x-auto rounded-full border border-line bg-ink-soft/85 p-1 md:hidden",
		children: PLACES.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			type: "button",
			onClick: () => useWorld.getState().setFocus(p.id),
			className: cn("min-h-11 flex-1 rounded-full px-2 text-xs", focus === p.id ? "bg-paper text-ink" : "text-paper-dim"),
			children: p.label
		}, p.id))
	});
}
function Experience() {
	const [World, setWorld] = (0, import_react.useState)(null);
	const hydrate = useWorld((s) => s.hydrate);
	const setProgress = useWorld((s) => s.setProgress);
	const setPhase = useWorld((s) => s.setPhase);
	const muted = useWorld((s) => s.muted);
	const rain = useWorld((s) => s.rain);
	const phase = useWorld((s) => s.phase);
	(0, import_react.useEffect)(() => {
		hydrate();
		window.__world = useWorld;
		let alive = true;
		import("./World-C2JK5WuU.mjs").then((m) => {
			if (alive) setWorld(() => m.World);
		});
		return () => {
			alive = false;
		};
	}, [hydrate]);
	(0, import_react.useEffect)(() => {
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
	(0, import_react.useEffect)(() => {
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
	(0, import_react.useEffect)(() => {
		audio.setMuted(muted);
	}, [muted]);
	(0, import_react.useEffect)(() => {
		audio.setRain(rain);
	}, [rain]);
	(0, import_react.useEffect)(() => {
		audio.setMusic(phase === "room" ? .55 : phase === "door" ? .85 : .4);
	}, [phase]);
	(0, import_react.useEffect)(() => {
		const onKey = (e) => {
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
			if (e.key === "n" || e.key === "N") s.setMood(s.mood === "night" ? "golden" : "night");
		};
		window.addEventListener("keydown", onKey);
		return () => window.removeEventListener("keydown", onKey);
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "relative h-dvh w-full overflow-hidden bg-ink text-paper",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "sr-only",
				children: "Vasanth's World — an immersive cinematic portfolio"
			}),
			World ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(World, {}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-ink" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Overlays, {})
		]
	});
}
var routes_exports = /* @__PURE__ */ __exportAll({ component: () => Home });
function Home() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Experience, {});
}
//#endregion
export { useWorld as i, play as n, BOOKS as r, routes_exports as t };
