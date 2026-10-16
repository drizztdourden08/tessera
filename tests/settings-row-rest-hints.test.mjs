/* @layer tooling-scripts @kind test */
import { createElement as h } from 'react';
import { renderToString } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { SettingsRow } from '../src/composites/SettingsRow';

const noop = () => undefined;
const HINTS = { on: 'The game uses the fixed behaviour.', off: 'It keeps the original bug.' };
const draw = (input, extra = {}) => renderToString(h(SettingsRow, {
  id: 'clip', title: 'Ledge clip', noDescription: true, hint: 'Speedruns rely on it.', input: { kind: 'toggle', onChange: noop, ...input }, ...extra,
}));
const restLines = (html) => [...html.matchAll(/<small class="[^"]*settings-row__rest-line"( data-current="true")?>(.*?)<\/small>/g)];

describe('a toggle with hints at rest', () => {
  it('shows On and Off under the hint, each after its gold label, the current one marked', () => {
    const lines = restLines(draw({ value: true, hints: { ...HINTS, atRest: true } }));
    expect(lines).toHaveLength(2);
    expect(lines[0][2]).toMatch(/<strong class="[^"]*settings-row__hint-label[^"]*">On<\/strong> <span[^>]*>The game uses the fixed behaviour\.<\/span>/);
    expect(lines[1][2]).toMatch(/settings-row__hint-label[^"]*">Off<\/strong> <span[^>]*>It keeps the original bug\.<\/span>/);
    expect(lines.map((line) => line[1] !== undefined)).toEqual([true, false]);
  });

  it('marks Off as current when the toggle is off, and draws the other line in the muted tone', () => {
    const lines = restLines(draw({ value: false, hints: { ...HINTS, atRest: true } }));
    expect(lines.map((line) => line[1] !== undefined)).toEqual([false, true]);
    expect(lines[0][2]).toContain('text-el--tone-muted');
    expect(lines[1][2]).not.toContain('text-el--tone-muted');
  });

  it('keeps room in the hint line for the row hint only, since On and Off already show', () => {
    const html = draw({ value: true, hints: { ...HINTS, atRest: true } });
    expect(html.match(/settings-row__sizer/g)).toHaveLength(1);
    expect(html).toMatch(/settings-row__sizer" aria-hidden="true"><span[^>]*>Speedruns rely on it\.<\/span>/);
  });

  it('changes nothing without atRest, and draws no rest lines on a compact row', () => {
    const plain = draw({ value: true, hints: HINTS });
    expect(plain).not.toContain('settings-row__rest"');
    expect(plain.match(/settings-row__sizer/g)).toHaveLength(3);
    expect(draw({ value: true, hints: { ...HINTS, atRest: true } }, { compact: true })).not.toContain('settings-row__rest"');
  });
});
