/* @layer renderer-components @kind logic */
import { EXTERNAL_GRAB } from '../DockLayout.constants';
import type { Size, WidgetId } from '../DockLayout.type';
import type { DragSource, Point } from './drag.type';

const externalSource = (id: WidgetId, pointer: Point, size: Size): DragSource => ({
  id, isMain: false, fromKey: null, fromTab: false, floating: null, loneWidget: false,
  start: pointer, grab: EXTERNAL_GRAB, size,
});

export { externalSource };
