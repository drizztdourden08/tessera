/* @layer renderer-components @kind logic */
import type { FieldKind } from '../../schema/field-descriptor';
import { IS_EMPTY } from './operators.constants';
import { operatorsFor } from './operatorsFor';

const defaultOperatorFor = (kind: FieldKind): string => (operatorsFor(kind)[0] ?? IS_EMPTY).id;

export { defaultOperatorFor };
