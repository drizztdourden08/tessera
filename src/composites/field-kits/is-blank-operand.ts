/* @layer renderer-components @kind logic */
import { isNullish } from './coerce';

const isBlankOperand = (operand: unknown): boolean =>
  isNullish(operand) || (typeof operand === 'string' && operand.trim() === '');

export { isBlankOperand };
