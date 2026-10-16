/* @layer renderer-components @kind component */
import { forwardRef } from 'react';
import { Box } from '../Box';
import type { ToolFrameProps } from './ToolFrame.type';
import './ToolFrame.css';

const ToolFrame = forwardRef<HTMLElement, ToolFrameProps>((props, ref) => {
  const { toolbar, padded = false, className, children, ...rest } = props;
  const body = padded ? 'tool-frame__body tool-frame__body--padded' : 'tool-frame__body';
  return (
    <Box ref={ref} surface="sunken" className={className ? `tool-frame ${className}` : 'tool-frame'} {...rest}>
      {toolbar !== undefined && toolbar !== null && toolbar !== false && <Box className="tool-frame__toolbar">{toolbar}</Box>}
      <Box className={body}>{children}</Box>
    </Box>
  );
});

export { ToolFrame };
