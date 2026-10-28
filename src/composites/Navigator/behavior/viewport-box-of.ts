/* @layer renderer-components @kind logic */
import type { CSSProperties } from 'react';
import { PERCENT } from '../Navigator.constants';
import type { NavigatorSurface, NavigatorViewport } from '../Navigator.type';

const percent = (part: number, whole: number): string => `${String(whole > 0 ? (part / whole) * PERCENT : 0)}%`;

const viewportBoxOf = (viewport: NavigatorViewport, surface: NavigatorSurface): CSSProperties => ({
  left: percent(viewport.x, surface.width),
  top: percent(viewport.y, surface.height),
  width: percent(viewport.width, surface.width),
  height: percent(viewport.height, surface.height),
});

export { viewportBoxOf };
