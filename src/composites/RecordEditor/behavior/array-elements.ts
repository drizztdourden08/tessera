/* @layer renderer-components @kind logic */
import { rebaseField } from './rebase-field';
import type { FieldDescriptor } from '../../../data/schema/field-descriptor';

const elementFields = (
  field: FieldDescriptor,
  index: number,
): readonly FieldDescriptor[] => {
  const element = field.of;
  if (!element?.children) return [];
  return element.children.map((child) => rebaseField(child, element.path, `${field.path}.${index}`));
};

export { elementFields };
