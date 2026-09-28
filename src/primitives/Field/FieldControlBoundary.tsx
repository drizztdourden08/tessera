/* @layer renderer-components @kind component */
import { NO_CONTROL } from './field-control.constants';
import { FieldControlContext } from './FieldControlContext';
import type { FieldControlBoundaryProps } from './field-control.type';

const FieldControlBoundary = ({ children }: FieldControlBoundaryProps) => (
  <FieldControlContext.Provider value={NO_CONTROL}>{children}</FieldControlContext.Provider>
);

export { FieldControlBoundary };
