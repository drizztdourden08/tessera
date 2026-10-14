/* @layer stories @kind hook */
import { useLayoutEffect, useRef, useState } from 'react';
import type { RefObject } from 'react';
import type { MediaViewerZoom, ZoomState } from '../MediaViewer.type';
import { zoomLevels } from './zoom-levels';

const centreOf = (stage: HTMLElement | null) => (stage
  ? { x: (stage.scrollLeft + stage.clientWidth / 2) / Math.max(1, stage.scrollWidth), y: (stage.scrollTop + stage.clientHeight / 2) / Math.max(1, stage.scrollHeight) }
  : null);

const useZoom = (stageRef: RefObject<HTMLElement | null>, fitScale: number | null, resetKey: string): ZoomState => {
  const [zoom, setZoom] = useState<MediaViewerZoom>('fit');
  const [shownKey, setShownKey] = useState(resetKey);
  const centre = useRef<{ x: number; y: number } | null>(null);
  if (shownKey !== resetKey) { setShownKey(resetKey); setZoom('fit'); }
  const levels = zoomLevels(fitScale);
  const at = Math.max(0, levels.indexOf(zoom));

  useLayoutEffect(() => {
    const stage = stageRef.current;
    const keep = centre.current;
    if (!stage || !keep) return;
    stage.scrollLeft = keep.x * stage.scrollWidth - stage.clientWidth / 2;
    stage.scrollTop = keep.y * stage.scrollHeight - stage.clientHeight / 2;
    centre.current = null;
  }, [zoom, stageRef]);

  const change = (next: MediaViewerZoom | undefined) => {
    if (next === undefined || next === zoom) return;
    centre.current = centreOf(stageRef.current);
    setZoom(next);
  };

  return {
    zoom,
    zoomIn: () => change(levels[at + 1]),
    zoomOut: () => change(levels[at - 1]),
    toggle: () => change(zoom === 'fit' ? 1 : 'fit'),
    fit: () => change('fit'),
    canIn: at < levels.length - 1,
    canOut: at > 0,
  };
};

export { useZoom };
