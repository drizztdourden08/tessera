/* @layer renderer-components @kind logic */
import type { FieldDescriptor } from '../../../data/schema/field-descriptor';
import type { MenuItem } from '../../DropdownMenu';
import type { AddFilterInput } from './add-filter-items.type';

const itemFor = (field: FieldDescriptor, input: AddFilterInput): MenuItem | undefined => {
  if (field.hidden === true) return undefined;
  const branch = field.children ?? [];
  if (branch.length === 0) {
    return {
      id: field.path,
      label: field.label,
      ...input.look(field),
      disabled: input.taken.has(field.path),
      onSelect: () => input.onPick(field),
    };
  }
  const children = branch.map((child) => itemFor(child, input)).filter((item) => item !== undefined);
  return children.length > 0 ? { id: field.path, label: field.label, ...input.look(field), children } : undefined;
};

const addFilterItems = (roots: readonly FieldDescriptor[], input: AddFilterInput): MenuItem[] => {
  const allowed = input.fields === undefined ? undefined : new Set(input.fields);
  return roots
    .filter((field) => allowed === undefined || allowed.has(field.path))
    .map((field) => itemFor(field, input))
    .filter((item) => item !== undefined);
};

export { addFilterItems };
