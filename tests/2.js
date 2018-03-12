import { Selector } from 'testcafe';

fixture('SkyWay P2P')
  .page('http://localhost:8080/2/');

test('should connect P2P w/ MediaConnection', async t => {
  const callBtn = Selector('#tc-call');
  // click to start call
  await t.click(callBtn);

  // if connected each other, onstream fired and logged
  const { log } = await t.getBrowserConsoleMessages();
  await t.expect(log.length).eql(2);
});
