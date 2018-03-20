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

Util.$('#local-join-btn').onclick = localJoin;
Util.$('#remote-join-btn').onclick = remoteJoin;
Util.$('#remote-leave-btn').onclick = remoteLeave;

async function localJoin() {
  const stream1 = await Util.getMediaStream();
  Util.$('#local-video').srcObject = stream1;
  const meshRoomL = peer1.joinRoom(randId, { stream: stream1 });

  meshRoomL.on('stream', stream => {
    Util.$('#local-disp').srcObject = stream;
  });
  meshRoomL.on('peerLeave', () => {
    console.log('remote peer leave');
    Util.$('#local-disp').srcObject = null;
  });
}

let meshRoomR;
async function remoteJoin() {
  const stream2 = await Util.getMediaStream();
  Util.$('#remote-video').srcObject = stream2;
  meshRoomR = peer2.joinRoom(randId, { stream: stream2 });

  meshRoomR.on('stream', stream => {
    Util.$('#remote-disp').srcObject = stream;
  });
}

function remoteLeave() {
  meshRoomR.close();
}
