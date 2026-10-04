/* @layer tooling-scripts @kind test */
import { createElement as h } from 'react';
import { renderToString } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { ProgressBar } from '../src/primitives/ProgressBar';
import { share } from '../src/primitives/ProgressBar/behavior/share';

describe('ProgressBar', () => {
  it('fills one value as a share of max and reports it clamped', () => {
    const html = renderToString(h(ProgressBar, { value: 54, max: 216, tone: 'success', label: 'Checks' }));
    expect(html).toContain('aria-valuenow="54"');
    expect(html).toContain('aria-valuemax="216"');
    expect(html).toContain('width:25%');
    expect(html).toContain('data-tone="success"');
    expect(renderToString(h(ProgressBar, { value: 140 }))).toContain('aria-valuenow="100"');
    expect(renderToString(h(ProgressBar, { value: -5 }))).toContain('aria-valuenow="0"');
  });

  it('draws the second fill faded in the main tone, or in its own tone', () => {
    const faded = renderToString(h(ProgressBar, { value: 30, secondaryValue: 70, tone: 'info' }));
    expect(faded).toContain('progress-bar__fill--secondary" data-tone="info" data-faded="yes"');
    const own = renderToString(h(ProgressBar, { value: 30, secondaryValue: 70, secondaryTone: 'secondary' }));
    expect(own).toContain('progress-bar__fill--secondary" data-tone="secondary" style');
  });

  it('keeps a share between 0 and 100 and is empty with no range', () => {
    expect(share(50, 200)).toBe(25);
    expect(share(300, 200)).toBe(100);
    expect(share(5, 0)).toBe(0);
  });
});
