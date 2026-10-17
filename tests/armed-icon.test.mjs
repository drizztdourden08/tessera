/* @layer tooling-scripts @kind test */
import { readFileSync } from 'node:fs';
import { createElement as h } from 'react';
import { renderToString } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { STEADY_PARTS } from '../scripts/storylite/check-steady.constants.mjs';
import { ArmedIcon } from '../src/primitives/ArmedIcon';
import { armedIconData } from '../src/primitives/ArmedIcon/behavior/armed-icon-data';
import { ICONS } from '../src/primitives/Icon/Icon.constants';

const read = (path) => readFileSync(new URL(`../${path}`, import.meta.url), 'utf8');
const CSS = read('src/primitives/ArmedIcon/ArmedIcon.css');
const MOTION = CSS.slice(CSS.indexOf('@media (prefers-reduced-motion: no-preference)'));

describe('ArmedIcon', () => {
  it('gives the named set load-state and save-state, drawn from the same paths, without the armed ripple', () => {
    expect(ICONS['load-state']).toEqual(armedIconData('load-state'));
    expect(ICONS['save-state']).toEqual(armedIconData('save-state'));
    const body = ICONS['save-state'].body;
    expect(body).toMatch(/^<g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2">/);
    expect(body.match(/<path /g)).toHaveLength(6);
    expect(body).not.toContain('armed');
    expect(body).toContain('<g stroke-width="1.25">');
    expect(ICONS['save-state']).toMatchObject({ width: 24, height: 24 });
  });

  it('draws the same parts still and armed, so arming only flips a data attribute', () => {
    for (const name of ['load-state', 'save-state', 'trash-2']) {
      const still = renderToString(h(ArmedIcon, { name }));
      const armed = renderToString(h(ArmedIcon, { name, armed: true }));
      expect(armed.replace(' data-armed="true"', '')).toBe(still);
      expect(still).toMatch(/aria-hidden="true"/);
    }
    const save = renderToString(h(ArmedIcon, { name: 'save-state', size: 24 }));
    expect(save).toMatch(/^<svg class="armed-icon armed-icon--save-state" viewBox="0 0 24 24" width="24" height="24" stroke-width="2"/);
    expect([...save.matchAll(/class="armed-icon__([a-z]+)"/g)].map(([, part]) => part)).toEqual(['ripple', 'platform', 'streaks', 'arrow']);
  });

  it('moves transform and opacity only, so the box never moves', () => {
    const keyframes = CSS.slice(CSS.indexOf('@keyframes'));
    const moved = new Set([...keyframes.matchAll(/([a-z-]+):/g)].map(([, prop]) => prop));
    expect(moved).toEqual(new Set(['transform', 'opacity']));
    expect(MOTION).toMatch(/transform var\(--duration-slow\)[^;]*opacity var\(--duration-slow\)/);
    expect(read('src/tokens/motion.css')).toContain('--duration-armed-loop: 1.4s;');
    expect(STEADY_PARTS).toContainEqual({ page: 'icons-armedicon--overview', parts: ['.armed-icon'] });
    expect(STEADY_PARTS).toContainEqual({ page: 'composites-armediconbutton--overview', parts: ['.armed-icon-btn', '.armed-icon-btn .icon-btn'] });
  });

  it('loops only without reduced motion, which keeps the armed pose still', () => {
    const before = CSS.slice(0, CSS.indexOf('@media'));
    expect(before).not.toMatch(/animation|transition/);
    expect(before).toMatch(/\.armed-icon--load-state\[data-armed\] \.armed-icon__arrow \{\s+transform: translateY\(-8%\);/);
    expect(before).toMatch(/\.armed-icon--trash-2\[data-armed\] \.armed-icon__lid \{\s+transform: translateY\(-35%\) rotate\(-8deg\);/);
    for (const name of ['lift', 'sink', 'rise', 'squash', 'ripple', 'lid']) expect(MOTION).toContain(`animation-name: armed-icon-${name};`);
    expect(MOTION).toMatch(/animation-name: armed-icon-rise;\s+animation-direction: reverse;/);
    expect(MOTION).toMatch(/animation-delay: var\(--duration-slow\);/);
  });
});
