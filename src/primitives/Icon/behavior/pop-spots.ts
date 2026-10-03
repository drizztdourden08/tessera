/* @layer renderer-components @kind logic */
import { ICON_EFFECT } from '../sub-components/IconEffectHost.constants';
import type { IconEffectKind } from '../Icon.type';
import type { PopSpot, SamplePoint } from '../sub-components/IconEffectHost.type';

const trailFrom = (points: readonly SamplePoint[], at: number, from: SamplePoint): string => {
  const same = (point: SamplePoint) => point.shape === from.shape;
  const ahead = points.slice(at, at + ICON_EFFECT.trail).filter(same);
  const behind = ahead.length > 1 ? [] : points.slice(Math.max(0, at - ICON_EFFECT.trail + 1), at).filter(same);
  return [...behind, ...ahead].map((point) => `${point.x},${point.y}`).join(' ');
};

const pickIndexes = (size: number, count: number, random: () => number): number[] => {
  const picked = new Set<number>();
  const wanted = Math.min(count, size);
  for (let tries = 0; picked.size < wanted && tries < wanted * 8; tries += 1) {
    picked.add(Math.min(size - 1, Math.floor(random() * size)));
  }
  return [...picked];
};

const popSpots = (points: readonly SamplePoint[], kind: IconEffectKind, count: number, random: () => number): PopSpot[] =>
  pickIndexes(points.length, count, random).flatMap((at) => {
    const point = points[at];
    if (!point) return [];
    return [{ x: point.x, y: point.y, trail: kind === 'shimmer' ? trailFrom(points, at, point) : '' }];
  });

export { popSpots };
