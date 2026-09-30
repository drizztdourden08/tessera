/* @layer renderer-components @kind component */
import { useMemo } from 'react';
import { Box } from '../../../primitives/Box';
import { rectStyle } from '../behavior/rect-style';
import { useDividerDrag } from '../behavior/useDividerDrag';
import type { SplitDividerProps } from './SplitDivider.type';

const SplitDivider = (props: SplitDividerProps) => {
  const { divider, onEdit } = props;
  const { dragging, onPointerDown, onDoubleClick } = useDividerDrag(divider, onEdit);
  const style = useMemo(() => rectStyle(divider.rect), [divider.rect]);
  const cls = ['dock-divider', `dock-divider--${divider.node.axis}`, dragging && 'dock-divider--dragging'].filter(Boolean).join(' ');

  return (
    <Box
      className={cls}
      style={style}
      role="separator"
      aria-orientation={divider.node.axis === 'row' ? 'vertical' : 'horizontal'}
      onPointerDown={onPointerDown}
      onDoubleClick={onDoubleClick}
    />
  );
};

export { SplitDivider };
