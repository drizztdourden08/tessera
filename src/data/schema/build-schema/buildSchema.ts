/* @layer renderer-components @kind logic */
import type { FieldDescriptor, SchemaConfig } from '../field-descriptor';
import { deriveSchema } from '../derive-fields';

const groupOf = (config: SchemaConfig | undefined): Record<string, string> => {
  const byPath: Record<string, string> = {};
  for (const group of config?.groups ?? []) {
    for (const path of group.paths) byPath[path] = group.id;
  }
  return byPath;
};

const reorder = (
  fields: readonly FieldDescriptor[],
  order: readonly string[],
): readonly FieldDescriptor[] => {
  const rank = (field: FieldDescriptor): number => {
    const at = order.indexOf(field.path);
    return at === -1 ? Number.MAX_SAFE_INTEGER : at;
  };
  return [...fields]
    .map((field, index) => ({ field, index, rank: rank(field) }))
    .sort((a, b) => a.rank - b.rank || a.index - b.index)
    .map((entry) => entry.field);
};

const overlayConfig = (field: FieldDescriptor, config: SchemaConfig | undefined): FieldDescriptor => {
  const next: FieldDescriptor = { ...field };
  const label = config?.labels?.[field.path];
  if (label !== undefined) next.label = label;
  const format = config?.formats?.[field.path];
  if (format !== undefined) next.format = format;
  const options = config?.options?.[field.path];
  if (options !== undefined) {
    next.options = options;
    next.closed = true;
  }
  return next;
};

const applyConfig = (
  fields: readonly FieldDescriptor[],
  config: SchemaConfig | undefined,
  groups: Record<string, string>,
): readonly FieldDescriptor[] => {
  const hidden = new Set(config?.hidden ?? []);
  const layered = fields.map((field) => {
    const next = overlayConfig(field, config);
    if (hidden.has(field.path)) next.hidden = true;
    const group = groups[field.path];
    if (group !== undefined) next.group = group;
    if (field.children) next.children = applyConfig(field.children, config, groups);
    return next;
  });
  return config?.order?.length ? reorder(layered, config.order) : layered;
};

const buildSchema = <T>(rows: readonly T[], config?: SchemaConfig): readonly FieldDescriptor[] => {
  const derived = deriveSchema(rows, { kinds: config?.kinds, idPattern: config?.idPattern });
  return applyConfig(derived, config, groupOf(config));
};

export { buildSchema };
