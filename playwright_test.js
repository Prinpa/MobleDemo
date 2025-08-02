import { type } from "os";
import { chromium } from "playwright";

(async () => {
  const url = process.argv[2]; // Get URL from command line argument
  if (!url) {
    console.error('Usage: node playwright_test.js <URL>');
    process.exit(1);
  }

  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto(url, { waitUntil: 'domcontentloaded' });

  // Wait until at least one image with 'banner' is present
  await page.waitForSelector('img[src*="banner"]');

  // get the src of only the images that contain "banner"
  const banners = await page.$$eval('img', imgs =>
    imgs
      .filter(img => img.src.includes('banner'))
      .map(img => img.src)
  );

  console.log('Banner images:', banners);


  const h1Headers = await page.getByRole("heading", {level: 1}).allInnerTexts()
  console.log("h1Headers:" + h1Headers)
  
  
  await browser.close()
})();