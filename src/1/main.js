const pc1 = new RTCPeerConnection();
const pc2 = new RTCPeerConnection();

pc1.onicecandidate = ev => ev.candidate && pc2.addIceCandidate(ev.candidate);
pc2.onicecandidate = ev => ev.candidate && pc1.addIceCandidate(ev.candidate);

pc2.addEventListener('track', ev => {
  $('video').get(0).srcObject = ev.streams[0];
}, { once: true });

Util.renderCanvas($('canvas').get(0));
$('button').eq(0).on('click', call);

async function call() {
  const stream = $('canvas').get(0).captureStream();
  stream.getTracks().forEach(track => pc1.addTrack(track, stream));

  const offer = await pc1.createOffer({
    offerToReceiveAudio: true,
    offerToReceiveVideo: true,
  });

  await pc1.setLocalDescription(offer);
  await pc2.setRemoteDescription(offer);

  const answer = await pc2.createAnswer();

  await pc2.setLocalDescription(answer);
  await pc1.setRemoteDescription(answer);
}
