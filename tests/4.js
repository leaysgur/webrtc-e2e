import { Selector, ClientFunction } from 'testcafe';

fixture('SkyWay P2P:Media - replaceStream')
  .page('http://localhost:8080/4/');

const callBtn = Selector('#call-btn');
const replaceBtn = Selector('#replace-btn');

test('should replace stream', async t => {
  // get black frame
  const r1 = await ClientFunction(() => Util.getVideoColorAsDataURL('#remote-video'));

  // click to start call
  await t.click(callBtn);
  // XXX: need to wait for firefox:headless...
  await t.wait(500);

  // if connected, video is not black now
  const r2 = await ClientFunction(() => Util.getVideoColorAsDataURL('#remote-video'));
  await t.expect(r1).notEql(r2);

  // click to replace stream
  await t.click(replaceBtn);
  // XXX: need to wait for firefox:headless...
  await t.wait(500);

  // if replaced, video has different color
  const r3 = await ClientFunction(() => Util.getVideoColorAsDataURL('#remote-video'));
  await t.expect(r1).notEql(r3);
  await t.expect(r2).notEql(r3);

  // click to replace stream again
  await t.click(replaceBtn);
  // XXX: need to wait for firefox:headless...
  await t.wait(500);

  // if replaced, video has different color
  const r4 = await ClientFunction(() => Util.getVideoColorAsDataURL('#remote-video'));
  await t.expect(r1).notEql(r4);
  await t.expect(r2).notEql(r4);
  await t.expect(r3).notEql(r4);
});
