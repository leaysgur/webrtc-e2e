window.Util = {
  $(selector) {
    return document.querySelector(selector);
  },
  getVideoColorAsDataURL(selector) {
    const video = document.querySelector(selector);
    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    canvas.getContext('2d').drawImage(video, 0, 0);
    return canvas.toDataURL();
  },
  async getMediaStream() {
    const stream = await navigator.mediaDevices.getUserMedia({
      // for chrome
      audio: 1, video: 1,
      // for firefox
      fake: 1,
    });
    return stream;
  },
  getCanvasMediaStream() {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    setInterval(() => {
      const r = Math.floor(Math.random() * 255);
      const g = Math.floor(Math.random() * 255);
      const b = Math.floor(Math.random() * 255);
      ctx.fillColor = `rgb(${r}, ${g}, ${b})`;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }, 500);

    return canvas.captureStream();
  },
};
