/* @layer renderer-components @kind util */
import type { CSSProperties } from 'react';
import { joinClipPath } from './join-clip-path';
import { joinPx } from './join-px';
import type { SubMenuJoin } from './sub-menu-join.type';

const placeStyle = (join: SubMenuJoin): CSSProperties => {
  const top = `calc(anchor(top) + ${joinPx(join.rowOffset)})`;
  if (join.side === 'right') return { top, left: `calc(anchor(right) + ${joinPx(join.edgeOffset)})` };
  return { top, left: 'auto', right: `calc(anchor(left) + ${joinPx(join.edgeOffset)})` };
};

const cornerStyle = (join: SubMenuJoin): CSSProperties => {
  const top = join.topEnd === 'outside' ? undefined : 0;
  const bottom = join.bottomEnd === 'outside' ? undefined : 0;
  return join.side === 'right'
    ? { borderTopLeftRadius: top, borderBottomLeftRadius: bottom }
    : { borderTopRightRadius: top, borderBottomRightRadius: bottom };
};

const joinStyle = (join: SubMenuJoin, native: boolean): CSSProperties => ({
  ...(native ? placeStyle(join) : {}),
  ...cornerStyle(join),
  minHeight: joinPx(join.height),
  clipPath: joinClipPath(join),
});

export { joinStyle };
