/* @layer tooling-scripts @kind test */
import { describe, expect, it } from 'vitest';
import { joinPieces } from '../src/composites/DropdownMenu/behavior/join-pieces';
import { safeAreaStyle } from '../src/composites/DropdownMenu/behavior/safe-area-style';
import { subMenuJoin } from '../src/composites/DropdownMenu/behavior/sub-menu-join';

const base = {
  row: { top: 230, bottom: 260, left: 11, right: 209 },
  parent: { top: 100, bottom: 400, left: 10, right: 210 },
  parentCorners: { topLeft: 6, topRight: 6, bottomLeft: 6, bottomRight: 6 },
  width: 150, height: 100, lead: 5, line: 1, ring: 2, radius: 6, gap: 6, viewWidth: 1000, viewHeight: 800,
};
const atRow = (top, bottom) => ({ ...base, row: { ...base.row, top, bottom } });

describe('subMenuJoin', () => {
  const full = { corner: 6, fillet: 3 };
  const square = { corner: 0, fillet: 0 };

  it('lines the sub-menu up with the top of its parent when it reaches the row, and runs the tunnel up to that edge', () => {
    const join = subMenuJoin(atRow(130, 160));
    expect(join).toMatchObject({ side: 'right', align: 'top', top: 100, height: 100, left: 216, edgeOffset: 7, tunnelTop: 1, tunnelBottom: 60 });
    expect(join).toMatchObject({ rowTop: 30, rowBottom: 60 });
    expect(join.parentEnds).toEqual({ top: square, bottom: full });
    expect(join.ownEnds).toEqual({ top: square, bottom: full });
  });

  it('lines it up with the bottom of its parent when the top does not reach the row', () => {
    const join = subMenuJoin(atRow(340, 370));
    expect(join).toMatchObject({ align: 'bottom', top: 300, height: 100, tunnelTop: 40, tunnelBottom: 99 });
    expect(join.parentEnds).toEqual({ top: full, bottom: square });
    expect(join.ownEnds).toEqual({ top: full, bottom: square });
  });

  it('stretches a sub-menu that falls short of the row by less than a bend to keep the edge straight', () => {
    expect(subMenuJoin(atRow(300, 330))).toMatchObject({ align: 'bottom', top: 299, height: 101 });
    expect(subMenuJoin(atRow(185, 205))).toMatchObject({ align: 'top', top: 100, height: 106 });
  });

  it('sets it on the row with its first item level with the row when neither end lines up', () => {
    const join = subMenuJoin(base);
    expect(join).toMatchObject({ align: 'middle', top: 225, tunnelTop: 5, tunnelBottom: 35 });
    expect(join.parentEnds).toEqual({ top: full, bottom: full });
    expect(join.ownEnds.bottom).toEqual(full);
    expect(join.ownEnds.top.corner).toBeCloseTo(8 / 3);
    expect(join.ownEnds.top.fillet).toBeCloseTo(4 / 3);
  });

  it('shares the room between a corner and its fillet when the row sits near a parent end', () => {
    const near = { ...base, parent: { ...base.parent, top: 225, bottom: 340 }, viewHeight: 320 };
    expect(subMenuJoin(near)).toMatchObject({ align: 'middle', top: 212 });
    expect(subMenuJoin(near).parentEnds.top.fillet).toBeCloseTo(4 / 3);
    expect(subMenuJoin({ ...near, parent: { ...near.parent, top: 229 } }).parentEnds.top).toEqual(square);
  });

  it('moves up to stay on screen and keeps the tunnel on the row', () => {
    const join = subMenuJoin({ ...atRow(130, 160), viewHeight: 200 });
    expect(join).toMatchObject({ align: 'middle', top: 92, tunnelTop: 38, tunnelBottom: 68 });
    expect(join.ownEnds).toEqual({ top: full, bottom: full });
  });

  it('opens on the left without room on the right', () => {
    const nearEdge = { ...base, row: { ...base.row, left: 401, right: 599 }, parent: { ...base.parent, left: 400, right: 600 }, viewWidth: 700 };
    expect(subMenuJoin(nearEdge)).toMatchObject({ side: 'left', left: 244, edgeOffset: 7 });
  });
});

describe('joinPieces', () => {
  const piece = (pieces, key) => pieces.find((one) => one.key === key);

  it('runs the edge straight over both borders on a flush side and keeps the fillets on the other', () => {
    const pieces = joinPieces(subMenuJoin(atRow(130, 160)));
    expect(piece(pieces, 'edge-top').style).toEqual({ left: '-8px', width: '10px', top: '0px', height: '1px' });
    expect(piece(pieces, 'edge-bottom').style).toMatchObject({ left: '-6px', width: '6px', top: '60px' });
    expect(pieces.map((one) => one.key).filter((key) => key.includes('-top') && !key.startsWith('edge'))).toEqual(['halo-top']);
    expect(piece(pieces, 'body').style).toMatchObject({ top: '0px', height: '61px', '--tunnel-lit-top': '30px', '--tunnel-lit-height': '30px' });
  });
});

describe('safeAreaStyle', () => {
  const join = subMenuJoin(atRow(130, 160));

  const row = { top: 5, bottom: 35, edge: -7 };

  it('spans from the pointer to the sub-menu edge and leaves the row itself to the row', () => {
    expect(safeAreaStyle(join, row, -50, 20)).toEqual({
      left: '-50px', top: '0px', width: '50px', height: '100px',
      clipPath: 'polygon(37.5px 5px, 50px 0px, 50px 100px, 9.38px 35px, 43px 35px, 43px 5px)',
    });
  });

  it('is a plain triangle from the tunnel, and is gone once the pointer is over the sub-menu', () => {
    expect(safeAreaStyle(join, row, -4, 20)).toMatchObject({ left: '-4px', clipPath: 'polygon(0px 20px, 4px 0px, 4px 100px)' });
    expect(safeAreaStyle(join, row, 2, 20)).toBeNull();
  });
});
