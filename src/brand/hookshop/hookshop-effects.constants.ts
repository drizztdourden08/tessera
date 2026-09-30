/* @layer renderer-components @kind data */
import type { BrandPiece } from '../brand.type';

const HOOKSHOP_EFFECTS: Readonly<Record<'sparkle' | 'star' | 'speedLine', BrandPiece>> = {
  sparkle: {
    name: 'Sparkle',
    w: 9,
    h: 9,
    paths: [
      { ink: '#c8ccd6', d: 'M4 0h1v1h-1zM0 4h1v1h-1zM8 4h1v1h-1zM4 8h1v1h-1z' },
      { ink: '#ffffff', d: 'M4 1h1v1h-1zM4 2h1v1h-1zM4 3h1v1h-1zM1 4h7v1h-7zM4 5h1v1h-1zM4 6h1v1h-1zM4 7h1v1h-1z' },
      { ink: '#7d8190', d: 'M2 2h1v1h-1zM6 2h1v1h-1zM2 6h1v1h-1zM6 6h1v1h-1z' },
    ],
  },
  star: {
    name: 'Star',
    w: 5,
    h: 5,
    paths: [
      { ink: '#ffc93a', d: 'M2 0h1v1h-1zM0 2h1v1h-1zM4 2h1v1h-1zM2 4h1v1h-1z' },
      { ink: '#fff1a8', d: 'M2 1h1v1h-1zM1 2h3v1h-3zM2 3h1v1h-1z' },
    ],
  },
  speedLine: {
    name: 'Speed line',
    w: 7,
    h: 1,
    paths: [
      { ink: '#7d8190', d: 'M0 0h2v1h-2z' },
      { ink: '#c8ccd6', d: 'M2 0h2v1h-2z' },
      { ink: '#ffffff', d: 'M4 0h3v1h-3z' },
    ],
  },
};

export { HOOKSHOP_EFFECTS };
