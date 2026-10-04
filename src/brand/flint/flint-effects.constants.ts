/* @layer renderer-components @kind data */
import type { BrandPiece } from '../brand.type';

const FLINT_EFFECTS: Readonly<Record<'chipGlow' | 'spark', BrandPiece>> = {
  chipGlow: {
    name: 'Chip glow',
    w: 10,
    h: 8.5,
    paths: [
      { ink: '#ffb341', opacity: 0.3, d: 'M0.5 4.5A4.6 3.6 0 1 1 9.7 4.5A4.6 3.6 0 1 1 0.5 4.5Z' },
      { ink: '#ffc561', opacity: 0.45, d: 'M2.1 4.5A3 2.3 0 1 1 8.1 4.5A3 2.3 0 1 1 2.1 4.5Z' },
      { ink: '#ffd27a', d: 'M1.95 1.8L6.35 3.75L8.1 6.1L3.95 6.25Z' },
      { ink: '#fff3d6', d: 'M1.95 1.8L4.35 2.85L3.15 4.35Z' },
    ],
  },
  spark: {
    name: 'Spark',
    w: 5,
    h: 5,
    paths: [
      { ink: '#ffb341', opacity: 0.4, d: 'M0 2.5A2.5 2.5 0 1 1 5 2.5A2.5 2.5 0 1 1 0 2.5Z' },
      { ink: '#ffd27a', d: 'M2.5 0L3.1 1.9L5 2.5L3.1 3.1L2.5 5L1.9 3.1L0 2.5L1.9 1.9Z' },
      { ink: '#fff6e6', d: 'M1.7 2.5A0.8 0.8 0 1 1 3.3 2.5A0.8 0.8 0 1 1 1.7 2.5Z' },
    ],
  },
};

export { FLINT_EFFECTS };
