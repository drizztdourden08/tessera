/* @layer renderer-components @kind types */
interface ValueScale {
  min: number;
  max: number;
  step: number;
  stops?: readonly string[];
  formatValue?: (value: number) => string;
}

interface RulePoint {
  value: number | 'min' | 'max';
  text?: string;
}

type RulePlacement =
  | { kind: 'every'; size: number }
  | { kind: 'count'; count: number }
  | { kind: 'ends' }
  | { kind: 'steps' }
  | { kind: 'none' }
  | { kind: 'at'; points: readonly RulePoint[] };

interface NumberPattern {
  minDecimals: number;
  maxDecimals: number;
  grouping: boolean;
  sign: boolean;
}

type NumberOperator = '*' | '/' | '+' | '-';

type TemplatePart =
  | { kind: 'text'; text: string }
  | { kind: 'number'; source: 'v' | 'p'; operator: NumberOperator | null; operand: number; pattern: NumberPattern | null }
  | { kind: 'stop' }
  | { kind: 'choice'; forms: readonly string[] };

type RuleTemplate =
  | { kind: 'words'; words: readonly string[] }
  | { kind: 'parts'; parts: readonly TemplatePart[] };

interface ValueRule {
  placements: readonly RulePlacement[] | null;
  template: RuleTemplate | null;
}

type ValueRuleParse = { rule: ValueRule; error: null } | { rule: null; error: string };

interface PlacedValue {
  value: number;
  text?: string;
}

interface ValueMark {
  value: number;
  text: string;
}

interface ValueRuleMarks {
  marks: ValueMark[];
  error: string | null;
}

interface LabelBox {
  start: number;
  end: number;
}

export type {
  LabelBox,
  NumberOperator,
  NumberPattern,
  PlacedValue,
  RulePlacement,
  RulePoint,
  RuleTemplate,
  TemplatePart,
  ValueMark,
  ValueRule,
  ValueRuleMarks,
  ValueRuleParse,
  ValueScale,
};
