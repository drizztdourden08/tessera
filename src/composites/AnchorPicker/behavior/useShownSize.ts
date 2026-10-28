/* @layer renderer-components @kind hook */
import { useControlSize } from '../../../primitives/field-control/useControlSize';
import type { AnchorPickerSize } from '../AnchorPicker.type';

const useShownSize = (size: AnchorPickerSize | undefined): AnchorPickerSize => {
  const controlSize = useControlSize(size === 'xs' ? 'sm' : size);
  return size === 'xs' ? 'xs' : controlSize;
};

export { useShownSize };
