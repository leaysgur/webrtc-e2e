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
};
