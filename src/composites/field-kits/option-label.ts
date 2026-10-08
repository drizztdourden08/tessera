/* @layer renderer-components @kind logic */
import type { FieldDescriptor } from '../../data/schema/field-descriptor';

const optionLabelOf = (field: FieldDescriptor) => (text: string): string =>
  field.declaredOptions?.find((option) => String(option.value) === text)?.label ?? text;

export { optionLabelOf };
