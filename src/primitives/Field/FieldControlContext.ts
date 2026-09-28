/* @layer renderer-components @kind logic */
import { createContext } from 'react';
import { NO_CONTROL } from './field-control.constants';
import type { FieldControl } from './field-control.type';

const FieldControlContext = createContext<FieldControl>(NO_CONTROL);

export { FieldControlContext };
