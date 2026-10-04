/* @layer tooling-scripts @kind test */
import { createElement as h } from 'react';
import { renderToString } from 'react-dom/server';
import { describe, expect, it, vi } from 'vitest';
import { FactsPanel } from '../src/composites/FactsPanel';
import { Slider } from '../src/primitives/Slider';
import { StatRow } from '../src/primitives/StatRow';
import { copyText } from '../src/primitives/StatRow/behavior/copy-text';
import { enterKeyDown } from '../src/primitives/TextInput/behavior/enter-key-down';

const keyEvent = (key, extra = {}) => ({ key, defaultPrevented: false, nativeEvent: { isComposing: false }, currentTarget: { value: 'say hi' }, ...extra });

describe('onEnter', () => {
  it('gets the value on Enter, after the onKeyDown of the host', () => {
    const order = [];
    const handler = enterKeyDown(() => order.push('keydown'), (value) => order.push(value));
    handler(keyEvent('Enter'));
    handler(keyEvent('a'));
    expect(order).toEqual(['keydown', 'say hi', 'keydown']);
  });

  it('skips Enter while an input method composes or once the host prevented it', () => {
    const onEnter = vi.fn();
    const handler = enterKeyDown(undefined, onEnter);
    handler(keyEvent('Enter', { nativeEvent: { isComposing: true } }));
    handler(keyEvent('Enter', { defaultPrevented: true }));
    expect(onEnter).not.toHaveBeenCalled();
    expect(enterKeyDown(undefined, undefined)).toBeUndefined();
  });
});

describe('Slider input', () => {
  it('puts a NumberInput with the same value and bounds at its end, in place of the text value', () => {
    const html = renderToString(h(Slider, { value: 30, min: 0, max: 100, step: 5, input: true, 'aria-label': 'Hint cost' }));
    expect(html).toContain('<input type="number" class="number-input__field" min="0" max="100" step="5" aria-label="Hint cost" value="30"/>');
    expect(html).toContain('slider__number');
    expect(html).not.toContain('slider__value');
    expect(renderToString(h(Slider, { value: 30, 'aria-label': 'Cost' }))).toContain('slider__value');
  });
});

describe('StatRow and FactsPanel values', () => {
  it('copies the text value, or the string copyable names', () => {
    expect(copyText('127.0.0.1', true)).toBe('127.0.0.1');
    expect(copyText(42, true)).toBe('42');
    expect(copyText(h('b', null, 'x'), true)).toBeUndefined();
    expect(copyText(h('b', null, 'x'), 'seed 12')).toBe('seed 12');
    expect(copyText('x', undefined)).toBeUndefined();
  });

  it('draws a copy button named after the row', () => {
    const html = renderToString(h(StatRow, { label: 'Seed', value: '2193', copyable: true }));
    expect(html).toContain('aria-label="Copy Seed"');
    expect(renderToString(h(StatRow, { label: 'Seed', value: '2193' }))).not.toContain('stat-row__copy');
  });

  it('draws a StatRow at md by default, or at the size it is given', () => {
    expect(renderToString(h(StatRow, { label: 'Seed', value: '2193' }))).toContain('class="stat-row" data-size="md"');
    expect(renderToString(h(StatRow, { label: 'Seed', value: '2193', size: 'lg' }))).toContain('data-size="lg"');
  });

  it('lays the facts out inline by default, or as rows or boxes', () => {
    const groups = [[{ label: 'Seed', value: '12', copyable: true }]];
    expect(renderToString(h(FactsPanel, { groups }))).toContain('class="facts-panel facts-panel--inline"');
    expect(renderToString(h(FactsPanel, { groups, layout: 'boxed' }))).toContain('class="facts-panel facts-panel--boxed"');
    expect(renderToString(h(FactsPanel, { groups, layout: 'rows' }))).toContain('Copy Seed');
  });
});
