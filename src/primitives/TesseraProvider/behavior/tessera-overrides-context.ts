/* @layer renderer-components @kind util */
import { createContext } from 'react';
import { TESSERA_SETUP } from '../TesseraProvider.constants';
import type { TesseraSetup } from '../TesseraProvider.type';

const TesseraOverridesContext = createContext<TesseraSetup>(TESSERA_SETUP);

export { TesseraOverridesContext };
