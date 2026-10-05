/* @layer renderer-components @kind types */
interface SourceParts {
  tracked: ReadonlySet<string>;
  fading: ReadonlySet<string>;
  inUse: ReadonlySet<string>;
}

export type { SourceParts };
