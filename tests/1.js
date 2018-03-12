import { Selector, ClientFunction } from 'testcafe';

fixture('Vanilla RTCPeerConnection')
  .page('http://localhost:8080/1/');

const callBtn = Selector('#tc-call');

const getVideoColor = ClientFunction(() => {
  const canvas = $('<canvas />').get(0);
  const ctx = canvas.getContext('2d');

  ctx.drawImage($('video').get(0), 0, 0);
  return canvas.toDataURL();
});

test('should connect P2P', async t => {
  // get black frame
  const c1 = await getVideoColor();
  // click to start call
  await t.click(callBtn);

  // XXX: need to wait for firefox:headless...
  await t.wait(500);

  // if connected, video is not black now
  const c2 = await getVideoColor();
  await t.expect(c1).notEql(c2);
});
