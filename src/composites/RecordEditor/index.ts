/* @layer renderer-components @kind barrel */
export { RecordEditor } from './RecordEditor';
export { EditorGroup } from './sub-components/EditorGroup';
export { ReferencedBy } from './sub-components/ReferencedBy';
export { markedPaths } from './behavior/changed-paths';
export { layoutGroups } from './behavior/layout-groups';
export { detectUnionBranch } from './behavior/union-branch';
export { isIdentityField } from './behavior/identity-field';
export type {
  EditorBinding, EditorGroupModel, NumberBoundsResolver, RecordEditorProps, ReferencedByHit,
  TagCreateResult, TagCreator, TagSuggestionResolver,
} from './RecordEditor.type';
export type { ReferencedByProps } from './sub-components/ReferencedBy.type';
export type { IdRefOption, IdRefOptionResolver, NumberBounds } from '../field-kits/registry.type';
