/* @layer renderer-components @kind types */
interface GridCollapsedInput {
  collapsed?: readonly string[];
  defaultCollapsed?: readonly string[];
  onToggleSection?: (key: string, collapsed: boolean) => void;
}

interface GridCollapsed {
  set: ReadonlySet<string>;
  setCollapsed: (key: string, collapsed: boolean) => void;
}

export type { GridCollapsed, GridCollapsedInput };
