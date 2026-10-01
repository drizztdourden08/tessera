/* @layer renderer-components @kind types */
import type { TESSERA_STRINGS } from './tessera-strings.constants';

type TesseraStrings = typeof TESSERA_STRINGS;

type TesseraStringGroup = keyof TesseraStrings;

type TesseraStringsOverride = { readonly [G in TesseraStringGroup]?: Partial<TesseraStrings[G]> };

export type { TesseraStringGroup, TesseraStrings, TesseraStringsOverride };
