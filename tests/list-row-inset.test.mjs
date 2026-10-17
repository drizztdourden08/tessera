/* @layer tooling-scripts @kind test */
import { readFileSync } from 'node:fs';
import { createElement as h } from 'react';
import { renderToString } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { CheckList } from '../src/composites/CheckList';
import { FileList } from '../src/composites/FileList';
import { ItemList } from '../src/composites/ItemList';
import { ListItemRow } from '../src/composites/ListItemRow';
import { mediaWidth } from '../src/composites/ListItemRow/behavior/media-width';

const css = (path) => readFileSync(new URL(`../src/${path}`, import.meta.url), 'utf8');
const SAVES = [{ id: 'a', name: 'Before the palace' }, { id: 'b', name: 'Hookshot in hand' }];
const saves = (props) => renderToString(h(ItemList, { title: 'Saves', items: SAVES, getId: (s) => s.id, getName: (s) => s.name, ...props }));

describe('row inset', () => {
  it('takes the inline padding of a Button from one token, sm in a compact scope', () => {
    expect(css('tokens/size.css')).toMatch(/--row-inset: var\(--control-pad-md\);/);
    expect(css('primitives/Button/Button.css')).toMatch(/padding: var\(--space-sm\) var\(--control-pad-md\);/);
    expect(css('primitives/DensityScope/DensityScope.css')).toMatch(/--row-inset: var\(--control-pad-sm\);/);
    expect(css('theme/row-inset.css')).toMatch(/\.row-inset \{\n {2}padding-inline: var\(--row-inset\);/);
  });

  it('puts every kind of list row through the one rule', () => {
    expect(renderToString(h(ListItemRow, { name: 'Walk' }))).toMatch(/class="list-item-row row-inset/);
    expect(renderToString(h(ListItemRow, { name: 'Walk', onClick: () => undefined }))).toContain('list-item-row__main row-inset');
    expect(renderToString(h(CheckList, { checks: [{ id: 'rom', label: 'ROM found', state: 'pass' }] }))).toContain('check-list__row row-inset');
    expect(renderToString(h(FileList, { files: [{ path: 'C:/saves/one.srm' }] }))).toContain('file-list__row row-inset');
    expect(css('theme/listbox-drop.css')).toMatch(/\.listbox-drop\[data-size='sm'\] \{\n(?: {2}\/\*.*\*\/\n)? {2}--row-inset: var\(--control-pad-sm\);/);
  });
});

describe('dropdown join', () => {
  it('drops the trigger edge where the list meets it and lets options fill the width', () => {
    const drop = css('theme/listbox-drop.css');
    expect(drop).toMatch(/\.listbox-anchor\[data-drop='down'\]:is\(:hover, :focus, :focus-within\) \{\n {2}border-bottom-color: transparent;/);
    expect(drop).not.toContain('scrollbar-gutter');
    expect(css('primitives/listbox/ListboxList.tsx')).toContain('scrollbar="slim"');
  });
});

describe('row media', () => {
  it('sizes the picture from the row height and an aspect, or a set width', () => {
    expect(mediaWidth({}, 58)).toBe(103);
    expect(mediaWidth({ aspect: 1 }, 58)).toBe(58);
    expect(mediaWidth({ width: 48, aspect: 2 }, 58)).toBe(48);
  });

  it('draws the media slot first in the row and marks the row', () => {
    const html = renderToString(h(ListItemRow, { name: 'Save', media: h('img', { alt: '' }), mediaWidth: 48, onClick: () => undefined }));
    expect(html).toContain('list-item-row--media');
    expect(html).toContain('--list-item-media-w:48px');
    expect(html.indexOf('list-item-row__media')).toBeLessThan(html.indexOf('list-item-row__primary'));
  });
});

describe('ItemList renameInline', () => {
  it('puts a pen after the name in place of the rename button', () => {
    const html = saves({ onRename: () => undefined, renameInline: true, selectedId: 'a', onSelect: () => undefined });
    expect(html.match(/list-item-row__name-action/g)).toHaveLength(2);
    expect(html.match(/aria-label="Rename Before the palace"/g)).toHaveLength(1);
    expect(html).not.toContain('item-list__tools');
  });

  it('keeps the rename button without it', () => {
    const html = saves({ onRename: () => undefined, selectedId: 'a', onSelect: () => undefined });
    expect(html).not.toContain('list-item-row__name-action');
    expect(html).toContain('item-list__tools');
  });
});
