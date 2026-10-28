/* @layer tooling-scripts @kind test */
import { createElement as h } from 'react';
import { renderToString } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { AngleField } from '../src/composites/AngleField';
import { angleAt } from '../src/composites/AngleField/behavior/angle-at';
import { normaliseAngle } from '../src/composites/AngleField/behavior/normalise-angle';
import { snapAngle } from '../src/composites/AngleField/behavior/snap-angle';
import { snapLadder } from '../src/composites/AngleField/behavior/snap-ladder';
import { stepNumber } from '../src/composites/NumberField/behavior/step-number';

const noop = () => undefined;
const rect = { left: 0, top: 0, width: 100, height: 100 };

describe('normaliseAngle', () => {
  it('keeps an angle inside one turn', () => {
    expect(normaliseAngle(370)).toBe(10);
    expect(normaliseAngle(-15)).toBe(345);
    expect(normaliseAngle(360)).toBe(0);
    expect(normaliseAngle(22.5)).toBe(22.5);
    expect(normaliseAngle(Number.NaN)).toBe(0);
  });
});

describe('snapAngle to 15, 22.5 and 45 degrees', () => {
  it('rounds to the nearest snap', () => {
    expect(snapAngle(52, 15)).toBe(45);
    expect(snapAngle(53, 15)).toBe(60);
    expect(snapAngle(30, 22.5)).toBe(22.5);
    expect(snapAngle(34, 22.5)).toBe(45);
    expect(snapAngle(100, 45)).toBe(90);
    expect(snapAngle(130, 45)).toBe(135);
  });

  it('wraps at a full turn and rounds to whole degrees without a snap', () => {
    expect(snapAngle(358, 15)).toBe(0);
    expect(snapAngle(359.6, undefined)).toBe(0);
    expect(snapAngle(12.4, undefined)).toBe(12);
  });
});

describe('angleAt', () => {
  it('reads 0 to the right and turns clockwise on screen', () => {
    expect(angleAt({ x: 100, y: 50 }, rect)).toBe(0);
    expect(angleAt({ x: 50, y: 100 }, rect)).toBe(90);
    expect(angleAt({ x: 0, y: 50 }, rect)).toBe(180);
    expect(angleAt({ x: 50, y: 0 }, rect)).toBe(270);
  });
});

describe('snapLadder', () => {
  it('lists every snap of a turn, with a stop on each side so the wheel wraps', () => {
    expect(snapLadder(90)).toEqual([-90, 0, 90, 180, 270, 360]);
    expect(snapLadder(22.5)).toHaveLength(18);
    expect(snapLadder(undefined)).toBeUndefined();
    expect(snapLadder(0)).toBeUndefined();
  });

  it('steps 15 degrees at a time through the turn, and Shift steps one degree', () => {
    const config = { step: 1, fineStep: 1, ladder: snapLadder(15), fine: false };
    expect(normaliseAngle(stepNumber(345, 1, config))).toBe(0);
    expect(normaliseAngle(stepNumber(0, -1, config))).toBe(345);
    expect(stepNumber(40, 1, config)).toBe(45);
    expect(stepNumber(40, 1, { ...config, fine: true })).toBe(41);
  });
});

describe('AngleField', () => {
  it('draws the dial, the number and the degree sign', () => {
    const html = renderToString(h(AngleField, { value: 45, onChange: noop, label: 'Angle', snap: 15 }));
    expect(html).toContain('angle-field__dial');
    expect(html).toContain('angle-field__needle');
    expect(html).toContain('value="45"');
    expect(html).toContain('°');
  });

  it('leaves the dial out when asked, and hides the needle while mixed', () => {
    expect(renderToString(h(AngleField, { value: 45, onChange: noop, 'aria-label': 'Angle', dial: false }))).not.toContain('angle-field__dial');
    const mixed = renderToString(h(AngleField, { value: 45, onChange: noop, 'aria-label': 'Angle', mixed: true }));
    expect(mixed).not.toContain('angle-field__needle');
    expect(mixed).toContain('placeholder="Mixed"');
  });
});
