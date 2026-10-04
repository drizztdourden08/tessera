/* @layer renderer-components @kind types */
interface JoinRect {
  top: number;
  bottom: number;
  left: number;
  right: number;
}

type JoinSide = 'right' | 'left';

type JoinAlign = 'top' | 'bottom' | 'middle';

interface JoinCorners {
  topLeft: number;
  topRight: number;
  bottomLeft: number;
  bottomRight: number;
}

interface JoinBend {
  corner: number;
  fillet: number;
}

interface JoinEnds {
  top: JoinBend;
  bottom: JoinBend;
}

interface SubMenuJoinInput {
  row: JoinRect;
  parent: JoinRect;
  parentCorners: JoinCorners;
  width: number;
  height: number;
  lead: number;
  line: number;
  ring: number;
  radius: number;
  gap: number;
  viewWidth: number;
  viewHeight: number;
}

interface JoinPlace {
  align: JoinAlign;
  top: number;
  height: number;
}

interface JoinSpan {
  tunnelTop: number;
  tunnelBottom: number;
}

interface SubMenuJoin {
  side: JoinSide;
  align: JoinAlign;
  top: number;
  left: number;
  width: number;
  height: number;
  rowOffset: number;
  edgeOffset: number;
  gap: number;
  rowTop: number;
  rowBottom: number;
  tunnelTop: number;
  tunnelBottom: number;
  parentEnds: JoinEnds;
  ownEnds: JoinEnds;
  line: number;
  ring: number;
}

export type { JoinAlign, JoinBend, JoinCorners, JoinEnds, JoinPlace, JoinRect, JoinSide, JoinSpan, SubMenuJoin, SubMenuJoinInput };
