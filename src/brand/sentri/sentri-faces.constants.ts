/* @layer renderer-components @kind data */
import type { BrandPiece } from '../brand.type';

const SENTRI_FACES: Readonly<Record<'grin' | 'soft' | 'narrow' | 'closed' | 'tired' | 'back', BrandPiece>> = {
  grin: {
    name: 'Grin eyes',
    w: 13,
    h: 5,
    paths: [
      { ink: '#000000', d: 'M0 0h13v1h-13zM0 1h3v1h-3zM4 1h5v1h-5zM10 1h3v1h-3zM0 2h2v1h-2zM3 2h1v1h-1zM5 2h3v1h-3zM9 2h1v1h-1zM11 2h2v1h-2zM0 3h13v1h-13zM0 4h13v1h-13z' },
      { ink: '#61e8ff', d: 'M3 1h1v1h-1zM9 1h1v1h-1z' },
      { ink: '#20c7ff', d: 'M2 2h1v1h-1zM4 2h1v1h-1zM8 2h1v1h-1zM10 2h1v1h-1z' },
    ],
  },
  soft: {
    name: 'Soft eyes',
    w: 13,
    h: 5,
    paths: [
      { ink: '#000000', d: 'M0 0h13v1h-13zM0 1h13v1h-13zM0 2h2v1h-2zM4 2h5v1h-5zM11 2h2v1h-2zM0 3h1v1h-1zM2 3h2v1h-2zM5 3h3v1h-3zM9 3h2v1h-2zM12 3h1v1h-1zM0 4h13v1h-13z' },
      { ink: '#61e8ff', d: 'M2 2h1v1h-1zM10 2h1v1h-1z' },
      { ink: '#20c7ff', d: 'M3 2h1v1h-1zM9 2h1v1h-1zM1 3h1v1h-1zM11 3h1v1h-1z' },
      { ink: '#01abfb', d: 'M4 3h1v1h-1zM8 3h1v1h-1z' },
    ],
  },
  narrow: {
    name: 'Narrowed eyes',
    w: 13,
    h: 5,
    paths: [
      { ink: '#000000', d: 'M0 0h13v1h-13zM0 1h13v1h-13zM0 2h1v1h-1zM5 2h3v1h-3zM12 2h1v1h-1zM0 3h2v1h-2zM4 3h5v1h-5zM11 3h2v1h-2zM0 4h13v1h-13z' },
      { ink: '#61e8ff', d: 'M1 2h1v1h-1zM11 2h1v1h-1z' },
      { ink: '#20c7ff', d: 'M2 2h3v1h-3zM8 2h3v1h-3z' },
      { ink: '#01abfb', d: 'M2 3h2v1h-2zM9 3h2v1h-2z' },
    ],
  },
  closed: {
    name: 'Closed eyes',
    w: 13,
    h: 5,
    paths: [
      { ink: '#000000', d: 'M0 0h13v1h-13zM0 1h13v1h-13zM0 2h1v1h-1zM2 2h2v1h-2zM5 2h3v1h-3zM9 2h2v1h-2zM12 2h1v1h-1zM0 3h2v1h-2zM4 3h5v1h-5zM11 3h2v1h-2zM0 4h13v1h-13z' },
      { ink: '#01abfb', d: 'M1 2h1v1h-1zM4 2h1v1h-1zM8 2h1v1h-1zM11 2h1v1h-1zM2 3h2v1h-2zM9 3h2v1h-2z' },
    ],
  },
  tired: {
    name: 'Tired eyes',
    w: 13,
    h: 5,
    paths: [
      { ink: '#000000', d: 'M0 0h13v1h-13zM0 1h13v1h-13zM0 2h13v1h-13zM0 3h2v1h-2zM4 3h4v1h-4zM10 3h3v1h-3zM0 4h2v1h-2zM4 4h4v1h-4zM10 4h3v1h-3z' },
      { ink: '#01abfb', d: 'M2 3h2v1h-2zM8 3h2v1h-2zM2 4h2v1h-2zM8 4h2v1h-2z' },
    ],
  },
  back: {
    name: 'Back',
    w: 15,
    h: 7,
    paths: [
      { ink: '#fe9702', d: 'M0 0h15v1h-15z' },
      { ink: '#ffb509', d: 'M0 1h15v1h-15zM0 2h15v1h-15zM0 3h15v1h-15zM0 4h15v1h-15zM1 5h13v1h-13z' },
      { ink: '#fe9702', d: 'M0 5h1v1h-1zM14 5h1v1h-1zM0 6h15v1h-15z' },
    ],
  },
};

export { SENTRI_FACES };
