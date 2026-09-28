/* @layer renderer-components @kind logic */
import type { FieldKind } from '../../data/schema/field-descriptor';
import type { FieldTypeStrategy } from './registry.type';

const kits = new Map<FieldKind, FieldTypeStrategy>();

export { kits };
