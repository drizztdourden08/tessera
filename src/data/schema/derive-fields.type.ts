/* @layer renderer-components @kind types */
import type { FieldKind } from './field-descriptor';

interface DeriveContext {
  kinds?: Record<string, FieldKind>;
  idPattern?: RegExp;
}

interface FieldSample {
  path: string;
  label: string;
  values: readonly unknown[];
  optional: boolean;
}

export type { DeriveContext, FieldSample };
