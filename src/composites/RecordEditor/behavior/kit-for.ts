/* @layer renderer-components @kind logic */
import { resolveFieldKit } from '../../field-kits';
import { unknownKit } from '../../field-kits/UnknownKit';
import type { FieldKind } from '../../../data/schema/field-descriptor';
import type { FieldTypeStrategy } from '../../field-kits/registry.type';

const kitFor = (kind: FieldKind): FieldTypeStrategy => resolveFieldKit(kind) ?? unknownKit;

export { kitFor };
