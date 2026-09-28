/* @layer renderer-components @kind util */
import type { CSSProperties } from 'react';
import type { CameraView } from '../ShortcutTour.type';

const viewStyle = (view: CameraView | null): CSSProperties | undefined =>
  (view ? { transform: `translate(${view.x}px, ${view.y}px) scale(${view.scale})` } : undefined);

export { viewStyle };
