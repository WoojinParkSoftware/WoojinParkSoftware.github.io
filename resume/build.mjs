// Renders resume/resume.html to assets/pdf/WoojinParkResume.pdf.
// Usage: node resume/build.mjs   (requires the `playwright` package)
import { chromium } from 'playwright';
import { fileURLToPath, pathToFileURL } from 'node:url';
import path from 'node:path';

const dir = path.dirname(fileURLToPath(import.meta.url));
const src = path.join(dir, 'resume.html');
const out = path.join(dir, '..', 'assets', 'pdf', 'WoojinParkResume.pdf');

const browser = await chromium.launch();
const page = await browser.newPage();
await page.goto(pathToFileURL(src).href);
await page.pdf({ path: out, format: 'Letter', preferCSSPageSize: true, printBackground: true });
await browser.close();
console.log(`Wrote ${out}`);
