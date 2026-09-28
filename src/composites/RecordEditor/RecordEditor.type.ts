/* @layer renderer-components @kind types */
import type { FieldDescriptor, SchemaConfig } from '../../data/schema/field-descriptor';
import type { IdRefOptionResolver, NumberBounds } from '../field-kits/registry.type';

type TagSuggestionResolver = (field: FieldDescriptor) => readonly string[];

type TagCreateResult =
  | { success: true; id: string }
  | { success: false; error: string };

type TagCreator = (key: string) => Promise<TagCreateResult>;

type NumberBoundsResolver = (path: string, record: unknown) => NumberBounds | undefined;

interface RecordEditorProps<T> {
  record: T;
  schema: readonly FieldDescriptor[];
  config?: SchemaConfig;
  onSave?: (next: T) => Promise<void>;
  disabled?: boolean;
  changedPaths?: readonly string[];
  resolveIdRefOptions?: IdRefOptionResolver;
  resolveTagSuggestions?: TagSuggestionResolver;
  onCreateTag?: TagCreator;
  resolveNumberBounds?: NumberBoundsResolver;
  referencedBy?: readonly ReferencedByHit[];
  onDelete?: () => void;
}

interface ReferencedByHit {
  kind: string;
  id: string;
  field: string;
  label: string;
}

interface EditorGroupModel {
  id: string;
  label?: string;
  fields: readonly FieldDescriptor[];
}

interface EditorBinding {
  value: (path: string) => unknown;
  onChange: (path: string, value: unknown) => void;
  isDirty: (path: string) => boolean;
  isChanged?: (path: string) => boolean;
  disabled: boolean;
  resolveIdRefOptions?: IdRefOptionResolver;
  resolveTagSuggestions?: TagSuggestionResolver;
  onCreateTag?: TagCreator;
  bounds: (path: string) => NumberBounds | undefined;
}

interface EditorGroupProps {
  group: EditorGroupModel;
  binding: EditorBinding;
  depth: number;
}

interface EditorRowProps {
  field: FieldDescriptor;
  binding: EditorBinding;
  depth: number;
}

interface ArrayFieldEditorProps {
  field: FieldDescriptor;
  value: unknown;
  binding: EditorBinding;
}

interface TagArrayEditorProps {
  field: FieldDescriptor;
  value: unknown;
  binding: EditorBinding;
}

interface ObjectArrayEditorProps {
  field: FieldDescriptor;
  value: unknown;
  binding: EditorBinding;
  depth: number;
}

interface PositionPair {
  x: FieldDescriptor;
  y: FieldDescriptor;
  xKey: string;
  yKey: string;
  others: readonly FieldDescriptor[];
}

interface PositionFieldEditorProps {
  field: FieldDescriptor;
  pair: PositionPair;
  binding: EditorBinding;
}

export type {
  ArrayFieldEditorProps, EditorBinding, EditorGroupModel, EditorGroupProps,
  EditorRowProps, NumberBoundsResolver, ObjectArrayEditorProps, PositionFieldEditorProps,
  PositionPair, RecordEditorProps, ReferencedByHit, TagArrayEditorProps, TagCreateResult, TagCreator,
  TagSuggestionResolver,
};
