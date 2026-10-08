/* @layer stories @kind data */
import { STATE } from '../../_template/states/states.constants';
import type { StateEntry } from '../../_template/states/states.type';

const RESIZE_HANDLE_STATES: readonly StateEntry[] = [
  STATE.idle,
  { ...STATE.hover, target: '.resize-handle' },
  { ...STATE.focus, target: '.resize-handle' },
  { ...STATE.active, name: 'Dragging', target: '.resize-handle' },
];

export { RESIZE_HANDLE_STATES };
