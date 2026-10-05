/* @layer renderer-components @kind logic */
import type { MascotSpot, TourBox, TourSize } from './tour-internal.type';

const clamp = (value: number, low: number, high: number): number => Math.min(Math.max(value, low), Math.max(low, high));

const mascotSpot = (area: TourBox, view: TourSize, box: TourSize, gap: number): MascotSpot => {
  const half = box.width / 2;
  const y = clamp(area.y + area.height - box.height, 0, view.height - box.height);
  const left = area.x - gap - half;
  if (left - half >= 0) return { x: left, y, face: 'right' };
  const right = area.x + area.width + gap + half;
  if (right + half <= view.width) return { x: right, y, face: 'left' };
  const below = area.y + area.height + gap;
  const under = below + box.height <= view.height;
  return {
    x: clamp(area.x + area.width - half, half, view.width - half),
    y: under ? below : clamp(area.y - gap - box.height, 0, view.height - box.height),
    face: 'left',
  };
};

export { mascotSpot };
