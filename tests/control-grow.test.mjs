/* @layer tooling-scripts @kind test */
import fs from 'node:fs';
import { createElement as h } from 'react';
import { renderToString } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { growClass } from '../src/primitives/field-control/grow-class';
import { Combobox } from '../src/primitives/Combobox';
import { NativeSelect, Select } from '../src/primitives/Select';
import { SearchInput } from '../src/primitives/SearchInput';
import { TextInput } from '../src/primitives/TextInput';

const noop = () => undefined;
const OPTIONS = [{ value: 'name', label: 'Name' }];
const rootClass = (html) => html.match(/^<\w+[^>]*?class="([^"]+)"/)?.[1] ?? '';

describe('grow on a field control', () => {
  it('adds control-inline only for grow={false}', () => {
    expect(growClass(undefined)).toBe('');
    expect(growClass(true, 'search-input')).toBe('search-input');
    expect(growClass(false)).toBe('control-inline');
    expect(growClass(false, 'search-input ')).toBe('control-inline search-input');
  });

  it('puts it on the frame of a SearchInput and leaves the default markup as it was', () => {
    const plain = renderToString(h(SearchInput, { value: '', onChange: noop }));
    expect(plain).not.toContain('control-inline');
    expect(rootClass(plain)).toBe('text-input-frame control-size--md text-input-frame--start search-input ');
    const inline = renderToString(h(SearchInput, { value: '', onChange: noop, grow: false, size: 'sm' }));
    expect(rootClass(inline)).toBe('text-input-frame control-size--sm text-input-frame--start control-inline search-input');
    expect(inline).not.toMatch(/ grow=/);
  });

  it('puts it on a plain TextInput, the Select trigger, a NativeSelect and the Combobox field', () => {
    expect(rootClass(renderToString(h(TextInput, { grow: false, defaultValue: '' })))).toBe('text-input control-size--md control-inline');
    expect(renderToString(h(Select, { options: OPTIONS, value: 'name', onChange: noop, grow: false, 'aria-label': 'Sort' }))).toMatch(/class="select-trigger listbox-anchor control-size--md control-inline"/);
    expect(rootClass(renderToString(h(NativeSelect, { grow: false }, h('option', null, 'A'))))).toBe('select control-size--md control-inline');
    expect(rootClass(renderToString(h(NativeSelect, null, h('option', null, 'A'))))).toBe('select control-size--md ');
    expect(renderToString(h(Combobox, { items: ['a'], grow: false, 'aria-label': 'Tag' }))).toMatch(/class="combobox listbox-anchor control-size--md control-inline"/);
  });

  it('takes a set width from a token that shrinks to a smaller one, through one rule for every field surface', () => {
    const css = fs.readFileSync('src/theme/field-surface.css', 'utf8');
    expect(css).toMatch(/:is\(\.select, \.select-trigger, \.combobox, \.text-input, \.text-input-frame\)\.control-inline \{\s+flex: 0 1 var\(--field-w-inline\);\s+inline-size: var\(--field-w-inline\);\s+min-inline-size: var\(--field-w-inline-min\);\s+max-inline-size: 100%;/);
    const sizes = fs.readFileSync('src/tokens/size.css', 'utf8');
    expect(sizes).toContain('--field-w-inline: var(--size-256);');
    expect(sizes).toContain('--field-w-inline-min: var(--size-160);');
  });
});
