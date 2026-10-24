/* @layer stories @kind constants */
import type { StateEntry } from '../../_template/states/states.type';

const FILLED_AND_EMPTY: readonly StateEntry[] = [
  { name: 'Filled', props: {} },
  { name: 'Empty', props: { count: 0 } },
];

export { FILLED_AND_EMPTY };
