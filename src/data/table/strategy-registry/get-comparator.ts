/* @layer renderer-components @kind logic */
import type { FieldKind } from '../../schema/field-descriptor';
import { comparators } from './comparators';
import { fallbackComparator } from './fallback-comparator';
import type { Comparator } from './strategy-registry.type';

const getComparator = (kind: FieldKind): Comparator => comparators.get(kind) ?? fallbackComparator;

export { getComparator };
