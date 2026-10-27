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
    expect(html).toMatch(/<div[^>]*role="tablist"[^>]*aria-label="Open documents"/);
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
    expect(html.match(/data-unsaved="yes"/g)).toHaveLength(2);
    expect(html.match(/document-tabs__dot/g)).toHaveLength(1);
    expect(html.match(/Unsaved changes/g)).toHaveLength(1);
  });

  it('keeps both the dot and the close button in an unsaved tab', () => {
    const html = draw({ tabs: [{ id: 'tiles', title: 'tiles.bxl', unsaved: true }] });
    const slot = html.slice(html.indexOf('document-tabs__closes'));
    expect(slot).toContain('document-tabs__dot');
    expect(slot).toContain('aria-label="Close tiles.bxl"');
    expect(slot.indexOf('document-tabs__dot')).toBeLessThan(slot.indexOf('aria-label="Close tiles.bxl"'));
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

const VOID = new Set(['br', 'img', 'input', 'hr', 'meta', 'link']);

const childTags = (html, openTag) => {
  const start = html.indexOf(openTag) + openTag.length;
  const found = [];
  let depth = 0;
  for (const match of html.slice(start).matchAll(/<(\/?)([a-z0-9]+)([^>]*?)(\/?)>/g)) {
    const [, closing, name, attrs, selfClosing] = match;
    if (closing) {
      if (depth === 0) return found;
      depth -= 1;
      continue;
    }
    if (depth === 0) found.push({ name, attrs });
    if (!selfClosing && !VOID.has(name)) depth += 1;
  }
  return found;
};

describe('DocumentTabs tablist', () => {
  it('holds only tabs as its direct children', () => {
    const html = draw();
    const open = /<div[^>]*role="tablist"[^>]*>/.exec(html)?.[0] ?? '';
    const kids = childTags(html, open);
    expect(kids).toHaveLength(3);
    expect(kids.every((kid) => kid.name === 'button' && kid.attrs.includes('role="tab"'))).toBe(true);
    expect(html.match(/role="tablist"/g)).toHaveLength(1);
    expect(html).not.toContain('aria-owns');
  });

  it('keeps every close button out of the tablist, in a layer after it', () => {
    const html = draw();
    const list = html.indexOf('role="tablist"');
    const layer = html.indexOf('document-tabs__closes');
    expect(layer).toBeGreaterThan(list);
    const inside = html.slice(list, layer);
    expect(inside).not.toContain('aria-label="Close');
    expect(html.slice(layer).match(/aria-label="Close [^"]*"/g)).toHaveLength(3);
  });

  it('puts the unsaved dot on the close layer and the unsaved wording in the tab', () => {
    const html = draw();
    const layer = html.indexOf('document-tabs__closes');
    expect(html.slice(layer)).toContain('document-tabs__dot');
    expect(html.slice(0, layer)).not.toContain('document-tabs__dot');
    expect(html.slice(0, layer)).toContain('Unsaved changes');
    expect(html.slice(layer).match(/data-close-key="[^"]*"/g)).toEqual(['data-close-key="hero"', 'data-close-key="tiles"', 'data-close-key="logo"']);
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

describe('DocumentTabs look', () => {
  it('draws flat tabs by default and raised tabs on look', () => {
    expect(draw()).not.toContain('document-tabs--raised');
    expect(draw({ look: 'raised' })).toContain('document-tabs document-tabs--raised');
  });
});
