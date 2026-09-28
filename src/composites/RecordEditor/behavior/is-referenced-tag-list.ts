/* @layer renderer-components @kind logic */
import type { FieldDescriptor } from '../../../data/schema/field-descriptor';

const isReferencedTagList = (field: FieldDescriptor): boolean => field.of?.kind === 'idRef';

export { isReferencedTagList };
