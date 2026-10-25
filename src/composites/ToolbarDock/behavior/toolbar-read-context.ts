/* @layer renderer-components @kind logic */
import type { ToolbarDefinition } from '../ToolbarDock.type';
import { emptyToolbarLayout } from './empty-toolbar-layout';
import { isRecord } from './is-record';
import type { ToolbarReadContext } from './toolbar-read-context.type';

const toolbarReadContext = (raw: Record<string, unknown>, defs: readonly ToolbarDefinition[]): ToolbarReadContext => ({
  known: new Set(defs.map((def) => def.id)),
  seen: new Set<string>(),
  rawSides: isRecord(raw.sides) ? raw.sides : {},
  base: emptyToolbarLayout(),
});

export { toolbarReadContext };
