const fs = require('fs');
const createTestCafe = require('testcafe');

/**
 * Set default options for TestCafe
 * --------------------------------------
 */
const src = fs.readdirSync('./tests')
  .filter(file => /.js$/.test(file))
  .map(file => `./tests/${file}`);

const browsers = [
  // 'chrome --use-fake-device-for-media-stream --use-fake-ui-for-media-stream --no-sandbox',
  'chrome:headless --use-fake-device-for-media-stream --use-fake-ui-for-media-stream --no-sandbox',
  // 'firefox',
  'firefox:headless',
];

const speed = 0.4;
const app = null;

const argv = require('yargs')
  .default('src', src)
  .default('browsers', browsers)
  .default('speed', speed)
  .default('app', app)
  .argv;


/**
 * Run tests
 * --------------------------------------
 */
(async function run() {
  const testcafe = await createTestCafe('localhost', 1337, 1338);

  const runner = testcafe
    .createRunner()
    .src(argv.src)
    .browsers(argv.browsers);

  if (argv.app) {
    console.log('launching test page server...');
    await runner.startApp(argv.app, 2000);
  }

  const failed = await runner
    .run({
      speed: argv.speed,
    })
    .catch(err => {
      console.error(err);
      process.exit(1);
    });

  await testcafe.close();
  process.exit(failed ? 1 : 0);
}());
