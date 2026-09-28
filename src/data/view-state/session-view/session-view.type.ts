/* @layer renderer-components @kind types */
interface SessionView {
  scrollTop: number;
  expanded: readonly string[];
  selectedId: string | null;
  draft?: unknown;
}

export type { SessionView };
