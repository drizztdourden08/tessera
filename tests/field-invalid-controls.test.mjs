/* @layer tooling-scripts @kind test */
import { readFileSync } from 'node:fs';
import { createElement as h } from 'react';
import { renderToString } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { Checkbox } from '../src/primitives/Checkbox';
import { DropZone } from '../src/primitives/DropZone';
import { Field } from '../src/primitives/Field';

const noop = () => undefined;
const css = (path) => readFileSync(new URL(`../${path}`, import.meta.url), 'utf8');
const inField = (control, error) => renderToString(h(Field, { label: 'Terms', error }, control));
const checkbox = h(Checkbox, { checked: false, onChange: noop, label: 'I read the rules' });
const zone = h(DropZone, { onDrop: noop });

describe('Checkbox in an erroring Field', () => {
  it('marks the box invalid and points it at the error', () => {
    const html = inField(checkbox, 'Tick the box to join.');
    const note = /<span[^>]*id="([^"]+)"[^>]*>Tick the box to join\.<\/span>/.exec(html);
    expect(note).not.toBeNull();
    expect(html).toMatch(new RegExp(`<input[^>]*aria-invalid="true"[^>]*aria-describedby="${note[1]}"`));
  });

  it('stays plain without an error or a Field', () => {
    expect(inField(checkbox)).not.toContain('aria-invalid');
    expect(renderToString(checkbox)).not.toContain('aria-invalid');
  });

  it('draws a red outline around the box', () => {
    expect(css('src/primitives/Checkbox/Checkbox.css')).toMatch(/\.checkbox__input\[aria-invalid='true'\] \{\s*outline: var\(--border-width-thin\) solid var\(--c-danger\);/);
  });
});

describe('DropZone in an erroring Field', () => {
  it('marks the zone invalid', () => {
    expect(inField(zone, 'Drop a ROM first.')).toMatch(/<div class="dropzone[^"]*"[^>]*data-invalid=""/);
    expect(inField(zone)).not.toContain('data-invalid');
  });

  it('draws a red edge that holds on hover and gives way to a drag', () => {
    expect(css('src/primitives/DropZone/DropZone.css')).toMatch(/\.dropzone\[data-invalid\]:not\(\.dropzone--active\),\s*\.dropzone\[data-invalid\]:not\(\.dropzone--active\):hover \{\s*border-color: var\(--c-danger\);/);
  });

  it('keeps the label colour of the Field', () => {
    expect(css('src/primitives/Field/Field.css')).not.toContain('invalid');
  });
});
