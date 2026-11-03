/* @layer renderer-components @kind component */
import { forwardRef } from 'react';
import { Box } from '../Box';
import type { ToolFrameProps } from './ToolFrame.type';
import './ToolFrame.css';

const ToolFrame = forwardRef<HTMLElement, ToolFrameProps>((props, ref) => {
  const { toolbar, padded = false, shrink = true, className, children, ...rest } = props;
  const body = padded ? 'tool-frame__body tool-frame__body--padded' : 'tool-frame__body';
  const frame = ['tool-frame', !shrink && 'tool-frame--rigid', className].filter(Boolean).join(' ');
  return (
    <Box ref={ref} surface="sunken" className={frame} {...rest}>
      {toolbar !== undefined && toolbar !== null && toolbar !== false && <Box className="tool-frame__toolbar">{toolbar}</Box>}
      <Box className={shrink ? body : `${body} tool-frame__body--rigid`}>{children}</Box>
    </Box>
  );
});

export { ToolFrame };
