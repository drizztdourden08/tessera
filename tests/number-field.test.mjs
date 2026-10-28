/* @layer tooling-scripts @kind test */
import { createElement as h } from 'react';
import { renderToString } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { ladderStep } from '../src/composites/NumberField/behavior/ladder-step';
import { presetOf } from '../src/composites/NumberField/behavior/preset-of';
import { stepNumber } from '../src/composites/NumberField/behavior/step-number';
import { NumberField } from '../src/composites/NumberField';
import { NumberInput } from '../src/primitives/NumberInput';

const ZOOM = [25, 50, 100, 200, 400, 800, 1600, 3200, 6400, 12800];
const config = { step: 1, fineStep: 0.1, fine: false };
const noop = () => undefined;

describe('stepNumber', () => {
  it('steps by the step, or by the fine step while Shift is down, and clamps', () => {
    expect(stepNumber(10, 1, config)).toBe(11);
    expect(stepNumber(10, -3, config)).toBe(7);
    expect(stepNumber(10, 1, { ...config, fine: true })).toBe(10.1);
    expect(stepNumber(0.3, 1, { ...config, fine: true })).toBe(0.4);
    expect(stepNumber(99, 5, { ...config, max: 100 })).toBe(100);
    expect(stepNumber(1, -5, { ...config, min: 0 })).toBe(0);
  });

  it('starts from the minimum, or zero, when the value is not a number', () => {
    expect(stepNumber(Number.NaN, 1, { ...config, min: 5 })).toBe(6);
    expect(stepNumber(Number.NaN, 1, config)).toBe(1);
  });

  it('goes through the stops of a ladder, and a fine step leaves the ladder', () => {
    expect(stepNumber(100, 1, { ...config, ladder: ZOOM })).toBe(200);
    expect(stepNumber(100, -1, { ...config, ladder: ZOOM })).toBe(50);
    expect(stepNumber(100, 1, { ...config, fine: true, fineStep: 1, ladder: ZOOM })).toBe(101);
  });
});

describe('ladderStep, the ZoomField recipe from 25 to 12800 percent', () => {
  it('runs the whole zoom ladder up and down and stops at the ends', () => {
    expect(ladderStep(25, 1, ZOOM)).toBe(50);
    expect(ladderStep(25, 9, ZOOM)).toBe(12800);
    expect(ladderStep(12800, 1, ZOOM)).toBe(12800);
    expect(ladderStep(25, -1, ZOOM)).toBe(25);
    expect(ladderStep(12800, -9, ZOOM)).toBe(25);
  });

  it('moves a value between two stops to the next one in the direction of the step', () => {
    expect(ladderStep(150, 1, ZOOM)).toBe(200);
    expect(ladderStep(150, -1, ZOOM)).toBe(100);
    expect(ladderStep(10, 1, ZOOM)).toBe(25);
  });

  it('takes a ladder in any order, and does nothing without stops', () => {
    expect(ladderStep(100, 1, [400, 25, 100, 200])).toBe(200);
    expect(ladderStep(7, 1, [])).toBe(7);
    expect(ladderStep(7, 0, ZOOM)).toBe(7);
  });
});

describe('presetOf', () => {
  it('turns a plain number into a preset and keeps a labelled one', () => {
    expect(presetOf(50)).toEqual({ value: 50 });
    expect(presetOf({ value: 100, label: 'Actual size' })).toEqual({ value: 100, label: 'Actual size' });
  });
});

describe('NumberField', () => {
  it('draws the label, the number input and the suffix', () => {
    const html = renderToString(h(NumberField, { value: 50, onChange: noop, label: 'Zoom', suffix: '%' }));
    expect(html).toContain('class="number-field control-size--');
    expect(html).toContain('number-field__label');
    expect(html).toContain('data-scrub="true"');
    expect(html).toContain('>Zoom<');
    expect(html).toContain('value="50"');
    expect(html).toContain('number-field__suffix');
    expect(html).toContain('aria-label="Zoom"');
  });

  it('leaves the label out, and the scrub off, when asked', () => {
    expect(renderToString(h(NumberField, { value: 1, onChange: noop, 'aria-label': 'Size' }))).not.toContain('number-field__label');
    const html = renderToString(h(NumberField, { value: 1, onChange: noop, label: 'Size', scrub: false }));
    expect(html).toContain('number-field__label');
    expect(html).not.toContain('data-scrub');
  });

  it('shows a menu button for the presets only when there are some', () => {
    const none = renderToString(h(NumberField, { value: 1, onChange: noop, 'aria-label': 'Zoom' }));
    const some = renderToString(h(NumberField, { value: 1, onChange: noop, 'aria-label': 'Zoom', presets: [25, 50, { value: 100, label: 'Fit' }] }));
    expect(none).not.toContain('aria-haspopup');
    expect(some).toContain('aria-haspopup');
    expect(some).toContain('Quick values');
  });

  it('shows the Mixed placeholder and no number while the values differ', () => {
    const html = renderToString(h(NumberField, { value: 7, onChange: noop, 'aria-label': 'Opacity', mixed: true }));
    expect(html).toContain('placeholder="Mixed"');
    expect(html).toContain('data-mixed="true"');
    expect(html).not.toContain('value="7"');
  });

  it('hands the spin buttons over to its own steps through onStep of the number input', () => {
    const html = renderToString(h(NumberInput, { value: 4, onChange: noop, onStep: noop }));
    expect(html).toContain('number-input__btn');
  });
});
