/* @layer renderer-components @kind logic */
import { kits } from './kits';
import type { FieldKind } from '../../data/schema/field-descriptor';

const registeredKitKinds = (): readonly FieldKind[] => [...kits.keys()];

export { registeredKitKinds };
