/* @layer renderer-components @kind hook */
import { useContext } from 'react';
import { TesseraOverridesContext } from './tessera-overrides-context';
import type { TesseraSetup } from '../TesseraProvider.type';

const useTesseraOverride = <K extends keyof TesseraSetup>(part: K): TesseraSetup[K] => useContext(TesseraOverridesContext)[part];

export { useTesseraOverride };
