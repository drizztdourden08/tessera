/* @layer renderer-components @kind logic */
import { indexMove } from './index-move';

const nextAcrossIndex = (key: string, active: number, count: number, page: number): number | undefined =>
  indexMove({ key, active, count, page }, { after: 'ArrowRight', before: 'ArrowLeft' });

export { nextAcrossIndex };
