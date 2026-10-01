/* @layer renderer-components @kind logic */
import { IMPLICIT_ID, LEFTOVER_ID } from './layout-groups.constants';
import type { FieldDescriptor, FieldGroup, SchemaConfig } from '../../../data/schema/field-descriptor';
import type { TesseraStrings } from '../../../primitives/strings/tessera-strings.type';
import type { EditorGroupModel } from '../RecordEditor.type';

const claims = (group: FieldGroup, field: FieldDescriptor): boolean =>
  group.paths.includes(field.path) || field.group === group.id;

const orderWithin = (
  fields: readonly FieldDescriptor[],
  paths: readonly string[],
): readonly FieldDescriptor[] =>
  [...fields]
    .map((field, index) => {
      const at = paths.indexOf(field.path);
      return { field, index, rank: at === -1 ? Number.MAX_SAFE_INTEGER : at };
    })
    .sort((a, b) => a.rank - b.rank || a.index - b.index)
    .map((entry) => entry.field);

const singleGroup = (fields: readonly FieldDescriptor[]): readonly EditorGroupModel[] =>
  (fields.length ? [{ id: IMPLICIT_ID, fields }] : []);

const layoutGroups = (
  schema: readonly FieldDescriptor[],
  strings: TesseraStrings['records'],
  config?: SchemaConfig,
): readonly EditorGroupModel[] => {
  const visible = schema.filter((field) => !field.hidden);
  const configured = config?.groups ?? [];
  if (!configured.length) return singleGroup(visible);

  const taken = new Set<string>();
  const laid: EditorGroupModel[] = [];
  for (const group of configured) {
    const fields = visible.filter((field) => claims(group, field));
    if (!fields.length) continue;
    for (const field of fields) taken.add(field.path);
    laid.push({ id: group.id, label: group.label, fields: orderWithin(fields, group.paths) });
  }
  if (!laid.length) return singleGroup(visible);

  const leftover = visible.filter((field) => !taken.has(field.path));
  if (leftover.length) laid.push({ id: LEFTOVER_ID, label: strings.otherGroup, fields: leftover });
  return laid;
};

export { layoutGroups };
