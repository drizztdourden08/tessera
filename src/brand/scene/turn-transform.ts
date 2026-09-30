/* @layer renderer-components @kind logic */
import type { SceneTurn } from '../brand.type';
import { PRECISION } from './scene.constants';

const num = (n: number): string => String(Number(n.toFixed(PRECISION)));

const turnTransform = (turn: SceneTurn): string | undefined => {
  const parts = [
    turn.left !== 0 || turn.top !== 0 ? `translate(${num(turn.left)} ${num(turn.top)})` : '',
    turn.angle !== 0 ? `rotate(${num(turn.angle)} ${num(turn.originX)} ${num(turn.originY)})` : '',
  ].filter(Boolean);
  return parts.length > 0 ? parts.join(' ') : undefined;
};

export { turnTransform };
