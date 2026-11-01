/* @layer tooling-scripts @kind test */
import { describe, expect, it } from 'vitest';
import { retryLine } from '../src/composites/RetryButton/behavior/retry-line';
import { secondsUntil } from '../src/composites/RetryButton/behavior/seconds-until';
import { COMMON_STRINGS } from '../src/primitives/strings/common-strings.constants';

describe('K1 RetryButton countdown', { tags: ['critical'] }, () => {
  it('rounds the wait up to whole seconds and stops at zero', () => {
    expect(secondsUntil(10_001, 0)).toBe(11);
    expect(secondsUntil(10_000, 0)).toBe(10);
    expect(secondsUntil(5, 10)).toBe(0);
    expect(secondsUntil(null, 0)).toBe(0);
    expect(secondsUntil(Number.NaN, 0)).toBe(0);
  });

  it('writes the line in seconds, then minutes, with the try count when given', () => {
    expect(retryLine({ secondsLeft: 4 }, COMMON_STRINGS)).toBe('Next try in 4 s');
    expect(retryLine({ secondsLeft: 95, attempt: 2, attempts: 5 }, COMMON_STRINGS)).toBe('Try 2 of 5 in 1 min 35 s');
    expect(retryLine({ secondsLeft: 120 }, COMMON_STRINGS)).toBe('Next try in 2 min');
    expect(retryLine({ secondsLeft: 0, attempt: 5, attempts: 5 }, COMMON_STRINGS)).toBe('Try 5 of 5');
    expect(retryLine({ secondsLeft: 0 }, COMMON_STRINGS)).toBe('');
  });
});
