/* @layer renderer-components @kind logic */
import type { FieldOption, SchemaOption } from '../field-descriptor';

const fieldOptions = (options: readonly SchemaOption[]): readonly FieldOption[] =>
  options.map((option) => (typeof option === 'object' ? option : { value: option, label: String(option) }));

export { fieldOptions };
