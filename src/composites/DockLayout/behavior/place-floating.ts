/* @layer renderer-components @kind logic */
import { GAP, MAX_PUSHES } from '../DockLayout.constants';
import type { Rect } from '../DockLayout.type';
import { clampInto } from './clamp-into';

const overlaps = (a: Rect, b: Rect): boolean =>
  a.x < b.x + b.width && b.x < a.x + a.width && a.y < b.y + b.height && b.y < a.y + a.height;

const inside = (r: Rect, area: Rect): boolean =>
  r.x >= area.x && r.y >= area.y && r.x + r.width <= area.x + area.width && r.y + r.height <= area.y + area.height;

const pushOff = (r: Rect, hit: Rect, area: Rect): Rect | null => {
  const moves: [number, number][] = [
    [hit.x - r.width - GAP - r.x, 0],
    [hit.x + hit.width + GAP - r.x, 0],
    [0, hit.y - r.height - GAP - r.y],
    [0, hit.y + hit.height + GAP - r.y],
  ];
  moves.sort((a, b) => Math.hypot(a[0], a[1]) - Math.hypot(b[0], b[1]));
  const move = moves.find(([dx, dy]) => inside({ ...r, x: r.x + dx, y: r.y + dy }, area));
  return move ? { ...r, x: r.x + move[0], y: r.y + move[1] } : null;
};

const placeFloating = (area: Rect, others: readonly Rect[], wanted: Rect): Rect | null => {
  let r: Rect | null = clampInto(wanted, area);
  for (let pass = 0; pass < MAX_PUSHES && r; pass++) {
    const current: Rect = r;
    const hit = others.find((o) => overlaps(current, o));
    if (!hit) return current;
    r = pushOff(current, hit, area);
  }
  const placed = r;
  return placed && !others.some((o) => overlaps(placed, o)) ? placed : null;
};

export { placeFloating };
