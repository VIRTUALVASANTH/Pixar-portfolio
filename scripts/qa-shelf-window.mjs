import { chromium } from "playwright";
import { writeFileSync } from "fs";

const browser = await chromium.launch({ args: ["--ignore-gpu-blocklist", "--enable-webgl"] });
const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });
const errors = [];
page.on("pageerror", (e) => errors.push("page:" + e.message));
page.on("console", (m) => {
  if (m.type() === "error") errors.push("c:" + m.text());
});

async function grab(name, hideCanvas = false) {
  if (hideCanvas) {
    await page.evaluate(() => document.querySelectorAll("canvas").forEach((c) => (c.style.visibility = "hidden")));
    await page.screenshot({ path: `/workspace/screenshots/${name}.png`, timeout: 8000 });
    await page.evaluate(() => document.querySelectorAll("canvas").forEach((c) => (c.style.visibility = "visible")));
  } else {
    const data = await Promise.race([
      page.evaluate(() => document.querySelector("canvas")?.toDataURL("image/jpeg", 0.75) || ""),
      new Promise((_, r) => setTimeout(() => r(new Error("timeout")), 10000)),
    ]).catch((e) => {
      console.log("grab fail", name, e.message);
      return "";
    });
    if (String(data).startsWith("data:image")) {
      writeFileSync(`/workspace/screenshots/${name}.jpg`, Buffer.from(String(data).split(",")[1], "base64"));
    }
  }
  console.log("grab", name);
}

await page.goto("http://127.0.0.1:8080/", { waitUntil: "domcontentloaded" });
await page.waitForFunction(() => window.__world, { timeout: 20000 });
await page.evaluate(() => {
  window.__world.setState({
    phase: "room",
    doorOpen: true,
    introTitle: false,
    focus: "overview",
    curtainsOpen: true,
  });
});
await page.waitForTimeout(2500);
await grab("04-overview");

await page.evaluate(() => window.__world.getState().setFocus("bookshelf"));
await page.waitForTimeout(2800);
await grab("05-bookshelf");
await grab("05-bookshelf-ui", true);

await page.evaluate(() => {
  const s = window.__world.getState();
  s.setFocus("window");
  s.setCurtains(true);
});
await page.waitForTimeout(2800);
await grab("07-window");
await grab("07-window-ui", true);

const state = await page.evaluate(() => {
  const s = window.__world.getState();
  return { phase: s.phase, focus: s.focus, curtainsOpen: s.curtainsOpen };
});
console.log(JSON.stringify({ errors, state }, null, 2));
await browser.close();
