/* @layer renderer-components @kind component */
import { useMemo } from 'react';
import { Box } from '../../../primitives/Box';
import { Icon } from '../../../primitives/Icon';
import { Span } from '../../../primitives/text-elements';
import { rectStyle } from '../behavior/rect-style';
import { useMainHover } from '../behavior/useMainHover';
import type { MainGripProps } from './MainGrip.type';

const MainGrip = (props: MainGripProps) => {
  const { rect, stageRef, label, hint } = props;
  const hovered = useMainHover(rect, stageRef);
  const style = useMemo(() => rectStyle(rect), [rect]);

  return (
    <Box className={`dock-layout__main-area${hovered ? ' dock-layout__main-area--hover' : ''}`} style={style}>
      <Box className="dock-grip" data-drag-main="" title={hint}>
        <Icon name="grip-vertical" size={12} className="dock-grip__icon" />
        <Span className="dock-grip__label">{label}</Span>
      </Box>
    </Box>
  );
};

export { MainGrip };
