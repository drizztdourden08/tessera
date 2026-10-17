/* @layer renderer-components @kind logic */
import type { PaneNode } from '../DockLayout.type';

const makesRoom = (pane: PaneNode): boolean => pane.makeRoom !== false;

export { makesRoom };
