/* @layer renderer-components @kind util */
import type { ControlSize } from '../../field-control/field-control.type';
import type { SelectedTone } from '../../field-control/selected-tone.type';

const segmentedClass = (size: ControlSize, tone: SelectedTone, disabled: boolean, className: string | undefined): string =>
  ['segmented', `control-size--${size}`, tone === 'neutral' && 'segmented--neutral', disabled && 'segmented--disabled', className].filter(Boolean).join(' ');

export { segmentedClass };
