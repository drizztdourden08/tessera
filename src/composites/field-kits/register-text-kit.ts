/* @layer renderer-components @kind logic */
import { registerFieldTester } from '../../data/filter/tester-registry';
import { registerComparator } from '../../data/table/strategy-registry';
import { nullsLast } from './compare';
import { naturalTextCompare } from './naturalTextCompare';
import { registerFieldKit } from './registry';
import type { FieldTester } from '../../data/filter/tester-registry';
import type { FieldTypeStrategy } from './registry.type';

const registerTextKit = (kit: FieldTypeStrategy, test: FieldTester['test']): void => {
  registerFieldTester(kit.kind, { test });
  registerComparator(kit.kind, nullsLast(naturalTextCompare));
  registerFieldKit(kit);
};

export { registerTextKit };
