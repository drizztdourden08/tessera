/* @layer renderer-components @kind data */
import type { CheckState } from './CheckList.type';

const COUNTED_STATES: readonly CheckState[] = ['pass', 'warn', 'fail', 'pending'];

export { COUNTED_STATES };
