/* @layer renderer-components @kind util */
import { TOUR_WAITS } from '../ShortcutTour.constants';
import type { TourFrame, TourFrameParams } from '../ShortcutTour.type';

const stepFrames = (count: number): TourFrame[] => Array.from({ length: count }, (_, index): TourFrame[] => [
  { focus: index, held: index, wait: TOUR_WAITS.travel },
  { focus: index, held: index + 1, wait: TOUR_WAITS.press },
]).flat();

const overviewFrames = (count: number): TourFrame[] => [
  { focus: 'all', held: count, wait: TOUR_WAITS.travel },
  { focus: 'all', held: 0, wait: TOUR_WAITS.tap },
  { focus: 'all', held: count, wait: TOUR_WAITS.hold },
];

const tourFrames = (params: TourFrameParams): TourFrame[] => {
  const { count, zoomOut, loop, still } = params;
  if (count === 0) return [];
  if (still) return [{ focus: 'all', held: count, wait: 0 }];
  const frames = [...stepFrames(count), ...(zoomOut ? overviewFrames(count) : [])];
  const last = frames[frames.length - 1];
  if (!loop || !last) return frames;
  return [...frames, { focus: last.focus, held: 0, wait: TOUR_WAITS.rest }];
};

export { tourFrames };
