/* @layer renderer-components @kind util */
import type { NumberOperator } from './label-rule.type';

const applyOperator = (value: number, operator: NumberOperator | null, operand: number): number => {
  switch (operator) {
    case '*': return value * operand;
    case '/': return value / operand;
    case '+': return value + operand;
    case '-': return value - operand;
    case null: return value;
  }
};

export { applyOperator };
