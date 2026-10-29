/* @layer renderer-components @kind types */
interface TreeExpansionInput {
  expandedKeys?: readonly string[];
  defaultExpandedKeys?: readonly string[];
  onExpandedChange?: (keys: readonly string[]) => void;
}

interface TreeExpansion {
  open: ReadonlySet<string>;
  setExpanded: (key: string, expanded: boolean) => void;
  setMany: (keys: readonly string[], expanded: boolean) => void;
  toggle: (key: string) => void;
}

export type { TreeExpansion, TreeExpansionInput };
