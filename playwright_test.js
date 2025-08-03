import { chromium } from "playwright";

(async () => {
  const url = process.argv[2]; // Get URL from command line argument
  if (!url) {
    console.error('Usage: node playwright_test.js <URL>');
    process.exit(1);
  }
  let infoHolder = {}
  let contactInfo = {}

  infoHolder.url = url
  // start the browser
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
  infoHolder.bannerImages = banners

  // get every ehader of level 1 (h1)
  let h1Headers = await page.getByRole("heading", {level: 1}).allInnerTexts()
  h1Headers = h1Headers.toString().split(",")
  infoHolder.h1Headers = h1Headers

  // contact information
  const address = await page.$eval('address', address => address.innerText);
  contactInfo.address = address

  const phoneNumber = await page.getByLabel("phone number").allInnerTexts()
  contactInfo.phone = phoneNumber[0].trim()

  // tack on the contactInformation object
  infoHolder.contactInfo = contactInfo

  // log the final result
  console.log(infoHolder)

  await browser.close()
})();