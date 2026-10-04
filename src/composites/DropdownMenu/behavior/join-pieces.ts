/* @layer renderer-components @kind util */
import { joinPx } from './join-px';
import type { JoinPiece } from './join-piece.type';
import type { FilletKey } from './join-pieces.type';
import type { JoinBend, SubMenuJoin } from './sub-menu-join.type';

const openDepth = (radius: number, line: number): number => Math.sqrt((radius + 1.5 * line) ** 2 - (radius + line) ** 2);

const fillet = (key: FilletKey, radius: number, line: number, at: [left: number, top: number]): JoinPiece[] => (radius <= 0 ? [] : [{
  key,
  className: `dropdown__tunnel-fillet dropdown__tunnel-fillet--${key}`,
  style: { left: joinPx(at[0]), top: joinPx(at[1]), '--tunnel-fillet': joinPx(radius), '--tunnel-open': joinPx(openDepth(radius, line)) },
}]);

const halo = (key: string, left: number, width: number, top: number): JoinPiece[] => (width <= 0 ? [] : [{
  key,
  className: 'dropdown__tunnel-halo',
  style: { left: joinPx(left), width: joinPx(width), top: joinPx(top) },
}]);

const flush = (bend: JoinBend): boolean => bend.corner === 0 && bend.fillet === 0;

const edge = (key: string, join: SubMenuJoin, ends: [parent: JoinBend, own: JoinBend], top: number): JoinPiece => {
  const { gap, line } = join;
  const left = flush(ends[0]) ? -gap - 2 * line : -gap;
  const right = flush(ends[1]) ? 2 * line : 0;
  return { key, className: 'dropdown__tunnel-edge', style: { left: joinPx(left), width: joinPx(right - left), top: joinPx(top), height: joinPx(line) } };
};

const joinPieces = (join: SubMenuJoin): JoinPiece[] => {
  const { gap, line, ring, rowTop, rowBottom, tunnelTop, tunnelBottom, parentEnds, ownEnds } = join;
  const reach = (radius: number): number => Math.max(ring, radius);
  const body: JoinPiece = {
    key: 'body',
    className: 'dropdown__tunnel-body',
    style: {
      left: joinPx(-gap - 2 * line),
      width: joinPx(gap + 4 * line),
      top: joinPx(tunnelTop - line),
      height: joinPx(tunnelBottom - tunnelTop + 2 * line),
      '--tunnel-lit-top': joinPx(rowTop - tunnelTop + line),
      '--tunnel-lit-height': joinPx(rowBottom - rowTop),
    },
  };
  return [
    body,
    edge('edge-top', join, [parentEnds.top, ownEnds.top], tunnelTop - line),
    edge('edge-bottom', join, [parentEnds.bottom, ownEnds.bottom], tunnelBottom),
    ...halo('halo-top', reach(parentEnds.top.fillet) - gap, gap - reach(parentEnds.top.fillet) - reach(ownEnds.top.fillet), tunnelTop - line - ring),
    ...halo('halo-bottom', reach(parentEnds.bottom.fillet) - gap, gap - reach(parentEnds.bottom.fillet) - reach(ownEnds.bottom.fillet), tunnelBottom + line),
    ...fillet('parent-top', parentEnds.top.fillet, line, [-gap - 2 * line, tunnelTop - line - parentEnds.top.fillet]),
    ...fillet('own-top', ownEnds.top.fillet, line, [-ownEnds.top.fillet, tunnelTop - line - ownEnds.top.fillet]),
    ...fillet('parent-bottom', parentEnds.bottom.fillet, line, [-gap - 2 * line, tunnelBottom]),
    ...fillet('own-bottom', ownEnds.bottom.fillet, line, [-ownEnds.bottom.fillet, tunnelBottom]),
  ];
};

export { joinPieces };
