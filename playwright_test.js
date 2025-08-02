(async () => {
  const url = process.argv[2]; // Get URL from command line argument
  if (!url) {
    console.error('Usage: node playwright_test.js <URL>');
    process.exit(1);
  }
  console.log("Here")


})();