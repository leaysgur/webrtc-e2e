const randId = Date.now();
const peer1 = new Peer({
  key: window.__SKYWAY_KEY__,
});
const peer2 = new Peer(randId, {
  key: window.__SKYWAY_KEY__,
  config: {
    iceTransportPolicy: 'relay',
  },
});

peer2.on('call', async conn => {
  const stream2 = await Util.getMediaStream();
  Util.$('#remote-video').srcObject = stream2;

  conn.answer(stream2);
  conn.on('stream', stream => {
    Util.$('#remote-disp').srcObject = stream;
  });
});

Util.$('#call-btn').onclick = call;

async function call() {
  const stream1 = await Util.getMediaStream();
  Util.$('#local-video').srcObject = stream1;

  const mc = peer1.call(randId, stream1);

  mc.once('stream', stream => {
    Util.$('#local-disp').srcObject = stream;
  });
}
