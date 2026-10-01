/* @layer renderer-components @kind types */
type OperatorIcon =
  | 'equals' | 'not-equals'
  | 'greater' | 'greater-eq' | 'less' | 'less-eq' | 'between'
  | 'contains' | 'starts-with' | 'ends-with'
  | 'is-empty' | 'is-not-empty'
  | 'any-of' | 'none-of'
  | 'is-true' | 'is-false'
  | 'length-eq' | 'length-gt' | 'length-lt'
  | 'contains-value';

interface OperatorSpec {
  id: string;
  icon: OperatorIcon;
  arity: 'none' | 'one' | 'many';
}

export type { OperatorIcon, OperatorSpec };
