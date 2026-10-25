/* @layer renderer-components @kind component */
import type { CSSProperties } from 'react';
import { Box } from '../../../primitives/Box';
import { useTesseraStrings } from '../../../primitives/TesseraProvider/behavior/useTesseraStrings';
import { toolbarHandle } from '../behavior/toolbar-handle';
import { toolbarOrientation } from '../behavior/toolbar-orientation';
import { ToolbarDockEnd } from './ToolbarDockEnd';
import { TOOLBAR_ENDS } from './ToolbarDockSide.constants';
import type { ToolbarDockSideProps } from './ToolbarDockSide.type';

const laneStyle = (row: string, column: string, tracks: string) =>
  ({ '--toolbar-dock-row': row, '--toolbar-dock-column': column, '--toolbar-dock-tracks': tracks }) as CSSProperties;

const ToolbarDockSide = ({ side, lanes, dragId, definitions, renderToolbar, resize }: ToolbarDockSideProps) => {
  const { toolbars } = useTesseraStrings();
  const orientation = toolbarOrientation(side);
  const drawn = lanes.flatMap((grid) => {
    const bars = grid.bars.flatMap(({ id, track }) => {
      const definition = definitions.find((candidate) => candidate.id === id);
      return definition ? [{ id, track, label: definition.label }] : [];
    });
    return bars.length > 0 ? [{ grid, bars }] : [];
  });

  return (
    <>
      {drawn.map(({ grid, bars }) => (
        <Box
          key={bars[0]?.id}
          className="toolbar-dock__lane"
          data-side={side}
          data-orientation={orientation}
          data-lane={grid.lane}
          data-dragging={bars.some(({ id }) => id === dragId) ? '' : undefined}
          style={laneStyle(grid.gridRow, grid.gridColumn, grid.tracks)}
        >
          {bars.map(({ id, track, label }) => (
            <Box key={id} className="toolbar-dock__bar" style={{ '--toolbar-dock-track': track } as CSSProperties}>
              {renderToolbar(id, { orientation, handle: toolbarHandle(id, toolbars.move(label)), side })}
              {TOOLBAR_ENDS.map((end) => (
                <ToolbarDockEnd key={end} id={id} label={label} end={end} side={side} layout={resize.layout} metrics={resize.metrics} handlers={resize.handlersFor(id, end)} />
              ))}
            </Box>
          ))}
        </Box>
      ))}
    </>
  );
};

export { ToolbarDockSide };
