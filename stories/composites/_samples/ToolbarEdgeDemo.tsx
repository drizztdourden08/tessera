/* @layer stories @kind component */
import { Toolbar } from '../../../src/composites';
import type { ToolbarItem } from '../../../src/composites';
import { Box } from '../../../src/primitives';
import { TRANSFORM_MENU } from './toolbar-edge.constants';

const ignore = (): void => undefined;

const ITEMS: ToolbarItem[] = [
  { kind: 'button', id: 'undo', label: 'Undo', icon: 'undo-2', onSelect: ignore },
  { kind: 'button', id: 'redo', label: 'Redo', icon: 'redo-2', onSelect: ignore },
  { kind: 'button', id: 'transform', label: 'Transform', icon: 'move', caption: 'Transform', options: TRANSFORM_MENU, openOn: 'click', onSelect: ignore },
];

const ToolbarEdgeDemo = () => (
  <Box className="toolbar-story__box toolbar-edge">
    <Toolbar label="Edit tools" items={ITEMS} handle />
  </Box>
);

export { ToolbarEdgeDemo };
