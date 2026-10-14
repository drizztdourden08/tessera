/* @layer renderer-components @kind logic */
import type { StageCentre } from '../MediaViewer.type';

const centreOf = (stage: HTMLElement | null): StageCentre | null => (stage
  ? {
    x: (stage.scrollLeft + stage.clientWidth / 2) / Math.max(1, stage.scrollWidth),
    y: (stage.scrollTop + stage.clientHeight / 2) / Math.max(1, stage.scrollHeight),
  }
  : null);

export { centreOf };
