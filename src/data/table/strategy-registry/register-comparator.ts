/* @layer renderer-components @kind logic */
import type { FieldKind } from '../../schema/field-descriptor';
import { comparators } from './comparators';
import type { Comparator } from './strategy-registry.type';

const registerComparator = (kind: FieldKind, compare: Comparator): void => {
  comparators.set(kind, compare);
};

export { registerComparator };
