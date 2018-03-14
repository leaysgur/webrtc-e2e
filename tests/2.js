import { Selector, ClientFunction } from 'testcafe';

fixture('SkyWay P2P:Media')
  .page('http://localhost:8080/2/');

const callBtn = Selector('#call-btn');

test('should connect P2P w/ MediaConnection', async t => {
  // get black frame
  const l1 = await ClientFunction(() => Util.getVideoColorAsDataURL('#local-video'));
  const r1 = await ClientFunction(() => Util.getVideoColorAsDataURL('#remote-video'));

  // click to start call
  await t.click(callBtn);
  // XXX: need to wait for firefox:headless...
  await t.wait(500);

  // if connected, video is not black now
  const l2 = await ClientFunction(() => Util.getVideoColorAsDataURL('#local-video'));
  const r2 = await ClientFunction(() => Util.getVideoColorAsDataURL('#remote-video'));
  await t.expect(l1).notEql(l2);
  await t.expect(r1).notEql(r2);
});
