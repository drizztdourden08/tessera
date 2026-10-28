/* @layer renderer-components @kind logic */
import { indexMove } from './index-move';

const nextIndex = (key: string, active: number, count: number, page: number): number | undefined =>
  indexMove({ key, active, count, page }, { after: 'ArrowDown', before: 'ArrowUp' });

export { nextIndex };
