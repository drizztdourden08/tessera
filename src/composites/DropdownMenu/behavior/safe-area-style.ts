/* @layer renderer-components @kind util */
import type { CSSProperties } from 'react';
import { clampNumber } from '../../../primitives/value-rule/clamp-number';
import { joinPx } from './join-px';
import type { SafeAreaRow } from './safe-area-row.type';
import type { SubMenuJoin } from './sub-menu-join.type';

const crossAt = (x: number, y: number, toY: number, atY: number): number => (toY === y ? x : x - x * ((atY - y) / (toY - y)));

const safeAreaStyle = (join: SubMenuJoin, row: SafeAreaRow, pointerX: number, pointerY: number): CSSProperties | null => {
  if (pointerX >= 0) return null;
  const { height } = join;
  const y = clampNumber(pointerY, row.top, row.bottom);
  const inRow = pointerX < row.edge;
  const points: Array<[number, number]> = inRow
    ? [[crossAt(pointerX, y, 0, row.top), row.top], [0, 0], [0, height], [crossAt(pointerX, y, height, row.bottom), row.bottom], [row.edge, row.bottom], [row.edge, row.top]]
    : [[pointerX, y], [0, 0], [0, height]];
  const polygon = points.map(([x, top]) => `${joinPx(x - pointerX)} ${joinPx(top)}`).join(', ');
  return { left: joinPx(pointerX), top: '0px', width: joinPx(-pointerX), height: joinPx(height), clipPath: `polygon(${polygon})` };
};

export { safeAreaStyle };
