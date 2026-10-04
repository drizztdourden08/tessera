/* @layer tooling-scripts @kind test */
import { createElement as h } from 'react';
import { renderToString } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { SettingsRow } from '../src/composites/SettingsRow';

describe('a number SettingsRow', () => {
  it('draws a compact NumberInput with its bounds and unit, and no field label', () => {
    const html = renderToString(h(SettingsRow, {
      id: 'port', title: 'Local port', hint: 'Players connect here.', noDescription: true,
      input: { kind: 'number', value: 38281, onChange: () => undefined, min: 1024, max: 65535, unit: 'TCP' },
    }));
    expect(html).toContain('data-kind="number"');
    expect(html).toMatch(/<span class="[^"]*settings-row__number[^"]*"><div class="number-input /);
    expect(html).toContain('min="1024" max="65535"');
    expect(html).toMatch(/>TCP<\/span><\/span>/);
    expect(html).not.toContain('field__label');
  });
});
