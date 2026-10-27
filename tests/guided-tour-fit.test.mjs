/* @layer tooling-scripts @kind test */
import { readFileSync } from 'node:fs';
import { createElement as h, createRef } from 'react';
import { renderToString } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { bubblePlace } from '../src/composites/GuidedTour/behavior/bubble-place';
import { mascotSpot } from '../src/composites/GuidedTour/behavior/mascot-spot';
import { TourSpotlight } from '../src/composites/GuidedTour/sub-components/TourSpotlight';
import { anchoredFallback } from '../src/primitives/Anchored/behavior/anchored-fallback';

const VIEW = { width: 1000, height: 800 };
const SIZE = { width: 300, height: 150 };
const inView = ({ x, y, width, height }) => x >= 12 && y >= 12 && x + width <= VIEW.width - 12 && y + height <= VIEW.height - 12;
const overlaps = (a, b) => a.x < b.x + b.width && b.x < a.x + a.width && a.y < b.y + b.height && b.y < a.y + a.height;
const read = (path) => readFileSync(new URL(path, import.meta.url), 'utf8');

describe('Anchored on the left and centred beside its anchor', () => {
  const rect = { top: 100, bottom: 130, left: 200, right: 300, width: 100, height: 30 };
  const view = { innerWidth: 1000, innerHeight: 800 };

  it('places the fallback on the left, and centres a side placement on the anchor', () => {
    expect(anchoredFallback(null, rect, view, 'left-start')).toEqual({ top: 100, right: 800 });
    expect(anchoredFallback(null, rect, view, 'left-center')).toEqual({ top: 115, right: 800 });
    expect(anchoredFallback(null, rect, view, 'right-center')).toEqual({ top: 115, left: 300 });
  });

  it('anchors the native popup to the left edge and flips across first', () => {
    const css = read('../src/primitives/Anchored/Anchored.css');
    expect(css).toContain(".anchored[data-anchor-place^='left'] {\n  right: anchor(left);\n  left: auto;");
    expect(css).toContain(".anchored[data-flip][data-anchor-place^='left'] {\n  position-try-fallbacks: flip-inline,");
    expect(css).toContain(".anchored-fallback[data-anchor-place='left-center'] {\n  translate: var(--anchored-shift-x, 0%) calc(-50% + var(--anchored-shift-y, 0%));");
  });
});

describe('the bubble always fits the window', () => {
  it('takes the side the step asks for when it fits', () => {
    const place = bubblePlace({ x: 100, y: 100, width: 200, height: 100 }, SIZE, VIEW, 'bottom-start');
    expect(place).toEqual({ side: 'bottom', box: { x: 100, y: 216, ...SIZE } });
  });

  it('flips to the side that fits for a tall or wide target', () => {
    const docked = { x: 700, y: 0, width: 300, height: 800 };
    expect(bubblePlace(docked, SIZE, VIEW, 'bottom-end').side).toBe('left');
    expect(bubblePlace(docked, SIZE, VIEW, 'right-start').side).toBe('left');
    const low = { x: 100, y: 600, width: 800, height: 150 };
    expect(bubblePlace(low, SIZE, VIEW, 'bottom-start')).toMatchObject({ side: 'top', box: { y: 434 } });
  });

  it('keeps the bubble inside the window on the cross side', () => {
    const edge = { x: 900, y: 100, width: 90, height: 40 };
    const place = bubblePlace(edge, SIZE, VIEW, 'bottom-start');
    expect(place.side).toBe('bottom');
    expect(inView(place.box)).toBe(true);
  });

  it('pins the bubble inside the hole, near its foot, when no side fits', () => {
    const card = { x: -8, y: -8, width: 1016, height: 816 };
    const place = bubblePlace(card, SIZE, VIEW, 'left-center');
    expect(place.side).toBe('inside');
    expect(place.box).toEqual({ x: 16, y: 634, ...SIZE });
    expect(inView(place.box)).toBe(true);
  });
});

describe('the mascot stays off the lit part', () => {
  const box = { width: 80, height: 80 };

  it('keeps clear of the ring in a large hole, outside it or inside with room to spare', () => {
    const hole = { x: 0, y: 0, width: 700, height: 800 };
    const bubble = { x: 16, y: 600, width: 300, height: 150 };
    const spot = mascotSpot({ bubble, hole }, VIEW, box, 10);
    expect(spot).not.toBeNull();
    const mascot = { x: spot.x - 40, y: spot.y, ...box };
    const roomy = mascot.x >= 10 && mascot.y >= 10 && mascot.x + 80 <= 690 && mascot.y + 80 <= 790;
    expect(roomy || !overlaps(mascot, hole)).toBe(true);
  });

  it('stays hidden when the hole leaves no room at all', () => {
    const small = { width: 200, height: 200 };
    const hole = { x: 0, y: 0, width: 200, height: 200 };
    expect(mascotSpot({ bubble: { x: 16, y: 34, width: 168, height: 150 }, hole }, small, box, 10)).toBeNull();
  });
});

describe('the ring over a kept part', () => {
  it('draws the ring and the bubble in the top layer, so a kept part lifted above the tour never covers the glow', () => {
    const spot = { hole: { x: 0, y: 0, width: 1000, height: 40, radius: 12 }, kept: [], view: VIEW, ringRef: createRef() };
    const ring = renderToString(h(TourSpotlight, { spot }));
    expect(ring).toMatch(/<div popover="manual" class="tour-spotlight__ring"/);
    const css = read('../src/composites/GuidedTour/sub-components/TourSpotlight.css');
    const rule = css.slice(css.indexOf('.tour-spotlight__ring {'), css.indexOf('}', css.indexOf('.tour-spotlight__ring {')));
    expect(rule).toContain('pointer-events: none;');
    expect(rule).toContain('background: none;');
    expect(read('../src/composites/GuidedTour/sub-components/TourBubble.tsx')).toContain('popover="manual"');
  });
});
