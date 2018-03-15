import { Selector, ClientFunction } from 'testcafe';
import { serverUrl, sleepForFirefoxHeadless } from './shared/const';

fixture('SkyWay SfuRoom')
  .page(`${serverUrl}/6`);

const localJoinBtn = Selector('#local-join-btn');
const remoteJoinBtn = Selector('#remote-join-btn');
const remoteLeaveBtn = Selector('#remote-leave-btn');

test('should join room', async t => {
  // get black frame
  const l1 = await ClientFunction(() => Util.getVideoColorAsDataURL('#local-video'))();
  const r1 = await ClientFunction(() => Util.getVideoColorAsDataURL('#remote-video'))();

  // click to join room
  await t.click(localJoinBtn);
  await t.click(remoteJoinBtn);
  // XXX: need to wait for firefox:headless...
  await t.wait(sleepForFirefoxHeadless);

  // if connected, video is not black now
  const l2 = await ClientFunction(() => Util.getVideoColorAsDataURL('#local-video'))();
  const r2 = await ClientFunction(() => Util.getVideoColorAsDataURL('#remote-video'))();
  await t.expect(l1).notEql(l2);
  await t.expect(r1).notEql(r2);
});

test('should leave', async t => {
  // click to start call
  await t.click(localJoinBtn);
  await t.click(remoteJoinBtn);
  // XXX: need to wait for firefox:headless...
  await t.wait(sleepForFirefoxHeadless);

  // then leave
  await t.click(remoteLeaveBtn);

  // leave log printed
  const { log } = await t.getBrowserConsoleMessages();
  await t.expect(log.length).eql(1);
});

test('should rejoin after leave', async t => {
  // click to start call
  await t.click(localJoinBtn);
  await t.click(remoteJoinBtn);
  // XXX: need to wait for firefox:headless...
  await t.wait(sleepForFirefoxHeadless);

  // then leave
  await t.click(remoteLeaveBtn);

  const l1 = await ClientFunction(() => Util.getVideoColorAsDataURL('#local-video'))();
  const r1 = await ClientFunction(() => Util.getVideoColorAsDataURL('#remote-video'))();

  await t.click(remoteJoinBtn);
  // XXX: need to wait for firefox:headless...
  await t.wait(sleepForFirefoxHeadless);

  // if rejoined, video will re-render
  const l2 = await ClientFunction(() => Util.getVideoColorAsDataURL('#local-video'))();
  const r2 = await ClientFunction(() => Util.getVideoColorAsDataURL('#remote-video'))();
  await t.expect(l1).notEql(l2);
  await t.expect(r1).notEql(r2);
});
