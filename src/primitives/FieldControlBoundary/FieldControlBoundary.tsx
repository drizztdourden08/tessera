/* @layer renderer-components @kind component */
import { NO_CONTROL } from '../field-control/field-control.constants';
import { FieldControlContext } from '../field-control/field-control-context';
import type { FieldControlBoundaryProps } from '../field-control/field-control.type';

const FieldControlBoundary = ({ children }: FieldControlBoundaryProps) => (
  <FieldControlContext.Provider value={NO_CONTROL}>{children}</FieldControlContext.Provider>
);

export { FieldControlBoundary };
