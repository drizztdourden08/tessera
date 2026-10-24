/* @layer renderer-components @kind logic */
import type { ToolbarOrientation } from '../../Toolbar/Toolbar.type';
import type { ToolbarSide } from '../ToolbarDock.type';

const toolbarOrientation = (side: ToolbarSide): ToolbarOrientation => (side === 'left' || side === 'right' ? 'vertical' : 'horizontal');

export { toolbarOrientation };
