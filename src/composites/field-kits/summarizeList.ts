/* @layer renderer-components @kind logic */
import { scalarText } from './scalarText';
import { toList } from './toList';
import { truncate } from './truncate';

const summarizeList = (value: unknown): string =>
  truncate(toList(value).map(scalarText).join(', '));

export { summarizeList };
