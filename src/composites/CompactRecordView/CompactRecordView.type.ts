/* @layer renderer-components @kind types */
import type { ReactNode } from 'react';
import type { FieldDescriptor, SchemaConfig } from '../../data/schema/field-descriptor';

type CompactIdRefResolver = (id: string, targetKind?: string) => string | undefined;

type CompactFieldRenderer<T> = (record: T) => ReactNode;

interface FieldDifference {
  status: string;
  shown: { dataset: string; live: string };
  source: string;
}

interface CompactRecordViewProps<T> {
  record: T;
  schema: readonly FieldDescriptor[];
  config?: SchemaConfig;
  groups?: readonly string[];
  resolveIdRefDisplay?: CompactIdRefResolver;
  diffs?: ReadonlyMap<string, FieldDifference>;
  fieldRenderers?: ReadonlyMap<string, CompactFieldRenderer<T>>;
}

interface CompactFieldProps {
  record: unknown;
  field: FieldDescriptor;
  depth: number;
  resolveIdRefDisplay?: CompactIdRefResolver;
  diffs?: ReadonlyMap<string, FieldDifference>;
}

export type { CompactFieldProps, CompactFieldRenderer, CompactIdRefResolver, CompactRecordViewProps, FieldDifference };
