/* @layer renderer-components @kind data */
import type { BrandRimSpec, BrandRimTone } from './rim.type';

const BRAND_RIM: BrandRimSpec = {
  colours: { light: '#ececf0', dark: '#0e0e12' },
  ratio: 0.025,
  fineRatio: 0.0125,
  minPx: 1,
};

const BRAND_RIM_TONES: readonly BrandRimTone[] = ['light', 'dark'];

export { BRAND_RIM, BRAND_RIM_TONES };
