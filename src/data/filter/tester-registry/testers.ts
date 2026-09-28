/* @layer renderer-components @kind logic */
import type { FieldKind } from '../../schema/field-descriptor';
import type { FieldTester } from './tester-registry.type';

const testers = new Map<FieldKind, FieldTester>();

export { testers };
