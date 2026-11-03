/* @layer renderer-components @kind types */
import type { SelectedTone } from '../../field-control/selected-tone.type';
import type { SegmentSize } from '../SegmentedControl.type';

interface SegmentedClassInput {
  size: SegmentSize;
  tone: SelectedTone;
  disabled: boolean;
  mixed: boolean;
  className: string | undefined;
}

export type { SegmentedClassInput };
