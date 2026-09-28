/* @layer renderer-components @kind data */
import type { FieldKind } from '../../../data/schema/field-descriptor';

const SINGLE_VALUE_KINDS: readonly FieldKind[] = ['string', 'number', 'boolean', 'enum', 'idRef'];

export { SINGLE_VALUE_KINDS };
