/* @layer tooling-scripts @kind test */
import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { bubblePlace } from '../src/composites/GuidedTour/behavior/bubble-place';
import { mascotClear } from '../src/composites/GuidedTour/behavior/mascot-clear';
import { mascotSpot } from '../src/composites/GuidedTour/behavior/mascot-spot';
import { INTRO_MASCOT_BOX, MASCOT_BOX, MASCOT_CLEAR, MASCOT_GAP, RING_WIDTH } from '../src/composites/GuidedTour/GuidedTour.constants';

const VIEW = { width: 1000, height: 800 };
const SIZE = { width: 300, height: 150 };
const GAP = MASCOT_CLEAR + RING_WIDTH;
const box = (spot) => ({ x: spot.x - MASCOT_BOX.width / 2, y: spot.y, ...MASCOT_BOX });
const inView = (b, view) => b.x >= 0 && b.y >= 0 && b.x + b.width <= view.width && b.y + b.height <= view.height;
const outside = (b, h) =>
  Math.max(h.x - (b.x + b.width), b.x - (h.x + h.width), h.y - (b.y + b.height), b.y - (h.y + h.height)) >= MASCOT_CLEAR;
const insideClear = (b, h) =>
  b.x - h.x >= GAP && b.y - h.y >= GAP && h.x + h.width - (b.x + b.width) >= GAP && h.y + h.height - (b.y + b.height) >= GAP;
const clearOfRing = (b, h) => outside(b, h) || insideClear(b, h);
const apartFrom = (a, b) => a.x + a.width <= b.x || b.x + b.width <= a.x || a.y + a.height <= b.y || b.y + b.height <= a.y;

const filled = {
  'left edge': { x: 3, y: -8, width: 1010, height: 816 },
  'right edge': { x: -8, y: -8, width: 1005, height: 816 },
  'top edge': { x: -8, y: 5, width: 1016, height: 810 },
  'bottom edge': { x: -8, y: -8, width: 1016, height: 805 },
  'every edge': { x: 2, y: 2, width: 996, height: 796 },
  'past every edge': { x: -8, y: -8, width: 1016, height: 816 },
};

describe('the mascot keeps clear of the ring when the hole fills the view', () => {
  for (const [name, hole] of Object.entries(filled)) {
    for (const placement of ['bottom-start', 'top-end', 'left-center', 'right-start']) {
      it(`${name}, step asks ${placement}`, () => {
        const place = bubblePlace(hole, SIZE, VIEW, placement);
        const spot = mascotSpot({ bubble: place.box, hole }, VIEW, MASCOT_BOX, MASCOT_GAP);
        if (spot === null) return;
        expect(inView(box(spot), VIEW)).toBe(true);
        expect(clearOfRing(box(spot), hole)).toBe(true);
        expect(apartFrom(box(spot), place.box)).toBe(true);
      });
    }
  }

  it('shows the mascot inside the hole beside the bubble when the view is wide', () => {
    const hole = filled['past every edge'];
    const place = bubblePlace(hole, SIZE, VIEW, 'left-center');
    expect(place).toEqual({ side: 'inside', box: { x: 16, y: 634, ...SIZE } });
    const spot = mascotSpot({ bubble: place.box, hole }, VIEW, MASCOT_BOX, MASCOT_GAP);
    expect(spot).not.toBeNull();
    expect(insideClear(box(spot), hole)).toBe(true);
  });

  it('shifts the bubble right to make room when only its left side is free', () => {
    const view = { width: 460, height: 800 };
    const hole = { x: -8, y: -8, width: 466, height: 816 };
    const place = bubblePlace(hole, SIZE, view, 'bottom-start');
    expect(place.side).toBe('inside');
    expect(place.box.x).toBe(2 + MASCOT_BOX.width + MASCOT_GAP);
    const spot = mascotSpot({ bubble: place.box, hole }, view, MASCOT_BOX, MASCOT_GAP);
    expect(spot).not.toBeNull();
    expect(insideClear(box(spot), hole)).toBe(true);
  });

  it('hides the mascot when the view leaves no room for it', () => {
    const view = { width: 360, height: 300 };
    const hole = { x: -8, y: -8, width: 376, height: 316 };
    const place = bubblePlace(hole, SIZE, view, 'bottom-start');
    expect(mascotSpot({ bubble: place.box, hole }, view, MASCOT_BOX, MASCOT_GAP)).toBeNull();
  });

});

describe('the mascot stands outside the hole whenever it can', () => {
  const view = { width: 1280, height: 720 };
  const hole = { x: 304, y: 106, width: 922, height: 560 };
  const bubble = { x: 317, y: 478, width: 320, height: 175 };

  for (const [name, mascot] of [['small', MASCOT_BOX], ['large', INTRO_MASCOT_BOX]]) {
    it(`puts the ${name} mascot in the strip left of the hole though the bubble is inside`, () => {
      const spot = mascotSpot({ bubble, hole }, view, mascot, MASCOT_GAP);
      expect(spot).not.toBeNull();
      const at = { x: spot.x - mascot.width / 2, y: spot.y, ...mascot };
      expect(at.x).toBeGreaterThanOrEqual(0);
      expect(at.x + at.width).toBeLessThanOrEqual(hole.x - MASCOT_CLEAR - RING_WIDTH);
      expect(inView(at, view)).toBe(true);
      expect(spot.face).toBe('right');
    });
  }

  it('goes inside only when no outside stand fits and the bubble is inside', () => {
    const tight = { width: 400, height: 300 };
    const filledHole = { x: -8, y: -8, width: 416, height: 316 };
    const inside = { x: 200, y: 120, width: 180, height: 100 };
    const spot = mascotSpot({ bubble: inside, hole: filledHole }, tight, MASCOT_BOX, MASCOT_GAP);
    expect(spot).not.toBeNull();
    expect(insideClear(box(spot), filledHole)).toBe(true);
    const away = { x: 1000, y: 0, width: 180, height: 100 };
    expect(mascotSpot({ bubble: away, hole: filledHole }, tight, MASCOT_BOX, MASCOT_GAP)).toBeNull();
  });
});

describe('the clearance rule', () => {
  it('refuses a box that straddles the ring or sits closer than the clearance', () => {
    const hole = { x: 200, y: 200, width: 400, height: 300 };
    const inside = { x: 300, y: 350, width: 200, height: 100 };
    const beyond = { x: 650, y: 350, width: 200, height: 100 };
    expect(mascotClear({ x: 100, y: 250, width: 100 - GAP, height: 128 }, hole, inside)).toBe(true);
    expect(mascotClear({ x: 100, y: 250, width: 100 - GAP + 1, height: 128 }, hole, inside)).toBe(false);
    expect(mascotClear({ x: 150, y: 250, width: 128, height: 128 }, hole, inside)).toBe(false);
    expect(mascotClear({ x: 200 + GAP, y: 300, width: 128, height: 128 }, hole, inside)).toBe(true);
    expect(mascotClear({ x: 200 + GAP - 1, y: 300, width: 128, height: 128 }, hole, inside)).toBe(false);
    expect(mascotClear({ x: 150, y: 250, width: 128, height: 128 }, null, inside)).toBe(true);
    expect(mascotClear({ x: 300, y: 250, width: 128, height: 128 }, hole, inside)).toBe(true);
    expect(mascotClear({ x: 300, y: 250, width: 128, height: 128 }, hole, beyond)).toBe(false);
  });

  it('leaves the normal cases as they were', () => {
    const view = { width: 1000, height: 600 };
    const mascot = { width: 80, height: 80 };
    const bubble = { x: 400, y: 100, width: 300, height: 150 };
    expect(mascotSpot({ bubble, hole: { x: 800, y: 40, width: 50, height: 50 } }, view, mascot, 10)).toEqual({ x: 350, y: 170, face: 'right' });
    expect(mascotSpot({ bubble, hole: { x: 200, y: 40, width: 200, height: 400 } }, view, mascot, 10)).toEqual({ x: 750, y: 170, face: 'left' });
    expect(bubblePlace({ x: 100, y: 100, width: 200, height: 100 }, SIZE, VIEW, 'bottom-start')).toEqual({ side: 'bottom', box: { x: 100, y: 216, ...SIZE } });
  });

  it('takes the clearance from a token', () => {
    expect(MASCOT_CLEAR).toBe(8);
    expect(RING_WIDTH).toBe(2);
    const read = (path) => readFileSync(new URL(path, import.meta.url), 'utf8');
    expect(read('../src/tokens/size.css')).toContain('--tour-mascot-clear: var(--size-8);');
    expect(read('../src/tokens/border.css')).toContain('--border-width-thick: var(--size-2);');
  });
});
