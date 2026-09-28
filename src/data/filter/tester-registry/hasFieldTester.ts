/* @layer renderer-components @kind logic */
import type { FieldKind } from '../../schema/field-descriptor';
import { testers } from './testers';

const hasFieldTester = (kind: FieldKind): boolean => testers.has(kind);

export { hasFieldTester };
