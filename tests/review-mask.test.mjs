/* @layer tooling-scripts @kind test */
import { createElement as h } from 'react';
import { renderToString } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import * as tessera from '../src/primitives';
import { LogPanel } from '../src/composites/LogPanel';
import { RetryButton } from '../src/composites/RetryButton';
import { StickPlot } from '../src/composites/StickPlot';

const noop = () => undefined;

const ROWS = [
  { id: '1', gutter: '14:02:11', tag: 'gen', kind: 'info', message: 'Loaded 6 player files' },
  { id: '2', gutter: '14:02:12', tag: 'gen', kind: 'info', message: 'Filling 1,204 locations' },
];

const masked = (html, className) => (html.match(new RegExp(`class="[^"]*${className}[^"]*"[^>]*data-review-mask=""`, 'g')) ?? []).length;

describe('the review mask', () => {
  it('is exported by name, so an app marks its own live values the same way', () => {
    expect(tessera.REVIEW_MASK_ATTRIBUTE).toBe('data-review-mask');
  });

  it('marks every time cell of a LogPanel and nothing else in the row', () => {
    const html = renderToString(h(LogPanel, { rows: ROWS, toolbar: false, height: 200 }));
    expect(masked(html, 'log-panel__gutter')).toBe(ROWS.length);
    expect(html.match(/data-review-mask/g)).toHaveLength(ROWS.length);
  });

  it('marks the RetryButton line only while it counts down', () => {
    const counting = renderToString(h(RetryButton, { onRetry: noop, retryAt: Date.now() + 30_000 }));
    expect(masked(counting, 'retry-button__line')).toBe(1);
    const still = renderToString(h(RetryButton, { onRetry: noop, attempt: 2, attempts: 5 }));
    expect(still).toContain('retry-button__line');
    expect(still).not.toContain('data-review-mask');
  });

  it('marks the stick dot, its stem and the readout of a StickPlot, and leaves the rings and axes', () => {
    const html = renderToString(h(StickPlot, { x: 0.4, y: -0.2 }));
    expect(masked(html, 'stick-plot__dot')).toBe(1);
    expect(masked(html, 'stick-plot__stem')).toBe(1);
    expect(masked(html, 'stick-plot__value')).toBe(1);
    expect(html.match(/data-review-mask/g)).toHaveLength(3);
  });
});
