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

peer2.on('connection', conn => {
  conn.on('open', () => {
    conn.once('data', d => {
      Util.$('#remote-pre').textContent = d;

      setTimeout(() => conn.send('pong'), 500);
    });
  });
});

Util.$('#connect-btn').onclick = connect;

function connect() {
  const dc = peer1.connect(randId, {
    // XXX: TestCafe does not support Blob..
    serialization: 'json',
  });

  dc.on('open', () => {
    dc.once('data', d => {
      Util.$('#local-pre').textContent = d;
    });
    dc.send('ping');
  });
}
