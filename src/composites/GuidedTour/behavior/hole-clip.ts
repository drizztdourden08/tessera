/* @layer renderer-components @kind logic */
import { CORNER_POINTS, QUARTER_TURN } from '../GuidedTour.constants';
import { clipToBox } from './clip-to-box';
import type { ClipPoint, HoleRect, TourSize } from './tour-internal.type';

const px = (value: number): string => `${Math.round(value * 10) / 10}px`;

const arc = (cx: number, cy: number, radius: number, from: number): ClipPoint[] =>
  Array.from({ length: CORNER_POINTS + 1 }, (_, step) => {
    const angle = from + (step / CORNER_POINTS) * QUARTER_TURN;
    return [cx + radius * Math.cos(angle), cy + radius * Math.sin(angle)];
  });

const outline = (hole: HoleRect): ClipPoint[] => {
  const { x, y, width, height, radius } = hole;
  const r = Math.max(0, Math.min(radius, width / 2, height / 2));
  return [
    ...arc(x + r, y + r, r, Math.PI),
    ...arc(x + width - r, y + r, r, Math.PI + QUARTER_TURN),
    ...arc(x + width - r, y + height - r, r, 0),
    ...arc(x + r, y + height - r, r, QUARTER_TURN),
  ];
};

const ring = (points: readonly ClipPoint[]): string => {
  const text = points.map(([x, y]) => `${px(x)} ${px(y)}`);
  return `${text.join(', ')}, ${text[0] ?? '0 0'}, 0 0`;
};

const overlap = (lit: readonly ClipPoint[], kept: HoleRect): ClipPoint[] => {
  const shared = clipToBox(lit, kept);
  const size = lit.length + 4;
  const last = shared.at(-1) ?? [kept.x, kept.y];
  return Array.from({ length: size }, (_, at) => shared[at] ?? last);
};

const holeClip = (hole: HoleRect | null, view: TourSize, kept: readonly HoleRect[] = []): string => {
  const lit = outline(hole ?? { x: view.width / 2, y: view.height / 2, width: 0, height: 0, radius: 0 });
  const extra = kept.flatMap((box) => [ring(outline(box)), ring(overlap(lit, box))]);
  return `polygon(evenodd, 0 0, 100% 0, 100% 100%, 0 100%, 0 0, ${[ring(lit), ...extra].join(', ')})`;
};

export { holeClip };
