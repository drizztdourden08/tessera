/* @layer renderer-components @kind logic */
import type { FieldKind } from '../../schema/field-descriptor';
import type { GroupKeyFn } from './strategy-registry.type';

const groupKeys = new Map<FieldKind, GroupKeyFn>();

export { groupKeys };
