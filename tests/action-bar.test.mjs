/* @layer tooling-scripts @kind test */
import { createElement as h } from 'react';
import { renderToString } from 'react-dom/server';
import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { ActionBar } from '../src/composites/ActionBar';
import { confirmOf } from '../src/composites/ActionBar/behavior/confirm-of';
import { menuGroups } from '../src/composites/ActionBar/behavior/menu-groups';
import { splitActions } from '../src/composites/ActionBar/behavior/split-actions';

const noop = () => {};
const ACTIONS = [
  { id: 'reset', label: 'Reset all', icon: 'rotate-ccw', onSelect: noop },
  { id: 'save', label: 'Save', kind: 'primary', onSelect: noop },
  { id: 'duplicate', label: 'Duplicate', onSelect: noop },
  { id: 'export', label: 'Export yaml', onSelect: noop },
  { id: 'delete', label: 'Delete', kind: 'danger', onSelect: noop },
];

const ids = (list) => list.map((action) => action.id);
const question = (label) => `${label}?`;
const labels = (groups) => groups.map((group) => group.items.map((item) => item.label));

describe('ActionBar split', () => {
  it('keeps the primary out of the fold and folds from the end', () => {
    const split = splitActions(ACTIONS, Number.POSITIVE_INFINITY, 2);
    expect(ids(split.primary)).toEqual(['save']);
    expect(ids(split.shown)).toEqual(['reset', 'duplicate']);
    expect(ids(split.folded)).toEqual(['export', 'delete']);
  });

  it('shows no more than keep, even with room', () => {
    expect(ids(splitActions(ACTIONS, 1, Number.POSITIVE_INFINITY).shown)).toEqual(['reset']);
    expect(ids(splitActions(ACTIONS, 0, 9).folded)).toEqual(['reset', 'duplicate', 'export', 'delete']);
  });
});

describe('ActionBar confirm', () => {
  it('asks before every danger action, with its label as the check', () => {
    expect(confirmOf(ACTIONS[4], question)).toEqual({ title: 'Delete?', confirmLabel: 'Delete' });
    expect(confirmOf(ACTIONS[0], question)).toBeUndefined();
  });

  it('takes the words of confirm, on any kind', () => {
    const words = { title: 'Reset every option?', confirmLabel: 'Reset all' };
    expect(confirmOf({ ...ACTIONS[0], confirm: words }, question)).toBe(words);
  });

  it('puts danger actions in their own menu group, marked as asking', () => {
    const groups = menuGroups({ folded: ACTIONS.slice(2), asks: (action) => action.kind === 'danger', onPress: noop }, (label) => `${label}...`);
    expect(labels(groups)).toEqual([['Duplicate', 'Export yaml'], ['Delete...']]);
  });
});

describe('ActionBar render', () => {
  const html = renderToString(h(ActionBar, { actions: ACTIONS, label: 'Keysanity' }));
  const live = html.split('action-bar__measure')[0];

  it('draws a named group, the primary last and danger in the danger look', () => {
    expect(html).toContain('role="group" aria-label="Keysanity"');
    const order = [...live.matchAll(/data-action-id="(\w+)"/g)].map((match) => match[1]);
    expect(order).toEqual(['reset', 'duplicate', 'export', 'delete', 'save']);
    expect(live).toMatch(/btn--danger[^>]*data-action-id="delete"/);
    expect(live).toMatch(/btn--primary[^>]*data-action-id="save"/);
  });

  it('keeps its measuring copies inert and out of the Tab order', () => {
    expect(html).toMatch(/class="action-bar__measure" aria-hidden="true" inert=""/);
    const copies = html.split('action-bar__measure-row')[1];
    expect(copies).not.toContain('data-action-id');
    expect(copies.match(/tabindex="-1"/g)).toHaveLength(6);
  });

  it('folds into More past keep', () => {
    const folded = renderToString(h(ActionBar, { actions: ACTIONS, keep: 1, size: 'sm' })).split('action-bar__measure')[0];
    expect([...folded.matchAll(/data-action-id="(\w+)"/g)].map((match) => match[1])).toEqual(['reset', 'save']);
    expect(folded).toContain('aria-label="More"');
  });
});

describe('ActionBar More button', () => {
  it('takes the height of a md button and its icon size, and is measured with the same class', () => {
    const css = readFileSync(new URL('../src/composites/ActionBar/ActionBar.css', import.meta.url), 'utf8');
    expect(css).toMatch(/\.action-bar\[data-size='md'\] \.action-bar__more \{\s+inline-size: var\(--control-h-md\);\s+block-size: var\(--control-h-md\);\s+font-size: var\(--text-lg\);/);
    const measured = renderToString(h(ActionBar, { actions: ACTIONS, keep: 1 })).split('action-bar__measure').slice(1).join('');
    expect(measured).toMatch(/class="icon-btn icon-btn--secondary icon-btn--toned icon-btn--md action-bar__more"/);
  });
});
