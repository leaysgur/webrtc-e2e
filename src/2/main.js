const randId = Date.now();
const peer1 = new Peer({
  key: window.__SKYWAY_KEY__,
  config: {
    iceTransportPolicy: 'relay',
  },
});
const peer2 = new Peer(randId, {
  key: window.__SKYWAY_KEY__,
  config: {
    iceTransportPolicy: 'relay',
  },
});

peer2.on('call', conn => {
  const { stream } = new AudioContext().createMediaStreamDestination();
  conn.answer(stream);
  conn.once('stream', stream => {
    $('video').get(0).srcObject = stream;
  });
});

Util.renderCanvas($('canvas').get(0));
$('button').eq(0).on('click', call);

function call() {
  const stream = $('canvas').get(0).captureStream();
  const mc = peer1.call(randId, stream);
  mc.once('stream', stream => {
    console.log('[tc] onstream called', stream);
  });
}
