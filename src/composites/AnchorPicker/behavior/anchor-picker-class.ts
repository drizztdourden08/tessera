/* @layer renderer-components @kind util */
import type { AnchorPickerSize } from '../AnchorPicker.type';

const anchorPickerClass = (size: AnchorPickerSize, disabled: boolean, className: string | undefined): string =>
  ['anchor-picker', `anchor-picker--${size}`, disabled && 'anchor-picker--disabled', className].filter(Boolean).join(' ');

export { anchorPickerClass };
