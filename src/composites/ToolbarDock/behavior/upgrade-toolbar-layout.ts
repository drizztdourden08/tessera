/* @layer renderer-components @kind logic */
import { MAX_LANES, TOOLBAR_SIDES } from '../ToolbarDock.constants';
import type { ToolbarDefinition, ToolbarLayout } from '../ToolbarDock.type';
import { cleanToolbarIds } from './clean-toolbar-ids';
import { finishToolbarLayout } from './finish-toolbar-layout';
import { toolbarReadContext } from './toolbar-read-context';

const upgradeToolbarLayout = (raw: Record<string, unknown>, defs: readonly ToolbarDefinition[]): ToolbarLayout => {
  const { known, seen, rawSides, base } = toolbarReadContext(raw, defs);
  for (const side of TOOLBAR_SIDES) {
    base.sides[side] = cleanToolbarIds(rawSides[side], known, seen, MAX_LANES).map((id) => [{ id, start: 0, size: 1 }]);
  }
  return finishToolbarLayout(base, raw, defs, seen);
};

export { upgradeToolbarLayout };
