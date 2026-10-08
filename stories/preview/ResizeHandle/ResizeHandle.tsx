/* @layer stories @kind component */
import { SplitDivider } from '../../../src/composites/SplitPane/sub-components/SplitDivider';
import { Box } from '../../../src/primitives';
import type { ResizeHandleProps } from './ResizeHandle.type';
import './ResizeHandle.css';

const ResizeHandle = (props: ResizeHandleProps) => {
  const { startLabel, endLabel, size, min, max, handlers, look = 'grip', edge = 'start' } = props;
  return (
    <Box className={`resize-handle resize-handle--${look}`} dir={edge === 'end' ? 'rtl' : undefined}>
      <SplitDivider
        collapsed="none"
        orientation="horizontal"
        value={size}
        valueRange={{ min, max }}
        startLabel={startLabel}
        endLabel={endLabel}
        handlers={handlers}
      />
    </Box>
  );
};

export { ResizeHandle };
