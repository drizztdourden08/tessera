/* @layer tooling-scripts @kind test */
import { createElement as h } from 'react';
import { renderToString } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { WindowTitleBar } from '../src/composites/WindowTitleBar';
import { fitStep } from '../src/composites/WindowTitleBar/behavior/fit-step';
import { hideOrder } from '../src/composites/WindowTitleBar/behavior/hide-order';
import { slideKeyframes } from '../src/composites/WindowTitleBar/behavior/slide-keyframes';
import { titleBarMenu } from '../src/composites/WindowTitleBar/behavior/title-bar-menu';

const ignore = () => undefined;
const BUG = { id: 'bug', icon: 'bug', label: 'Report a bug', onSelect: ignore };
const UPDATES = { id: 'updates', icon: 'download', label: 'Check for updates', bar: 'status', status: 'Update available', onSelect: ignore };
const STRINGS = { view: 'View', pinOnTop: 'Pin window on top', fullscreen: 'Fullscreen' };

describe('WindowTitleBar', () => {
  it('draws every control by default, with the hamburger for the View sub-menu', () => {
    const html = renderToString(h(WindowTitleBar, { title: 'App', onControl: ignore }));
    expect(html.match(/<button/g)).toHaveLength(6);
    expect(html).toContain('Pin window on top');
  });

  it('removes the controls config turns off, but keeps close, and draws no hamburger with nothing to hold', () => {
    const controls = { fullscreen: false, pin: false, minimize: false, maximize: false };
    const html = renderToString(h(WindowTitleBar, { title: 'App', controls, onControl: ignore }));
    expect(html.match(/<button/g)).toHaveLength(1);
    expect(html).toContain('window-title-bar__control--close');
    expect(html).not.toContain('Pin window on top');
  });

  it('draws an action as a button, and a status action as text only while its status is set', () => {
    const controls = { fullscreen: false, pin: false };
    const shown = renderToString(h(WindowTitleBar, { title: 'App', controls, actions: [BUG, UPDATES], onControl: ignore }));
    expect(shown).toContain('aria-label="Report a bug"');
    expect(shown).toContain('Update available');
    expect(shown).toContain('status--text');
    expect(shown).not.toContain('status--pill');
    expect(shown).toContain('emphasis--pulse emphasis--anchor-center');
    const quiet = renderToString(h(WindowTitleBar, { title: 'App', controls, actions: [BUG, { ...UPDATES, status: undefined }], onControl: ignore }));
    expect(quiet).not.toContain('Update available');
  });
});

describe('hideOrder', () => {
  it('hides the action buttons, last first, then the pin, the status texts and full screen', () => {
    const second = { ...BUG, id: 'mute' };
    expect(hideOrder([BUG, UPDATES, second], {})).toEqual(['action:mute', 'action:bug', 'control:pin', 'action:updates', 'control:fullscreen']);
    expect(hideOrder([BUG, { ...UPDATES, status: undefined }, { ...BUG, id: 'menu-only', bar: 'menu' }], { pin: false })).toEqual(['action:bug', 'control:fullscreen']);
  });
});

describe('titleBarMenu', () => {
  const base = { actions: [BUG, UPDATES], pin: true, fullscreenButton: true, pinned: true, fullscreen: false, onControl: ignore, strings: STRINGS };

  it('puts a View sub-menu with check items and every action in a group above the last host group', () => {
    const groups = titleBarMenu({ ...base, menu: [{ id: 'screens', items: [] }, { id: 'app', items: [] }] });
    expect(groups.map((group) => group.id)).toEqual(['screens', 'window-title-bar', 'app']);
    const [view, bug, updates] = groups[1].items;
    expect(view.children.map((item) => [item.label, item.checked])).toEqual([['Pin window on top', true], ['Fullscreen', false]]);
    expect(bug.label).toBe('Report a bug');
    expect(updates.description).toBe('Update available');
  });

  it('adds the group at the end of a short menu and leaves out what is turned off', () => {
    const groups = titleBarMenu({ ...base, actions: [], pin: false, menu: [{ id: 'screens', items: [] }] });
    expect(groups.map((group) => group.id)).toEqual(['screens', 'window-title-bar']);
    expect(groups[1].items[0].children.map((item) => item.label)).toEqual(['Fullscreen']);
  });

  it('keeps View to the pin and full screen, with no window group entry', () => {
    const view = titleBarMenu({ ...base, menu: [] })[0].items[0].children;
    expect(view.map((item) => item.id)).toEqual(['pin', 'fullscreen']);
    expect(view.some((item) => item.children)).toBe(false);
  });
});

describe('fitStep', () => {
  const item = (side, width) => ({ side, width, shown: true });
  const sizes = (width) => ({
    width, startEnd: 8 + 32 + 4 + 28 + 4 + 28 + 4 + 120, endWidth: 192, startGap: 4, endGap: 0,
    items: [item('start', 28), item('start', 28), item('start', 120), item('end', 48)],
    brand: 140, logo: 20, small: 14,
  });

  it('keeps everything when there is room', () => {
    expect(fitStep(sizes(1000))).toEqual({ hidden: [], brand: 'full' });
  });

  it('hides on each side only what is in the way, in the hide order', () => {
    expect(fitStep(sizes(600)).hidden).toEqual([0]);
    expect(fitStep(sizes(540))).toEqual({ hidden: [0, 1, 3], brand: 'full' });
  });

  it('hides every item before the title goes, then shrinks the logo, then empties the middle', () => {
    expect(fitStep(sizes(400))).toEqual({ hidden: [0, 1, 2, 3], brand: 'logo' });
    expect(fitStep(sizes(312))).toEqual({ hidden: [0, 1, 2, 3], brand: 'small' });
    expect(fitStep(sizes(260))).toEqual({ hidden: [0, 1, 2, 3], brand: 'none' });
  });
});

describe('slideKeyframes', () => {
  const shown = { offset: 40, opacity: 1, seen: true, away: false };
  const gone = { offset: 0, opacity: 1, seen: false, away: true };
  const xs = (frames) => frames.map((frame) => frame.transform);

  it('glides a shown item from where it was to where it is', () => {
    expect(xs(slideKeyframes(shown, { offset: 10, out: -28, away: false }))).toEqual(['translateX(30px)', 'translateX(0px)']);
    expect(slideKeyframes(shown, { offset: 40, out: -28, away: false })).toBeNull();
  });

  it('slides a hiding item out by its own width towards its edge while it fades', () => {
    const frames = slideKeyframes(shown, { offset: 0, out: -28, away: true });
    expect(xs(frames)).toEqual(['translateX(40px)', 'translateX(12px)']);
    expect(frames.map((frame) => frame.opacity)).toEqual([1, 0]);
    expect(slideKeyframes(gone, { offset: 0, out: -28, away: true })).toBeNull();
  });

  it('slides a returning item in from its edge', () => {
    const frames = slideKeyframes(gone, { offset: 72, out: 48, away: false });
    expect(xs(frames)).toEqual(['translateX(48px)', 'translateX(0px)']);
    expect(frames.map((frame) => frame.opacity)).toEqual([0, 1]);
  });
});
