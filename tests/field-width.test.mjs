/* @layer tooling-scripts @kind test */
import { readFileSync } from 'node:fs';
import { createElement as h } from 'react';
import { renderToString } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { Field } from '../src/primitives/Field';
import { SearchInput } from '../src/primitives/SearchInput';
import { Select } from '../src/primitives/Select';

const css = (path) => readFileSync(new URL(`../${path}`, import.meta.url), 'utf8');
const field = (props = {}) => renderToString(h(Field, { label: 'Server port', ...props }, h('input')));

describe('Field width', () => {
  it('caps a field at md by default', () => {
    expect(field()).toMatch(/class="field control-size--md field--width-md"/);
  });

  it('takes sm for a short value and full for the whole row', () => {
    expect(field({ width: 'sm' })).toContain('field--width-sm');
    expect(field({ width: 'full', inline: true, className: 'own' })).toMatch(/class="field control-size--md field--width-full field--inline own"/);
  });

  it('caps sm at 256 px and md at 512 px, and leaves full alone', () => {
    const sheet = css('src/primitives/Field/Field.css');
    expect(sheet).toMatch(/\.field--width-sm \{\s*max-inline-size: var\(--field-w-sm\);/);
    expect(sheet).toMatch(/\.field--width-md \{\s*max-inline-size: var\(--field-w-md\);/);
    expect(sheet).not.toContain('field--width-full');
    const sizes = css('src/tokens/size.css');
    expect(sizes).toContain('--field-w-sm: var(--size-256);');
    expect(sizes).toContain('--field-w-md: var(--size-512);');
  });
});

describe('StatRow on a wide row', () => {
  it('stops at 512 px so the value stays near its label', () => {
    expect(css('src/primitives/StatRow/StatRow.css')).toMatch(/\.stat-row \{[^}]*max-inline-size: var\(--stat-row-max-w\);/);
    expect(css('src/tokens/size.css')).toContain('--stat-row-max-w: var(--size-512);');
  });
});

describe('Field width option', () => {
  it('adds no width class by default', () => {
    expect(renderToString(h(Select, { options: [{ value: 'a', label: 'A' }], value: 'a', onChange: () => undefined, 'aria-label': 's' }))).not.toContain('control-fit');
  });

  it('fits the content of a Select with width fit', () => {
    const html = renderToString(h(Select, { options: [{ value: 'a', label: 'A' }], value: 'a', onChange: () => undefined, 'aria-label': 's', width: 'fit' }));
    expect(html).toContain('control-fit');
  });

  it('gives a SearchInput the narrow width with width narrow', () => {
    const html = renderToString(h(SearchInput, { value: '', onChange: () => undefined, width: 'narrow' }));
    expect(html).toContain('control-narrow');
  });

  it('keeps the narrow width at 220 px in a token', () => {
    expect(css('src/tokens/size.css')).toContain('--field-w-narrow: calc(220 * var(--size-1))');
    expect(css('src/theme/field-surface.css')).toMatch(/\.control-narrow \{[^}]*var\(--field-w-narrow\)/);
  });
});
