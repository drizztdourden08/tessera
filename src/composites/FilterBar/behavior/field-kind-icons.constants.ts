/* @layer renderer-components @kind data */
import type { FieldKind } from '../../../data/schema/field-descriptor';
import type { IconName } from '../../../primitives/Icon';

const FIELD_KIND_ICONS: Record<FieldKind, IconName> = {
  string: 'type',
  number: 'hash',
  boolean: 'toggle-left',
  enum: 'circle-dot',
  idRef: 'link',
  array: 'list',
  object: 'braces',
  union: 'split',
  unknown: 'circle-help',
};

export { FIELD_KIND_ICONS };
