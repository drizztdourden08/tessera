/* @layer renderer-components @kind util */
import { createContext } from 'react';
import { NO_OVERRIDES } from '../TesseraProvider.constants';
import type { TesseraOverrides } from '../TesseraProvider.type';

const TesseraOverridesContext = createContext<TesseraOverrides>(NO_OVERRIDES);

export { TesseraOverridesContext };
