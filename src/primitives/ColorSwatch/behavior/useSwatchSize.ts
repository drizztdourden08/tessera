/* @layer renderer-components @kind hook */
import { useControlSize } from '../../field-control/useControlSize';
import type { SwatchSize } from '../ColorSwatch.type';

const useSwatchSize = (own?: SwatchSize): SwatchSize => {
  const inherited = useControlSize();
  return own ?? inherited;
};

export { useSwatchSize };
