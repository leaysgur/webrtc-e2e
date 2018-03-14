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
  conn.answer();
  conn.once('stream', stream => {
    Util.$('#remote-video').srcObject = stream;
  });
});

Util.renderCanvas(Util.$('#local-canvas-r'), [255, 0, 0]);
Util.renderCanvas(Util.$('#local-canvas-g'), [0, 255, 0]);
Util.renderCanvas(Util.$('#local-canvas-b'), [0, 0, 255]);
Util.$('#call-btn').onclick = call;
Util.$('#replace-btn').onclick = replace;

let mc;
function call() {
  const stream1 = Util.$('#local-canvas-r').captureStream();
  mc = peer1.call(randId, stream1);
}

// replace to 2nd stream
function replace() {
  const stream2 = Util.$('#local-canvas-g').captureStream();
  mc.replaceStream(stream2);

  // override w/ 3rd stream
  Util.$('#replace-btn').onclick = function() {
    const stream3 = Util.$('#local-canvas-b').captureStream();
    mc.replaceStream(stream3);
  };
}
