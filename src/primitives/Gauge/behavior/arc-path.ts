/* @layer renderer-components @kind logic */
import type { ArcCircle } from './arc-path.type';

const round = (value: number): number => Math.round(value * 100) / 100;

const pointAt = (circle: ArcCircle, degrees: number): string => {
  const radians = (degrees * Math.PI) / 180;
  return `${round(circle.x + circle.radius * Math.cos(radians))} ${round(circle.y + circle.radius * Math.sin(radians))}`;
};

const arcPath = (circle: ArcCircle, startDegrees: number, endDegrees: number): string => {
  const sweep = endDegrees - startDegrees;
  const large = Math.abs(sweep) > 180 ? 1 : 0;
  const clockwise = sweep >= 0 ? 1 : 0;
  return `M${pointAt(circle, startDegrees)} A${circle.radius} ${circle.radius} 0 ${large} ${clockwise} ${pointAt(circle, endDegrees)}`;
};

export { arcPath };
