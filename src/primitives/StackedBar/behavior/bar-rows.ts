/* @layer renderer-components @kind logic */
import type { TesseraStrings } from '../../strings/tessera-strings.type';
import type { StackedBarPart, StackedBarRow } from '../StackedBar.type';
import { sharePercent } from './share-percent';

const barRows = (
  parts: readonly StackedBarPart[], capacity: number, format: (value: number) => string, strings: TesseraStrings['charts'],
): StackedBarRow[] => parts.map((part) => {
  const label = part.grouped ? strings.otherCount(part.label, part.grouped) : part.label;
  const amount = format(part.value);
  return { id: part.id, color: part.color, label, amount, tip: strings.segmentTip(label, amount, sharePercent(part.value, capacity)) };
});

export { barRows };
