/* @layer renderer-components @kind logic */
import type { ScenePieceNode, ScenePoint } from '../brand.type';
import { turnPoint } from './turn-point';

const rightmost = (p: ScenePieceNode): number => {
  const pivot: ScenePoint = [p.left + p.originX, p.top + p.originY];
  const corners: ScenePoint[] = [[p.left, p.top], [p.left + p.width, p.top], [p.left, p.top + p.height], [p.left + p.width, p.top + p.height]];
  return Math.max(...corners.map((c) => turnPoint(c, pivot, p.angle)[0]));
};

export { rightmost };
