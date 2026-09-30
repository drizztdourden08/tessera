/* @layer renderer-components @kind logic */
import type { Rect } from '../../DockLayout';

const mainOrWindow = (rect: Rect | null): Rect =>
  rect ?? { x: 0, y: 0, width: typeof window === 'undefined' ? 0 : window.innerWidth, height: typeof window === 'undefined' ? 0 : window.innerHeight };

export { mainOrWindow };
