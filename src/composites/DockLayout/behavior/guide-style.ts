/* @layer renderer-components @kind logic */
import type { CSSProperties } from 'react';
import type { SnapGuide } from './snap.type';

const guideStyle = (guide: SnapGuide): CSSProperties =>
  (guide.axis === 'x'
    ? { left: guide.at, top: guide.from, height: guide.to - guide.from }
    : { left: guide.from, top: guide.at, width: guide.to - guide.from });

export { guideStyle };
