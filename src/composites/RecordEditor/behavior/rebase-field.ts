/* @layer renderer-components @kind logic */
import type { FieldDescriptor } from '../../../data/schema/field-descriptor';

const rebaseField = (
  field: FieldDescriptor,
  from: string,
  to: string,
): FieldDescriptor => {
  const path = field.path.startsWith(from) ? `${to}${field.path.slice(from.length)}` : field.path;
  const next: FieldDescriptor = { ...field, path };
  if (field.children) next.children = field.children.map((child) => rebaseField(child, from, to));
  if (field.of) next.of = rebaseField(field.of, from, to);
  return next;
};

export { rebaseField };
