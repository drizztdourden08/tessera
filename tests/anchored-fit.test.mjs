/* @layer tooling-scripts @kind test */
import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { fitAxis } from '../src/primitives/Anchored/behavior/fit-axis';
import { fitInView } from '../src/primitives/Anchored/behavior/fit-in-view';

const VIEW = { width: 1000, height: 800 };
const MARGIN = 4;
const box = (left, top, width, height) => ({ left, top, right: left + width, bottom: top + height });

describe('fitAxis', () => {
  it('leaves a popup that fits where it is', () => {
    expect(fitAxis({ lo: 100, hi: 300 }, { lo: 100, hi: 160 }, 1000, MARGIN)).toBe(0);
    expect(fitAxis({ lo: MARGIN, hi: 996 }, { lo: 0, hi: 10 }, 1000, MARGIN)).toBe(0);
  });

  it('flips to the other side of the anchor at the end edge when that side fits', () => {
    expect(fitAxis({ lo: 900, hi: 1100 }, { lo: 900, hi: 960 }, 1000, MARGIN)).toBe(-140);
  });

  it('flips to the other side of the anchor at the start edge when that side fits', () => {
    expect(fitAxis({ lo: -80, hi: 120 }, { lo: 40, hi: 100 }, 1000, MARGIN)).toBe(100);
  });

  it('clamps against the end edge when neither side fits', () => {
    expect(fitAxis({ lo: 600, hi: 1100 }, { lo: 300, hi: 360 }, 1000, MARGIN)).toBe(-104);
  });

  it('clamps against the start edge when neither side fits', () => {
    expect(fitAxis({ lo: -50, hi: 450 }, { lo: 20, hi: 60 }, 700, MARGIN)).toBe(MARGIN + 50);
  });

  it('pins a popup larger than the room to the start margin', () => {
    expect(fitAxis({ lo: 100, hi: 1300 }, { lo: 100, hi: 160 }, 1000, MARGIN)).toBe(MARGIN - 100);
  });
});

describe('fitInView', () => {
  const anchor = box(900, 100, 60, 30);

  it('moves a menu below a button near the right edge so it ends on the button', () => {
    const popup = box(900, 130, 300, 200);
    const shift = fitInView(popup, anchor, VIEW, MARGIN);
    expect(popup.left + shift.x).toBe(660);
    expect(shift.y).toBe(0);
  });

  it('flips a menu that runs off the bottom to sit above its button', () => {
    const low = box(100, 760, 120, 30);
    const popup = box(100, 790, 200, 300);
    const shift = fitInView(popup, low, VIEW, MARGIN);
    expect(popup.bottom + shift.y).toBe(low.top);
    expect(shift.x).toBe(0);
  });

  it('flips a menu that runs off the top to sit below its button', () => {
    const high = box(100, 20, 120, 30);
    const popup = box(100, -280, 200, 300);
    const shift = fitInView(popup, high, VIEW, MARGIN);
    expect(popup.top + shift.y).toBe(high.bottom);
  });

  it('flips a menu beside a button on the right edge to its left side', () => {
    const rail = box(960, 200, 30, 30);
    const popup = box(990, 200, 200, 100);
    const shift = fitInView(popup, rail, VIEW, MARGIN);
    expect(popup.right + shift.x).toBe(rail.left);
  });

  it('flips a menu beside a button on the left edge to its right side', () => {
    const rail = box(4, 200, 30, 30);
    const popup = box(-196, 200, 200, 100);
    const shift = fitInView(popup, rail, VIEW, MARGIN);
    expect(popup.left + shift.x).toBe(rail.right);
  });

  it('clamps in both axes when no flip fits', () => {
    const small = { width: 300, height: 200 };
    const near = box(150, 100, 20, 20);
    const popup = box(150, 120, 280, 180);
    const shift = fitInView(popup, near, small, MARGIN);
    expect(popup.left + shift.x).toBeGreaterThanOrEqual(MARGIN);
    expect(popup.right + shift.x).toBeLessThanOrEqual(small.width - MARGIN);
    expect(popup.top + shift.y).toBeGreaterThanOrEqual(MARGIN);
    expect(popup.bottom + shift.y).toBeLessThanOrEqual(small.height - MARGIN);
  });
});

describe('fitInView for a menu beside a toolbar button', () => {
  it.each([
    ['left', box(36, 520, 32, 32), box(68, 520, 380, 500)],
    ['right', box(932, 520, 32, 32), box(552, 520, 380, 500)],
  ])('keeps a menu beside a %s toolbar button starting at the top of the button when it fits below', (_side, button, popup) => {
    expect(fitInView(popup, button, { width: 1000, height: 1038 }, MARGIN)).toEqual({ x: 0, y: 0 });
  });

  it('flips a side menu to end on its button only when it does not fit below', () => {
    const button = box(36, 520, 32, 32);
    const popup = box(68, 520, 380, 500);
    const shift = fitInView(popup, button, { width: 1000, height: 978 }, MARGIN);
    expect(popup.bottom + shift.y).toBe(button.bottom);
  });
});

describe('Anchored margin in CSS', () => {
  const css = readFileSync(new URL('../src/primitives/Anchored/Anchored.css', import.meta.url), 'utf8');

  it('gives the native popup a pin that keeps it inside the view after the flips', () => {
    expect(css).toContain('@position-try --anchored-pin-inline');
    expect(css).toContain('--anchored-pin-inline, flip-block --anchored-pin-inline');
    expect(css).toContain('--anchored-margin: var(--space-xs)');
  });

  it('applies the measured shift to the fallback popup', () => {
    expect(css).toContain('translate: var(--anchored-shift-x, 0%) var(--anchored-shift-y, 0%)');
  });
});
