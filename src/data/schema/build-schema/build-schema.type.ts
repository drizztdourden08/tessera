/* @layer renderer-components @kind types */
import type { FieldDescriptor } from '../field-descriptor';

interface SchemaIndex {
  byPath: (path: string) => FieldDescriptor | undefined;
  all: () => readonly FieldDescriptor[];
  roots: () => readonly FieldDescriptor[];
}

type SchemaLike = SchemaIndex | readonly FieldDescriptor[];

export type { SchemaIndex, SchemaLike };
