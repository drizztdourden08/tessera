/* @layer renderer-components @kind logic */
import type { FieldKind } from '../../schema/field-descriptor';
import { testers } from './testers';
import type { FieldTester } from './tester-registry.type';

const registerFieldTester = (kind: FieldKind, tester: FieldTester): void => {
  testers.set(kind, tester);
};

export { registerFieldTester };
