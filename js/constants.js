const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
// const image = document.querySelector('.image');

const random = (min, max) => {
  return Math.floor(Math.random() * (max - min)) + min;
};

function distBetweenAB(A, B) {
  const distance = Math.sqrt(
    Math.pow(A[0] - B[0], 2) + Math.pow(A[1] - B[1], 2)
  );
  return distance;
}

const ballSize = 10;
const ballRadius = 25;

export { canvas, ctx, random, distBetweenAB, ballSize, ballRadius };
