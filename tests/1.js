import { Selector, ClientFunction } from 'testcafe';

fixture('Vanilla P2P:Media')
  .page('http://localhost:8080/1/');

const callBtn = Selector('#call-btn');

const getVideoColor = ClientFunction(selector => {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');

  ctx.drawImage(Util.$(selector), 0, 0);
  return canvas.toDataURL();
});

test('should connect P2P', async t => {
  // get black frame
  const l1 = await getVideoColor('#local-video');
  const r1 = await getVideoColor('#remote-video');

  // click to start call
  await t.click(callBtn);
  // XXX: need to wait for firefox:headless...
  await t.wait(500);

  // if connected, video is not black now
  const l2 = await getVideoColor('#local-video');
  const r2 = await getVideoColor('#remote-video');
  await t.expect(l1).notEql(l2);
  await t.expect(r1).notEql(r2);
});
