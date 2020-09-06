const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

const random = (min, max) => {
  return Math.floor(Math.random() * (max - min)) + min;
};

export { canvas, ctx, random };
