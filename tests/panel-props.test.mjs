/* @layer tooling-scripts @kind test */
import { createElement as h } from 'react';
import { renderToString } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { LogPanel } from '../src/composites/LogPanel';
import { SearchResults } from '../src/composites/SearchResults';
import { EmptyState } from '../src/primitives/EmptyState';
import { ProgressBar } from '../src/primitives/ProgressBar';

const ROWS = [{ id: '1', gutter: '12:00', tag: 'srv', kind: 'info', message: 'Started' }];

describe('LogPanel height', () => {
  it('fills its parent, keeps a fixed height, or sizes as before', () => {
    expect(renderToString(h(LogPanel, { rows: ROWS, height: 'fill', toolbar: false }))).toContain('class="log-panel log-panel--fill"');
    expect(renderToString(h(LogPanel, { rows: ROWS, height: 160, toolbar: false }))).toContain('class="log-panel log-panel--fixed" style="block-size:160px"');
    expect(renderToString(h(LogPanel, { rows: ROWS, toolbar: false, className: 'host' }))).toContain('class="log-panel host"');
  });
});

describe('ProgressBar value', () => {
  it('writes the percent at the end of the bar and gives it to assistive tech', () => {
    const html = renderToString(h(ProgressBar, { value: 42, showValue: true, className: 'host' }));
    expect(html).toContain('class="progress-bar-row host"');
    expect(html).toContain('aria-valuetext="42%"');
    expect(html).toMatch(/class="[^"]*progress-bar__value[^"]*" aria-hidden="true">42%</);
  });

  it('takes a format of its own and draws nothing more without showValue', () => {
    expect(renderToString(h(ProgressBar, { value: 12, max: 40, showValue: true, formatValue: (v, m) => `${v} / ${m}` }))).toContain('>12 / 40<');
    const plain = renderToString(h(ProgressBar, { value: 12, className: 'host' }));
    expect(plain.startsWith('<div class="progress-bar host" role="progressbar"')).toBe(true);
    expect(plain).not.toContain('aria-valuetext');
  });
});

describe('EmptyState', () => {
  it('draws a title over the message, the action, then the hint', () => {
    const html = renderToString(h(EmptyState, { title: 'No presets', message: 'Make one.', action: h('button', null, 'New'), hint: 'or press Ctrl N', size: 'hero' }));
    expect(html).toContain('class="empty-state empty-state--hero"');
    expect(html.indexOf('empty-state__title')).toBeLessThan(html.indexOf('empty-state__message'));
    expect(html.indexOf('empty-state__action')).toBeLessThan(html.indexOf('empty-state__hint'));
    expect(renderToString(h(EmptyState, { message: 'None.' }))).toContain('class="empty-state empty-state--md"');
  });
});

describe('SearchResults emptyIcon', () => {
  it('shows the icon over the no match message', () => {
    const html = renderToString(h(SearchResults, { query: 'zzz', count: 0, emptyIcon: h('i', { className: 'none-found' }) }));
    expect(html).toMatch(/empty-state__icon"><i class="none-found">/);
  });
});
