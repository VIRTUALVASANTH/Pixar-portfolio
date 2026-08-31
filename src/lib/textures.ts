import * as THREE from "three";

type TexMap = Record<string, THREE.CanvasTexture>;
let cache: TexMap | null = null;

function canvas(w: number, h: number) {
  const c = document.createElement("canvas");
  c.width = w;
  c.height = h;
  const ctx = c.getContext("2d")!;
  return { c, ctx };
}

function toTex(c: HTMLCanvasElement, rx = 1, ry = 1) {
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  t.wrapS = t.wrapT = THREE.RepeatWrapping;
  t.repeat.set(rx, ry);
  t.anisotropy = 4;
  t.needsUpdate = true;
  return t;
}

function wood(w: number, h: number, base: string, grain: string, planks: number) {
  const { c, ctx } = canvas(w, h);
  ctx.fillStyle = base;
  ctx.fillRect(0, 0, w, h);
  const ph = h / planks;
  for (let p = 0; p < planks; p++) {
    ctx.globalAlpha = 0.18 + (p % 3) * 0.06;
    ctx.fillStyle = grain;
    ctx.fillRect(0, p * ph, w, ph - 3);
    ctx.globalAlpha = 0.45;
    ctx.fillStyle = "#2a160c";
    ctx.fillRect(0, (p + 1) * ph - 3, w, 3);
  }
  ctx.globalAlpha = 0.12;
  ctx.strokeStyle = grain;
  ctx.lineWidth = 1;
  for (let i = 0; i < 12; i++) {
    ctx.beginPath();
    ctx.moveTo(0, ((i + 0.3) / 12) * h);
    ctx.lineTo(w, ((i + 0.7) / 12) * h);
    ctx.stroke();
  }
  ctx.globalAlpha = 1;
  return c;
}

function plaid(w: number, h: number) {
  const { c, ctx } = canvas(w, h);
  ctx.fillStyle = "#6b3a28";
  ctx.fillRect(0, 0, w, h);
  ctx.fillStyle = "#2c4a38";
  for (let i = 0; i < w; i += 32) {
    ctx.fillRect(i, 0, 10, h);
    ctx.fillRect(0, i, w, 10);
  }
  ctx.fillStyle = "#c4a574";
  for (let i = 16; i < w; i += 32) {
    ctx.fillRect(i, 0, 3, h);
    ctx.fillRect(0, i, w, 3);
  }
  return c;
}

function poster(kind: "peak" | "forest" | "dusk") {
  const { c, ctx } = canvas(128, 176);
  const skies = { peak: ["#1b3a4a", "#e8b86d"], forest: ["#163028", "#7da080"], dusk: ["#4a2040", "#e07a4a"] };
  const [a, b] = skies[kind];
  const g = ctx.createLinearGradient(0, 0, 0, 176);
  g.addColorStop(0, a);
  g.addColorStop(1, b);
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, 128, 176);
  ctx.fillStyle = "#1a120c";
  ctx.beginPath();
  ctx.moveTo(0, 176);
  ctx.lineTo(0, 110);
  ctx.lineTo(64, kind === "peak" ? 50 : 90);
  ctx.lineTo(128, 110);
  ctx.lineTo(128, 176);
  ctx.fill();
  ctx.strokeStyle = "#f4e6c8";
  ctx.lineWidth = 6;
  ctx.strokeRect(8, 8, 112, 160);
  return c;
}

function screen() {
  const { c, ctx } = canvas(256, 160);
  const g = ctx.createRadialGradient(180, 40, 10, 128, 80, 180);
  g.addColorStop(0, "#c4843a");
  g.addColorStop(1, "#1a120c");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, 256, 160);
  ctx.fillStyle = "#f4e6c8";
  ctx.font = "bold 48px Georgia, serif";
  ctx.textAlign = "center";
  ctx.fillText("V", 128, 88);
  ctx.font = "12px sans-serif";
  ctx.fillText("VASANTH OS", 128, 112);
  ctx.fillStyle = "#c4843a";
  ctx.fillRect(0, 140, 256, 20);
  return c;
}

function keys() {
  const { c, ctx } = canvas(256, 96);
  ctx.fillStyle = "#1a1612";
  ctx.fillRect(0, 0, 256, 96);
  ctx.fillStyle = "#2a2420";
  for (let r = 0; r < 4; r++) {
    for (let k = 0; k < 14; k++) {
      ctx.fillStyle = (r + k) % 5 === 0 ? "#c4843a" : "#3a322c";
      ctx.fillRect(6 + k * 18, 8 + r * 22, 15, 16);
    }
  }
  return c;
}

function landscape(kind: "day" | "night" | "storm") {
  const { c, ctx } = canvas(512, 320);
  const sky =
    kind === "night"
      ? ["#070b18", "#1a2440", "#3a2a28"]
      : kind === "storm"
        ? ["#4a5360", "#6a7380", "#4a5248"]
        : ["#f2c98a", "#f6e2b8", "#c9d6a8"];
  const g = ctx.createLinearGradient(0, 0, 0, 320);
  g.addColorStop(0, sky[0]);
  g.addColorStop(0.45, sky[1]);
  g.addColorStop(1, sky[2]);
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, 512, 320);

  if (kind === "day") {
    const sun = ctx.createRadialGradient(360, 70, 8, 360, 70, 90);
    sun.addColorStop(0, "#fff4d0");
    sun.addColorStop(0.3, "#ffd27a");
    sun.addColorStop(1, "rgba(255,180,80,0)");
    ctx.fillStyle = sun;
    ctx.fillRect(250, 0, 220, 180);
    ctx.fillStyle = "#ffe7a8";
    ctx.beginPath();
    ctx.arc(360, 78, 22, 0, Math.PI * 2);
    ctx.fill();
  } else if (kind === "night") {
    ctx.fillStyle = "#f0e6c8";
    ctx.beginPath();
    ctx.arc(400, 58, 16, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "#070b18";
    ctx.beginPath();
    ctx.arc(408, 54, 12, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "#f4ead8";
    for (let i = 0; i < 40; i++) {
      ctx.globalAlpha = 0.4 + (i % 3) * 0.2;
      ctx.fillRect((i * 47) % 512, (i * 19) % 120, 2, 2);
    }
    ctx.globalAlpha = 1;
  }

  ctx.fillStyle = kind === "night" ? "#1a2430" : kind === "storm" ? "#3a4440" : "#6a8a58";
  ctx.beginPath();
  ctx.moveTo(0, 210);
  ctx.quadraticCurveTo(80, 150, 170, 200);
  ctx.quadraticCurveTo(260, 130, 360, 195);
  ctx.quadraticCurveTo(440, 150, 512, 200);
  ctx.lineTo(512, 320);
  ctx.lineTo(0, 320);
  ctx.fill();

  ctx.fillStyle = kind === "night" ? "#243428" : kind === "storm" ? "#4a5a40" : "#7a9a4a";
  ctx.beginPath();
  ctx.moveTo(0, 250);
  ctx.quadraticCurveTo(140, 200, 280, 248);
  ctx.quadraticCurveTo(400, 210, 512, 255);
  ctx.lineTo(512, 320);
  ctx.lineTo(0, 320);
  ctx.fill();

  const tree = (x: number, y: number, s: number, trunk: string, leaf: string) => {
    ctx.fillStyle = trunk;
    ctx.fillRect(x - 3 * s, y, 6 * s, 28 * s);
    ctx.fillStyle = leaf;
    ctx.beginPath();
    ctx.ellipse(x, y - 8 * s, 18 * s, 22 * s, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.ellipse(x - 12 * s, y + 2 * s, 12 * s, 14 * s, -0.4, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.ellipse(x + 12 * s, y + 4 * s, 11 * s, 13 * s, 0.4, 0, Math.PI * 2);
    ctx.fill();
  };

  const trunk = kind === "night" ? "#1a120c" : "#4a2a18";
  const leaf = kind === "night" ? "#1c3020" : kind === "storm" ? "#2a3a28" : "#2f5a32";
  tree(70, 250, 1.1, trunk, leaf);
  tree(150, 258, 0.8, trunk, "#3a6a38");
  tree(430, 248, 1.3, trunk, leaf);
  tree(490, 262, 0.7, trunk, "#245028");
  tree(30, 268, 0.55, trunk, "#3d6b3a");

  ctx.fillStyle = kind === "night" ? "#1a2818" : "#5a7a38";
  ctx.fillRect(0, 292, 512, 28);
  return c;
}

function bookCover(title: string, color: string, accent: string) {
  const { c, ctx } = canvas(256, 384);
  ctx.fillStyle = color;
  ctx.fillRect(0, 0, 256, 384);
  ctx.fillStyle = accent;
  ctx.globalAlpha = 0.12;
  ctx.fillRect(18, 18, 220, 348);
  ctx.globalAlpha = 1;
  ctx.strokeStyle = accent;
  ctx.lineWidth = 8;
  ctx.strokeRect(14, 14, 228, 356);
  ctx.lineWidth = 2;
  ctx.strokeRect(24, 24, 208, 336);
  ctx.fillStyle = accent;
  ctx.textAlign = "center";
  ctx.font = "700 42px Georgia, serif";
  const words = title.split(" ");
  const startY = 188 - (words.length - 1) * 24;
  words.forEach((w, i) => ctx.fillText(w, 128, startY + i * 48));
  ctx.font = "600 14px sans-serif";
  ctx.fillText("OPEN", 128, 340);
  ctx.beginPath();
  ctx.moveTo(70, 318);
  ctx.lineTo(186, 318);
  ctx.stroke();
  return c;
}

function plaque(title: string, accent: string) {
  const { c, ctx } = canvas(256, 64);
  ctx.fillStyle = "#2a1a10";
  ctx.fillRect(0, 0, 256, 64);
  ctx.strokeStyle = accent;
  ctx.lineWidth = 3;
  ctx.strokeRect(4, 4, 248, 56);
  ctx.fillStyle = accent;
  ctx.font = "700 28px Georgia, serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(title, 128, 34);
  return c;
}

export function getTextures() {
  if (cache) return cache;
  const floor = toTex(wood(128, 128, "#8a5a32", "#d8b07a", 8), 8, 6);
  const furniture = toTex(wood(128, 128, "#6b4428", "#c4a06a", 6), 2, 2);
  const blanket = toTex(plaid(128, 128), 2, 2);
  const peak = toTex(poster("peak"));
  const forest = toTex(poster("forest"));
  const dusk = toTex(poster("dusk"));
  peak.wrapS = peak.wrapT = THREE.ClampToEdgeWrapping;
  forest.wrapS = forest.wrapT = THREE.ClampToEdgeWrapping;
  dusk.wrapS = dusk.wrapT = THREE.ClampToEdgeWrapping;
  const scr = toTex(screen());
  scr.wrapS = scr.wrapT = THREE.ClampToEdgeWrapping;
  const kb = toTex(keys());
  kb.wrapS = kb.wrapT = THREE.ClampToEdgeWrapping;
  const day = toTex(landscape("day"));
  const night = toTex(landscape("night"));
  const storm = toTex(landscape("storm"));
  day.wrapS = day.wrapT = THREE.ClampToEdgeWrapping;
  night.wrapS = night.wrapT = THREE.ClampToEdgeWrapping;
  storm.wrapS = storm.wrapT = THREE.ClampToEdgeWrapping;
  cache = {
    floor,
    furniture,
    blanket,
    posterPeak: peak,
    posterForest: forest,
    posterDusk: dusk,
    screen0: scr,
    keys: kb,
    landDay: day,
    landNight: night,
    landStorm: storm,
  };
  return cache;
}

export function makeBookTexture(title: string, color: string, accent: string) {
  const t = toTex(bookCover(title, color, accent));
  t.wrapS = t.wrapT = THREE.ClampToEdgeWrapping;
  return t;
}

export function makePlaqueTexture(title: string, accent: string) {
  const t = toTex(plaque(title, accent));
  t.wrapS = t.wrapT = THREE.ClampToEdgeWrapping;
  return t;
}
