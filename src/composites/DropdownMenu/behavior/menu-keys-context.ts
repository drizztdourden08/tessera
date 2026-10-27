/* @layer renderer-components @kind logic */
import { createContext } from 'react';
import type { KeyboardEvent } from 'react';

const MenuKeysContext = createContext<(event: KeyboardEvent<HTMLElement>) => void>(() => undefined);

export { MenuKeysContext };
