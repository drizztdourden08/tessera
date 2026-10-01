/* @layer renderer-components @kind types */
interface RulePoint {
  value: number | 'min' | 'max';
  text?: string;
}

type LabelPlacement =
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

type LabelTemplate =
  | { kind: 'words'; words: readonly string[] }
  | { kind: 'parts'; parts: readonly TemplatePart[] };

interface LabelRule {
  placements: readonly LabelPlacement[] | null;
  template: LabelTemplate | null;
}

interface PlacedValue {
  value: number;
  text?: string;
}

export type {
  LabelPlacement,
  LabelRule,
  LabelTemplate,
  NumberOperator,
  NumberPattern,
  PlacedValue,
  RulePoint,
  TemplatePart,
};
