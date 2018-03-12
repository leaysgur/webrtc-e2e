const pc1 = new RTCPeerConnection();
const pc2 = new RTCPeerConnection();

pc1.onicecandidate = ev => ev.candidate && pc2.addIceCandidate(ev.candidate);
pc2.onicecandidate = ev => ev.candidate && pc1.addIceCandidate(ev.candidate);

pc2.addEventListener('track', ev => {
  console.log('[tc] ontrack called', ev);
  $('video').get(0).srcObject = ev.streams[0];
}, { once: true });

$('button').eq(0).on('click', call);
$('button').eq(1).on('click', hangUp);

drawCanvas();
function drawCanvas() {
  const canvas = $('canvas').get(0);
  const ctx = canvas.getContext('2d');

  setInterval(() => {
    const r = Math.floor(Math.random() * 255);
    const g = Math.floor(Math.random() * 255);
    const b = Math.floor(Math.random() * 255);
    ctx.fillStyle = `rgb(${r},${g},${b})`;
    ctx.fillRect(0, 0, canvas.width, canvas. height);
  }, 500);
}

async function call() {
  const stream = $('canvas').get(0).captureStream();
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
