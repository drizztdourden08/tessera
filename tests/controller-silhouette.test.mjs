/* @layer tooling-scripts @kind test */
import { createElement as h } from 'react';
import { renderToString } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import {
  CONTROLLER_SILHOUETTE_ANCHORS, CONTROLLER_SILHOUETTE_VARIANTS, CONTROLLER_SILHOUETTE_VIEW_BOX, ControllerSilhouette,
} from '../src/composites/ControllerSilhouette';

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

  it('renders children inside the svg, after the body', () => {
    const html = render({}, h('circle', { 'data-overlay': 'app', cx: 10, cy: 10, r: 4 }));
    const svgOpen = html.indexOf('<svg');
    const child = html.indexOf('data-overlay="app"');
    expect(child).toBeGreaterThan(html.indexOf('controller-silhouette__wells'));
    expect(child).toBeGreaterThan(svgOpen);
    expect(child).toBeLessThan(html.indexOf('</svg>'));
  });

  it('draws only body shading, no buttons, glyphs or text', () => {
    for (const variant of CONTROLLER_SILHOUETTE_VARIANTS) {
      const html = render({ variant });
      expect(html).not.toContain('<text');
      expect(html).toContain('controller-silhouette__body');
    }
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

  it('gives a pad no sticks and no triggers', () => {
    const pad = CONTROLLER_SILHOUETTE_ANCHORS.pad;
    for (const id of ['stick.left', 'stick.right', 'trigger.left', 'trigger.right']) expect(pad[id]).toBeUndefined();
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

  it('draws each well from its anchor', () => {
    const html = render({ variant: 'symmetric' });
    const stick = CONTROLLER_SILHOUETTE_ANCHORS.symmetric['stick.left'];
    expect(html).toContain(`cx="${stick.x}" cy="${stick.y}" r="${stick.r}"`);
    const face = CONTROLLER_SILHOUETTE_ANCHORS.symmetric.face;
    expect(html).toMatch(new RegExp(`cx="${face.x}" cy="${face.y}" r="${face.r}"[^>]*data-anchor="face"`));
  });

  it('mirrors the body so the left and right halves match', () => {
    const html = render({ variant: 'pad' });
    const body = html.match(/class="controller-silhouette__body" d="([^"]+)"/)[1];
    const numbers = body.match(/-?[\d.]+/g).map(Number);
    const xs = numbers.filter((_, index) => index % 2 === 0);
    const sum = xs.reduce((total, x) => total + (x - 200), 0);
    expect(Math.abs(sum)).toBeLessThan(0.1);
  });
});
