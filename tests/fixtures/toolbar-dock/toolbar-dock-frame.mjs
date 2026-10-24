/* @layer tooling-scripts @kind test */
import { createToolbarLayout } from '../../../src/composites/ToolbarDock';

const def = (id, defaultSide) => ({ id, label: `Label ${id}`, defaultSide });

const DEFS = [def('a', 'top'), def('b', 'top'), def('c', 'left'), def('d', 'bottom')];

const LAYOUT = createToolbarLayout(DEFS);

const FRAME = {
  rect: { x: 0, y: 0, width: 800, height: 600 },
  thickness: { top: 40, bottom: 40, left: 48, right: 48 },
};

export { DEFS, FRAME, LAYOUT };
