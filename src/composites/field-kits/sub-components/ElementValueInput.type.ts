/* @layer renderer-components @kind types */
import type { FieldDescriptor } from '../../../data/schema/field-descriptor';

interface ElementValueInputProps {
  element: FieldDescriptor | undefined;
  value: unknown;
  placeholder: string;
  onChange: (value: unknown) => void;
}

export type { ElementValueInputProps };
