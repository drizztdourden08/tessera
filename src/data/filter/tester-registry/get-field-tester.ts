/* @layer renderer-components @kind logic */
import type { FieldKind } from '../../schema/field-descriptor';
import { testers } from './testers';
import type { FieldTester } from './tester-registry.type';

const getFieldTester = (kind: FieldKind): FieldTester | undefined => testers.get(kind);

export { getFieldTester };
