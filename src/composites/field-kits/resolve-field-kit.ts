/* @layer renderer-components @kind logic */
import { kits } from './kits';
import type { FieldKind } from '../../data/schema/field-descriptor';
import type { FieldTypeStrategy } from './registry.type';

const resolveFieldKit = (kind: FieldKind): FieldTypeStrategy | undefined => kits.get(kind);

export { resolveFieldKit };
