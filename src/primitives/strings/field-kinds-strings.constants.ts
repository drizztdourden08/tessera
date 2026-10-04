/* @layer renderer-components @kind data */
import type { FieldKind } from '../../data/schema/field-descriptor';

const FIELD_KIND_STRINGS: Record<FieldKind, string> = {
  string: 'Text',
  number: 'Number',
  boolean: 'Yes or no',
  enum: 'Choice',
  idRef: 'Reference',
  array: 'List',
  object: 'Group',
  union: 'Mixed',
  unknown: 'Unknown',
};

export { FIELD_KIND_STRINGS };
