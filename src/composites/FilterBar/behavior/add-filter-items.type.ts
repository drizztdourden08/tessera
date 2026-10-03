/* @layer renderer-components @kind types */
import type { FieldDescriptor } from '../../../data/schema/field-descriptor';

interface AddFilterInput {
  fields?: readonly string[];
  taken: ReadonlySet<string>;
  onPick: (field: FieldDescriptor) => void;
}

export type { AddFilterInput };
