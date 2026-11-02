/* @layer renderer-components @kind util */
import type { SelectedTone } from '../../field-control/selected-tone.type';
import type { SegmentSize } from '../SegmentedControl.type';

const segmentedClass = (size: SegmentSize, tone: SelectedTone, disabled: boolean, className: string | undefined): string =>
  [
    'segmented',
    `control-size--${size === 'sm-plus' ? 'sm' : size}`,
    size === 'sm-plus' && 'segmented--sm-plus',
    tone === 'neutral' && 'segmented--neutral',
    disabled && 'segmented--disabled',
    className,
  ].filter(Boolean).join(' ');

export { segmentedClass };
