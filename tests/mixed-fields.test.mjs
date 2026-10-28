/* @layer tooling-scripts @kind test */
import { createElement as h } from 'react';
import { readFileSync } from 'node:fs';
import { renderToString } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { Checkbox } from '../src/primitives/Checkbox';
import { NumberInput } from '../src/primitives/NumberInput';
import { Select } from '../src/primitives/Select';
import { Slider } from '../src/primitives/Slider';
import { TextInput } from '../src/primitives/TextInput';
import { ToggleGroup } from '../src/primitives/ToggleGroup';

const noop = () => undefined;
const options = [{ value: 'a', label: 'Alpha' }, { value: 'b', label: 'Beta' }];

describe('a Mixed state on the field primitives', () => {
  it('TextInput shows the Mixed placeholder with no text, and its own value after the new one is set', () => {
    const mixed = renderToString(h(TextInput, { value: 'kept', onChange: noop, mixed: true, 'aria-label': 'Name' }));
    expect(mixed).toContain('placeholder="Mixed"');
    expect(mixed).toContain('data-mixed="true"');
    expect(mixed).toContain('value=""');
    expect(mixed).not.toContain('kept');
    const cleared = renderToString(h(TextInput, { value: 'kept', onChange: noop, mixed: false, 'aria-label': 'Name' }));
    expect(cleared).toContain('value="kept"');
    expect(cleared).not.toContain('data-mixed');
  });

  it('NumberInput shows the Mixed placeholder with no number, and the number once the state is cleared', () => {
    const mixed = renderToString(h(NumberInput, { value: 12, onChange: noop, mixed: true, 'aria-label': 'Width' }));
    expect(mixed).toContain('placeholder="Mixed"');
    expect(mixed).toContain('data-mixed="true"');
    expect(mixed).not.toContain('value="12"');
    expect(renderToString(h(NumberInput, { value: 12, onChange: noop, 'aria-label': 'Width' }))).toContain('value="12"');
  });

  it('Select shows Mixed in place of the chosen option, and the option again when cleared', () => {
    const mixed = renderToString(h(Select, { options, value: 'a', onChange: noop, mixed: true, 'aria-label': 'Kind' }));
    expect(mixed).toContain('select-trigger--mixed');
    expect(mixed).toContain('>Mixed<');
    expect(mixed).not.toContain('Alpha');
    expect(renderToString(h(Select, { options, value: 'a', onChange: noop, 'aria-label': 'Kind' }))).toContain('Alpha');
  });

  it('Checkbox maps mixed to the indeterminate state of the input', () => {
    const source = readFileSync(new URL('../src/primitives/Checkbox/Checkbox.tsx', import.meta.url), 'utf8');
    expect(source).toContain('inputRef.current.indeterminate = indeterminate || mixed;');
    expect(renderToString(h(Checkbox, { checked: true, onChange: noop, label: 'Visible', mixed: true }))).toContain('type="checkbox"');
  });

  it('Slider shows Mixed for the readout and the value text, and hides the fill', () => {
    const mixed = renderToString(h(Slider, { value: 40, onChange: noop, mixed: true, 'aria-label': 'Opacity' }));
    expect(mixed).toContain('slider--mixed');
    expect(mixed).toContain('>Mixed<');
    expect(mixed).toContain('aria-valuetext="Mixed"');
    const range = renderToString(h(Slider, { range: true, value: [10, 60], onChange: noop, mixed: true, 'aria-label': 'Span' }));
    expect(range).toContain('slider--mixed');
    const plain = renderToString(h(Slider, { value: 40, onChange: noop, 'aria-label': 'Opacity' }));
    expect(plain).not.toContain('slider--mixed');
    expect(plain).toContain('aria-valuetext="40"');
  });

  it('ToggleGroup marks an option that is on for only some of the selection as mixed, and a pressed one wins', () => {
    const choices = [{ value: 'bold', label: 'Bold' }, { value: 'italic', label: 'Italic' }, { value: 'under', label: 'Underline' }];
    const html = renderToString(h(ToggleGroup, { value: ['bold'], mixed: ['bold', 'italic'], options: choices, onChange: noop }));
    expect(html.match(/aria-pressed="mixed"/g)).toHaveLength(1);
    expect(html).toContain('toggle-group__btn--mixed');
    expect(html.match(/aria-pressed="true"/g)).toHaveLength(1);
    expect(renderToString(h(ToggleGroup, { value: [], options: choices, onChange: noop }))).not.toContain('mixed');
  });
});
