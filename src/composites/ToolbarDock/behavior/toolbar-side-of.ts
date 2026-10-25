/* @layer renderer-components @kind logic */
import type { ToolbarLayout, ToolbarSide } from '../ToolbarDock.type';
import { toolbarPlaceOf } from './toolbar-place-of';

const toolbarSideOf = (layout: ToolbarLayout, id: string): ToolbarSide | null => toolbarPlaceOf(layout, id)?.side ?? null;

export { toolbarSideOf };
