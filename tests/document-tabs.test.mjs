/* @layer tooling-scripts @kind test */
import { createElement as h } from 'react';
import { renderToString } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { DocumentTabs } from '../src/composites/DocumentTabs';
import { closeChord } from '../src/composites/DocumentTabs/behavior/close-chord';
import { focusStep } from '../src/composites/DocumentTabs/behavior/focus-step';
import { middleClose } from '../src/composites/DocumentTabs/behavior/middle-close';
import { tabbableId } from '../src/composites/DocumentTabs/behavior/tabbable-id';

const ignore = () => undefined;
const TABS = [
  { id: 'hero', title: 'hero.bxl', icon: 'image', tooltip: 'art/hero.bxl' },
  { id: 'tiles', title: 'tiles.bxl', unsaved: true },
  { id: 'logo', title: 'logo.bxl' },
];

const draw = (props) => renderToString(h(DocumentTabs, {
  tabs: TABS, activeId: 'tiles', onActivate: ignore, onClose: ignore, onMove: ignore, ...props,
}));

const keyEvent = (key, held = {}) => ({ key, altKey: false, ctrlKey: false, metaKey: false, shiftKey: false, ...held });
const tagsOf = (html, pattern) => html.match(pattern) ?? [];
const tabButtons = (html) => tagsOf(html, /<button[^>]*role="tab"[^>]*>/g);

describe('DocumentTabs', () => {
  it('draws a named tablist with one indexed tab per document', () => {
    const html = draw();
    expect(html).toMatch(/role="tablist"[^>]*aria-label="Open documents"|aria-label="Open documents"[^>]*role="tablist"/);
    expect(html.match(/data-reorder-index="\d"/g)).toHaveLength(3);
    expect(html).toContain('data-reorder-key="logo"');
    expect(tabButtons(html)).toHaveLength(3);
  });

  it('takes the name of the tablist from label', () => {
    expect(draw({ label: 'Open drawings' })).toContain('aria-label="Open drawings"');
  });

  it('marks the active tab selected and keeps one tab stop on it', () => {
    const tabs = tabButtons(draw());
    expect(tabs.map((tag) => /aria-selected="(true|false)"/.exec(tag)?.[1])).toEqual(['false', 'true', 'false']);
    expect(tabs.map((tag) => /tabindex="(-?\d)"/.exec(tag)?.[1])).toEqual(['-1', '0', '-1']);
  });

  it('puts the tab stop on the first tab when none is active', () => {
    const tabs = tabButtons(draw({ activeId: undefined }));
    expect(tabs.map((tag) => /tabindex="(-?\d)"/.exec(tag)?.[1])).toEqual(['0', '-1', '-1']);
  });

  it('shows the tooltip, or the title, on hover', () => {
    const tabs = tabButtons(draw());
    expect(tabs[0]).toContain('title="art/hero.bxl"');
    expect(tabs[2]).toContain('title="logo.bxl"');
  });

  it('gives each tab a close button named by its title that is not a tab stop', () => {
    const html = draw();
    const closes = tagsOf(html, /<button[^>]*aria-label="Close [^"]*"[^>]*>/g);
    expect(closes).toHaveLength(3);
    expect(closes[0]).toContain('aria-label="Close hero.bxl"');
    expect(closes.every((tag) => tag.includes('tabindex="-1"'))).toBe(true);
  });

  it('marks only the unsaved tab, and says so to screen readers', () => {
    const html = draw();
    expect(html.match(/data-unsaved="yes"/g)).toHaveLength(1);
    expect(html.match(/document-tabs__dot/g)).toHaveLength(1);
    expect(html.match(/Unsaved changes/g)).toHaveLength(1);
  });

  it('names the keys on the tablist and describes them for screen readers', () => {
    const html = draw();
    expect(html).toContain('aria-keyshortcuts="Alt+ArrowLeft Alt+ArrowRight Delete Control+W"');
    expect(html).toContain('Alt with Left or Right moves it');
    expect(html).toContain('aria-live="polite"');
  });

  it('leaves the overflow menu out unless it is asked for', () => {
    expect(draw()).not.toContain('All open documents');
    expect(draw({ overflowMenu: true })).toContain('All open documents');
  });

  it('draws nothing without tabs', () => {
    expect(draw({ tabs: [] })).toBe('');
  });
});

describe('DocumentTabs keys', () => {
  it('moves focus on the plain arrows with wrap, and to the ends on Home and End', () => {
    expect(focusStep(keyEvent('ArrowRight'), 0, 3)).toBe(1);
    expect(focusStep(keyEvent('ArrowLeft'), 0, 3)).toBe(2);
    expect(focusStep(keyEvent('Home'), 2, 3)).toBe(0);
    expect(focusStep(keyEvent('End'), 0, 3)).toBe(2);
    expect(focusStep(keyEvent('ArrowRight'), 0, 1)).toBeUndefined();
  });

  it('leaves the Alt chord to the move', () => {
    expect(focusStep(keyEvent('ArrowRight', { altKey: true }), 0, 3)).toBeUndefined();
    expect(focusStep(keyEvent('End', { ctrlKey: true }), 0, 3)).toBeUndefined();
  });

  it('closes on Delete and on Ctrl and W, and on nothing else', () => {
    expect(closeChord(keyEvent('Delete'))).toBe(true);
    expect(closeChord(keyEvent('w', { ctrlKey: true }))).toBe(true);
    expect(closeChord(keyEvent('W', { ctrlKey: true }))).toBe(true);
    expect(closeChord(keyEvent('w'))).toBe(false);
    expect(closeChord(keyEvent('Delete', { altKey: true }))).toBe(false);
    expect(closeChord(keyEvent('Backspace'))).toBe(false);
  });

  it('picks the focused tab, then the active one, then the first for the tab stop', () => {
    expect(tabbableId(TABS, 'logo', 'tiles')).toBe('logo');
    expect(tabbableId(TABS, null, 'tiles')).toBe('tiles');
    expect(tabbableId(TABS, 'gone', 'gone')).toBe('hero');
    expect(tabbableId([], null, undefined)).toBeUndefined();
  });

  it('closes on a middle click only', () => {
    const calls = [];
    const press = middleClose(() => calls.push('closed'));
    const event = (button) => ({ button, preventDefault: () => calls.push(`stopped ${button}`) });
    press.onAuxClick(event(2));
    press.onMouseDown(event(0));
    expect(calls).toEqual([]);
    press.onMouseDown(event(1));
    press.onAuxClick(event(1));
    expect(calls).toEqual(['stopped 1', 'stopped 1', 'closed']);
  });
});
