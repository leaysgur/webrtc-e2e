const createTestCafe = require('testcafe');

(async function main() {
  const testcafe = await createTestCafe('localhost', 1337, 1338);

  const runner = testcafe
    .createRunner()
    .src([
      './tests/1.js',
    ])
    .browsers([
      // 'chrome --use-fake-device-for-media-stream --use-fake-ui-for-media-stream',
      'chrome:headless --use-fake-device-for-media-stream --use-fake-ui-for-media-stream',
      // 'firefox',
      // 'firefox:headless',
    ]);

  // console.log('launching test page server...');
  // await runner.startApp('harp server --port 8080 ./src', 2000);

  await runner
    .run({
      speed: 0.4,
    })
    .catch(err => {
      console.error(err);
      process.exit(1);
    });

  await testcafe.close();
}());
