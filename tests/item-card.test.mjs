/* @layer tooling-scripts @kind test */
import { createElement as h } from 'react';
import { renderToString } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { ItemCard } from '../src/composites/ItemCard';

const noop = () => {};
const BASE = {
  title: 'Timespinner',
  eyebrow: 'Official',
  status: { label: 'update', tone: 'warning' },
  tags: [h('span', { key: 'genre' }, 'Metroidvania')],
  details: ['World 1.2.0', 'For AP 0.6.7', 'Installed 1.1.4'],
  media: h('svg', { 'data-media': 'yes' }),
};

describe('ItemCard', () => {
  it('draws the media, the top line, a heading, the tags and the details joined with dots', () => {
    const html = renderToString(h(ItemCard, BASE));
    expect(html).toMatch(/^<div class="card card--default item-card" data-layout="top"/);
    expect(html).toMatch(/class="item-card__media" data-tone="primary" aria-hidden="true"><svg data-media="yes"/);
    expect(html).toContain('>Official<');
    expect(html).toMatch(/status--warning[^>]*>.*update/);
    expect(html).toMatch(/<h3[^>]*item-card__title[^>]*>Timespinner<\/h3>/);
    expect(html).toContain('<span>Metroidvania</span>');
    expect(html.match(/item-card__dot/g)).toHaveLength(2);
    expect(html).not.toContain('<button');
  });

  it('opens through its title: a button with onOpen, a link with href', () => {
    const button = renderToString(h(ItemCard, { ...BASE, onOpen: noop, selected: true }));
    expect(button).toMatch(/data-selected="" data-opens=""/);
    expect(button).toMatch(/<button type="button" class="pressable item-card__open" aria-current="true">Timespinner/);
    const link = renderToString(h(ItemCard, { ...BASE, href: '#/games/timespinner', level: 2 }));
    expect(link).toMatch(/<h2[^>]*><a href="#\/games\/timespinner"[^>]*class="link item-card__open"/);
  });

  it('puts its actions in an ActionBar with one action in view', () => {
    const actions = [
      { id: 'update', label: 'Update', kind: 'primary', onSelect: noop },
      { id: 'preset', label: 'Make a preset', onSelect: noop },
      { id: 'remove', label: 'Remove', kind: 'danger', onSelect: noop },
    ];
    const html = renderToString(h(ItemCard, { ...BASE, actions, layout: 'left' }));
    const live = html.split('action-bar__measure')[0];
    expect(html).toContain('data-layout="left"');
    expect([...live.matchAll(/data-action-id="(\w+)"/g)].map((match) => match[1])).toEqual(['preset', 'update']);
    expect(live).toContain('aria-label="More"');
  });
});
