/* @layer renderer-components @kind logic */
import type { FocusTarget } from './focus-at-end.type';

const focusAtEnd = (area: FocusTarget | null): void => {
  if (!area) return;
  area.focus();
  area.setSelectionRange(area.value.length, area.value.length);
};

export { focusAtEnd };
