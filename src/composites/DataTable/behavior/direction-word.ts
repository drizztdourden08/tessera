/* @layer renderer-components @kind logic */
import type { SortEntry } from '../../../data/table/types';
import type { TesseraStrings } from '../../../primitives/strings/tessera-strings.type';

const directionWord = (dir: SortEntry['dir'], strings: TesseraStrings['table']): string =>
  (dir === 'asc' ? strings.ascending : strings.descending);

export { directionWord };
