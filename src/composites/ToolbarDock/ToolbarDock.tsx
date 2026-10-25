/* @layer renderer-components @kind component */
import { useRef } from 'react';
import { Box } from '../../primitives/Box';
import { TOOLBAR_SIDES } from './ToolbarDock.constants';
import { toolbarGridPlacement } from './behavior/toolbar-grid-placement';
import { useToolbarDrag } from './behavior/useToolbarDrag';
import { useToolbarKeys } from './behavior/useToolbarKeys';
import { ToolbarDockDrag } from './sub-components/ToolbarDockDrag';
import { ToolbarDockGuide } from './sub-components/ToolbarDockGuide';
import { ToolbarDockSide } from './sub-components/ToolbarDockSide';
import type { ToolbarDockProps } from './ToolbarDock.type';
import './ToolbarDock.css';

const ToolbarDock = ({ layout, onLayoutChange, definitions, renderToolbar, children, className }: ToolbarDockProps) => {
  const rootRef = useRef<HTMLDivElement>(null);
  const params = { rootRef, layout, definitions, onLayoutChange };
  const { drag, onPointerDown } = useToolbarDrag(params);
  const { moving, message, onKeyDown } = useToolbarKeys(params);
  const view = drag ?? moving;
  const grid = toolbarGridPlacement(layout);
  const classes = ['toolbar-dock', drag && 'toolbar-dock--dragging', className].filter(Boolean).join(' ');
  return (
    <Box ref={rootRef} className={classes} onPointerDown={onPointerDown} onKeyDown={onKeyDown}>
      {TOOLBAR_SIDES.map((side) => (
        <ToolbarDockSide key={side} side={side} lanes={grid[side]} dragId={view?.id ?? null} definitions={definitions} renderToolbar={renderToolbar} />
      ))}
      <Box className="toolbar-dock__centre">{children}</Box>
      {view && <ToolbarDockDrag view={view} />}
      <ToolbarDockGuide open={moving !== null} message={message} />
    </Box>
  );
};

export { ToolbarDock };
