/* @layer renderer-components @kind logic */
import type { SnapSide } from '../Widget.type';
import type { Edge } from './useWidgetResize.type';

const getDockedResizeEdge = (side: SnapSide): Edge => {
  switch (side) {
    case 'left': return 'e';
    case 'right': return 'w';
    case 'top': return 's';
    case 'bottom': return 'n';
  }
}

export { getDockedResizeEdge };
