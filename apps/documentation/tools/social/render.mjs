/**
 * Renders `card.html` to the social image the pages link as `og:image`.
 *
 * Run by hand, not from the build: it needs a browser, and the card only
 * changes when the branding or the headline figures do.
 *
 *   node apps/documentation/tools/social/render.mjs
 *
 * The figures on the card are deliberately rounded. Baking an exact icon count
 * into a committed PNG would leave it quietly wrong after every new icon set.
 */
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright';

const here = dirname(fileURLToPath(import.meta.url));
const publicAssets = join(here, '../../src/public/assets');

const browser = await chromium.launch();

try {
  const page = await browser.newPage({
    viewport: { width: 1200, height: 630 },
    // 2x so the card stays crisp where previews are rendered at retina density.
    deviceScaleFactor: 2,
  });

  await page.goto(`file://${join(here, 'card.html')}`);
  await page.waitForLoadState('networkidle');
  await page.evaluate(() => document.fonts.ready);

  await page.screenshot({ path: join(publicAssets, 'og.png') });
} finally {
  // Otherwise a failure anywhere above leaves a headless Chromium running.
  await browser.close();
}

console.log('Wrote src/public/assets/og.png');
