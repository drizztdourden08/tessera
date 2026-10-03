/* @layer renderer-components @kind types */
interface GroupTreeGuidesProps {
  ancestors: readonly string[];
  activeBranch: ReadonlySet<string>;
}

export type { GroupTreeGuidesProps };
