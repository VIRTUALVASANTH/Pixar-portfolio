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
  fullName: "Vasanth G",
  title: "Backend Java Developer",
  tagline: "I keep banking services honest under load.",
  location: "Bengaluru",
  email: "vasanth.g.1503@gmail.com",
  phone: "+91 95389 81528",
  phoneHref: "tel:+919538981528",
  availability: "Open to backend and platform roles",
  years: 1,
  focus: "Spring Boot · Kafka · Keycloak",
  summary:
    "Backend Java developer with 1+ year building and maintaining microservices in a production banking environment. Spring Boot, Dapr, Kafka, and Keycloak by day; secure REST APIs and production incidents by night. CI/CD on Jenkins, containers on Docker and OpenShift/Kubernetes, load tests on JMeter.",
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
    subtitle: "Languages, platforms, instincts",
    color: "#1f4a4a",
    accent: "#b7e0d4",
    shelf: 2,
    slot: 1,
  },
  {
    id: "projects",
    title: "Projects",
    spine: "Works",
    subtitle: "Systems that shipped",
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
    title: "Toolkit",
    spine: "Tools",
    subtitle: "How the work is kept honest",
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
    name: "Backend & Java",
    skills: [
      { name: "Java / Spring Boot", level: 90 },
      { name: "Spring Security", level: 86 },
      { name: "REST API design", level: 88 },
      { name: "Dapr (service mesh)", level: 80 },
    ],
  },
  {
    name: "Messaging & auth",
    skills: [
      { name: "Apache Kafka", level: 84 },
      { name: "Keycloak (OIDC / FIDO / SSO)", level: 88 },
      { name: "JWT / RBAC / sessions", level: 86 },
      { name: "Redis / Valkey", level: 82 },
    ],
  },
  {
    name: "Data, DevOps & quality",
    skills: [
      { name: "PostgreSQL / SQL", level: 88 },
      { name: "Docker · K8s · OpenShift", level: 80 },
      { name: "Jenkins CI/CD", level: 78 },
      { name: "JUnit 5 · JMeter · Grafana", level: 84 },
    ],
  },
];

export const PROJECTS = [
  {
    id: "cryptovault",
    name: "CryptoVault",
    year: "2025",
    role: "Secure crypto wallet",
    blurb:
      "A multi-service wallet platform — API gateway, auth, wallet, and transactions — with Keycloak RBAC, AES-256-GCM private-key storage, Redis balance caching, Kafka-backed async processing, and Sepolia testnet ETH transfers.",
    stack: ["Java", "Spring Boot", "Keycloak", "Kafka", "PostgreSQL", "Redis"],
    hue: "#c4843a",
  },
  {
    id: "esl",
    name: "ESL Price Engine",
    year: "2025",
    role: "Data engineering intern",
    blurb:
      "Python microservices on Flask that push real-time price updates to electronic shelf labels, with scheduling dashboards, AI-based pricing, Docker/GitHub Actions CI/CD, and PostgreSQL for low-latency reads.",
    stack: ["Python", "Flask", "PostgreSQL", "Docker", "GitHub Actions"],
    hue: "#3d6b6b",
  },
  {
    id: "banking",
    name: "Core Banking Auth",
    year: "2025",
    role: "Production microservices",
    blurb:
      "Four Spring Boot services for authentication, authorization, device management, and session control on a live banking platform. Keycloak FIDO/passkeys and SSO, Redis/Valkey sessions, Dapr, Kafka, and an 89% latency cut (900ms → 80ms).",
    stack: ["Spring Boot", "Keycloak", "Dapr", "Kafka", "PostgreSQL", "OpenShift"],
    hue: "#8a3b22",
  },
];

export const EXPERIENCE = [
  {
    company: "i-exceed Technology Solutions",
    role: "Backend Engineer",
    years: "Jun 2025 — Present",
    place: "Production banking",
    points: [
      "Engineer and maintain 4+ Spring Boot microservices for authentication, authorization, device management, and session control.",
      "Architect end-to-end auth with Keycloak (FIDO/passkey, SSO, admin roles); Redis and Valkey for token storage and fast session lookups.",
      "Cut API latency ~89% (900ms → 80ms) with PostgreSQL indexes and N+1 rewrites; trace with Grafana, Tempo, and Loki; load-test with JMeter.",
      "Hold 95% test coverage with JUnit 5, Mockito, and SonarQube; close critical production bugs.",
      "Integrate Dapr for inter-service calls and Kafka for event-driven pub/sub; ship on OpenShift/Kubernetes via Jenkins CI/CD.",
      "Run TruffleHog, Vacuum, ArchUnit, and Arconia across the development workflow.",
    ],
  },
  {
    company: "Einweit Technologies",
    role: "Data Engineer Intern",
    years: "Feb 2025 — May 2025",
    place: "Internship",
    points: [
      "Built Python/Flask microservices to automate real-time price updates for electronic shelf labels, with scheduling dashboards and AI-based pricing.",
      "Designed CI/CD with Docker and GitHub Actions; delivered low-latency data paths on PostgreSQL.",
    ],
  },
];

export const EDUCATION = [
  {
    place: "Sapthagiri College of Engineering",
    credential: "B.E. Computer Science",
    years: "Dec 2021 — May 2025",
    note: "CGPA 8.68. The years the compiler finally started to listen.",
  },
];

export const CERTS = [
  { name: "JUnit 5 · Mockito", by: "95% coverage on banking services", year: "Testing" },
  { name: "SonarQube", by: "Quality gates on every merge", year: "Quality" },
  { name: "JMeter", by: "Load tests before production", year: "Performance" },
  { name: "Grafana · Tempo · Loki", by: "Traces, logs, and the 89% latency cut", year: "Observability" },
  { name: "ArchUnit", by: "Architecture tests that fail the build", year: "Architecture" },
  { name: "TruffleHog · Vacuum", by: "Secret scanning and API linting", year: "Security" },
  { name: "Arconia", by: "Spring Boot / Maven dependency hygiene", year: "Platform" },
  { name: "Jenkins · OpenShift", by: "CI/CD onto Kubernetes", year: "DevOps" },
];

export const ABOUT_PAGES = [
  "I write Java for rooms where money moves. Microservices, tokens, sessions — the unglamorous machinery that has to be right at 2 a.m.",
  "At i-exceed I live in a core banking platform: Keycloak at the door, Kafka in the hallway, PostgreSQL in the cellar. I like shaving 900 milliseconds down to 80.",
  "If you need someone who treats auth, latency, and tests as the same craft — the kettle is on. Come in.",
];
