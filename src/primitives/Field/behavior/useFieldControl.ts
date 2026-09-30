/* @layer renderer-components @kind hook */
import { useContext } from 'react';
import { FieldControlContext } from '../../field-control/field-control-context';
import type { FieldControl } from '../../field-control/field-control.type';

const useFieldControl = (ownId?: string, ownDescribedBy?: string): FieldControl => {
  const field = useContext(FieldControlContext);
  const describedBy = [ownDescribedBy, field.describedBy].filter(Boolean).join(' ');
  return { id: ownId ?? field.id, describedBy: describedBy || undefined, invalid: field.invalid, labelId: field.labelId };
};

export { useFieldControl };
