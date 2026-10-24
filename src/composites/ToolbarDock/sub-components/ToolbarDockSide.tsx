/* @layer renderer-components @kind component */
import { Box } from '../../../primitives/Box';
import { useTesseraStrings } from '../../../primitives/TesseraProvider/behavior/useTesseraStrings';
import { toolbarHandle } from '../behavior/toolbar-handle';
import { toolbarOrientation } from '../behavior/toolbar-orientation';
import type { ToolbarDockSideProps } from './ToolbarDockSide.type';

const ToolbarDockSide = ({ side, ids, dragId, definitions, renderToolbar }: ToolbarDockSideProps) => {
  const { toolbars } = useTesseraStrings();
  const orientation = toolbarOrientation(side);
  const lanes = ids.flatMap((id, lane) => {
    const definition = definitions.find((candidate) => candidate.id === id);
    return definition ? [{ id, lane, label: definition.label }] : [];
  });
  if (lanes.length === 0) return null;

  return (
    <Box className="toolbar-dock__side" data-side={side} data-orientation={orientation}>
      {lanes.map(({ id, lane, label }) => (
        <Box key={id} className="toolbar-dock__lane" data-lane={lane} data-dragging={id === dragId ? '' : undefined}>
          {renderToolbar(id, { orientation, handle: toolbarHandle(id, toolbars.move(label)), side })}
        </Box>
      ))}
    </Box>
  );
};

export { ToolbarDockSide };
