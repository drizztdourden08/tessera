/* @layer renderer-components @kind types */
import type { FieldDescriptor } from '../../../data/schema/field-descriptor';
import type { MenuItem } from '../../DropdownMenu';

type FieldItemLook = Pick<MenuItem, 'icon' | 'description'>;

interface AddFilterInput {
  fields?: readonly string[];
  taken: ReadonlySet<string>;
  onPick: (field: FieldDescriptor) => void;
  look: (field: FieldDescriptor) => FieldItemLook;
}

export type { AddFilterInput };
