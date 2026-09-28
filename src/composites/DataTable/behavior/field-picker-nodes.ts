/* @layer renderer-components @kind logic */
import type { FieldDescriptor } from '../../../data/schema/field-descriptor';
import type { PickerNode } from './field-picker-nodes.type';

const isNode = (node: PickerNode | undefined): node is PickerNode => node !== undefined;

const toNode = (field: FieldDescriptor, exclude: ReadonlySet<string>): PickerNode | undefined => {
  const children = (field.children ?? []).map((child) => toNode(child, exclude)).filter(isNode);
  const isBranch = (field.children?.length ?? 0) > 0;
  if (isBranch) {
    if (!children.length) return undefined;
    return { path: field.path, label: field.label, kind: field.kind, pickable: false, children };
  }
  if (exclude.has(field.path)) return undefined;
  return { path: field.path, label: field.label, kind: field.kind, pickable: true, children: [] };
};

const buildPickerNodes = (
  schema: readonly FieldDescriptor[],
  excludePaths: readonly string[] = [],
): readonly PickerNode[] => {
  const exclude = new Set(excludePaths);
  return schema.map((field) => toNode(field, exclude)).filter(isNode);
};

export { buildPickerNodes };
