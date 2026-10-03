/* @layer tooling-scripts @kind test */
import { createElement as h } from 'react';
import { renderToString } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { Checkbox } from '../src/primitives/Checkbox';
import { Combobox } from '../src/primitives/Combobox';
import { Field } from '../src/primitives/Field';
import { NumberInput } from '../src/primitives/NumberInput';
import { Select } from '../src/primitives/Select';
import { NumberStepper } from '../src/primitives/NumberStepper';
import { TextInput } from '../src/primitives/TextInput';

const noop = () => undefined;
const ITEMS = ['Light World', 'Dark World'];

describe('control sizes', () => {
  it('draws every text box at md unless told otherwise', () => {
    const controls = [
      h(TextInput, {}),
      h(NumberInput, { value: 4, onChange: noop }),
      h(NumberStepper, { value: 4, onChange: noop }),
      h(Select, { items: ITEMS, value: null, onChange: noop }),
      h(Combobox, { items: ITEMS, value: null, onChange: noop }),
      h(Checkbox, { checked: true, onChange: noop }),
    ];
    for (const control of controls) expect(renderToString(control)).toContain('control-size--md');
  });

  it('takes sm from its own prop', () => {
    expect(renderToString(h(TextInput, { size: 'sm' }))).toContain('text-input control-size--sm');
    expect(renderToString(h(Select, { size: 'sm', items: ITEMS, value: null, onChange: noop }))).toContain('control-size--sm');
  });

  it('takes the size of the Field around it, and its own size wins', () => {
    const inherited = renderToString(h(Field, { label: 'Name', size: 'sm' }, h(TextInput, {})));
    expect(inherited).toContain('text-input control-size--sm');
    const own = renderToString(h(Field, { label: 'Name', size: 'sm' }, h(TextInput, { size: 'md' })));
    expect(own).toContain('text-input control-size--md');
  });
});
