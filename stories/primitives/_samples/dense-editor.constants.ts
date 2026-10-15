/* @layer stories @kind data */
import type { SegmentOption, SelectOption } from '../../../src/primitives';

const ANCHORS: readonly SelectOption[] = [
  { value: 'top-left', label: 'Top left' },
  { value: 'top-right', label: 'Top right' },
  { value: 'bottom-left', label: 'Bottom left' },
  { value: 'bottom-right', label: 'Bottom right' },
];

const FLOWS: SegmentOption[] = [
  { value: 'row', label: 'Row' },
  { value: 'column', label: 'Column' },
  { value: 'grid', label: 'Grid' },
];

const LOOPS: SegmentOption[] = [
  { value: 'once', label: 'Once' },
  { value: 'loop', label: 'Loop' },
  { value: 'bounce', label: 'Bounce' },
];

export { ANCHORS, FLOWS, LOOPS };
