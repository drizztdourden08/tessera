/* @layer renderer-components @kind logic */
import type { FieldDescriptor } from '../../data/schema/field-descriptor';

const blankFor = (element: FieldDescriptor): unknown => {
  if (element.kind === 'number') return 0;
  if (element.kind === 'boolean') return false;
  if (element.kind === 'enum') return element.options?.[0] ?? '';
  if (element.kind === 'array') return [];
  return '';
};

export { blankFor };
