import { ClientFunction } from 'testcafe';

export const getVideoColor = ClientFunction(selector => {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');

  ctx.drawImage(Util.$(selector), 0, 0);
  return canvas.toDataURL();
});
