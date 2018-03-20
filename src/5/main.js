const randId = Date.now();
const peer1 = new Peer({
  key: window.__SKYWAY_KEY__,
});
const peer2 = new Peer({
  key: window.__SKYWAY_KEY__,
  config: {
    iceTransportPolicy: 'relay',
  },
});

Util.renderCanvas(Util.$('#local-canvas'));
Util.renderCanvas(Util.$('#remote-canvas'));
Util.$('#local-join-btn').onclick = localJoin;
Util.$('#remote-join-btn').onclick = remoteJoin;
Util.$('#remote-leave-btn').onclick = remoteLeave;

function localJoin() {
  const stream = Util.makeMediaStreamByCanvas(Util.$('#local-canvas'));
  const meshRoomL = peer1.joinRoom(randId, { stream });

  meshRoomL.on('stream', stream => {
    Util.$('#local-video').srcObject = stream;
  });
  meshRoomL.on('peerLeave', () => {
    console.log('remote peer leave');
  });
}

let meshRoomR;
function remoteJoin() {
  const stream = Util.makeMediaStreamByCanvas(Util.$('#remote-canvas'));
  meshRoomR = peer2.joinRoom(randId, { stream });

  meshRoomR.on('stream', stream => {
    Util.$('#remote-video').srcObject = stream;
  });
}

function remoteLeave() {
  meshRoomR.close();
}
