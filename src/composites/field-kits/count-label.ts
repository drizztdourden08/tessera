/* @layer renderer-components @kind logic */
import type { TesseraStrings } from '../../primitives/strings/tessera-strings.type';

const countLabel = (count: number, strings: TesseraStrings['records']): string => {
  if (count === 0) return strings.itemsNone;
  return count === 1 ? strings.itemsOne : strings.itemsMany(count);
};

export { countLabel };
