/* global $, Peer */
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
    console.log('[tc] onstream called', stream);
  });
});

$('button').eq(0).on('click', call);
$('button').eq(1).on('click', hangUp);

function call() {
  const { stream } = new AudioContext().createMediaStreamDestination();
  const mc = peer1.call(randId, stream);
  mc.once('stream', stream => {
    console.log('[tc] onstream called', stream);
  });
}

function hangUp() {
  peer1.close();
  peer2.close();
}
