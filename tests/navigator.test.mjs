/* @layer tooling-scripts @kind test */
import { createElement as h } from 'react';
import { renderToString } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { Navigator } from '../src/composites/Navigator';
import { centreViewport } from '../src/composites/Navigator/behavior/centre-viewport';
import { keyMove } from '../src/composites/Navigator/behavior/key-move';
import { moveViewport } from '../src/composites/Navigator/behavior/move-viewport';
import { viewportBoxOf } from '../src/composites/Navigator/behavior/viewport-box-of';
import { viewportPercent } from '../src/composites/Navigator/behavior/viewport-percent';
import { viewportText } from '../src/composites/Navigator/behavior/viewport-text';
import { NAVIGATION_STRINGS } from '../src/primitives/strings/navigation-strings.constants';

const SURFACE = { width: 400, height: 200 };
const VIEW = { x: 100, y: 50, width: 100, height: 50 };
const ignore = () => undefined;

describe('Navigator movement', () => {
  it('moves the frame by a distance in surface units', () => {
    expect(moveViewport(VIEW, SURFACE, 30, -20)).toEqual({ x: 130, y: 30, width: 100, height: 50 });
  });

  it('keeps the frame inside the surface', () => {
    expect(moveViewport(VIEW, SURFACE, -500, -500)).toMatchObject({ x: 0, y: 0 });
    expect(moveViewport(VIEW, SURFACE, 500, 500)).toMatchObject({ x: 300, y: 150 });
  });

  it('pins a frame larger than the surface to the start', () => {
    expect(moveViewport({ x: 0, y: 0, width: 500, height: 300 }, SURFACE, 40, 40)).toMatchObject({ x: 0, y: 0 });
  });

  it('centres the frame on a point and keeps it inside', () => {
    expect(centreViewport(VIEW, SURFACE, { x: 200, y: 100 })).toMatchObject({ x: 150, y: 75 });
    expect(centreViewport(VIEW, SURFACE, { x: 0, y: 0 })).toMatchObject({ x: 0, y: 0 });
    expect(centreViewport(VIEW, SURFACE, { x: 400, y: 200 })).toMatchObject({ x: 300, y: 150 });
  });
});

describe('Navigator keys', () => {
  it('steps by the arrow keys, and five steps with Shift', () => {
    expect(keyMove('ArrowLeft', false, VIEW, 10)).toEqual({ dx: -10, dy: 0 });
    expect(keyMove('ArrowDown', false, VIEW, 10)).toEqual({ dx: 0, dy: 10 });
    expect(keyMove('ArrowRight', true, VIEW, 10)).toEqual({ dx: 50, dy: 0 });
    expect(keyMove('ArrowUp', true, VIEW, 10)).toEqual({ dx: 0, dy: -50 });
  });

  it('pages by the height of the frame', () => {
    expect(keyMove('PageUp', false, VIEW, 10)).toEqual({ dx: 0, dy: -50 });
    expect(keyMove('PageDown', false, VIEW, 10)).toEqual({ dx: 0, dy: 50 });
  });

  it('leaves other keys alone', () => {
    expect(keyMove('a', false, VIEW, 10)).toBeNull();
    expect(keyMove('Tab', false, VIEW, 10)).toBeNull();
  });
});

describe('Navigator reading', () => {
  it('shares the frame as percent of the surface', () => {
    expect(viewportPercent(VIEW, SURFACE)).toEqual({ across: [25, 50], down: [25, 50] });
    expect(viewportPercent(VIEW, { width: 0, height: 0 })).toEqual({ across: [0, 100], down: [0, 100] });
  });

  it('says where the frame sits in words', () => {
    expect(viewportText(VIEW, SURFACE, NAVIGATION_STRINGS)).toBe('Showing 25% to 50% across and 25% to 50% down');
  });

  it('places the frame by percent', () => {
    expect(viewportBoxOf(VIEW, SURFACE)).toEqual({ left: '25%', top: '25%', width: '25%', height: '25%' });
  });
});

describe('Navigator render', () => {
  const draw = (props = {}) => renderToString(h(Navigator, { surface: SURFACE, viewport: VIEW, onViewportChange: ignore, ...props }, h('span', { className: 'thumb' }, 'T')));

  it('draws the thumbnail under a frame that is a slider with a spoken position', () => {
    const html = draw();
    expect(html).toContain('<span class="thumb">T</span>');
    expect(html).toContain('role="slider"');
    expect(html).toContain('aria-label="Map"');
    expect(html).toContain('aria-valuetext="Showing 25% to 50% across and 25% to 50% down"');
    expect(html).toContain('tabindex="0"');
  });

  it('takes its shape from the surface', () => {
    expect(draw()).toContain('aspect-ratio:400 / 200');
  });

  it('uses the label it is given', () => {
    expect(draw({ label: 'Canvas map' })).toContain('aria-label="Canvas map"');
  });
});
