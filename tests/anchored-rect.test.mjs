/* @layer tooling-scripts @kind test */
import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { anchoredFallback } from '../src/primitives/Anchored/behavior/anchored-fallback';
import { boxOf } from '../src/primitives/Anchored/behavior/box-of';
import { rectOf } from '../src/primitives/Anchored/behavior/rect-of';
import { fitInBox } from '../src/primitives/Anchored/behavior/fit-in-box';
import { sourceKey } from '../src/primitives/Anchored/behavior/source-key';

const VIEW = { innerWidth: 1000, innerHeight: 800 };
const RECT = { left: 200, top: 100, width: 100, height: 30 };
const box = (left, top, width, height) => ({ left, top, right: left + width, bottom: top + height });

describe('Anchored anchorRect', () => {
  it('reads a rect, or the rect a function gives, and nothing for no source', () => {
    expect(rectOf(RECT)).toBe(RECT);
    expect(rectOf(() => RECT)).toBe(RECT);
    expect(rectOf(() => null)).toBeNull();
    expect(rectOf(undefined)).toBeNull();
  });

  it('turns the rect into the box of an element', () => {
    expect(boxOf(RECT)).toMatchObject({ left: 200, top: 100, right: 300, bottom: 130, width: 100, height: 30 });
  });

  it('places the popup around the rect as it does around an element', () => {
    expect(anchoredFallback(null, boxOf(RECT), VIEW, 'bottom-start')).toEqual({ top: 130, left: 200 });
    expect(anchoredFallback(null, boxOf(RECT), VIEW, 'top-center')).toEqual({ bottom: 700, left: 250 });
    expect(anchoredFallback(null, boxOf(RECT), VIEW, 'right-start')).toEqual({ top: 100, left: 300 });
  });

  it('keys a rect by its numbers and a function by its kind, so a new function does not measure again', () => {
    expect(sourceKey(RECT)).toBe('200,100,100,30');
    expect(sourceKey(() => RECT)).toBe(sourceKey(() => null));
    expect(sourceKey(undefined)).toBe('');
  });
});

describe('Anchored boundary', () => {
  const bounds = box(100, 50, 400, 300);

  it('leaves a popup that sits inside the boundary', () => {
    expect(fitInBox(box(150, 100, 120, 40), box(150, 60, 60, 30), bounds, 4)).toEqual({ x: 0, y: 0 });
  });

  it('slides a popup back in when it runs past the end of the boundary', () => {
    const shift = fitInBox(box(450, 100, 120, 40), box(450, 60, 20, 30), bounds, 4);
    expect(450 + shift.x + 120).toBeLessThanOrEqual(500 - 4);
    expect(450 + shift.x).toBeGreaterThanOrEqual(100 + 4);
  });

  it('measures from the boundary, not from the window', () => {
    const shift = fitInBox(box(90, 100, 100, 40), box(110, 60, 20, 30), bounds, 4);
    expect(90 + shift.x).toBeGreaterThanOrEqual(100 + 4);
  });

  it('takes the boundary through the type and the fallback markup', () => {
    const type = readFileSync(new URL('../src/primitives/Anchored/Anchored.type.ts', import.meta.url), 'utf8');
    expect(type).toContain('anchorRect?: AnchoredRectSource;');
    expect(type).toContain('boundary?: RefObject<HTMLElement | null>;');
  });
});
