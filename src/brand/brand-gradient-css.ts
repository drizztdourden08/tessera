/* @layer renderer-components @kind logic */
import type { BrandGradient } from './brand.type';

const brandGradientCss = ({ angle, stops }: BrandGradient): string => `linear-gradient(${angle}deg, ${stops.join(', ')})`;

export { brandGradientCss };
