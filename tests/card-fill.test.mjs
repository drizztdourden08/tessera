/* @layer tooling-scripts @kind test */
import { createElement as h } from 'react';
import { renderToString } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { Card } from '../src/primitives/Card';

describe('Card fill', () => {
  it('draws no fill class by default, so current cards keep their layout', () => {
    expect(renderToString(h(Card, { title: 'Log' }, 'body'))).not.toContain('card--fill');
    expect(renderToString(h(Card, null, 'body'))).not.toContain('card--fill');
  });

  it('adds card--fill to a headed and to a plain card when asked', () => {
    expect(renderToString(h(Card, { title: 'Log', fill: true }, 'body'))).toContain('card--headed card--fill');
    expect(renderToString(h(Card, { fill: true }, 'body'))).toContain('card card--default card--fill');
  });
});
