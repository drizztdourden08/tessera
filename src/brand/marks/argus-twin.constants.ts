/* @layer renderer-components @kind data */
import type { BrandMarkPath } from '../brand.type';
import { ARGUS_INK } from './argus-ink.constants';

const ARGUS_TWIN_FULL: readonly BrandMarkPath[] = [
  { ink: ARGUS_INK.twin.base, evenOdd: true, d: 'M4 16L36 4L60 12L60 28L60 36L46 48L32 60L18 48L4 36ZM14 24L22 24L22 32L14 32ZM42 24L50 24L50 32L42 32Z' },
  { ink: ARGUS_INK.twin.bright, evenOdd: true, d: 'M4 16L36 4L32 24Z' },
  { ink: ARGUS_INK.twin.sheen, evenOdd: true, d: 'M36 4L44 14L32 24Z' },
  { ink: ARGUS_INK.twin.light, evenOdd: true, d: 'M36 4L60 12L60 28L44 14Z' },
  { ink: ARGUS_INK.twin.lit, evenOdd: true, d: 'M4 16L32 24L32 36L4 36ZM14 24L22 24L22 32L14 32Z' },
  { ink: ARGUS_INK.twin.base, evenOdd: true, d: 'M44 14L60 28L60 36L32 36L32 24ZM42 24L50 24L50 32L42 32Z' },
  { ink: ARGUS_INK.twin.shade, evenOdd: true, d: 'M4 36L32 36L18 48Z' },
  { ink: ARGUS_INK.twin.dim, evenOdd: true, d: 'M18 48L32 36L32 60Z' },
  { ink: ARGUS_INK.twin.dark, evenOdd: true, d: 'M32 36L60 36L46 48Z' },
  { ink: ARGUS_INK.twin.deep, evenOdd: true, d: 'M32 36L46 48L32 60Z' },
];

const ARGUS_TWIN_MEDIUM: readonly BrandMarkPath[] = [
  { ink: ARGUS_INK.twin.base, evenOdd: true, d: 'M2 8L18 2L30 6L30 14L30 18L16 30L2 18ZM7 12L11 12L11 16L7 16ZM21 12L25 12L25 16L21 16Z' },
  { ink: ARGUS_INK.twin.bright, evenOdd: true, d: 'M2 8L18 2L22 7L16 12Z' },
  { ink: ARGUS_INK.twin.light, evenOdd: true, d: 'M18 2L30 6L30 14L22 7Z' },
  { ink: ARGUS_INK.twin.lit, evenOdd: true, d: 'M2 8L16 12L16 18L2 18ZM7 12L11 12L11 16L7 16Z' },
  { ink: ARGUS_INK.twin.base, evenOdd: true, d: 'M22 7L30 14L30 18L16 18L16 12ZM21 12L25 12L25 16L21 16Z' },
  { ink: ARGUS_INK.twin.shade, evenOdd: true, d: 'M2 18L16 18L16 30Z' },
  { ink: ARGUS_INK.twin.dark, evenOdd: true, d: 'M16 18L30 18L16 30Z' },
];

const ARGUS_TWIN_SMALL: readonly BrandMarkPath[] = [
  { ink: ARGUS_INK.twin.bright, evenOdd: true, d: 'M1 4L9 1L11 4L8 6L8 15L1 9ZM4 6L6 6L6 8L4 8Z' },
  { ink: ARGUS_INK.twin.light, evenOdd: true, d: 'M9 1L15 3L15 7L11 4Z' },
  { ink: ARGUS_INK.twin.dim, evenOdd: true, d: 'M11 4L15 7L15 9L8 15L8 6ZM10 6L12 6L12 8L10 8Z' },
];

export { ARGUS_TWIN_FULL, ARGUS_TWIN_MEDIUM, ARGUS_TWIN_SMALL };
