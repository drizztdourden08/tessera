/* @layer renderer-components @kind logic */
import type { FieldKind } from '../../../data/schema/field-descriptor';

const supportsCaseModifier = (kind: FieldKind): boolean => kind === 'string';

export { supportsCaseModifier };
