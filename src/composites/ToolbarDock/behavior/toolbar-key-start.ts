/* @layer renderer-components @kind logic */
import type { ToolbarLayout } from '../ToolbarDock.type';
import type { ToolbarKeyPick } from './toolbar-key.type';
import { toolbarPlaceOf } from './toolbar-place-of';

const toolbarKeyStart = (layout: ToolbarLayout, id: string): ToolbarKeyPick => {
  const found = toolbarPlaceOf(layout, id);
  if (found === null) return { kind: 'basket' };
  return { kind: 'lane', side: found.side, index: found.lane };
};

export { toolbarKeyStart };
