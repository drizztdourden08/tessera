/* @layer renderer-components @kind logic */
import type { FieldDescriptor } from '../../data/schema/field-descriptor';

const declaredValue = (field: FieldDescriptor, text: string): string | number =>
  field.declaredOptions?.find((option) => String(option.value) === text)?.value ?? text;

export { declaredValue };
