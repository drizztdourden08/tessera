/* @layer tooling-scripts @kind test */
import fs from 'node:fs';
import { createElement as h } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { Card } from '../src/primitives/Card';

const TONES = ['neutral', 'primary', 'info', 'success', 'warning', 'danger'];

const card = (props = {}) => renderToStaticMarkup(h(Card, props, 'Body'));

const css = fs.readFileSync(new URL('../src/primitives/Card/Card.css', import.meta.url), 'utf8');

describe('Card edge tone', () => {
  it('draws no edge class without an edgeTone', () => {
    expect(card({ edge: 'border' })).not.toContain('card--edge');
  });

  it.each(TONES)('draws the %s edge on the left by default', (tone) => {
    const html = card({ edgeTone: tone });
    expect(html).toContain('card--edge-left');
    expect(html).toContain(`card--edge-${tone}`);
    expect(css).toContain(`.card--edge-${tone} {\n  --card-edge:`);
  });

  it('draws the whole border in the tone with edge border', () => {
    const html = card({ edgeTone: 'danger', edge: 'border' });
    expect(html).toContain('card--edge-border');
    expect(html).not.toContain('card--edge-left');
  });

  it('keeps the header neutral and passes no edge props to the element', () => {
    const html = card({ title: 'Players', edgeTone: 'warning' });
    expect(html).toContain('card__header--neutral');
    expect(html).not.toContain('card__header--warning');
    expect(html).not.toContain('edgetone');
  });

  it('takes the edge colour from tone tokens and draws it after the variants', () => {
    expect(css).toContain('--card-edge: var(--c-danger);');
    expect(css.indexOf('.card.card--edge-left')).toBeGreaterThan(css.indexOf('.card--danger'));
    expect(css.indexOf('.card.card--edge-border')).toBeGreaterThan(css.indexOf('.card--interactive:hover'));
  });
});
