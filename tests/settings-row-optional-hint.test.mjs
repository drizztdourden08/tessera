/* @layer tooling-scripts @kind test */
import { createElement as h } from 'react';
import { renderToString } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { SettingsRow } from '../src/composites/SettingsRow';

const noop = () => undefined;
const draw = (extra = {}) => renderToString(h(SettingsRow, {
  id: 'clip', title: 'Ledge clip', description: 'What it does.', input: { kind: 'toggle', value: true, onChange: noop }, ...extra,
}));

describe('the optional hint', () => {
  it('draws the hint line when there is a hint', () => {
    const html = draw({ hint: 'Speedruns rely on it.' });
    expect(html).toContain('settings-row__line');
    expect(html).toContain('Speedruns rely on it.');
  });

  it.each([undefined, '', '   '])('draws no hint element when the hint is %j', (hint) => {
    const html = draw({ hint });
    expect(html).not.toContain('settings-row__line');
    expect(html).not.toContain('settings-row__resting');
    expect(html).not.toContain('settings-row__hint"');
    expect(html).not.toContain('settings-row__sizer');
  });

  it('draws no hint element on a compact or read only row without a hint', () => {
    expect(draw({ compact: true })).not.toContain('settings-row__line');
    expect(draw({ readOnly: true })).not.toContain('settings-row__line');
  });
});
