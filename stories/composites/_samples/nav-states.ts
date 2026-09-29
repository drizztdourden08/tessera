/* @layer stories @kind data */
import { STATE } from '../../_template/states/states.constants';
import type { StateEntry } from '../../_template/states/states.type';

const navItemStates = (target: string): readonly StateEntry[] => [
  STATE.idle,
  { ...STATE.hover, target },
  { ...STATE.focus, target },
  { ...STATE.selected, name: 'Current' },
];

export { navItemStates };
