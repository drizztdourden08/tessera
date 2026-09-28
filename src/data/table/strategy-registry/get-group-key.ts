/* @layer renderer-components @kind logic */
import type { FieldKind } from '../../schema/field-descriptor';
import { fallbackGroupKey } from './fallback-group-key';
import { groupKeys } from './group-keys';
import type { GroupKeyFn } from './strategy-registry.type';

const getGroupKey = (kind: FieldKind): GroupKeyFn => groupKeys.get(kind) ?? fallbackGroupKey;

export { getGroupKey };
