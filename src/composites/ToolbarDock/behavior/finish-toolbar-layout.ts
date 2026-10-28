/* @layer renderer-components @kind logic */
import type { ToolbarDefinition, ToolbarLayout } from '../ToolbarDock.type';
import { cleanToolbarColumns } from './clean-toolbar-columns';
import { cleanToolbarIds } from './clean-toolbar-ids';
import { cleanToolbarItems } from './clean-toolbar-items';
import { cleanToolbarLabels } from './clean-toolbar-labels';
import { cleanToolbarLast } from './clean-toolbar-last';
import type { ToolbarRaw } from './finish-toolbar-layout.type';
import { normalizeCorners } from './normalize-corners';
import { placeOrHideToolbar } from './place-or-hide-toolbar';

const finishToolbarLayout = (base: ToolbarLayout, raw: ToolbarRaw, defs: readonly ToolbarDefinition[], seen: Set<string>): ToolbarLayout => {
  const known = new Set(defs.map((def) => def.id));
  const withRest: ToolbarLayout = {
    ...base,
    hidden: cleanToolbarIds(raw.hidden, known, seen, Number.POSITIVE_INFINITY),
    last: cleanToolbarLast(raw.last, known),
    ...cleanToolbarLabels(raw.labels, known),
    ...cleanToolbarItems(raw.items, known),
    ...cleanToolbarColumns(raw.columns, known),
  };
  return normalizeCorners(defs.filter((def) => !seen.has(def.id)).reduce(placeOrHideToolbar, withRest));
};

export { finishToolbarLayout };
