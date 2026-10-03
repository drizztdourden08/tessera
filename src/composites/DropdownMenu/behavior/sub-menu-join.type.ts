/* @layer renderer-components @kind types */
interface JoinRect {
  top: number;
  bottom: number;
  left: number;
  right: number;
}

type JoinEnd = 'inside' | 'outside' | 'flush';

type JoinSide = 'right' | 'left';

interface SubMenuJoinInput {
  row: JoinRect;
  parent: JoinRect;
  width: number;
  height: number;
  lead: number;
  line: number;
  ring: number;
  radius: number;
  viewWidth: number;
  viewHeight: number;
}

interface SubMenuJoin {
  side: JoinSide;
  top: number;
  left: number;
  width: number;
  height: number;
  rowOffset: number;
  edgeOffset: number;
  topEnd: JoinEnd;
  bottomEnd: JoinEnd;
  parentTop: number;
  parentBottom: number;
  line: number;
  ring: number;
  radius: number;
}

export type { JoinEnd, JoinSide, SubMenuJoin, SubMenuJoinInput };
