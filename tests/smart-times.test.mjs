/* @layer tooling-scripts @kind test */
import { createElement as h } from 'react';
import { renderToString } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { Markdown } from '../src/composites/Markdown';
import { timesBetweenDigits } from '../src/composites/Markdown/behavior/times-between-digits';

const TIMES = '×';

describe('timesBetweenDigits', () => {
  it('turns an x between two digits into the multiplication sign', () => {
    expect(timesBetweenDigits('1920x1080')).toBe(`1920${TIMES}1080`);
    expect(timesBetweenDigits('3x4x5')).toBe(`3${TIMES}4${TIMES}5`);
    expect(timesBetweenDigits('a 16x9 frame')).toBe(`a 16${TIMES}9 frame`);
  });

  it('leaves an x with a letter, a space or no digit on a side', () => {
    expect(timesBetweenDigits('max 10 xylophones')).toBe('max 10 xylophones');
    expect(timesBetweenDigits('2 x 3')).toBe('2 x 3');
    expect(timesBetweenDigits('x2 and 2x')).toBe('x2 and 2x');
  });

  it('leaves hex values and other punctuation alone', () => {
    expect(timesBetweenDigits('0x1F and 0x10')).toBe('0x1F and 0x10');
    expect(timesBetweenDigits('1-2 "quoted" ... -- it\'s')).toBe('1-2 "quoted" ... -- it\'s');
  });
});

describe('Markdown smartTimes', () => {
  const draw = (props, source) => renderToString(h(Markdown, props, source));

  it('is off by default', () => {
    expect(draw({}, 'Size 1920x1080')).toContain('1920x1080');
  });

  it('draws the sign in text when on', () => {
    expect(draw({ smartTimes: true }, 'Size 1920x1080')).toContain(`1920${TIMES}1080`);
    expect(draw({ smartTimes: true }, '**2x4**')).toContain(`2${TIMES}4`);
  });

  it('keeps code and links as written', () => {
    const html = draw({ smartTimes: true }, '`1920x1080`\n\n```\n16x9\n```\n\n[4x4](https://example.com/1x1)');
    expect(html).not.toContain(TIMES);
  });
});
