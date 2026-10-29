/* @layer renderer-components @kind logic */
import type { BrandRim } from '../../rim.type';
import type { BrandMarkFit, BrandMarkSize } from '../BrandMark.type';

const markClass = (size: BrandMarkSize, fit: BrandMarkFit, rim: BrandRim, className: string): string =>
  [
    'brand-mark',
    `brand-mark--${size}`,
    fit === 'height' ? 'brand-mark--height' : '',
    rim === 'none' ? '' : 'brand-mark--rimmed',
    className,
  ].filter(Boolean).join(' ');

export { markClass };
