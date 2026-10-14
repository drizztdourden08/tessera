/* @layer renderer-components @kind logic */
import { KEYS_LEFT_TO_CONTROL } from '../MediaViewer.constants';
import type { ZoomState } from '../MediaViewer.type';

const zoomKeys = (zoom: ZoomState | null): Record<string, () => void> => (zoom
  ? { '+': zoom.zoomIn, '=': zoom.zoomIn, '-': zoom.zoomOut, '0': zoom.fit }
  : {});

const viewerKey = (event: KeyboardEvent, zoom: ZoomState | null, step: (by: number) => void): void => {
  if (event.defaultPrevented || event.ctrlKey || event.metaKey || event.altKey) return;
  if ((event.target as Element | null)?.closest(KEYS_LEFT_TO_CONTROL)) return;
  const actions: Record<string, () => void> = { ArrowLeft: () => step(-1), ArrowRight: () => step(1), ...zoomKeys(zoom) };
  const action = actions[event.key];
  if (!action) return;
  event.preventDefault();
  action();
};

export { viewerKey };
