window.Util = {
  $(selector) {
    return document.querySelector(selector);
  },
  renderCanvas(canvasEl, colors = []) {
    const ctx = canvasEl.getContext('2d');

    setInterval(() => {
      const r = typeof colors[0] === 'number'
        ? colors[0] : Math.floor(Math.random() * 255);
      const g = typeof colors[1] === 'number'
        ? colors[1] : Math.floor(Math.random() * 255);
      const b = typeof colors[2] === 'number'
        ? colors[2] : Math.floor(Math.random() * 255);
      ctx.fillStyle = `rgb(${r}, ${g}, ${b})`;
      ctx.fillRect(0, 0, canvasEl.width, canvasEl.height);
    }, 500);
  },
  getVideoColorAsDataURL(selector) {
    const video = document.querySelector(selector);

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    ctx.drawImage(video, 0, 0);
    return canvas.toDataURL();
  },
  makeMediaStreamByCanvas(canvas) {
    const [vTrack] = canvas.captureStream().getTracks();

    // OK
    // const stream = await navigator.mediaDevices.getUserMedia({ audio: 1, video: 0 });
    // const [aTrack] = stream.getAudioTracks();

    // NG
    // const [aTrack] = new AudioContext().createMediaStreamDestination().stream.getTracks();

    // NG
    // const ctx = new AudioContext();
    // const dest = ctx.createMediaStreamDestination();
    // const src = ctx.createBufferSource();
    // src.buffer = ctx.createBuffer(1, 1, ctx.sampleRate);
    // src.connect(dest);
    // src.start(0);
    // const [aTrack] = dest.stream.getTracks();

    // OK
    const ctx = new AudioContext();
    const dest = ctx.createMediaStreamDestination();
    const osc = ctx.createOscillator();
    osc.frequency.value = osc.frequency.maxValue - 1; // we can't hear it
    osc.connect(dest);
    osc.start();
    const [aTrack] = dest.stream.getTracks();

    return new MediaStream([vTrack, aTrack]);
  },
};
