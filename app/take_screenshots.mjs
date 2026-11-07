import { chromium } from "playwright";
import path from "path";

const ARTIFACT_DIR = "C:/Users/MyBook Hype5 AMD/.gemini/antigravity-ide/brain/e082ba12-c6c4-4cd4-8765-174c659e1abb";

async function run() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 390, height: 844 }, // Mobile viewport (iPhone 13/14)
    deviceScaleFactor: 2,
    isMobile: true,
    hasTouch: true,
  });

  const page = await context.newPage();

  console.log("Navigating to cover page...");
  await page.goto("http://localhost:3000/", { waitUntil: "networkidle" });
  await page.waitForTimeout(600);
  await page.screenshot({ path: path.join(ARTIFACT_DIR, "phase1_cover.png") });

  console.log("Navigating to home hub page...");
  await page.goto("http://localhost:3000/home/", { waitUntil: "networkidle" });
  await page.waitForTimeout(600);
  await page.screenshot({ path: path.join(ARTIFACT_DIR, "phase1_home.png") });

  console.log("Navigating to kejutan page (closed gift)...");
  await page.goto("http://localhost:3000/kejutan/", { waitUntil: "networkidle" });
  await page.waitForTimeout(600);
  await page.screenshot({ path: path.join(ARTIFACT_DIR, "phase1_kejutan_closed.png") });

  console.log("Opening gift box on kejutan page...");
  await page.click(".gift-box-area");
  await page.waitForTimeout(1000); // wait for pop animation and confetti
  await page.evaluate(() => window.scrollBy({ top: 220, behavior: "smooth" }));
  await page.waitForTimeout(600);
  await page.screenshot({ path: path.join(ARTIFACT_DIR, "phase1_kejutan_opened.png") });

  console.log("Navigating to musik page...");
  await page.goto("http://localhost:3000/musik/", { waitUntil: "networkidle" });
  await page.waitForTimeout(600);
  await page.screenshot({ path: path.join(ARTIFACT_DIR, "phase1_musik.png") });

  await browser.close();
  console.log("All Phase 1 screenshots re-captured successfully!");
}

run().catch((err) => {
  console.error("Error taking screenshots:", err);
  process.exit(1);
});
