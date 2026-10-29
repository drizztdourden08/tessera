/* @layer tooling-scripts @kind test */
import { createElement as h } from 'react';
import { renderToString } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { Toolbar } from '../src/composites/Toolbar';
import { contentKey } from '../src/composites/Toolbar/behavior/content-key';
import { numberColumns } from '../src/composites/Toolbar/behavior/number-columns';
import { numberClass } from '../src/composites/Toolbar/behavior/number-class';

const ignore = () => undefined;
const number = (id, extra = {}) => ({ kind: 'number', id, label: id, value: 1, onChange: ignore, ...extra });
const draw = (items) => renderToString(h(Toolbar, { items, label: 'Tools' }));

describe('numberColumns', () => {
  it('counts the digits of the widest of max and min, with a sign for a negative', () => {
    expect(numberColumns({ min: 0, max: 100 })).toBe(3);
    expect(numberColumns({ min: -180, max: 180 })).toBe(4);
    expect(numberColumns({ min: 1, max: 9 })).toBe(1);
  });

  it('adds the decimal places of a fractional step and the point', () => {
    expect(numberColumns({ max: 10, step: 0.5 })).toBe(4);
    expect(numberColumns({ max: 10, step: 0.25 })).toBe(5);
  });

  it('keeps a floor of four digits when no bound is set', () => {
    expect(numberColumns({})).toBe(4);
  });
});

describe('numberClass', () => {
  it('adds the floor class only for a labelled number', () => {
    expect(numberClass(number('a', { max: 64 }))).toBe('toolbar__number');
    expect(numberClass(number('a', { max: 64, showLabel: true }))).toBe('toolbar__number toolbar__number--labelled toolbar__number--cols-2');
  });

  it('caps the floor at twelve digits', () => {
    expect(numberColumns({ max: 1e20, step: 0.001 })).toBe(12);
  });
});

describe('Toolbar labelled number', () => {
  it('draws the label and gives the field a width floor, in the bar and in the measured copy', () => {
    const html = draw([number('size', { max: 64, showLabel: true })]);
    expect(html.match(/toolbar__number--labelled/g)).toHaveLength(2);
    expect(html.match(/toolbar__number--cols-2/g)).toHaveLength(2);
    expect(html).toContain('number-field__label');
  });

  it('keeps the default look of a number without a label', () => {
    const html = draw([number('size', { max: 64 })]);
    expect(html).not.toContain('toolbar__number--labelled');
    expect(html).not.toContain('toolbar__number--cols');
    expect(html).toContain('toolbar__number');
  });
});

describe('contentKey for the fit measure', () => {
  const key = (extra) => contentKey({ label: 'Tools', items: [number('size', extra)] });

  it('changes when a label, a bound, a step or a suffix changes the width', () => {
    const base = key({ max: 64 });
    expect(key({ max: 64, showLabel: true })).not.toBe(base);
    expect(key({ max: 640 })).not.toBe(base);
    expect(key({ max: 64, step: 0.5 })).not.toBe(base);
    expect(key({ max: 64, suffix: 'px' })).not.toBe(base);
  });
});
