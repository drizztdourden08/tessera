/* @layer tooling-scripts @kind test */
import { createElement as h } from 'react';
import { renderToString } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { Callout } from '../src/primitives/Callout';

describe('Callout title', () => {
  it('renders the title before the text', () => {
    const html = renderToString(h(Callout, { tone: 'danger', title: 'Install failed' }, 'Check your connection.'));
    expect(html).toContain('role="note"');
    expect(html).toContain('callout__title');
    expect(html.indexOf('Install failed')).toBeGreaterThan(-1);
    expect(html.indexOf('Install failed')).toBeLessThan(html.indexOf('Check your connection.'));
  });

  it('draws no title without the prop', () => {
    const html = renderToString(h(Callout, null, 'Check your connection.'));
    expect(html).not.toContain('callout__title');
    expect(html).not.toContain('callout__body');
  });
});
