/* @layer stories @kind logic */
import type { ZoomState } from '../MediaViewer.type';

const viewerKey = (event: KeyboardEvent, zoom: ZoomState, step: (by: number) => void): void => {
  const target = event.target as Element | null;
  if (target?.closest('video, input, [role="slider"]')) return;
  const actions: Record<string, () => void> = {
    ArrowLeft: () => step(-1),
    ArrowRight: () => step(1),
    '+': zoom.zoomIn,
    '=': zoom.zoomIn,
    '-': zoom.zoomOut,
    '0': zoom.fit,
  };
  const action = actions[event.key];
  if (!action || event.ctrlKey || event.metaKey || event.altKey) return;
  event.preventDefault();
  action();
};

export { viewerKey };
