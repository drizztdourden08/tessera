/* @layer renderer-components @kind logic */
import { keyOf } from '../../field-kits/key-of';
import { TAGS_KEY } from './tag-field.constants';
import type { FieldDescriptor } from '../../../data/schema/field-descriptor';

const isTagsField = (field: FieldDescriptor): boolean =>
  field.kind === 'array'
  && (field.of?.kind === 'string' || field.of?.kind === 'idRef')
  && keyOf(field.path) === TAGS_KEY;

export { isTagsField };
