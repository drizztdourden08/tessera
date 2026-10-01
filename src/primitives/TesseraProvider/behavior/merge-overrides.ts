/* @layer renderer-components @kind util */
import { mergeStrings } from '../../strings/merge-strings';
import type { TesseraOverrides, TesseraSetup } from '../TesseraProvider.type';

const mergeOverrides = (inherited: TesseraSetup, overrides: TesseraOverrides): TesseraSetup => ({
  ...inherited,
  ...overrides,
  strings: mergeStrings(inherited.strings, overrides.strings),
});

export { mergeOverrides };
