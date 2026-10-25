/* @layer renderer-components @kind types */
import type { ToolbarLayout } from '../ToolbarDock.type';

interface ToolbarReadContext {
  known: ReadonlySet<string>;
  seen: Set<string>;
  rawSides: Record<string, unknown>;
  base: ToolbarLayout;
}

export type { ToolbarReadContext };
