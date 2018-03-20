window.Util = {
  $(selector) {
    return document.querySelector(selector);
  },
  getVideoColorAsDataURL(selector) {
    const video = document.querySelector(selector);

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    ctx.drawImage(video, 0, 0);
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
};
