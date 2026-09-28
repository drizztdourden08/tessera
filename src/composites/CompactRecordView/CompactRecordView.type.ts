/* @layer renderer-components @kind types */
import type { FieldDescriptor, SchemaConfig } from '../../data/schema/field-descriptor';

type CompactIdRefResolver = (id: string, targetKind?: string) => string | undefined;

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
}

interface CompactFieldProps {
  record: unknown;
  field: FieldDescriptor;
  depth: number;
  resolveIdRefDisplay?: CompactIdRefResolver;
  diffs?: ReadonlyMap<string, FieldDifference>;
}

export type { CompactFieldProps, CompactIdRefResolver, CompactRecordViewProps, FieldDifference };
