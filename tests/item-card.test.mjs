/* @layer tooling-scripts @kind test */
import fs from 'node:fs';
import { createElement as h } from 'react';
import { renderToString } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { ItemCard } from '../src/composites/ItemCard';
import { ItemCardTitle } from '../src/composites/ItemCard/sub-components/ItemCardTitle';

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

  it('hands navigate to the title link, so a plain click routes inside the app', () => {
    const navigate = (href) => href;
    const title = ItemCardTitle({ title: 'Timespinner', href: '/store/timespinner', navigate, level: 3 });
    expect(title.props.children.props).toMatchObject({ href: '/store/timespinner', navigate });
  });

  it('lets the media keep its own height with mediaHeight auto, and keeps the band by default', () => {
    expect(renderToString(h(ItemCard, BASE))).not.toContain('data-height');
    expect(renderToString(h(ItemCard, { ...BASE, mediaHeight: 'auto' }))).toContain('class="item-card__media" data-tone="primary" data-height="auto"');
  });
});

describe('ItemCard compact', () => {
  it('draws a compact card as one row with a 32 px tile, one line and icon actions', () => {
    const actions = [
      { id: 'install', label: 'Install', icon: 'download', kind: 'primary', onSelect: noop },
      { id: 'page', label: 'Open the page', icon: 'external-link', onSelect: noop },
      { id: 'remove', label: 'Remove', icon: 'trash-2', kind: 'danger', onSelect: noop },
    ];
    const html = renderToString(h(ItemCard, { ...BASE, density: 'compact', actions }));
    expect(html).toContain('data-density="compact"');
    expect(html).toMatch(/class="item-card__media" data-tone="primary" data-size="sm" aria-hidden="true"/);
    expect(html.indexOf('item-card__media')).toBeGreaterThan(html.indexOf('item-card__body'));
    expect(html).not.toContain('item-card__tags');
    expect(html).not.toContain('item-card__top');
    expect(html).not.toContain('<p ');
    expect(html).toMatch(/item-card__line[^>]*>.*status--warning.*item-card__details/);
    const live = html.split('action-bar__measure')[0];
    expect([...live.matchAll(/<button[^>]*aria-label="([^"]+)"/g)].map((match) => match[1])).toEqual(['Open the page', 'Remove', 'Install']);
    expect(live).not.toMatch(/<button[^>]*>[^<]*(Install|Remove)<\/button>/);
  });

  it('shows the tags of a compact card on a line of their own, after the details', () => {
    const tags = ['A', 'B', 'C'].map((name) => h('span', { key: name }, name));
    const html = renderToString(h(ItemCard, { ...BASE, tags, density: 'compact' }));
    expect(html).toMatch(/item-card__details.*item-card__tag-line/);
    expect(html.split('item-card__tag-measure')[0]).toContain('<span>A</span><span>B</span><span>C</span>');
    expect(renderToString(h(ItemCard, { ...BASE, tags: undefined, density: 'compact' }))).not.toContain('item-card__tag-line');
  });

  it('takes details as one node or as nodes, in the compact line', () => {
    const tip = h('em', { className: 'tip' }, 'Updated');
    const one = renderToString(h(ItemCard, { title: 'Timespinner', density: 'compact', details: tip }));
    expect(one).toMatch(/item-card__details"><em class="tip">Updated<\/em><\/div>/);
    const many = renderToString(h(ItemCard, { title: 'Timespinner', density: 'compact', details: [tip, 'World 1.2.0'] }));
    expect(many.match(/item-card__dot/g)).toHaveLength(1);
    expect(many).toContain('class="tip"');
  });

  it('names the media with mediaLabel and hides it otherwise, and has a tertiary tone', () => {
    const named = renderToString(h(ItemCard, { ...BASE, density: 'compact', mediaLabel: 'Game', mediaTone: 'tertiary' }));
    expect(named).toMatch(/class="item-card__media" data-tone="tertiary" data-size="sm" role="img" aria-label="Game"/);
    expect(named).not.toMatch(/item-card__media[^>]*aria-hidden/);
    expect(renderToString(h(ItemCard, { ...BASE, density: 'compact' }))).toMatch(/item-card__media[^>]*aria-hidden="true"/);
    const css = fs.readFileSync('src/composites/ItemCard/ItemCard.css', 'utf8');
    expect(css).toContain("[data-tone='tertiary']");
  });

  it('puts the media as a tile beside the title with mediaSize sm, and as a band otherwise', () => {
    const tile = renderToString(h(ItemCard, { ...BASE, mediaSize: 'sm' }));
    expect(tile).not.toContain('data-density');
    expect(tile).toMatch(/item-card__body"><div class="item-card__head"><div class="item-card__media" data-tone="primary" data-size="sm"/);
    expect(tile).toMatch(/item-card__heading">.*<h3/);
    const band = renderToString(h(ItemCard, BASE));
    expect(band.indexOf('item-card__media')).toBeLessThan(band.indexOf('item-card__body'));
    expect(band).not.toContain('data-size');
    const wide = renderToString(h(ItemCard, { ...BASE, density: 'compact', mediaSize: 'band' }));
    expect(wide.indexOf('item-card__media')).toBeLessThan(wide.indexOf('item-card__body'));
    expect(wide).not.toContain('data-size');
  });

  it('sets no height on a compact card, so a list row decides it', () => {
    const css = fs.readFileSync('src/composites/ItemCard/sub-components/ItemCardRow.css', 'utf8');
    expect(css).not.toMatch(/(?<![a-z-])(block-size|height|min-block-size|min-height):/);
    expect(css).toContain('inline-size: 100%;');
  });
});
