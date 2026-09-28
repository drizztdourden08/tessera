/* @layer renderer-components @kind logic */
import type { FieldKind } from '../../schema/field-descriptor';
import { groupKeys } from './group-keys';
import type { GroupKeyFn } from './strategy-registry.type';

const registerGroupKey = (kind: FieldKind, groupKey: GroupKeyFn): void => {
  groupKeys.set(kind, groupKey);
};

export { registerGroupKey };
