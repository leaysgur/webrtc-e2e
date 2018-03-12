const pc1 = new RTCPeerConnection();
const pc2 = new RTCPeerConnection();

pc1.onicecandidate = ev => ev.candidate && pc2.addIceCandidate(ev.candidate);
pc2.onicecandidate = ev => ev.candidate && pc1.addIceCandidate(ev.candidate);

pc1.addEventListener('track', ev => {
  Util.$('#local-video').srcObject = ev.streams[0];
}, { once: true });
pc2.addEventListener('track', ev => {
  Util.$('#remote-video').srcObject = ev.streams[0];
}, { once: true });

Util.renderCanvas(Util.$('#local-canvas'));
Util.renderCanvas(Util.$('#remote-canvas'));
Util.$('#call-btn').onclick = call;

async function call() {
  const stream1 = Util.$('#local-canvas').captureStream();
  const stream2 = Util.$('#remote-canvas').captureStream();
  stream1.getTracks().forEach(track => pc1.addTrack(track, stream1));
  stream2.getTracks().forEach(track => pc2.addTrack(track, stream2));

  const offer = await pc1.createOffer();

  await pc1.setLocalDescription(offer);
  await pc2.setRemoteDescription(offer);

  const answer = await pc2.createAnswer();

  await pc2.setLocalDescription(answer);
  await pc1.setRemoteDescription(answer);
}
