import { test, expect } from '@playwright/test';

const paths = ['/tn-roadmap/'];
const widths = [375, 768, 1280];

for (const width of widths) {
  test(`no console errors & cards align @${width}px`, async ({ browser }) => {
    const context = await browser.newContext({ viewport: { width, height: 900 }, ignoreHTTPSErrors: true });
    const page = await context.newPage();
    await context.route('https://fonts.googleapis.com/*', (route) => route.fulfill({ status: 200, body: '' }));
    await context.route('https://fonts.gstatic.com/*', (route) => route.fulfill({ status: 200, body: '' }));
    const logs = [];

    page.on('pageerror', (error) => {
      logs.push(`pageerror:${error.message}`);
    });

    page.on('console', (message) => {
      if (['error', 'warning'].includes(message.type())) {
        logs.push(`${message.type()}:${message.text()}`);
      }
    });

    for (const path of paths) {
      await page.goto(`http://localhost:5173${path}`);
      await page.waitForLoadState('networkidle');

      const heights = await page.$$eval('[data-phase-card-surface]', (elements) =>
        elements.map((element) => Math.round(element.getBoundingClientRect().height))
      );

      if (heights.length >= 2) {
        const min = Math.min(...heights);
        const max = Math.max(...heights);

        if (max - min > 4) {
          throw new Error(`Uneven card heights: ${heights.join(',')}`);
        }
      }

      await page.screenshot({ path: `tests/__screenshots__/home-${width}.png`, fullPage: false });
    }

    expect(logs, logs.join('\n')).toHaveLength(0);

    await page.close();
    await context.close();
  });
}
