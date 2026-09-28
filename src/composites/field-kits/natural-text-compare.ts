/* @layer renderer-components @kind logic */
import { toText } from './to-text';
import type { Comparator } from '../../data/table/strategy-registry';

const naturalTextCompare: Comparator = (a, b) =>
  toText(a).localeCompare(toText(b), undefined, { numeric: true, sensitivity: 'base' });

export { naturalTextCompare };
