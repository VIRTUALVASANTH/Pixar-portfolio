import { chromium } from "playwright";
import { writeFileSync } from "fs";
const browser = await chromium.launch({ args: ["--ignore-gpu-blocklist", "--enable-webgl"] });
const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });
const errors = [];
page.on("pageerror", (e) => errors.push(e.message));
page.on("console", (m) => { if (m.type()==="error") errors.push(m.text()); });
await page.goto("http://127.0.0.1:8080/", { waitUntil: "domcontentloaded" });
await page.waitForSelector("button:has-text('Enter')", { timeout: 20000 });
console.log("enter visible, errors", errors);
// hide canvas, screenshot DOM
await page.evaluate(() => {
  document.querySelectorAll("canvas").forEach((c) => { c.style.visibility = "hidden"; });
});
await page.screenshot({ path: "/workspace/screenshots/dom-only.png", timeout: 5000 });
console.log("dom screenshot ok");
await page.evaluate(() => {
  document.querySelectorAll("canvas").forEach((c) => { c.style.visibility = "visible"; });
});
// try toDataURL with timeout via Promise.race in node
const t0 = Date.now();
try {
  const data = await Promise.race([
    page.evaluate(() => document.querySelector("canvas")?.toDataURL("image/jpeg", 0.6) || "none"),
    new Promise((_, rej) => setTimeout(() => rej(new Error("todataurl timeout")), 5000)),
  ]);
  console.log("todataurl", typeof data, String(data).slice(0, 40), "ms", Date.now()-t0);
  if (String(data).startsWith("data:image")) {
    const b64 = String(data).split(",")[1];
    writeFileSync("/workspace/screenshots/canvas-capture.jpg", Buffer.from(b64, "base64"));
    console.log("wrote canvas-capture.jpg", b64.length);
  }
} catch (e) {
  console.log("todataurl failed", e.message, "ms", Date.now()-t0);
}
console.log("final errors", errors);
await browser.close();
