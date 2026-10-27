/* @layer tooling-scripts @kind test */
import { createElement as h } from 'react';
import { renderToString } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { Card } from '../src/primitives/Card';

describe('Card flush', () => {
  it('draws no flush class by default, so current cards keep their padding', () => {
    expect(renderToString(h(Card, null, 'body'))).not.toContain('card--flush');
    expect(renderToString(h(Card, { title: 'Log' }, 'body'))).not.toContain('card--flush');
  });

  it('adds card--flush to a plain and to a headed card when asked', () => {
    expect(renderToString(h(Card, { flush: true }, 'body'))).toContain('card card--default card--flush');
    expect(renderToString(h(Card, { title: 'Log', flush: true }, 'body'))).toContain('card--headed card--flush');
  });

  it('can be filled and flush together', () => {
    expect(renderToString(h(Card, { fill: true, flush: true }, 'body'))).toContain('card--fill card--flush');
  });
});
