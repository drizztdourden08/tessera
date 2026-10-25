/* @layer renderer-components @kind logic */
import type { ToolbarDefinition, ToolbarLayout } from '../ToolbarDock.type';
import { cleanToolbarLayout } from './clean-toolbar-layout';
import { createToolbarLayout } from './create-toolbar-layout';
import { isRecord } from './is-record';
import { upgradeToolbarLayout } from './upgrade-toolbar-layout';

const migrateToolbarLayout = (raw: unknown, defs: readonly ToolbarDefinition[]): ToolbarLayout => {
  if (!isRecord(raw)) return createToolbarLayout(defs);
  if (raw.v === 1) return upgradeToolbarLayout(raw, defs);
  if (raw.v === 2) return cleanToolbarLayout(raw, defs);
  return createToolbarLayout(defs);
};

export { migrateToolbarLayout };
