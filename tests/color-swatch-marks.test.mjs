/* @layer tooling-scripts @kind test */
import { describe, expect, it } from 'vitest';
import { swatchMarks } from '../src/primitives/ColorSwatch/behavior/swatch-marks';

describe('K1 ColorSwatch marks', { tags: ['critical'] }, () => {
  it('puts up to four marks in the corners, in order: top start, top end, bottom end, bottom start', () => {
    expect(swatchMarks(['1', '2', '3', '4']).map((mark) => mark.corner)).toEqual(['top-start', 'top-end', 'bottom-end', 'bottom-start']);
  });

  it('ignores marks past the fourth and skips empty slots without moving the others', () => {
    expect(swatchMarks(['1', '2', '3', '4', '5'])).toHaveLength(4);
    expect(swatchMarks(['1', null, undefined, '4']).map((mark) => [mark.corner, mark.content])).toEqual([['top-start', '1'], ['bottom-start', '4']]);
    expect(swatchMarks(undefined)).toEqual([]);
  });

  it('places each mark in the corner it is named for, whatever the order', () => {
    const marks = swatchMarks({ 'bottom-end': '4', 'top-start': '1', 'bottom-start': '2', 'top-end': '3' });
    expect(marks.map((mark) => [mark.corner, mark.content])).toEqual([
      ['top-start', '1'], ['top-end', '3'], ['bottom-end', '4'], ['bottom-start', '2'],
    ]);
  });

  it('skips corners that are not named', () => {
    expect(swatchMarks({ 'top-end': 'x' }).map((mark) => mark.corner)).toEqual(['top-end']);
  });
});
