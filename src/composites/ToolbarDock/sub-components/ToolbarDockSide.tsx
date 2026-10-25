/* @layer renderer-components @kind component */
import { Box } from '../../../primitives/Box';
import { useTesseraStrings } from '../../../primitives/TesseraProvider/behavior/useTesseraStrings';
import { toolbarHandle } from '../behavior/toolbar-handle';
import { toolbarOrientation } from '../behavior/toolbar-orientation';
import type { ToolbarDockSideProps } from './ToolbarDockSide.type';

const ToolbarDockSide = ({ side, lanes, dragId, definitions, renderToolbar }: ToolbarDockSideProps) => {
  const { toolbars } = useTesseraStrings();
  const orientation = toolbarOrientation(side);
  const drawn = lanes.flatMap((places, lane) => {
    const bars = places.flatMap(({ id }) => {
      const definition = definitions.find((candidate) => candidate.id === id);
      return definition ? [{ id, label: definition.label }] : [];
    });
    return bars.length > 0 ? [{ lane, bars }] : [];
  });
  if (drawn.length === 0) return null;

  return (
    <Box className="toolbar-dock__side" data-side={side} data-orientation={orientation}>
      {drawn.map(({ lane, bars }) => (
        <Box key={bars[0]?.id} className="toolbar-dock__lane" data-lane={lane} data-dragging={bars.some(({ id }) => id === dragId) ? '' : undefined}>
          {bars.map(({ id, label }) => renderToolbar(id, { orientation, handle: toolbarHandle(id, toolbars.move(label)), side }))}
        </Box>
      ))}
    </Box>
  );
};

export { ToolbarDockSide };
