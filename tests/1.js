/* global fixture, test */
import { Selector } from 'testcafe';

fixture('Vanilla RTCPeerConnection')
  .page('http://localhost:8080/1/');

test('should connect P2P', async t => {
  const callBtn = Selector('#tc-call');
  // click to start call
  await t.click(callBtn);

  // if connected, ontrack fired and logged
  const { log } = await t.getBrowserConsoleMessages();
  await t.expect(log.length).eql(1);
});
