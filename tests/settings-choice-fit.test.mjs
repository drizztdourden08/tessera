/* @layer tooling-scripts @kind test */
import { createElement as h } from 'react';
import { renderToString } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { SettingsRow } from '../src/composites/SettingsRow';
import { choiceRoom } from '../src/composites/SettingsRow/behavior/choice-room';

const OPTIONS = ['Disabled', 'Enabled', 'Auto', 'Auto and enabled', 'After goal'].map((label) => ({ value: label.toLowerCase(), label }));
const row = (compact) => h(SettingsRow, {
  id: 'release', title: 'Release mode', hint: 'When items go out.', noDescription: true, compact,
  input: { kind: 'segmented', value: 'auto', onChange: () => undefined, options: OPTIONS },
});

describe('the room a SettingsRow choice gets', () => {
  it('is the whole content width in a full row, where the control can wrap under the text', () => {
    expect(choiceRoom({ width: 400, paddingInline: 32, gap: 24, title: 120 }, false)).toBe(368);
  });

  it('leaves the title its width in a compact row, up to half the row', () => {
    expect(choiceRoom({ width: 332, paddingInline: 32, gap: 12, title: 100 }, true)).toBe(188);
    expect(choiceRoom({ width: 332, paddingInline: 32, gap: 12, title: 400 }, true)).toBe(138);
  });

  it('never goes below zero', () => {
    expect(choiceRoom({ width: 10, paddingInline: 32, gap: 12, title: 0 }, true)).toBe(0);
  });
});

describe('a segmented SettingsRow', () => {
  it('draws the segmented control first, with a hidden probe that measures it', () => {
    for (const compact of [false, true]) {
      const html = renderToString(row(compact));
      expect(html).toContain('class="settings-row__fit" aria-hidden="true" inert=""');
      expect(html.match(/role="radiogroup"/g)).toHaveLength(2);
      expect(html).not.toContain('settings-row__fit-select');
    }
  });
});
