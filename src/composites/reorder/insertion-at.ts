/* @layer renderer-components @kind util */
import { AXIS_BOX } from './reorder.constants';
import type { ReorderLinearAxis } from './reorder.type';

const insertionAt = (list: HTMLElement | null, selector: string, axis: ReorderLinearAxis, position: number): number => {
  const items = list ? [...list.querySelectorAll<HTMLElement>(selector)] : [];
  const { start, size } = AXIS_BOX[axis];
  const at = items.findIndex((item) => {
    const box = item.getBoundingClientRect();
    return position < box[start] + box[size] / 2;
  });
  return at < 0 ? items.length : at;
};

export { insertionAt };
