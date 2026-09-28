/* @layer renderer-components @kind logic */
import type { FieldKind } from '../../schema/field-descriptor';
import type { Comparator } from './strategy-registry.type';

const comparators = new Map<FieldKind, Comparator>();

export { comparators };
