/* @layer renderer-components @kind data */
import type { OperatorIcon } from '../../data/filter/operators/operators.type';

const FILTER_OPERATOR_STRINGS: Record<OperatorIcon, string> = {
  'equals': 'is',
  'not-equals': 'is not',
  'greater': 'is greater than',
  'greater-eq': 'is at least',
  'less': 'is less than',
  'less-eq': 'is at most',
  'between': 'is between',
  'contains': 'contains',
  'starts-with': 'starts with',
  'ends-with': 'ends with',
  'is-empty': 'is empty',
  'is-not-empty': 'is not empty',
  'any-of': 'is any of',
  'none-of': 'is none of',
  'is-true': 'is true',
  'is-false': 'is false',
  'length-eq': 'has exactly',
  'length-gt': 'has more than',
  'length-lt': 'has fewer than',
  'contains-value': 'contains',
};

export { FILTER_OPERATOR_STRINGS };
