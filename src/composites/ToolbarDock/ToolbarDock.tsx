/* @layer renderer-components @kind component */
import { Box } from '../../primitives/Box';
import { TOOLBAR_SIDES } from './ToolbarDock.constants';
import { ToolbarDockSide } from './sub-components/ToolbarDockSide';
import type { ToolbarDockProps } from './ToolbarDock.type';
import './ToolbarDock.css';

const ToolbarDock = ({ layout, definitions, renderToolbar, children, className }: ToolbarDockProps) => (
  <Box className={['toolbar-dock', className].filter(Boolean).join(' ')}>
    {TOOLBAR_SIDES.map((side) => (
      <ToolbarDockSide key={side} side={side} ids={layout.sides[side]} definitions={definitions} renderToolbar={renderToolbar} />
    ))}
    <Box className="toolbar-dock__centre">{children}</Box>
  </Box>
);

export { ToolbarDock };
