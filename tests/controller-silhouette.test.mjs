/* @layer tooling-scripts @kind test */
import { readFileSync } from 'node:fs';
import { createElement as h } from 'react';
import { renderToString } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import {
  CONTROLLER_SILHOUETTE_ANCHORS, CONTROLLER_SILHOUETTE_PATHS, CONTROLLER_SILHOUETTE_VARIANTS, CONTROLLER_SILHOUETTE_VIEW_BOX, ControllerSilhouette,
} from '../src/composites/ControllerSilhouette';
import { usage } from '../src/composites/ControllerSilhouette/ControllerSilhouette.usage';

const outlinePoints = (d) => {
  const numbers = d.match(/-?[\d.]+/g).map(Number);
  let [px, py] = numbers;
  const points = [];
  for (let i = 2; i + 5 < numbers.length; i += 6) {
    const [c1x, c1y, c2x, c2y, x, y] = numbers.slice(i, i + 6);
    for (let step = 0; step <= 100; step += 1) {
      const t = step / 100;
      const u = 1 - t;
      points.push([
        u * u * u * px + 3 * u * u * t * c1x + 3 * u * t * t * c2x + t * t * t * x,
        u * u * u * py + 3 * u * u * t * c1y + 3 * u * t * t * c2y + t * t * t * y,
      ]);
    }
    [px, py] = [x, y];
  }
  return points;
};

const topEdge = (points, x) => Math.min(...points.filter(([px]) => Math.abs(px - x) < 1).map(([, y]) => y));

const render = (props, children) => renderToString(h(ControllerSilhouette, { variant: 'offset', ...props }, children));

const GRIP_IDS = [
  'stick.left', 'stick.right', 'dpad', 'face', 'shoulder.left', 'shoulder.right', 'trigger.left', 'trigger.right',
  'meta.view', 'meta.menu', 'meta.guide',
];

describe('ControllerSilhouette', () => {
  it('keeps one fixed viewBox for every variant', () => {
    expect(CONTROLLER_SILHOUETTE_VIEW_BOX).toBe('0 0 400 260');
    for (const variant of CONTROLLER_SILHOUETTE_VARIANTS) {
      expect(render({ variant })).toContain('viewBox="0 0 400 260"');
    }
  });

  it('is a named figure with its drawing hidden from screen readers', () => {
    const html = render();
    expect(html).toMatch(/^<figure aria-label="Controller" class="controller-silhouette" data-variant="offset">/);
    expect(html).toMatch(/<svg class="controller-silhouette__art"[^>]*aria-hidden="true"/);
    expect(render({ label: 'Pad 1', className: 'extra' })).toMatch(/^<figure aria-label="Pad 1" class="controller-silhouette extra"/);
  });

  it('renders children inside the svg, after the outline', () => {
    const html = render({}, h('circle', { 'data-overlay': 'app', cx: 10, cy: 10, r: 4 }));
    const child = html.indexOf('data-overlay="app"');
    expect(child).toBeGreaterThan(html.indexOf('controller-silhouette__outline'));
    expect(child).toBeGreaterThan(html.indexOf('<svg'));
    expect(child).toBeLessThan(html.indexOf('</svg>'));
  });

  it('draws one closed outline and nothing else', () => {
    for (const variant of CONTROLLER_SILHOUETTE_VARIANTS) {
      const html = render({ variant });
      const svg = html.slice(html.indexOf('<svg'), html.indexOf('</svg>'));
      expect(svg.match(/<path/g)).toHaveLength(1);
      expect(svg).toMatch(/<path class="controller-silhouette__outline" d="M [^"]+ Z"/);
      for (const tag of ['<rect', '<circle', '<text', '<linearGradient', '<stop', '<clipPath', '<g']) expect(svg).not.toContain(tag);
      expect(svg).not.toMatch(/fill="url|stroke="url|data-anchor/);
    }
  });

  it('exports the path each variant renders', () => {
    for (const variant of CONTROLLER_SILHOUETTE_VARIANTS) {
      const d = render({ variant }).match(/class="controller-silhouette__outline" d="([^"]+)"/)[1];
      expect(CONTROLLER_SILHOUETTE_PATHS[variant]).toBe(d);
    }
  });

  it('strokes the outline with no fill', () => {
    const css = readFileSync(new URL('../src/composites/ControllerSilhouette/ControllerSilhouette.css', import.meta.url), 'utf8');
    const rule = css.slice(css.indexOf('.controller-silhouette__outline'));
    expect(rule).toMatch(/fill: none;/);
    expect(rule).toContain('stroke: var(--c-controller-line);');
    expect(rule).toContain('stroke-width: var(--controller-silhouette-stroke);');
    expect(css).not.toMatch(/gradient|stop-color|--c-controller-(body|shade|glint|lift)/);
  });
});

describe('ControllerSilhouette anchors', () => {
  it('gives each grip variant every anchor it has', () => {
    for (const variant of ['offset', 'symmetric', 'nintendo']) {
      expect(Object.keys(CONTROLLER_SILHOUETTE_ANCHORS[variant])).toEqual(expect.arrayContaining(GRIP_IDS));
    }
    expect(CONTROLLER_SILHOUETTE_ANCHORS.offset['meta.capture']).toBeDefined();
    expect(CONTROLLER_SILHOUETTE_ANCHORS.nintendo['meta.capture']).toBeDefined();
  });

  it('gives a pad no sticks, no triggers and no guide or capture', () => {
    const pad = CONTROLLER_SILHOUETTE_ANCHORS.pad;
    for (const id of ['stick.left', 'stick.right', 'trigger.left', 'trigger.right', 'meta.guide', 'meta.capture']) expect(pad[id]).toBeUndefined();
    for (const id of ['dpad', 'face', 'shoulder.left', 'shoulder.right', 'meta.view', 'meta.menu']) expect(pad[id]).toBeDefined();
  });

  it('gives each well a radius and keeps every anchor inside the viewBox', () => {
    for (const variant of CONTROLLER_SILHOUETTE_VARIANTS) {
      const anchors = CONTROLLER_SILHOUETTE_ANCHORS[variant];
      for (const [id, anchor] of Object.entries(anchors)) {
        expect(anchor.x).toBeGreaterThan(0);
        expect(anchor.x).toBeLessThan(400);
        expect(anchor.y).toBeGreaterThan(0);
        expect(anchor.y).toBeLessThan(260);
        if (/^(stick|dpad|face|meta)/.test(id)) expect(anchor.r).toBeGreaterThan(0);
      }
    }
  });

  it('keeps the symmetric pad without a capture button', () => {
    expect(CONTROLLER_SILHOUETTE_ANCHORS.symmetric['meta.capture']).toBeUndefined();
  });

  it('places each trigger above its shoulder', () => {
    for (const variant of ['offset', 'symmetric', 'nintendo']) {
      const anchors = CONTROLLER_SILHOUETTE_ANCHORS[variant];
      expect(anchors['trigger.left'].x).toBe(anchors['shoulder.left'].x);
      expect(anchors['trigger.left'].y).toBeLessThan(anchors['shoulder.left'].y);
      expect(anchors['shoulder.left'].x + anchors['shoulder.right'].x).toBe(400);
    }
  });

  it('mirrors each outline so the left and right halves match', () => {
    for (const variant of CONTROLLER_SILHOUETTE_VARIANTS) {
      const d = render({ variant }).match(/class="controller-silhouette__outline" d="([^"]+)"/)[1];
      const xs = d.match(/-?[\d.]+/g).map(Number).filter((_, index) => index % 2 === 0);
      const sum = xs.reduce((total, x) => total + (x - 200), 0);
      expect(Math.abs(sum)).toBeLessThan(0.1);
      for (const x of xs) {
        expect(x).toBeGreaterThanOrEqual(0);
        expect(x).toBeLessThanOrEqual(400);
      }
    }
  });
});

describe('ControllerSilhouette anchors on the real pads', () => {
  it('keeps every control inside its outline and every shoulder on its top edge', () => {
    for (const variant of CONTROLLER_SILHOUETTE_VARIANTS) {
      const points = outlinePoints(CONTROLLER_SILHOUETTE_PATHS[variant]);
      const xs = points.map(([x]) => x);
      const ys = points.map(([, y]) => y);
      const box = { x0: Math.min(...xs), x1: Math.max(...xs), y0: Math.min(...ys), y1: Math.max(...ys) };
      for (const [id, anchor] of Object.entries(CONTROLLER_SILHOUETTE_ANCHORS[variant])) {
        if (id.startsWith('trigger')) {
          expect(anchor.y).toBeLessThan(box.y0);
          continue;
        }
        const r = anchor.r ?? 0;
        expect(anchor.x - r).toBeGreaterThanOrEqual(box.x0);
        expect(anchor.x + r).toBeLessThanOrEqual(box.x1);
        expect(anchor.y - r).toBeGreaterThanOrEqual(box.y0);
        expect(anchor.y + r).toBeLessThanOrEqual(box.y1);
        if (id.startsWith('shoulder')) expect(Math.abs(anchor.y - topEdge(points, anchor.x))).toBeLessThanOrEqual(1);
      }
    }
  });

  it('follows the real layout of each pad family', () => {
    const { offset, symmetric, nintendo, pad } = CONTROLLER_SILHOUETTE_ANCHORS;
    for (const set of [offset, nintendo]) {
      expect(set['stick.left'].y).toBeLessThan(set.dpad.y);
      expect(set['stick.right'].y).toBeGreaterThan(set.face.y);
      expect(set['stick.left'].x).toBeLessThan(set.dpad.x);
      expect(set['stick.right'].x).toBeLessThan(set.face.x);
    }
    expect(offset['meta.guide']).toMatchObject({ x: 200 });
    expect(offset['meta.guide'].y).toBeLessThan(offset['meta.view'].y);
    expect(symmetric.dpad.y).toBeLessThan(symmetric['stick.left'].y);
    expect(symmetric['stick.left'].x + symmetric['stick.right'].x).toBe(400);
    expect(symmetric['stick.left'].y).toBe(symmetric['stick.right'].y);
    expect(symmetric.dpad.x + symmetric.face.x).toBe(400);
    expect(symmetric['meta.guide']).toMatchObject({ x: 200, y: symmetric['stick.left'].y });
    expect(pad.dpad.y).toBe(pad.face.y);
    expect(pad.face.r).toBeGreaterThan(pad.dpad.r);
  });

  it('lists the same numbers in its usage as in the constants', () => {
    const text = usage.rules.join(' ');
    for (const variant of CONTROLLER_SILHOUETTE_VARIANTS) {
      const list = Object.entries(CONTROLLER_SILHOUETTE_ANCHORS[variant])
        .map(([id, a]) => `${id} ${a.x},${a.y}${a.r ? ` r${a.r}` : ''}`).join(', ');
      expect(text).toContain(`${variant}: ${list}.`);
    }
  });
});
