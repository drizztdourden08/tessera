/* @layer renderer-components @kind data */
import type { PixelWordmarkSize } from '../PixelWordmark';
import type { BrandMarkSize } from '../BrandMark';

const WORDMARK_SIZE_FOR: Record<BrandMarkSize, PixelWordmarkSize> = { sm: 'sm', md: 'sm', lg: 'md', xl: 'lg', xxl: 'lg', h26: 'sm', h39: 'md', fill: 'fill' };

export { WORDMARK_SIZE_FOR };
