/* @layer renderer-components @kind component */
import { useRef } from 'react';
import { Box } from '../../primitives/Box';
import { TOOLBAR_SIDES } from './ToolbarDock.constants';
import { useToolbarDrag } from './behavior/useToolbarDrag';
import { ToolbarDockDrag } from './sub-components/ToolbarDockDrag';
import { ToolbarDockSide } from './sub-components/ToolbarDockSide';
import type { ToolbarDockProps } from './ToolbarDock.type';
import './ToolbarDock.css';

const ToolbarDock = ({ layout, onLayoutChange, definitions, renderToolbar, children, className }: ToolbarDockProps) => {
  const rootRef = useRef<HTMLDivElement>(null);
  const { drag, onPointerDown } = useToolbarDrag({ rootRef, layout, definitions, onLayoutChange });
  const classes = ['toolbar-dock', drag && 'toolbar-dock--dragging', className].filter(Boolean).join(' ');
  return (
    <Box ref={rootRef} className={classes} onPointerDown={onPointerDown}>
      {TOOLBAR_SIDES.map((side) => (
        <ToolbarDockSide key={side} side={side} ids={layout.sides[side]} dragId={drag?.id ?? null} definitions={definitions} renderToolbar={renderToolbar} />
      ))}
      <Box className="toolbar-dock__centre">{children}</Box>
      {drag && <ToolbarDockDrag view={drag} />}
    </Box>
  );
};

export { ToolbarDock };
