const pc1 = new RTCPeerConnection();
const pc2 = new RTCPeerConnection();

pc1.onicecandidate = ev => ev.candidate && pc2.addIceCandidate(ev.candidate);
pc2.onicecandidate = ev => ev.candidate && pc1.addIceCandidate(ev.candidate);

pc1.addEventListener('track', ev => {
  Util.$('#local-disp').srcObject = ev.streams[0];
}, { once: true });
pc2.addEventListener('track', ev => {
  Util.$('#remote-disp').srcObject = ev.streams[0];
}, { once: true });

Util.$('#call-btn').onclick = call;

async function call() {
  const stream1 = await Util.getMediaStream();
  const stream2 = await Util.getMediaStream();
  Util.$('#local-video').srcObject = stream1;
  Util.$('#remote-video').srcObject = stream2;

  stream1.getTracks().forEach(track => pc1.addTrack(track, stream1));
  stream2.getTracks().forEach(track => pc2.addTrack(track, stream2));

  const offer = await pc1.createOffer();

  await pc1.setLocalDescription(offer);
  await pc2.setRemoteDescription(offer);

  const answer = await pc2.createAnswer();

  await pc2.setLocalDescription(answer);
  await pc1.setRemoteDescription(answer);
}
