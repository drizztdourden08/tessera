/* @layer tooling-scripts @kind test */
import { createElement as h } from 'react';
import { renderToString } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { Card } from '../src/primitives/Card';

const card = (props = {}) => renderToString(h(Card, props, h('p', null, 'Four online')));

describe('the Card header', () => {
  it('draws no header row without a title, and keeps the body as the only child', () => {
    const html = card();
    expect(html).not.toContain('card__header');
    expect(html).not.toContain('card__body');
    expect(html).toMatch(/^<div class="card card--default"><p>Four online<\/p><\/div>$/);
  });

  it('draws the title, subtitle, count and actions as a SectionHeader row above the body', () => {
    const html = card({ title: 'Players', subtitle: 'In the session', count: 4, actions: h('button', null, 'Invite') });
    expect(html).toContain('card--headed');
    expect(html).toMatch(/<div class="section-header card__header card__header--neutral">/);
    expect(html).toMatch(/<h3[^>]*class="[^"]*section-header__title[^"]*">Players<span[^>]*badge/);
    expect(html).toContain('In the session');
    expect(html).toMatch(/section-header__action"><button>Invite<\/button>/);
    expect(html.indexOf('card__header')).toBeLessThan(html.indexOf('card__body'));
  });

  it('tints the header with its tone and takes a heading level', () => {
    const html = card({ title: 'Problems', tone: 'warning', level: 2 });
    expect(html).toContain('card__header--warning');
    expect(html).toMatch(/<h2[^>]*>Problems<\/h2>/);
  });
});
