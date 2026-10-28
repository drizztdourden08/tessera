/* @layer renderer-components @kind logic */
import { BIG_STEP } from '../Navigator.constants';
import type { KeyMove, NavigatorViewport } from '../Navigator.type';

const keyMove = (key: string, shift: boolean, viewport: NavigatorViewport, step: number): KeyMove | null => {
  const reach = shift ? step * BIG_STEP : step;
  if (key === 'ArrowLeft') return { dx: -reach, dy: 0 };
  if (key === 'ArrowRight') return { dx: reach, dy: 0 };
  if (key === 'ArrowUp') return { dx: 0, dy: -reach };
  if (key === 'ArrowDown') return { dx: 0, dy: reach };
  if (key === 'PageUp') return { dx: 0, dy: -viewport.height };
  if (key === 'PageDown') return { dx: 0, dy: viewport.height };
  return null;
};

export { keyMove };
