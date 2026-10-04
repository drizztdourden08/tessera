/* @layer renderer-components @kind data */
import type { BrandPiece } from '../brand.type';

const SENTRI_SYMBOLS: Readonly<Record<'question' | 'exclaim' | 'heart' | 'zSmall' | 'zMid' | 'zBig' | 'sweat' | 'focus', BrandPiece>> = {
  question: {
    name: 'Question mark',
    w: 7,
    h: 9,
    paths: [
      { ink: '#000000', d: 'M2 0h3v1h-3zM1 1h1v1h-1zM5 1h1v1h-1zM0 2h1v1h-1zM3 2h1v1h-1zM6 2h1v1h-1zM1 3h3v1h-3zM6 3h1v1h-1zM2 4h1v1h-1zM5 4h1v1h-1zM2 5h1v1h-1zM4 5h1v1h-1zM3 6h1v1h-1zM2 7h1v1h-1zM4 7h1v1h-1zM3 8h1v1h-1z' },
      { ink: '#e6f7ff', d: 'M2 1h3v1h-3zM1 2h1v1h-1zM5 2h1v1h-1z' },
      { ink: '#a5f0ff', d: 'M2 2h1v1h-1zM4 2h1v1h-1zM4 3h1v1h-1zM3 4h1v1h-1z' },
      { ink: '#61e8ff', d: 'M5 3h1v1h-1zM4 4h1v1h-1zM3 5h1v1h-1z' },
      { ink: '#20c7ff', d: 'M3 7h1v1h-1z' },
    ],
  },
  exclaim: {
    name: 'Exclamation mark',
    w: 4,
    h: 9,
    paths: [
      { ink: '#000000', d: 'M1 0h2v1h-2zM0 1h1v1h-1zM3 1h1v1h-1zM0 2h1v1h-1zM3 2h1v1h-1zM0 3h1v1h-1zM3 3h1v1h-1zM0 4h1v1h-1zM3 4h1v1h-1zM0 5h1v1h-1zM3 5h1v1h-1zM1 6h2v1h-2zM0 7h1v1h-1zM3 7h1v1h-1zM1 8h2v1h-2z' },
      { ink: '#e6f7ff', d: 'M1 1h2v1h-2zM1 2h2v1h-2zM1 3h1v1h-1z' },
      { ink: '#a5f0ff', d: 'M2 3h1v1h-1zM1 4h2v1h-2zM1 5h1v1h-1z' },
      { ink: '#61e8ff', d: 'M2 5h1v1h-1zM1 7h1v1h-1z' },
      { ink: '#20c7ff', d: 'M2 7h1v1h-1z' },
    ],
  },
  heart: {
    name: 'Heart',
    w: 9,
    h: 8,
    paths: [
      { ink: '#000000', d: 'M2 0h2v1h-2zM5 0h2v1h-2zM1 1h1v1h-1zM4 1h1v1h-1zM7 1h1v1h-1zM0 2h1v1h-1zM8 2h1v1h-1zM0 3h1v1h-1zM8 3h1v1h-1zM1 4h1v1h-1zM7 4h1v1h-1zM2 5h1v1h-1zM6 5h1v1h-1zM3 6h1v1h-1zM5 6h1v1h-1zM4 7h1v1h-1z' },
      { ink: '#ff5c8a', d: 'M2 1h2v1h-2zM5 1h2v1h-2zM1 2h1v1h-1zM3 2h5v1h-5zM1 3h6v1h-6zM2 4h4v1h-4zM3 5h2v1h-2z' },
      { ink: '#ffd1df', d: 'M2 2h1v1h-1z' },
      { ink: '#d63a6a', d: 'M7 3h1v1h-1zM6 4h1v1h-1zM5 5h1v1h-1zM4 6h1v1h-1z' },
    ],
  },
  zSmall: {
    name: 'Small z',
    w: 6,
    h: 6,
    paths: [
      { ink: '#000000', d: 'M1 0h4v1h-4zM0 1h1v1h-1zM5 1h1v1h-1zM1 2h2v1h-2zM4 2h1v1h-1zM1 3h1v1h-1zM3 3h2v1h-2zM0 4h1v1h-1zM5 4h1v1h-1zM1 5h4v1h-4z' },
      { ink: '#61e8ff', d: 'M1 1h4v1h-4zM3 2h1v1h-1zM2 3h1v1h-1zM1 4h4v1h-4z' },
    ],
  },
  zMid: {
    name: 'Middle z',
    w: 7,
    h: 7,
    paths: [
      { ink: '#000000', d: 'M1 0h5v1h-5zM0 1h1v1h-1zM6 1h1v1h-1zM1 2h3v1h-3zM5 2h1v1h-1zM2 3h1v1h-1zM4 3h1v1h-1zM1 4h1v1h-1zM3 4h3v1h-3zM0 5h1v1h-1zM6 5h1v1h-1zM1 6h5v1h-5z' },
      { ink: '#a5f0ff', d: 'M1 1h5v1h-5zM4 2h1v1h-1zM3 3h1v1h-1zM2 4h1v1h-1zM1 5h5v1h-5z' },
    ],
  },
  zBig: {
    name: 'Big Z',
    w: 8,
    h: 8,
    paths: [
      { ink: '#000000', d: 'M1 0h6v1h-6zM0 1h1v1h-1zM7 1h1v1h-1zM1 2h4v1h-4zM6 2h1v1h-1zM3 3h1v1h-1zM5 3h1v1h-1zM2 4h1v1h-1zM4 4h1v1h-1zM1 5h1v1h-1zM3 5h4v1h-4zM0 6h1v1h-1zM7 6h1v1h-1zM1 7h6v1h-6z' },
      { ink: '#e6f7ff', d: 'M1 1h6v1h-6zM5 2h1v1h-1zM4 3h1v1h-1zM3 4h1v1h-1zM2 5h1v1h-1zM1 6h6v1h-6z' },
    ],
  },
  sweat: {
    name: 'Sweat drop',
    w: 5,
    h: 6,
    paths: [
      { ink: '#000000', d: 'M2 0h1v1h-1zM1 1h1v1h-1zM3 1h1v1h-1zM0 2h1v1h-1zM4 2h1v1h-1zM0 3h1v1h-1zM4 3h1v1h-1zM1 4h1v1h-1zM3 4h1v1h-1zM2 5h1v1h-1z' },
      { ink: '#61e8ff', d: 'M2 1h1v1h-1zM1 2h1v1h-1zM3 2h1v1h-1zM1 3h2v1h-2z' },
      { ink: '#e6f7ff', d: 'M2 2h1v1h-1z' },
      { ink: '#20c7ff', d: 'M3 3h1v1h-1zM2 4h1v1h-1z' },
    ],
  },
  focus: {
    name: 'Focus mark',
    w: 3,
    h: 5,
    paths: [
      { ink: '#a5f0ff', d: 'M2 0h1v1h-1zM1 1h1v1h-1zM0 2h1v1h-1zM2 2h1v1h-1zM2 3h1v1h-1zM1 4h1v1h-1z' },
    ],
  },
};

export { SENTRI_SYMBOLS };
