/* @layer renderer-components @kind hook */
import { useContext } from 'react';
import { DENSITY_SIZE } from './density.constants';
import { FieldControlContext } from './field-control-context';
import type { ControlSize } from './field-control.type';
import { useDensity } from './useDensity';

const useControlSize = (own?: ControlSize): ControlSize => {
  const field = useContext(FieldControlContext);
  const density = useDensity();
  return own ?? field.size ?? DENSITY_SIZE[density];
};

export { useControlSize };
