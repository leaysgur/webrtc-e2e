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

peer2.on('call', conn => {
  const stream2 = Util.$('#remote-canvas').captureStream();
  conn.answer(stream2);
  conn.once('stream', stream => {
    Util.$('#remote-video').srcObject = stream;
  });
});

Util.renderCanvas(Util.$('#local-canvas'));
Util.renderCanvas(Util.$('#remote-canvas'));
Util.$('#call-btn').onclick = call;

function call() {
  const stream1 = Util.$('#local-canvas').captureStream();
  const mc = peer1.call(randId, stream1);

  mc.once('stream', stream => {
    Util.$('#local-video').srcObject = stream;
  });
}
