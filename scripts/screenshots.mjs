// Regenerates the README images in docs/images/.
// Starts the demo page with Vite, drives your installed Edge with Playwright,
// and screenshots just the chart body (the toolbar above it is cropped out).
//
//   npm run screenshots
//   PW_CHANNEL=chrome npm run screenshots   (use Chrome instead of Edge)

// kinda cool... claude did this
import { mkdir } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { createServer } from 'vite';
import { chromium } from 'playwright-core';

const root = fileURLToPath(new URL('..', import.meta.url));
const outDir = fileURLToPath(new URL('../docs/images/', import.meta.url));
const port = 5199;

// CSS module class names keep the local name inside the hash, ex - _ganttBar_1x2y3_44
const chart = '[class*="ganttChartRowContainer"]';
const leftPane = '[class*="ganttChartLeftContainer"]';
const divider = '[class*="ganttChartDividerContainer"]';
const bar = '[class*="ganttBar"]';

// Forest and Prairie split evenly ~ 3 shots each
const shots = [
  { file: 'hero.png', scenario: 'launch', theme: 'Forest', range: 'Week' },
  { file: 'theme-prairie.png', scenario: 'launch', theme: 'Prairie', range: 'Week' },
  { file: 'view-day.png', scenario: 'sprint', theme: 'Forest', range: 'Day' },
  { file: 'view-month.png', scenario: 'roadmap', theme: 'Prairie', range: 'Month' },
  { file: 'tooltip.png', scenario: 'roadmap', theme: 'Forest', range: 'Month', hoverBar: 3 },
  { file: 'edge-cases.png', scenario: 'edge', theme: 'Prairie', range: 'Month' },
];

// wide enough that every column fits without scrolling the timeline
const viewport = { width: 1440, height: 900 };

const server = await createServer({
  root,
  logLevel: 'warn',
  server: { port, strictPort: true },
});
await server.listen();

const browser = await chromium.launch({ channel: process.env.PW_CHANNEL ?? 'msedge' });

try {
  await mkdir(outDir, { recursive: true });
  const page = await browser.newPage({ viewport, deviceScaleFactor: 2 });

  // first load lets Vite finish optimizing deps (it reloads the page once when it does)
  await page.goto(`http://localhost:${port}/`, { waitUntil: 'networkidle' });

  for (const shot of shots) {
    const query = new URLSearchParams({ scenario: shot.scenario, theme: shot.theme, range: shot.range });
    await page.goto(`http://localhost:${port}/?${query}`, { waitUntil: 'networkidle' });
    await page.locator(bar).first().waitFor();

    // transparent page so the rounded corners look right on GitHub light + dark
    await page.addStyleTag({ content: 'html, body { background: transparent !important; }' });

    // drag the divider until every table column fits (the default 20% hides most of them)
    const pane = await page.locator(leftPane).boundingBox();
    const tableWidth = await page.locator(`${leftPane} table`).evaluate((table) => table.scrollWidth);
    const handle = await page.locator(divider).boundingBox();
    if (pane && handle) {
      const y = handle.y + handle.height / 2;
      await page.mouse.move(handle.x + handle.width / 2, y);
      await page.mouse.down();
      await page.mouse.move(pane.x + tableWidth + 1, y, { steps: 8 });
      await page.mouse.up();
      // park the mouse so the divider isn't captured in its hover color
      await page.mouse.move(0, 0);
    }

    if (shot.hoverBar !== undefined) {
      await page.locator(bar).nth(shot.hoverBar).hover();
    }

    await page.locator(chart).screenshot({ path: `${outDir}${shot.file}`, omitBackground: true });
    console.log(`saved docs/images/${shot.file}`);
  }
} finally {
  await browser.close();
  await server.close();
}
