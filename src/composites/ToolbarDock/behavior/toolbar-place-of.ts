/* @layer renderer-components @kind logic */
import { TOOLBAR_SIDES } from '../ToolbarDock.constants';
import type { ToolbarLayout } from '../ToolbarDock.type';
import type { ToolbarFound } from './toolbar-place-of.type';

const toolbarPlaceOf = (layout: ToolbarLayout, id: string): ToolbarFound | null => {
  for (const side of TOOLBAR_SIDES) {
    for (const [lane, places] of layout.sides[side].entries()) {
      const place = places.find((candidate) => candidate.id === id);
      if (place) return { side, lane, place };
    }
  }
  return null;
};

export { toolbarPlaceOf };
