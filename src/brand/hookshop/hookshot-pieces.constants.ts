/* @layer renderer-components @kind data */
import type { BrandPiece } from '../brand.type';

const HOOKSHOT_PIECES: Readonly<Record<'handle' | 'linkFace' | 'linkEdge' | 'head', BrandPiece>> = {
  handle: {
    name: 'Handle',
    w: 9,
    h: 6,
    paths: [
      { ink: '#000000', d: 'M1 0h7v1h-7zM0 1h1v1h-1zM8 1h1v1h-1zM0 2h1v1h-1zM8 2h1v1h-1zM0 3h1v1h-1zM8 3h1v1h-1zM0 4h1v1h-1zM8 4h1v1h-1zM1 5h7v1h-7z' },
      { ink: '#b5d7f6', d: 'M1 1h2v1h-2zM1 2h1v1h-1z' },
      { ink: '#677f97', d: 'M3 1h1v1h-1zM2 2h2v1h-2zM1 3h2v1h-2zM1 4h1v1h-1z' },
      { ink: '#f07878', d: 'M4 1h2v1h-2z' },
      { ink: '#c42424', d: 'M6 1h1v1h-1zM4 2h3v1h-3zM4 3h3v1h-3z' },
      { ink: '#dfe3ea', d: 'M7 1h1v1h-1z' },
      { ink: '#a3a9b5', d: 'M7 2h1v1h-1zM7 3h1v1h-1z' },
      { ink: '#435569', d: 'M3 3h1v1h-1zM2 4h2v1h-2z' },
      { ink: '#7e1212', d: 'M4 4h3v1h-3z' },
      { ink: '#6a707c', d: 'M7 4h1v1h-1z' },
    ],
  },
  linkFace: {
    name: 'Link, face on',
    w: 8,
    h: 5,
    paths: [
      { ink: '#000000', d: 'M1 0h6v1h-6zM0 1h1v1h-1zM7 1h1v1h-1zM0 2h1v1h-1zM7 2h1v1h-1zM0 3h1v1h-1zM7 3h1v1h-1zM1 4h6v1h-6z' },
      { ink: '#dfe3ea', d: 'M1 1h5v1h-5z' },
      { ink: '#a3a9b5', d: 'M6 1h1v1h-1zM1 2h1v1h-1z' },
      { ink: '#6a707c', d: 'M6 2h1v1h-1zM1 3h5v1h-5z' },
      { ink: '#3a3e48', d: 'M6 3h1v1h-1z' },
    ],
  },
  linkEdge: {
    name: 'Link, edge on',
    w: 6,
    h: 3,
    paths: [
      { ink: '#000000', d: 'M1 0h4v1h-4zM0 1h1v1h-1zM5 1h1v1h-1zM1 2h4v1h-4z' },
      { ink: '#dfe3ea', d: 'M1 1h2v1h-2z' },
      { ink: '#a3a9b5', d: 'M3 1h2v1h-2z' },
    ],
  },
  head: {
    name: 'Head',
    w: 10,
    h: 9,
    paths: [
      { ink: '#000000', d: 'M0 0h2v1h-2zM0 1h1v1h-1zM2 1h2v1h-2zM1 2h1v1h-1zM4 2h2v1h-2zM2 3h1v1h-1zM6 3h2v1h-2zM0 4h2v1h-2zM9 4h1v1h-1zM2 5h1v1h-1zM7 5h2v1h-2zM1 6h1v1h-1zM5 6h2v1h-2zM0 7h1v1h-1zM3 7h2v1h-2zM0 8h2v1h-2z' },
      { ink: '#dfe3ea', d: 'M1 1h1v1h-1zM2 2h2v1h-2zM4 3h2v1h-2zM3 4h5v1h-5z' },
      { ink: '#a3a9b5', d: 'M3 3h1v1h-1zM2 4h1v1h-1z' },
      { ink: '#ffffff', d: 'M8 4h1v1h-1z' },
      { ink: '#6a707c', d: 'M3 5h4v1h-4zM2 6h3v1h-3zM2 7h1v1h-1z' },
      { ink: '#3a3e48', d: 'M1 7h1v1h-1z' },
    ],
  },
};

export { HOOKSHOT_PIECES };
