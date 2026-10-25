/* @layer renderer-components @kind logic */
import { MAX_LANES, TOOLBAR_SIDES } from '../ToolbarDock.constants';
import type { ToolbarSide } from '../ToolbarDock.type';
import type { ToolbarFrame } from './toolbar-drag.type';
import { toolbarOrientation } from './toolbar-orientation';
import type { ToolbarMetrics } from './toolbar-resize.type';

const toolbarFrameMetrics = (frame: ToolbarFrame): ToolbarMetrics => {
  const spans = {} as Record<ToolbarSide, number[]>;
  for (const side of TOOLBAR_SIDES) {
    const reach = toolbarOrientation(side) === 'horizontal' ? frame.rect.width : frame.rect.height;
    spans[side] = Array.from({ length: MAX_LANES }, (_, lane) => {
      const measured = frame.spans[side][lane] ?? 0;
      return measured > 0 ? measured : reach;
    });
  }
  return { spans };
};

export { toolbarFrameMetrics };
