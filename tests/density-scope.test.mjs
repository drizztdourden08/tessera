/* @layer tooling-scripts @kind test */
import { readFileSync } from 'node:fs';
import { createElement as h } from 'react';
import { renderToString } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { Button } from '../src/primitives/Button';
import { Checkbox } from '../src/primitives/Checkbox';
import { Combobox } from '../src/primitives/Combobox';
import { DensityScope } from '../src/primitives/DensityScope';
import { Field } from '../src/primitives/Field';
import { NumberInput } from '../src/primitives/NumberInput';
import { SegmentedControl } from '../src/primitives/SegmentedControl';
import { Select } from '../src/primitives/Select';
import { Slider } from '../src/primitives/Slider';
import { TextInput } from '../src/primitives/TextInput';
import { Toggle } from '../src/primitives/Toggle';

const noop = () => undefined;
const ITEMS = ['Light World', 'Dark World'];
const FLOWS = [{ value: 'row', label: 'Row' }, { value: 'column', label: 'Column' }];
const compact = (...children) => renderToString(h(DensityScope, { density: 'compact' }, ...children));
const css = (path) => readFileSync(new URL(`../src/${path}`, import.meta.url), 'utf8');

describe('DensityScope', () => {
  it('draws every form part inside at sm', () => {
    const parts = [
      h(TextInput, {}),
      h(NumberInput, { value: 4, onChange: noop }),
      h(Select, { items: ITEMS, value: null, onChange: noop }),
      h(Combobox, { items: ITEMS, value: null, onChange: noop }),
      h(Checkbox, { checked: true, onChange: noop }),
      h(Toggle, { checked: true, onChange: noop, label: 'Visible' }),
      h(Slider, { value: 4, onChange: noop, 'aria-label': 'Width' }),
      h(SegmentedControl, { value: 'row', options: FLOWS, onChange: noop, 'aria-label': 'Flow' }),
    ];
    for (const part of parts) {
      const html = compact(part);
      expect(html).toContain('control-size--sm');
      expect(html).not.toContain('control-size--md');
    }
  });

  it('draws a Button at sm, and at md with no scope', () => {
    expect(compact(h(Button, {}, 'Apply'))).toContain('btn--sm');
    expect(renderToString(h(Button, {}, 'Apply'))).toContain('btn--md');
  });

  it('lets the own size and the size of a Field win', () => {
    expect(compact(h(TextInput, { size: 'md' }))).toContain('text-input control-size--md');
    expect(compact(h(Field, { label: 'Name', size: 'md' }, h(TextInput, {})))).toContain('text-input control-size--md');
    expect(compact(h(Button, { size: 'md' }, 'Apply'))).toContain('btn--md');
  });

  it('comes back to the usual size inside a comfortable scope', () => {
    const html = compact(h(DensityScope, { density: 'comfortable' }, h(TextInput, {})));
    expect(html).toContain('text-input control-size--md');
    expect(html).toContain('data-density="comfortable"');
  });

  it('marks its box with the density and draws no box of its own', () => {
    expect(compact(h(TextInput, {}))).toMatch(/^<div class="density-scope" data-density="compact">/);
    expect(css('primitives/DensityScope/DensityScope.css')).toMatch(/\.density-scope \{\s+display: contents;/);
  });
});

describe('density tokens', () => {
  it('reads each density token with the usual value as the fallback', () => {
    expect(css('primitives/Slider/Slider.css')).toContain('gap: var(--density-gap, var(--space-lg));');
    expect(css('primitives/Slider/Slider.css')).toContain('gap: var(--density-gap, var(--space-sm));');
    expect(css('primitives/Checkbox/Checkbox.css')).toContain('gap: var(--density-gap, var(--space-sm));');
    expect(css('theme/segment-group.css')).toContain('gap: var(--density-gap, var(--space-lg));');
    const overlay = css('composites/DisabledOverlay/DisabledOverlay.css');
    expect(overlay).toContain('padding: var(--density-pad, var(--space-md));');
    expect(overlay).toContain('font-weight: var(--density-message-weight, var(--weight-semi));');
  });

  it('sets the tokens in a compact scope and clears them in a comfortable one', () => {
    const scope = css('primitives/DensityScope/DensityScope.css');
    expect(scope).toMatch(/\[data-density='compact'\] \{\s+--density-gap: var\(--space-xs\);/);
    expect(scope).toMatch(/\[data-density='comfortable'\] \{\s+--density-gap: var\(--density-unset\);/);
  });
});
