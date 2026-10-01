/* @layer renderer-components @kind hook */
import { useContext } from 'react';
import { TesseraOverridesContext } from './tessera-overrides-context';
import type { TesseraStrings } from '../../strings/tessera-strings.type';

const useTesseraStrings = (): TesseraStrings => useContext(TesseraOverridesContext).strings;

export { useTesseraStrings };
