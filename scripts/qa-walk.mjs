import { chromium } from "playwright";
import { writeFileSync } from "fs";
const browser = await chromium.launch({ args: ["--ignore-gpu-blocklist", "--enable-webgl"] });
const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });
const errors = [];
page.on("pageerror", (e) => errors.push("page:"+e.message));
page.on("console", (m) => { if (m.type()==="error") errors.push("c:"+m.text()); });
async function grab(name, hideCanvas=false) {
  if (hideCanvas) await page.evaluate(() => document.querySelectorAll("canvas").forEach(c => c.style.visibility="hidden"));
  if (hideCanvas) {
    await page.screenshot({ path: `/workspace/screenshots/${name}.png`, timeout: 8000 });
  } else {
    const data = await Promise.race([
      page.evaluate(() => document.querySelector("canvas")?.toDataURL("image/jpeg", 0.7) || ""),
      new Promise((_, r) => setTimeout(() => r(new Error("timeout")), 8000)),
    ]).catch(e => { console.log("grab fail", name, e.message); return ""; });
    if (String(data).startsWith("data:image")) {
      writeFileSync(`/workspace/screenshots/${name}.jpg`, Buffer.from(String(data).split(",")[1], "base64"));
    }
  }
  if (hideCanvas) await page.evaluate(() => document.querySelectorAll("canvas").forEach(c => c.style.visibility="visible"));
  console.log("grab", name);
}
await page.goto("http://127.0.0.1:8080/", { waitUntil: "domcontentloaded" });
await page.waitForSelector("button:has-text('Enter')", { timeout: 20000 });
await page.waitForTimeout(400);
await grab("02-door");
await page.getByRole("button", { name: "Enter" }).click();
await page.waitForTimeout(4500);
await grab("03-inside");
await page.evaluate(() => {
  const s = window.__world.getState();
  s.setPhase("room");
  s.setIntroTitle(false);
  s.setFocus("overview");
});
await page.waitForTimeout(2200);
await grab("04-overview");
await page.evaluate(() => window.__world.getState().setFocus("bookshelf"));
await page.waitForTimeout(2200);
await grab("05-bookshelf");
await page.evaluate(() => window.__world.getState().setFocus("desk"));
await page.waitForTimeout(2200);
await grab("06-desk");
await page.evaluate(() => window.__world.getState().setFocus("window"));
await page.waitForTimeout(2200);
await grab("07-window");
await page.evaluate(() => window.__world.getState().setBook("about"));
await page.waitForTimeout(400);
await grab("08-book", true);
await page.evaluate(() => { window.__world.getState().setBook(null); window.__world.getState().setDesktop(true,"home"); });
await page.waitForTimeout(400);
await grab("09-desktop", true);
console.log(JSON.stringify({ errors, phase: await page.evaluate(() => window.__world?.getState()?.phase) }));
await browser.close();
