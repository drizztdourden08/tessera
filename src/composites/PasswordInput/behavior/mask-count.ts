/* @layer renderer-components @kind util */
import type { MaskUnit } from './mask.type';

const maskCount = (value: string, unit: MaskUnit, locale: string | undefined): number => {
  if (unit === 'code-unit') return value.length;
  if (typeof Intl.Segmenter !== 'function') return Array.from(value).length;
  return Array.from(new Intl.Segmenter(locale, { granularity: 'grapheme' }).segment(value)).length;
};

export { maskCount };
