/* @layer stories @kind types */
type Lines = readonly [string, ...string[]];

interface PreviewAlternative {
  readonly case: string;
  readonly use: string;
}

interface PreviewUsage {
  readonly job: string;
  readonly useWhen: Lines;
  readonly avoidWhen: readonly [PreviewAlternative, ...PreviewAlternative[]];
  readonly rules: Lines;
  readonly a11y: Lines;
  readonly example: string;
}

export type { PreviewUsage };
