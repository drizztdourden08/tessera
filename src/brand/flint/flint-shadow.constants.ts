/* @layer renderer-components @kind data */
import type { BrandPiece } from '../brand.type';

const FLINT_SHADOW: BrandPiece = {
  name: 'Shadow',
  w: 32,
  h: 3,
  paths: [{ ink: '#000000', opacity: 0.35, d: 'M0 1.5A16 1.5 0 1 1 32 1.5A16 1.5 0 1 1 0 1.5Z' }],
};

export { FLINT_SHADOW };
