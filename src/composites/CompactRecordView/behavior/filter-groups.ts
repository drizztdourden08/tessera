/* @layer renderer-components @kind logic */
import type { EditorGroupModel } from '../../RecordEditor';

const filterGroups = (
  groups: readonly EditorGroupModel[],
  allow?: readonly string[],
): readonly EditorGroupModel[] => {
  if (!allow) return groups;
  const list = new Set(allow);
  return groups
    .map((group): EditorGroupModel => (
      list.has(group.id) ? group : { ...group, fields: group.fields.filter((field) => list.has(field.path)) }
    ))
    .filter((group) => group.fields.length > 0);
};

export { filterGroups };
