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
  conn.on('stream', stream => {
    Util.$('#remote-video').srcObject = stream;
  });
});

Util.$('#call-btn').onclick = call;
Util.$('#replace-btn').onclick = replace;

let mc;
async function call() {
  const stream1 = await Util.getMediaStream();
  Util.$('#local-video-1').srcObject = stream1;
  mc = peer1.call(randId, stream1);
}

// replace to 2nd stream
async function replace() {
  const stream2 = await Util.getMediaStream();
  Util.$('#local-video-2').srcObject = stream2;
  mc.replaceStream(stream2);
  Util.$('#local-video-1').srcObject = null;

  // override w/ 3rd stream
  Util.$('#replace-btn').onclick = async function() {
    const stream3 = await Util.getMediaStream();
    Util.$('#local-video-3').srcObject = stream3;
    mc.replaceStream(stream3);
    Util.$('#local-video-2').srcObject = null;
  };
}
