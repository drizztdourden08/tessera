/* @layer renderer-components @kind logic */
import { MAX_PER_SIDE, TOOLBAR_LAYOUT_V, TOOLBAR_SIDES } from '../ToolbarDock.constants';
import type { ToolbarDefinition, ToolbarLayout } from '../ToolbarDock.type';
import { cleanToolbarIds } from './clean-toolbar-ids';
import { cleanToolbarLast } from './clean-toolbar-last';
import { createToolbarLayout } from './create-toolbar-layout';
import { emptyToolbarLayout } from './empty-toolbar-layout';
import { isRecord } from './is-record';
import { placeOrHideToolbar } from './place-or-hide-toolbar';

const migrateToolbarLayout = (raw: unknown, defs: readonly ToolbarDefinition[]): ToolbarLayout => {
  if (!isRecord(raw) || raw.v !== TOOLBAR_LAYOUT_V) return createToolbarLayout(defs);
  const known = new Set(defs.map((def) => def.id));
  const seen = new Set<string>();
  const rawSides = isRecord(raw.sides) ? raw.sides : {};
  const base = emptyToolbarLayout();
  for (const side of TOOLBAR_SIDES) base.sides[side] = cleanToolbarIds(rawSides[side], known, seen, MAX_PER_SIDE);
  base.hidden = cleanToolbarIds(raw.hidden, known, seen, Number.POSITIVE_INFINITY);
  base.last = cleanToolbarLast(raw.last, known);
  return defs.filter((def) => !seen.has(def.id)).reduce(placeOrHideToolbar, base);
};

export { migrateToolbarLayout };
