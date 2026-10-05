/* @layer renderer-components @kind types */
type BrandRim = 'none' | 'light' | 'dark';

type BrandRimTone = Exclude<BrandRim, 'none'>;

interface BrandRimSpec {
  colours: Readonly<Record<BrandRimTone, string>>;
  ratio: number;
  fineRatio: number;
  minPx: number;
}

export type { BrandRim, BrandRimSpec, BrandRimTone };
