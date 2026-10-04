/* @layer renderer-components @kind util */
import type { CSSProperties } from 'react';
import { joinPx } from './join-px';
import type { JoinPanelStyle } from './join-style.type';
import type { SubMenuJoin } from './sub-menu-join.type';

const placeStyle = (join: SubMenuJoin): CSSProperties => {
  const top = `calc(anchor(top) + ${joinPx(join.rowOffset)})`;
  if (join.side === 'right') return { top, left: `calc(anchor(right) + ${joinPx(join.edgeOffset)})` };
  return { top, left: 'auto', right: `calc(anchor(left) + ${joinPx(join.edgeOffset)})` };
};

const cornerStyle = (join: SubMenuJoin): CSSProperties => {
  const top = joinPx(join.ownEnds.top.corner);
  const bottom = joinPx(join.ownEnds.bottom.corner);
  return join.side === 'right'
    ? { borderTopLeftRadius: top, borderBottomLeftRadius: bottom }
    : { borderTopRightRadius: top, borderBottomRightRadius: bottom };
};

const joinStyle = (join: SubMenuJoin, native: boolean): JoinPanelStyle => ({
  ...(native ? placeStyle(join) : {}),
  ...cornerStyle(join),
  minHeight: joinPx(join.height),
  '--menu-line': joinPx(join.line),
});

export { joinStyle };
