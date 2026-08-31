export type BookId =
  | "about"
  | "skills"
  | "projects"
  | "experience"
  | "education"
  | "certs"
  | "contact";

export const PERSON = {
  name: "Vasanth",
  fullName: "Vasanth Kumar",
  title: "Creative Technologist",
  tagline: "I build rooms you can feel.",
  location: "Chennai · Remote",
  email: "hello@vasanth.world",
  availability: "Open to cinematic collaborations",
  years: 7,
  summary:
    "I design and engineer immersive digital spaces — the kind that linger after the tab is closed. Seven years across product, film-adjacent web, and real-time 3D, always chasing the moment a interface becomes a place.",
};

export const BOOKS: Array<{
  id: BookId;
  title: string;
  spine: string;
  subtitle: string;
  color: string;
  accent: string;
  shelf: number;
  slot: number;
}> = [
  {
    id: "about",
    title: "About Me",
    spine: "About",
    subtitle: "A short letter from the desk",
    color: "#6b3a24",
    accent: "#f0d4a8",
    shelf: 2,
    slot: 0,
  },
  {
    id: "skills",
    title: "Skills",
    spine: "Skills",
    subtitle: "Craft, tools, and instincts",
    color: "#1f4a4a",
    accent: "#b7e0d4",
    shelf: 2,
    slot: 1,
  },
  {
    id: "projects",
    title: "Projects",
    spine: "Works",
    subtitle: "Worlds that shipped",
    color: "#8a3b22",
    accent: "#f0c08a",
    shelf: 2,
    slot: 2,
  },
  {
    id: "experience",
    title: "Experience",
    spine: "Years",
    subtitle: "Rooms I have worked in",
    color: "#2d4a2a",
    accent: "#c5d9b0",
    shelf: 2,
    slot: 3,
  },
  {
    id: "education",
    title: "Education",
    spine: "Study",
    subtitle: "Where the light came in",
    color: "#24344d",
    accent: "#c5d4ee",
    shelf: 1,
    slot: 0.5,
  },
  {
    id: "certs",
    title: "Certifications",
    spine: "Seals",
    subtitle: "Marks of practice",
    color: "#5c2438",
    accent: "#f0c0cc",
    shelf: 1,
    slot: 1.5,
  },
  {
    id: "contact",
    title: "Contact",
    spine: "Write",
    subtitle: "Leave the door ajar",
    color: "#2a2420",
    accent: "#e8dcc8",
    shelf: 1,
    slot: 2.5,
  },
];

export const SKILL_GROUPS = [
  {
    name: "Real-time & 3D",
    skills: [
      { name: "Three.js / R3F", level: 94 },
      { name: "WebGL / GLSL", level: 86 },
      { name: "Blender look-dev", level: 78 },
      { name: "Lighting & cinematography", level: 90 },
    ],
  },
  {
    name: "Product engineering",
    skills: [
      { name: "React / TypeScript", level: 96 },
      { name: "Motion (GSAP / FM)", level: 92 },
      { name: "Node / Python", level: 80 },
      { name: "Design systems", level: 88 },
    ],
  },
  {
    name: "Story & sound",
    skills: [
      { name: "Interactive narrative", level: 91 },
      { name: "Spatial / adaptive audio", level: 76 },
      { name: "Art direction", level: 84 },
      { name: "Prototyping", level: 92 },
    ],
  },
];

export const PROJECTS = [
  {
    id: "lantern",
    name: "Paper Lantern",
    year: "2025",
    role: "Director of engineering",
    blurb:
      "A WebGL story engine for illustrated books. Pages breathe, ink dries, and chapters remember how you held them.",
    stack: ["Three.js", "GSAP", "Web Audio", "React"],
    hue: "#c4843a",
  },
  {
    id: "atlas",
    name: "Northwind Atlas",
    year: "2024",
    role: "Creative technologist",
    blurb:
      "A 3D climate-data experience that turns satellite years into a single golden afternoon over the polar sea.",
    stack: ["R3F", "d3", "Mapbox", "GLSL"],
    hue: "#3d6b6b",
  },
  {
    id: "ember",
    name: "Ember Terminal",
    year: "2024",
    role: "Solo",
    blurb:
      "A cinematic desktop metaphor for portfolios — windows as memories, folders as rooms, boot-up as overture.",
    stack: ["React", "Framer Motion", "Canvas"],
    hue: "#8a3b22",
  },
  {
    id: "orbit",
    name: "Quiet Orbit",
    year: "2023",
    role: "Sound + visuals",
    blurb:
      "A spatial-audio meditation where constellations rearrange around your cursor and the room hushes with you.",
    stack: ["Web Audio", "Three.js", "Tone.js"],
    hue: "#24344d",
  },
  {
    id: "grain",
    name: "Frame & Grain",
    year: "2023",
    role: "Open source",
    blurb:
      "A film-look toolkit for the web: halation, gate weave, and print stock as CSS and shader primitives.",
    stack: ["GLSL", "Postprocessing", "CSS"],
    hue: "#5c2438",
  },
];

export const EXPERIENCE = [
  {
    company: "Studio North",
    role: "Senior Creative Technologist",
    years: "2023 — Present",
    place: "Remote",
    points: [
      "Lead immersive web for film, culture, and product launches.",
      "Shipped three award-listed 3D brand worlds with 60fps on mid-range laptops.",
      "Built an in-house lighting rig and camera language now used across the studio.",
    ],
  },
  {
    company: "Frame & Folly",
    role: "Interactive developer",
    years: "2021 — 2023",
    place: "Bengaluru",
    points: [
      "Crafted scroll-driven stories and WebGL product configurators.",
      "Partnered with directors to translate animatics into real-time scenes.",
      "Mentored a small frontend pod on motion, accessibility, and performance.",
    ],
  },
  {
    company: "Helix Labs",
    role: "Frontend engineer",
    years: "2019 — 2021",
    place: "Chennai",
    points: [
      "Designed the component system behind a design-ops platform.",
      "Introduced cinematic onboarding that lifted activation 18%.",
    ],
  },
];

export const EDUCATION = [
  {
    place: "National Institute of Technology",
    credential: "B.Tech, Computer Science",
    years: "2015 — 2019",
    note: "Thesis on real-time global illumination approximations for the browser.",
  },
  {
    place: "CGMA",
    credential: "Lighting for Animation",
    years: "2020",
    note: "Cinematic lighting, color script, and mood — the language this room speaks.",
  },
];

export const CERTS = [
  { name: "Three.js Journey", by: "Bruno Simon", year: "2022" },
  { name: "Google UX Design", by: "Coursera", year: "2021" },
  { name: "AWS Cloud Practitioner", by: "Amazon", year: "2023" },
  { name: "Advanced WebGL", by: "The Book of Shaders lab", year: "2024" },
];

export const ABOUT_PAGES = [
  "I grew up in rooms like this one — late light, a desk that hummed, books that were more doors than objects. I never really left.",
  "My work sits where software meets set design. I care about the weight of a camera move, the honesty of a material, the way a click can feel like turning a key.",
  "If you are building something that should feel alive — a product, a film companion, a place on the web — the kettle is on. Come in.",
];
