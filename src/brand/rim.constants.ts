/* @layer renderer-components @kind data */
import type { BrandRimSpec, BrandRimTone } from './rim.type';

const BRAND_RIM: BrandRimSpec = {
  colours: { light: '#ececf0' },
  ratio: 0.025,
  fineRatio: 0.0125,
  minPx: 1,
};

const BRAND_RIM_TONES: readonly BrandRimTone[] = ['light'];

export { BRAND_RIM, BRAND_RIM_TONES };
