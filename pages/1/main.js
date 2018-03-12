/* global $ */
const pc1 = new RTCPeerConnection();
const pc2 = new RTCPeerConnection();

pc1.onicecandidate = ev => ev.candidate && pc2.addIceCandidate(ev.candidate);
pc2.onicecandidate = ev => ev.candidate && pc1.addIceCandidate(ev.candidate);

pc2.addEventListener('track', ev => {
  console.log('[tc] ontrack called', ev);
}, { once: true });

$('button').eq(0).on('click', call);
$('button').eq(1).on('click', hangUp);

async function call() {
  const { stream } = new AudioContext().createMediaStreamDestination();
  stream.getTracks().forEach(track => pc1.addTrack(track, stream));

  const offer = await pc1.createOffer({
    offerToReceiveAudio: 1,
    offerToReceiveVideo: 1
  });

  await pc1.setLocalDescription(offer);
  await pc2.setRemoteDescription(offer);

  const answer = await pc2.createAnswer();

  await pc2.setLocalDescription(answer);
  await pc1.setRemoteDescription(answer);
}

function hangUp() {
  pc1.close();
  pc2.close();
}
