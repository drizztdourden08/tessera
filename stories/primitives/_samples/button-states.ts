/* @layer stories @kind data */
import { STATE } from '../../_template/states/states.constants';
import type { StateEntry } from '../../_template/states/states.type';

const BUTTON_STATES: readonly StateEntry[] = [
  STATE.idle,
  STATE.hover,
  STATE.focus,
  STATE.active,
  { ...STATE.selected, name: 'Toggled on', props: { active: true } },
  STATE.loading,
  STATE.disabled,
];

export { BUTTON_STATES };
