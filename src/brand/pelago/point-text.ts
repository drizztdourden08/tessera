/* @layer renderer-components @kind logic */
import type { ScenePoint } from '../brand.type';

const round = (n: number): number => Number(n.toFixed(3));

const pointText = ([x, y]: ScenePoint, [ox, oy]: ScenePoint = [0, 0]): string => `${round(x - ox)} ${round(y - oy)}`;

export { pointText };
