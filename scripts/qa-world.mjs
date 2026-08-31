import { chromium } from "playwright";
import { mkdirSync, writeFileSync } from "fs";
mkdirSync("/workspace/screenshots", { recursive: true });
const browser = await chromium.launch({
  args: ["--ignore-gpu-blocklist", "--enable-webgl", "--use-gl=angle", "--use-angle=swiftshader"],
});
const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });
const errors = [];
page.on("pageerror", (e) => errors.push("page:" + e.message));
page.on("console", (m) => {
  if (m.type() === "error") errors.push("console:" + m.text());
});
const cdp = await page.context().newCDPSession(page);
async function shot(name) {
  const { data } = await cdp.send("Page.captureScreenshot", { format: "png", fromSurface: true });
  writeFileSync(`/workspace/screenshots/${name}.png`, Buffer.from(data, "base64"));
  console.log("shot", name, "ok");
}
await page.goto("http://127.0.0.1:8080/", { waitUntil: "domcontentloaded", timeout: 20000 });
await page.waitForSelector("button:has-text('Enter')", { timeout: 20000 });
await page.waitForTimeout(600);
console.log("canvas", await page.locator("canvas").count(), "errors so far", errors);
await shot("02-door");
await page.getByRole("button", { name: "Enter" }).click();
await page.waitForTimeout(5000);
await shot("03-entering");
await page.waitForTimeout(2000);
await shot("04-room");
console.log("hud", await page.locator("button:has-text('Books')").count(), "phase", await page.evaluate(() => window.__world?.getState()?.phase));
await page.evaluate(() => {
  const s = window.__world.getState();
  s.setPhase("room");
  s.setIntroTitle(false);
  s.setFocus("overview");
});
await page.waitForTimeout(2000);
await shot("04b-overview");
await page.evaluate(() => window.__world.getState().setFocus("bookshelf"));
await page.waitForTimeout(2500);
await shot("05-bookshelf");
await page.evaluate(() => window.__world.getState().setFocus("desk"));
await page.waitForTimeout(2500);
await shot("06-desk");
await page.evaluate(() => window.__world.getState().setFocus("window"));
await page.waitForTimeout(2500);
await shot("07-window");
await page.evaluate(() => window.__world.getState().setBook("about"));
await page.waitForTimeout(400);
await shot("08-book");
await page.evaluate(() => {
  window.__world.getState().setBook(null);
  window.__world.getState().setDesktop(true, "home");
});
await page.waitForTimeout(400);
await shot("09-desktop");
await page.getByRole("button", { name: "Projects" }).first().click();
await page.waitForTimeout(400);
await shot("10-projects");
console.log(JSON.stringify({ errors, phase: await page.evaluate(() => window.__world?.getState()) }, null, 2));
await browser.close();
