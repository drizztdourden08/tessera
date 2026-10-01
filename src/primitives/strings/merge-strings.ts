/* @layer renderer-components @kind util */
import type { TesseraStringGroup, TesseraStrings, TesseraStringsOverride } from './tessera-strings.type';

const mergeStrings = (base: TesseraStrings, override?: TesseraStringsOverride): TesseraStrings => {
  if (!override) return base;
  const groups = Object.keys(override) as TesseraStringGroup[];
  return groups.reduce<TesseraStrings>((table, group) => ({ ...table, [group]: { ...base[group], ...override[group] } }), base);
};

export { mergeStrings };
