/* @layer renderer-components @kind types */
interface TreeGuidesProps {
  ancestors: readonly string[];
  activeBranch: ReadonlySet<string>;
}

export type { TreeGuidesProps };
