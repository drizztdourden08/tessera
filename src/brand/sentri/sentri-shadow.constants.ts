/* @layer renderer-components @kind data */
import type { BrandPiece } from '../brand.type';

const SENTRI_SHADOW: BrandPiece = {
  name: 'Shadow',
  w: 25,
  h: 3,
  paths: [{ ink: '#000000', opacity: 0.35, d: 'M4 0h17v1h-17zM0 1h25v1h-25zM4 2h17v1h-17z' }],
};

export { SENTRI_SHADOW };
