/* @layer tooling-scripts @kind test */
import fs from 'node:fs';
import { createElement as h } from 'react';
import { renderToString } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { HANDLE_SELECTOR } from '../src/composites/DockLayout/DockLayout.constants';
import { Widget } from '../src/composites/Widget';
import { widgetChrome } from '../src/composites/Widget/behavior/widget-chrome';
import { WidgetPane } from '../src/composites/Widget/sub-components/WidgetPane';

const noop = () => undefined;
const TABS = [{ id: 'players', label: 'Players' }, { id: 'hints', label: 'Hints' }];

const widget = (extra = {}) => renderToString(h(Widget, {
  id: 'players', tabs: TABS.slice(0, 1), activeId: 'players', paneKey: 'p1', opacity: 1,
  onActivateTab: noop, onClose: noop, onPopOut: noop, ...extra,
}, h('p', null, 'Four online')));

const rootClass = (html) => html.match(/^<div class="([^"]+)"/)?.[1];
const ids = (html) => html.replace(/_R_[0-9a-z]+_/gi, 'ID');
const buttons = (html) => (html.match(/<button[^>]*>/g) ?? []).map((b) => b.match(/aria-label="([^"]+)"/)?.[1]);
const sheet = fs.readFileSync('src/composites/Widget/sub-components/WidgetTitlebar.css', 'utf8');
const rule = (selector) => sheet.match(new RegExp(`${selector.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')} \\{([^}]+)\\}`))?.[1] ?? '';

describe('the widget chrome', () => {
  it('is full by default, with the markup of a widget that names no chrome', () => {
    expect(ids(widget({ chrome: 'full' }))).toBe(ids(widget()));
    expect(rootClass(widget())).toBe('widget');
    expect(widget()).toMatch(/class="widget__titlebar window-chrome" data-drag-widget="players" data-pane-key="p1"/);
    expect(widget()).not.toContain('widget__grip');
  });

  it('keeps the same buttons, names and xs size in every chrome', () => {
    const full = buttons(widget());
    expect(full).toEqual(['Pop out Players', 'Close Players']);
    for (const chrome of ['compact', 'none']) {
      expect(buttons(widget({ chrome }))).toEqual(full);
      for (const button of widget({ chrome }).match(/<button[^>]*>/g)) expect(button).toMatch(/class="icon-btn icon-btn--ghost icon-btn--xs widget__btn hit-area"/);
    }
  });

  it('marks compact on the root and keeps the title strip as the drag handle', () => {
    const html = widget({ chrome: 'compact' });
    expect(rootClass(html)).toBe('widget widget--chrome-compact');
    expect(html).toMatch(/class="widget__titlebar window-chrome" data-drag-widget="players"/);
    expect(rule('.widget--chrome-compact .widget__titlebar')).toMatch(/height: var\(--control-h-xs\)/);
    expect(rule('.widget--chrome-compact :is(.widget__title, .widget__tab)')).toMatch(/font-size: var\(--widget-title-compact-font\)/);
  });

  it('moves the drag handle to a grip in none, and keeps the title as the region name', () => {
    const html = widget({ chrome: 'none' });
    expect(rootClass(html)).toBe('widget widget--chrome-none');
    expect(html).toMatch(/class="widget__titlebar window-chrome" data-pane-key="p1"/);
    expect(html).toMatch(/<div class="widget__grip" data-drag-widget="players" title="Drag to move Players" aria-hidden="true">/);
    const titleId = html.match(/<span class="[^"]*widget__title visually-hidden" id="([^"]+)">Players</)?.[1];
    expect(titleId).toMatch(/\S/);
    expect(html).toMatch(new RegExp(`role="region"[^>]*aria-labelledby="${titleId}"`));
  });

  it('puts the tab chips beside the grip in none', () => {
    const html = widget({ chrome: 'none', tabs: TABS, activeId: 'hints' });
    expect(html).toMatch(/<div class="widget__lead"><div class="widget__grip" data-drag-widget="hints"[^>]*>.*<div class="widget__tabs">/);
    expect(html).toContain('data-drag-tab="players"');
    expect(html).toMatch(/role="region"[^>]*aria-label="Hints"/);
  });

  it('lets only the grip move a window of its own in none', () => {
    const html = widget({ chrome: 'none', mode: 'out', dragRegion: true, paneKey: null });
    expect(html).toMatch(/class="widget__grip"[^>]*data-app-region="drag"/);
    expect(html).toMatch(/class="widget__titlebar-actions" data-app-region="no-drag"/);
    expect(html).not.toMatch(/class="widget__titlebar window-chrome"[^>]*data-app-region/);
  });

  it('folds none to the compact strip in peek', () => {
    expect(widgetChrome({ chrome: 'none', peek: true })).toBe('compact');
    expect(widgetChrome({ chrome: 'none' })).toBe('none');
    expect(widgetChrome({})).toBe('full');
    expect(rootClass(widget({ chrome: 'none', peek: true }))).toBe('widget widget--peek widget--chrome-compact');
  });

  it('keeps the body and the disabled overlay in every chrome', () => {
    for (const chrome of ['full', 'compact', 'none']) {
      const html = widget({ chrome, disabled: 'Hint sharing is off' });
      expect(html).toContain('widget__content');
      expect(html).toContain('Hint sharing is off');
    }
  });
});

describe('the none chrome on screen', () => {
  it('floats the bar over the body, so showing it moves nothing', () => {
    const bar = rule('.widget--chrome-none .widget__titlebar');
    expect(bar).toMatch(/position: absolute;/);
    expect(bar).toMatch(/opacity: 0;/);
    expect(bar).toMatch(/transition: opacity /);
    expect(bar).toMatch(/pointer-events: none;/);
  });

  it('shows the bar on hover, on focus within and while one of its menus is open', () => {
    expect(sheet).toContain(".widget--chrome-none:is(:hover, :focus-within, :has([aria-expanded='true'])) .widget__titlebar {\n  opacity: 1;");
    expect(sheet).toContain(".widget--chrome-none:is(:hover, :focus-within, :has([aria-expanded='true'])) .widget__titlebar > * {\n  pointer-events: auto;");
    expect(sheet).toMatch(/prefers-reduced-motion: reduce\) \{\s+\.widget--chrome-none \.widget__titlebar \{\s+transition: none;/);
  });

  it('gives a press on the grip icon to the grip, which DockLayout takes as a widget handle', () => {
    expect(rule('.widget__grip > *')).toMatch(/pointer-events: none;/);
    expect(HANDLE_SELECTOR.split(',')).toContain('[data-drag-widget]');
  });
});

describe('a docked widget', () => {
  it('takes its chrome from its definition', () => {
    const definition = {
      id: 'players', label: 'Players', defaultVisibility: 'always', defaultSide: 'left', defaultDockedSize: 200,
      defaultFloatingSize: { width: 200, height: 200 }, chrome: 'compact',
    };
    const api = {
      layout: { frame: {} }, peek: false, definitionOf: () => definition, labelOf: () => 'Players', contentOf: () => 'Four online',
      actionsOf: () => null, disabledOf: () => null, canPopOut: () => false, change: noop, apply: noop, close: noop, popOut: noop,
    };
    const html = renderToString(h(WidgetPane, { api, widgets: ['players'], activeId: 'players', paneKey: 'p1', options: null }));
    expect(rootClass(html)).toBe('widget widget--chrome-compact');
  });
});
