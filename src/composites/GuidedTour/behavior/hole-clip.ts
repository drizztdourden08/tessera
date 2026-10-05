/* @layer renderer-components @kind logic */
import { CORNER_POINTS, QUARTER_TURN } from '../GuidedTour.constants';
import type { HoleRect, TourSize } from './tour-internal.type';

const px = (value: number): string => `${Math.round(value * 10) / 10}px`;

const arc = (cx: number, cy: number, radius: number, from: number): string[] =>
  Array.from({ length: CORNER_POINTS + 1 }, (_, step) => {
    const angle = from + (step / CORNER_POINTS) * QUARTER_TURN;
    return `${px(cx + radius * Math.cos(angle))} ${px(cy + radius * Math.sin(angle))}`;
  });

const holeClip = (hole: HoleRect | null, view: TourSize): string => {
  const { x, y, width, height, radius } = hole ?? { x: view.width / 2, y: view.height / 2, width: 0, height: 0, radius: 0 };
  const r = Math.max(0, Math.min(radius, width / 2, height / 2));
  const points = [
    ...arc(x + r, y + r, r, Math.PI),
    ...arc(x + width - r, y + r, r, Math.PI + QUARTER_TURN),
    ...arc(x + width - r, y + height - r, r, 0),
    ...arc(x + r, y + height - r, r, QUARTER_TURN),
  ];
  return `polygon(evenodd, 0 0, 100% 0, 100% 100%, 0 100%, 0 0, ${points.join(', ')}, ${points[0]}, 0 0)`;
};

export { holeClip };
