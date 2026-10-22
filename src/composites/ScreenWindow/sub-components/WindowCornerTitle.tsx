/* @layer renderer-components @kind component */
import { Box } from '../../../primitives/Box';
import { Span } from '../../../primitives/text-elements';
import type { WindowCornerTitleProps } from './WindowCornerTitle.type';

const WindowCornerTitle = ({ title, icon, titleId }: WindowCornerTitleProps) => (
  <Box className="screen-window__corner-title" title={typeof title === 'string' ? title : undefined}>
    {icon != null && <Span className="screen-window__corner-icon" aria-hidden="true">{icon}</Span>}
    <Span id={titleId} className="screen-window__corner-text">{title}</Span>
  </Box>
);

export { WindowCornerTitle };
