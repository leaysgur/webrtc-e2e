window.Util = {
  renderCanvas(canvasEl) {
    const ctx = canvasEl.getContext('2d');

    setInterval(() => {
      const r = Math.floor(Math.random() * 255);
      const g = Math.floor(Math.random() * 255);
      const b = Math.floor(Math.random() * 255);
      ctx.fillStyle = `rgb(${r}, ${g}, ${b})`;
      ctx.fillRect(0, 0, canvasEl.width, canvasEl.height);
    }, 500);
  }
};
