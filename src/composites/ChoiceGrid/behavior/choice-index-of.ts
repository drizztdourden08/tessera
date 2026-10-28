/* @layer renderer-components @kind util */
import { CELL_INDEX_ATTRIBUTE, CELL_SELECTOR } from '../ChoiceGrid.constants';

const choiceIndexOf = (target: EventTarget | Element | null): number | null => {
  const cell = target instanceof Element ? target.closest(CELL_SELECTOR) : null;
  const raw = cell?.getAttribute(CELL_INDEX_ATTRIBUTE);
  if (raw === null || raw === undefined) return null;
  const index = Number(raw);
  return Number.isInteger(index) ? index : null;
};

export { choiceIndexOf };
