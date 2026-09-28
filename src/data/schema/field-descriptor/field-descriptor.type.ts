/* @layer renderer-components @kind types */
type FieldKind =
  | 'string'
  | 'number'
  | 'boolean'
  | 'enum'
  | 'idRef'
  | 'array'
  | 'object'
  | 'union'
  | 'unknown';

type NumberFormat = 'hex2' | 'hex4';

interface FieldDescriptor {
  path: string;
  label: string;
  kind: FieldKind;
  optional: boolean;
  options?: readonly string[];
  closed?: boolean;
  targetKind?: string;
  of?: FieldDescriptor;
  children?: readonly FieldDescriptor[];
  group?: string;
  hidden?: boolean;
  format?: NumberFormat;
}

interface FieldGroup {
  id: string;
  label: string;
  paths: readonly string[];
}

interface SchemaConfig {
  order?: readonly string[];
  groups?: readonly FieldGroup[];
  labels?: Record<string, string>;
  hidden?: readonly string[];
  kinds?: Record<string, FieldKind>;
  idPattern?: RegExp;
  formats?: Record<string, NumberFormat>;
  options?: Record<string, readonly string[]>;
  defaultColumns?: readonly string[];
}

interface CollectionSource<T> {
  id: string;
  label: string;
  rows: readonly T[];
  getId: (row: T) => string;
  config?: SchemaConfig;
  serialize?: (row: T) => string;
  onSave?: (row: T) => Promise<void>;
}

export type { CollectionSource, FieldDescriptor, FieldGroup, FieldKind, NumberFormat, SchemaConfig };
