/* @layer renderer-components @kind logic */
import type { Rect } from '../../rect-drag/rect-drag.type';
import { BASKET } from '../ToolbarDock.constants';
import type { ToolbarFrame } from './toolbar-drag.type';

const toolbarBasket = (frame: ToolbarFrame): Rect => ({
  x: frame.rect.x + (frame.rect.width - BASKET.width) / 2,
  y: frame.rect.y + frame.rect.height - BASKET.height - BASKET.margin,
  width: BASKET.width,
  height: BASKET.height,
});

export { toolbarBasket };
