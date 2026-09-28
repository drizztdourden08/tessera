/* @layer renderer-components @kind types */
import type { ReactNode } from 'react';
import type { FieldDescriptor, FieldKind } from '../../data/schema/field-descriptor';

interface FilterControlProps {
  field: FieldDescriptor;
  op: string;
  value: unknown;
  onChange: (value: unknown) => void;
}

interface IdRefOption {
  value: string;
  label: string;
  description?: string;
}

type IdRefOptionResolver = (
  targetKind: string,
  field: FieldDescriptor,
) => readonly IdRefOption[];

interface NumberBounds {
  min?: number;
  max?: number;
  step?: number;
}

interface EditorControlProps<V = unknown> {
  field: FieldDescriptor;
  value: V;
  onChange: (value: V) => void;
  disabled?: boolean;
  resolveIdRefOptions?: IdRefOptionResolver;
  bounds?: NumberBounds;
}

type ArrayIdRefResolver = (id: string, targetKind?: string) => string | undefined;

interface CellRenderOptions {
  display?: string;
  resolveIdRefDisplay?: ArrayIdRefResolver;
}

type FieldControl<P> = (props: P) => ReactNode;

interface FieldTypeStrategy<V = unknown> {
  kind: FieldKind;
  FilterControl: FieldControl<FilterControlProps>;
  EditorControl: FieldControl<EditorControlProps<V>>;
  renderCell: (value: V, field: FieldDescriptor, options?: CellRenderOptions) => ReactNode;
}

export type {
  ArrayIdRefResolver, CellRenderOptions, EditorControlProps, FieldControl, FieldTypeStrategy, FilterControlProps,
  IdRefOption, IdRefOptionResolver, NumberBounds,
};
