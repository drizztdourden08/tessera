/* @layer renderer-components @kind hook */
import { useContext } from 'react';
import { FieldControlContext } from './field-control-context';
import type { ControlSize } from './field-control.type';

const useControlSize = (own?: ControlSize): ControlSize => {
  const field = useContext(FieldControlContext);
  return own ?? field.size ?? 'md';
};

export { useControlSize };
