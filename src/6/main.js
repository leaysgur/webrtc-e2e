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
  const sfuRoomL = peer1.joinRoom(randId, { stream: stream1, mode: 'sfu' });

  sfuRoomL.on('stream', stream => {
    Util.$('#local-disp').srcObject = stream;
  });
  sfuRoomL.on('peerLeave', () => {
    console.log('remote peer leave');
    Util.$('#local-disp').srcObject = null;
  });
}

let sfuRoomR;
async function remoteJoin() {
  const stream2 = await Util.getMediaStream();
  Util.$('#remote-video').srcObject = stream2;
  sfuRoomR = peer2.joinRoom(randId, { stream: stream2, mode: 'sfu' });

  sfuRoomR.on('stream', stream => {
    Util.$('#remote-disp').srcObject = stream;
  });
}

function remoteLeave() {
  sfuRoomR.close();
}
