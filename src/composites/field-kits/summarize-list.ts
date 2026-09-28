/* @layer renderer-components @kind logic */
import { scalarText } from './scalar-text';
import { toList } from './to-list';
import { truncate } from './truncate';

const summarizeList = (value: unknown): string =>
  truncate(toList(value).map(scalarText).join(', '));

export { summarizeList };
