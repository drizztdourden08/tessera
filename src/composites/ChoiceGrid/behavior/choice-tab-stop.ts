/* @layer renderer-components @kind logic */
import type { ChoiceEntry } from './choice-layout.type';

const isOpen = (entries: readonly ChoiceEntry[], index: number | null): index is number =>
  index !== null && entries.some((entry) => entry.index === index && entry.cell.disabled !== true);

const choiceTabStop = (entries: readonly ChoiceEntry[], focused: number | null, selected: number): number | null => {
  if (isOpen(entries, focused)) return focused;
  if (isOpen(entries, selected)) return selected;
  const first = entries.find((entry) => entry.cell.disabled !== true);
  return first ? first.index : null;
};

export { choiceTabStop };
