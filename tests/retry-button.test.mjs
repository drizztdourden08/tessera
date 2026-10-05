/* @layer tooling-scripts @kind test */
import { createElement as h } from 'react';
import { renderToString } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { RetryButton } from '../src/composites/RetryButton';
import { retryLine } from '../src/composites/RetryButton/behavior/retry-line';
import { secondsUntil } from '../src/composites/RetryButton/behavior/seconds-until';
import { COMMON_STRINGS } from '../src/primitives/strings/common-strings.constants';

const noop = () => undefined;

const LINE = /<span id="([^"]+)" class="retry-button__line">([^<]*)<\/span>/;

describe('RetryButton countdown', () => {
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

describe('RetryButton', () => {
  it('is a small secondary Retry button with no line when nothing waits', () => {
    const html = renderToString(h(RetryButton, { onRetry: noop }));
    expect(html).toMatch(/^<span class="retry-button">/);
    expect(html).toContain('btn--secondary');
    expect(html).toContain('btn--sm');
    expect(html).toContain('>Retry</span>');
    expect(html).not.toContain('retry-button__line');
    expect(html).not.toContain('aria-describedby');
  });

  it('reads Retry now while it counts down, the line describing the button', () => {
    const html = renderToString(h(RetryButton, { onRetry: noop, retryAt: Date.now() + 30_000, attempt: 2, attempts: 5 }));
    expect(html).toContain('data-waiting="true"');
    const [, id, text] = LINE.exec(html);
    expect(text).toMatch(/^Try 2 of 5 in (30|29) s$/);
    expect(html).toContain(`aria-describedby="${id}"`);
    expect(html).toContain('>Retry now</span>');
  });

  it('shows a busy, disabled button and no countdown while a try runs', () => {
    const html = renderToString(h(RetryButton, { onRetry: noop, retryAt: Date.now() + 30_000, retrying: true }));
    expect(html).toContain('aria-busy="true"');
    expect(html).toContain('disabled=""');
    expect(html).not.toContain('Next try');
    expect(html).toContain('>Retry</span>');
  });

  it('takes a label of its own', () => {
    expect(renderToString(h(RetryButton, { onRetry: noop, label: 'Reconnect' }))).toContain('>Reconnect</span>');
  });
});
