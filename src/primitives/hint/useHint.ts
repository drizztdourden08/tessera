/* @layer renderer-components @kind hook */
import { useContext } from 'react';
import { HintValueContext } from './hint-value-context';
import type { Hint } from './hint.type';

const useHint = (): Hint | null => useContext(HintValueContext);

export { useHint };
