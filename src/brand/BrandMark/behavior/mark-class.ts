/* @layer renderer-components @kind logic */
import type { BrandRim } from '../../rim.type';
import type { BrandMarkSize } from '../BrandMark.type';

const markClass = (size: BrandMarkSize, rim: BrandRim, className: string): string =>
  ['brand-mark', `brand-mark--${size}`, rim === 'none' ? '' : 'brand-mark--rimmed', className].filter(Boolean).join(' ');

export { markClass };
