/* @layer renderer-components @kind data */
import type { BrandPiece } from '../brand.type';

const SENTRI_SPARK: BrandPiece = {
  name: 'Spark',
  w: 5,
  h: 5,
  paths: [
    { ink: '#20c7ff', opacity: 0.45, d: 'M1 1h1v1h-1zM3 1h1v1h-1zM1 3h1v1h-1zM3 3h1v1h-1z' },
    { ink: '#01abfb', d: 'M2 0h1v1h-1zM0 2h1v1h-1zM4 2h1v1h-1zM2 4h1v1h-1z' },
    { ink: '#61e8ff', d: 'M2 1h1v1h-1zM1 2h1v1h-1zM3 2h1v1h-1zM2 3h1v1h-1z' },
    { ink: '#ffffff', d: 'M2 2h1v1h-1z' },
  ],
};

export { SENTRI_SPARK };
