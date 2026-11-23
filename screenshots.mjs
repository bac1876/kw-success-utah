import { chromium } from '@playwright/test';
import { mkdir } from 'fs/promises';

const BASE_URL = 'http://localhost:3001';
const ARTIFACTS_DIR = '/opt/cursor/artifacts';

const pages = [
  { name: 'home', url: '/', scrollSteps: 15 },
  { name: 'clients', url: '/clients', scrollSteps: 12 },
  { name: 'agents', url: '/agents', scrollSteps: 12 },
  { name: 'mortgage', url: '/services/mortgage', scrollSteps: 10 },
  { name: 'about-leadership', url: '/about#leadership', scrollSteps: 8, waitForScroll: true },
  { name: 'contact', url: '/contact', scrollSteps: 6 },
  { name: 'areas-served', url: '/areas-served', scrollSteps: 10 },
  { name: 'footer', url: '/', scrollToBottom: true, scrollSteps: 2 },
];

async function takeScreenshots() {
  await mkdir(ARTIFACTS_DIR, { recursive: true });

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1280, height: 1080 },
    deviceScaleFactor: 1,
  });
  const page = await context.newPage();

  console.log('Starting screenshot capture...');

  for (const pageConfig of pages) {
    console.log(`\nCapturing: ${pageConfig.name}`);
    
    try {
      // Navigate to page
      await page.goto(`${BASE_URL}${pageConfig.url}`, { 
        waitUntil: 'networkidle',
        timeout: 30000 
      });

      // Wait for initial render
      await page.waitForTimeout(1500);

      // If there's a hash, wait for smooth scroll
      if (pageConfig.waitForScroll) {
        await page.waitForTimeout(1000);
      }

      // Scroll through page to trigger scroll animations
      if (pageConfig.scrollToBottom) {
        // For footer, scroll all the way to bottom
        await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
        await page.waitForTimeout(1000);
      } else {
        const scrollSteps = pageConfig.scrollSteps || 10;
        const scrollHeight = await page.evaluate(() => document.body.scrollHeight);
        const stepSize = Math.floor(scrollHeight / scrollSteps);

        for (let i = 1; i <= scrollSteps; i++) {
          await page.evaluate((step) => {
            window.scrollTo({ top: step, behavior: 'smooth' });
          }, i * stepSize);
          await page.waitForTimeout(400);
        }

        // Scroll back to top for full screenshot
        await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'smooth' }));
        await page.waitForTimeout(800);
      }

      // Wait for any final animations
      await page.waitForTimeout(1000);

      // Take screenshot
      const screenshotPath = `${ARTIFACTS_DIR}/${pageConfig.name}.png`;
      await page.screenshot({ 
        path: screenshotPath, 
        fullPage: !pageConfig.scrollToBottom 
      });
      console.log(`✓ Saved: ${screenshotPath}`);

    } catch (error) {
      console.error(`✗ Failed ${pageConfig.name}:`, error.message);
    }
  }

  await browser.close();
  console.log('\n✓ Screenshot capture complete!');
}

takeScreenshots().catch(console.error);
