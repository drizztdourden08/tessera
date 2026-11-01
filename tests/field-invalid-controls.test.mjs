/* @layer tooling-scripts @kind test */
import { createElement as h } from 'react';
import { renderToString } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { Checkbox } from '../src/primitives/Checkbox';
import { Field } from '../src/primitives/Field';

const noop = () => undefined;
const inField = (control, error) => renderToString(h(Field, { label: 'Terms', error }, control));
const checkbox = h(Checkbox, { checked: false, onChange: noop, label: 'I read the rules' });

describe('K2 Checkbox in an erroring Field', { tags: ['critical'] }, () => {
  it('marks the box invalid and points it at the error', () => {
    const html = inField(checkbox, 'Tick the box to join.');
    const note = /<span[^>]*id="([^"]+)"[^>]*>Tick the box to join\.<\/span>/.exec(html);
    expect(note).not.toBeNull();
    expect(html).toMatch(new RegExp(`<input[^>]*aria-invalid="true"[^>]*aria-describedby="${note[1]}"`));
  });
});
