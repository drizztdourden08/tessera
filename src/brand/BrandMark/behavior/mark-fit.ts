/* @layer renderer-components @kind logic */
import type { BrandMarkFit, BrandMarkSize } from '../BrandMark.type';

const markFit = (size: BrandMarkSize, fit: BrandMarkFit = 'square'): BrandMarkFit => (size === 'fill' ? 'square' : fit);

export { markFit };
