/* @layer renderer-components @kind hook */
import { useContext } from 'react';
import { TesseraOverridesContext } from './tessera-overrides-context';
import type { TesseraOverrides, TesseraPart } from '../TesseraProvider.type';

const useTesseraOverride = <K extends TesseraPart>(part: K): TesseraOverrides[K] => useContext(TesseraOverridesContext)[part];

export { useTesseraOverride };
