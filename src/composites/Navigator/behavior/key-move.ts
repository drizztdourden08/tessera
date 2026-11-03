/* @layer renderer-components @kind logic */
import type { KeyMove, NavigatorViewport } from '../Navigator.type';

const keyMove = (key: string, viewport: NavigatorViewport, reach: number): KeyMove | null => {
  if (key === 'ArrowLeft') return { dx: -reach, dy: 0 };
  if (key === 'ArrowRight') return { dx: reach, dy: 0 };
  if (key === 'ArrowUp') return { dx: 0, dy: -reach };
  if (key === 'ArrowDown') return { dx: 0, dy: reach };
  if (key === 'PageUp') return { dx: 0, dy: -viewport.height };
  if (key === 'PageDown') return { dx: 0, dy: viewport.height };
  return null;
};

export { keyMove };
