/* @layer renderer-components @kind util */
import type { DropPanelPosition, DropPanelPositionOptions } from './drop-panel-position.type';

const dropPanelPositionFor = (
  rect: DOMRect,
  options: DropPanelPositionOptions,
  view: Window = window,
): DropPanelPosition => {
  const { roomForDropDown, gap, minPanelWidth } = options;
  const spaceBelow = view.innerHeight - rect.bottom;
  const dropUp = spaceBelow < roomForDropDown && rect.top > spaceBelow;

  return {
    top: dropUp ? rect.top - gap : rect.bottom + gap,
    left: rect.left,
    width: Math.max(rect.width, minPanelWidth),
    dropUp,
  };
};

export { dropPanelPositionFor };
