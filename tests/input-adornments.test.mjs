/* @layer tooling-scripts @kind test */
import { createElement as h } from 'react';
import { renderToString } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { SideNav } from '../src/composites/SideNav';
import { Field } from '../src/primitives/Field';
import { NumberInput } from '../src/primitives/NumberInput';
import { SearchInput } from '../src/primitives/SearchInput';
import { TextInput } from '../src/primitives/TextInput';

const noop = () => undefined;
const REVEAL = { icon: 'eye', label: 'Show password', onClick: noop };

describe('TextInput icons', () => {
  it('stays a bare input with no icon', () => {
    const html = renderToString(h(TextInput, { className: 'mine' }));
    expect(html).toMatch(/^<input class="text-input control-size--md mine"/);
    expect(html).not.toContain('text-input-frame');
  });

  it('frames the input and moves className to the frame', () => {
    const html = renderToString(h(TextInput, { className: 'mine', size: 'sm', start: { icon: 'mail' } }));
    expect(html).toMatch(/^<span class="text-input-frame control-size--sm text-input-frame--start mine">/);
    expect(html).toContain('<input class="text-input"');
    expect(html).toContain('text-input-frame__slot--start');
    expect(html).toContain('aria-hidden="true"');
  });

  it('draws a labelled button for an icon with onClick', () => {
    const html = renderToString(h(TextInput, { end: REVEAL }));
    expect(html).toContain('text-input-frame--end');
    expect(html).toMatch(/<button[^>]*aria-label="Show password"/);
    expect(html).not.toMatch(/<button[^>]*disabled/);
  });

  it('disables the buttons of a disabled or read-only input', () => {
    for (const lock of [{ disabled: true }, { readOnly: true }]) {
      expect(renderToString(h(TextInput, { end: REVEAL, ...lock }))).toMatch(/<button[^>]*disabled/);
    }
  });

  it('names a decorative icon that has a label', () => {
    expect(renderToString(h(TextInput, { start: { icon: 'lock', label: 'Locked' } }))).toContain('role="img" aria-label="Locked"');
  });
});

describe('NumberInput icons', () => {
  it('puts a slot before the field', () => {
    const html = renderToString(h(NumberInput, { value: 4, onChange: noop, start: { icon: 'clock' } }));
    expect(html.indexOf('number-input__slot')).toBeLessThan(html.indexOf('number-input__field'));
  });
});

describe('SearchInput', () => {
  it('is a search field with the table placeholder and name', () => {
    const html = renderToString(h(SearchInput, { value: '', onChange: noop }));
    expect(html).toContain('type="search"');
    expect(html).toContain('placeholder="Search..."');
    expect(html).toContain('aria-label="Search"');
    expect(html).toContain('text-input-frame--start');
    expect(html).not.toContain('<button');
  });

  it('shows the clear button once there is a query', () => {
    const html = renderToString(h(SearchInput, { value: 'zelda', onChange: noop, size: 'sm' }));
    expect(html).toMatch(/<button[^>]*aria-label="Clear search"/);
    expect(html).toContain('control-size--sm');
  });

  it('leaves the name to the label of its Field', () => {
    const html = renderToString(h(Field, { label: 'Find' }, h(SearchInput, { value: '', onChange: noop })));
    expect(html).not.toContain('aria-label="Search"');
  });
});

describe('SideNav lead row', () => {
  const item = { id: 'a', label: 'Sessions', icon: null };
  const groups = [{ id: 'play', label: 'Play', items: [item] }];
  const nav = (extra) => renderToString(h(SideNav, { config: { groups }, activeId: 'a', onSelect: noop, ...extra }));

  it('names the first row the chevron lines up with', () => {
    expect(nav({ search: { value: '', onChange: noop, placeholder: 'Search' } })).toContain('side-nav--lead-search');
    expect(nav({})).toContain('side-nav--lead-item');
    expect(nav({ defaultOpen: true })).toContain('side-nav--lead-label');
    expect(nav({ defaultOpen: true, config: { home: item, groups } })).toContain('side-nav--lead-item');
  });
});
