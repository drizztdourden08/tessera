/* @layer tooling-scripts @kind test */
import { createElement as h } from 'react';
import { renderToString } from 'react-dom/server';
import { describe, expect, it, vi } from 'vitest';
import { SiteHeader } from '../src/composites/SiteHeader';
import { WindowTitleBar } from '../src/composites/WindowTitleBar';
import { triggerSettings } from '../src/composites/DropdownMenu/behavior/trigger-settings';
import { dropAnchoring } from '../src/primitives/listbox/drop-anchoring';
import { dropPlacement } from '../src/primitives/listbox/drop-placement';
import { dropShape } from '../src/primitives/listbox/drop-shape';
import { fitDropWidth } from '../src/primitives/listbox/fit-drop-width';

const drawn = vi.hoisted(() => []);
vi.mock('../src/composites/DropdownMenu', () => ({
  DropdownMenu: (props) => {
    drawn.push(props);
    return null;
  },
}));

const ignore = () => undefined;
const PROFILE = {
  id: 'profile',
  icon: 'user',
  label: 'Ganon Fan',
  bar: 'dropdown',
  groups: [{ id: 'person', items: [{ id: 'sign-out', label: 'Sign out', onSelect: ignore }] }],
};
const BRAND = { logo: h('svg'), label: 'Hookshop home', href: '/' };
const LINKS = [{ id: 'home', label: 'Home', href: '/' }];
const VIEW = { innerWidth: 1000, innerHeight: 800, getComputedStyle: () => ({}) };
const NATURAL = 180;
const trigger = (left) => ({ top: 10, bottom: 38, left, right: left + 28, width: 28, height: 28 });
const drawnFor = (label) => drawn.findLast((props) => props.trigger?.label === label);
const alignOf = (label) => triggerSettings(drawnFor(label)).align;

const placed = (left, align) => {
  const placement = dropPlacement(null, trigger(left), VIEW, { fit: true, align });
  const width = fitDropWidth(NATURAL, placement);
  return { width, ...dropAnchoring({ placement, width, ...dropShape(placement, width) }) };
};

describe('the title bar dropdown placement', () => {
  it('opens the title bar, the SiteHeader profile and the SiteHeader link menu on the side with room by default', () => {
    renderToString(h(WindowTitleBar, { title: 'App', controls: { fullscreen: false, pin: false }, actions: [PROFILE], onControl: ignore }));
    expect(alignOf('Ganon Fan')).toBe('auto');
    drawn.length = 0;
    renderToString(h(SiteHeader, { brand: BRAND, links: LINKS, profile: PROFILE }));
    expect(alignOf('Ganon Fan')).toBe('auto');
    expect(alignOf('Menu')).toBe('auto');
    expect(drawnFor('Ganon Fan').align).toBeUndefined();
    expect(drawnFor('Menu').align).toBeUndefined();
  });

  it('opens any DropdownMenu with a trigger on the side with room unless the app asks for an edge', () => {
    expect(triggerSettings({ trigger: { label: 'Layout' }, groups: [] }).align).toBe('auto');
    expect(triggerSettings({ trigger: { label: 'Layout' }, groups: [], align: 'start' }).align).toBe('start');
    expect(triggerSettings({ trigger: { label: 'Layout' }, groups: [], align: 'end' }).align).toBe('end');
  });

  it('keeps the start of the trigger when the app asks for it, even at the right edge', () => {
    expect(placed(960, 'start').place).toBe('bottom-start');
    expect(placed(960, 'end').place).toBe('bottom-end');
  });

  it('opens a trigger at the right edge to the left, under its end, at its natural width', () => {
    expect(placed(960, 'auto')).toEqual({ width: NATURAL, place: 'bottom-end', fallback: { top: 38, right: 12 } });
  });

  it('opens a trigger near the left edge to the right, under its start', () => {
    expect(placed(40, 'auto')).toEqual({ width: NATURAL, place: 'bottom-start', fallback: { top: 38, left: 40 } });
  });

  it('squeezed the menu at the right edge when it held to the start', () => {
    expect(placed(960, 'start').width).toBe(32);
  });
});
