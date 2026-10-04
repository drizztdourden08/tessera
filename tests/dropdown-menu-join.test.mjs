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

  it('sets its top edge level with the open row, flat into the sub-menu on top and curved below', () => {
    const join = subMenuJoin(base);
    expect(join).toMatchObject({ side: 'right', align: 'top', top: 230, height: 100, left: 216, edgeOffset: 7, tunnelTop: 1, tunnelBottom: 30 });
    expect(join).toMatchObject({ rowTop: 0, rowBottom: 30 });
    expect(join.parentEnds).toEqual({ top: full, bottom: full });
    expect(join.ownEnds).toEqual({ top: square, bottom: full });
  });

  it('keeps a gap to the parent at every row: it never lines up with the own edges of the parent menu', () => {
    const first = subMenuJoin(atRow(105, 135));
    expect(first).toMatchObject({ align: 'top', top: 105 });
    expect(first.top).toBeGreaterThan(base.parent.top);
  });

  it('sets its bottom edge level with the open row when there is no room below', () => {
    const join = subMenuJoin({ ...base, viewHeight: 300 });
    expect(join).toMatchObject({ align: 'bottom', top: 160, height: 100, tunnelTop: 70, tunnelBottom: 99 });
    expect(join.parentEnds).toEqual({ top: full, bottom: full });
    expect(join.ownEnds).toEqual({ top: full, bottom: square });
  });

  it('sits on the row, curved on both sides, only when neither fits', () => {
    const join = subMenuJoin({ ...base, height: 260, viewHeight: 340 });
    expect(join).toMatchObject({ align: 'middle', top: 72, tunnelTop: 158, tunnelBottom: 188 });
    expect(join.parentEnds).toEqual({ top: full, bottom: full });
    expect(join.ownEnds).toEqual({ top: full, bottom: full });
  });

  it('shares the room between the parent corner and its fillet when the row is the first row of the parent', () => {
    const near = subMenuJoin({ ...base, parent: { ...base.parent, top: 225 } });
    expect(near.parentEnds.top.corner).toBeCloseTo(10 / 3);
    expect(near.parentEnds.top.fillet).toBeCloseTo(5 / 3);
    expect(subMenuJoin({ ...base, parent: { ...base.parent, top: 229.6 } }).parentEnds.top).toEqual(square);
  });

  it('opens on the left without room on the right', () => {
    const nearEdge = { ...base, row: { ...base.row, left: 401, right: 599 }, parent: { ...base.parent, left: 400, right: 600 }, viewWidth: 700 };
    expect(subMenuJoin(nearEdge)).toMatchObject({ side: 'left', left: 244, edgeOffset: 7 });
  });
});

describe('joinPieces', () => {
  const piece = (pieces, key) => pieces.find((one) => one.key === key);

  it('runs the flat edge straight into the border of the sub-menu and keeps the curve of the parent', () => {
    const pieces = joinPieces(subMenuJoin(atRow(130, 160)));
    expect(piece(pieces, 'edge-top').style).toEqual({ left: '-6px', width: '8px', top: '0px', height: '1px' });
    expect(piece(pieces, 'edge-bottom').style).toMatchObject({ left: '-6px', width: '6px', top: '30px' });
    expect(pieces.map((one) => one.key).filter((key) => key.endsWith('-top') && !key.startsWith('edge'))).toEqual(['halo-top', 'parent-top']);
    expect(piece(pieces, 'body').style).toMatchObject({ top: '0px', height: '31px', '--tunnel-lit-top': '0px', '--tunnel-lit-height': '30px' });
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
