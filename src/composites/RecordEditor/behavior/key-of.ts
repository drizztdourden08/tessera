/* @layer renderer-components @kind logic */
import type { FieldDescriptor } from '../../../data/schema/field-descriptor';

const keyOf = (field: FieldDescriptor): string => field.path.slice(field.path.lastIndexOf('.') + 1);

export { keyOf };
