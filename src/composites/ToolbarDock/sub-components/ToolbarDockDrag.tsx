/* @layer renderer-components @kind component */
import { Box } from '../../../primitives/Box';
import { useTesseraStrings } from '../../../primitives/TesseraProvider/behavior/useTesseraStrings';
import { DragGhost } from '../../dock-zones/DragGhost';
import { DropPopZone } from '../../dock-zones/DropPopZone';
import { DropPreview } from '../../dock-zones/DropPreview';
import { rectStyle } from '../../rect-drag/rect-style';
import type { ToolbarDockDragProps } from './ToolbarDockDrag.type';

const ToolbarDockDrag = ({ view }: ToolbarDockDragProps) => {
  const { toolbars } = useTesseraStrings();
  const { target, basket, pointer, label } = view;
  const hot = target.kind === 'basket';
  return (
    <>
      {(target.kind === 'lane' || target.kind === 'refused') && <DropPreview rect={target.rect} refused={target.kind === 'refused'} />}
      <Box className={`toolbar-dock__basket${hot ? ' toolbar-dock__basket--hot' : ''}`} style={rectStyle(basket)}>
        <DropPopZone tone="basket" icon="trash-2" label={toolbars.basket} />
      </Box>
      <DragGhost pointer={pointer} label={label} swap={false} overlay={false} plain />
    </>
  );
};

export { ToolbarDockDrag };
