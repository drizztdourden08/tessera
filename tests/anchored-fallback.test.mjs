/* @layer tooling-scripts @kind test */
import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { anchoredFallback } from '../src/primitives/Anchored/behavior/anchored-fallback';

const VIEW = { innerWidth: 1000, innerHeight: 800 };
const RECT = { top: 100, bottom: 130, left: 200, right: 300, width: 100, height: 30 };
const zoomed = (zoom) => ({ currentCSSZoom: zoom });

describe('anchoredFallback', () => {
  it('places the popup on each side of its anchor, as the CSS anchors do', () => {
    expect(anchoredFallback(null, RECT, VIEW, 'bottom-start')).toEqual({ top: 130, left: 200 });
    expect(anchoredFallback(null, RECT, VIEW, 'bottom-end')).toEqual({ top: 130, right: 700 });
    expect(anchoredFallback(null, RECT, VIEW, 'top-start')).toEqual({ bottom: 700, left: 200 });
    expect(anchoredFallback(null, RECT, VIEW, 'top-center')).toEqual({ bottom: 700, left: 250 });
    expect(anchoredFallback(null, RECT, VIEW, 'right-start')).toEqual({ top: 100, left: 300 });
  });

  it('divides by the CSS zoom of the anchor', () => {
    expect(anchoredFallback(zoomed(2), RECT, VIEW, 'bottom-end')).toEqual({ top: 65, right: 350 });
  });

  it('keeps the gap and the centring of the native popup in the CSS of the fallback', () => {
    const css = readFileSync(new URL('../src/primitives/Anchored/Anchored.css', import.meta.url), 'utf8');
    expect(css).toContain(".anchored-fallback[data-anchor-place^='bottom'] {\n  margin-top: var(--anchored-gap, 0);");
    expect(css).toContain(".anchored-fallback[data-anchor-place$='-center'] {\n  translate: -50% 0;");
  });
});
