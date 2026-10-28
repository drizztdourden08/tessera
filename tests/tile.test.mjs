/* @layer tooling-scripts @kind test */
import { readFileSync } from 'node:fs';
import { createElement as h } from 'react';
import { renderToString } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { Tile } from '../src/composites/Tile';

const draw = (props = {}) => renderToString(h(Tile, { media: h('span', { className: 'picture' }, 'M'), ...props }));

describe('Tile', () => {
  it('draws the media in a square and the name line under it', () => {
    const html = draw({ name: 'hero.png' });
    expect(html).toMatch(/tile__media"><span class="picture">M<\/span>/);
    expect(html).toMatch(/tile__name"[^>]*title="hero.png"[^>]*>hero.png/);
  });

  it('draws no name line without a name, and no title for a node', () => {
    expect(draw()).not.toContain('tile__name');
    expect(draw({ name: h('b', null, 'Hero') })).not.toMatch(/tile__name"[^>]*title=/);
  });

  it('draws only the corners that have content, each in its own place', () => {
    const html = draw({ corners: { topStart: 'A', bottomEnd: 'B', topEnd: null, bottomStart: false } });
    expect(html).toContain('tile__corner--top-start">A');
    expect(html).toContain('tile__corner--bottom-end">B');
    expect(html).not.toContain('tile__corner--top-end');
    expect(html).not.toContain('tile__corner--bottom-start');
  });

  it('draws all four corners', () => {
    const html = draw({ corners: { topStart: 1, topEnd: 2, bottomStart: 3, bottomEnd: 4 } });
    expect(html.match(/tile__corner /g)).toHaveLength(4);
  });

  it('marks a selected and a focused tile apart', () => {
    const picked = draw({ selected: true });
    expect(picked).toContain('data-selected="true"');
    expect(picked).not.toContain('data-focused');
    const focused = draw({ focused: true });
    expect(focused).toContain('data-focused="true"');
    expect(focused).not.toContain('data-selected');
  });

  it('reports aria-selected only for a tile with a role', () => {
    expect(draw({ selected: true })).not.toContain('aria-selected');
    expect(draw({ selected: true, role: 'option' })).toContain('aria-selected="true"');
    expect(draw({ role: 'option' })).toContain('aria-selected="false"');
  });

  it('passes the handlers and the tab stop of a grid through', () => {
    const html = draw({ tabIndex: -1, 'data-key': 'k1', role: 'option' });
    expect(html).toContain('tabindex="-1"');
    expect(html).toContain('data-key="k1"');
  });

  it('fills its cell and takes the class of its host for a width', () => {
    const html = draw({ className: 'my-width' });
    expect(html).toMatch(/class="tile focus-ring-inset my-width"/);
    expect(html).not.toContain('style=');
  });

  it('draws its looks with tokens only', () => {
    const css = readFileSync(new URL('../src/composites/Tile/Tile.css', import.meta.url), 'utf8');
    expect(css).toContain('.tile[data-selected] {');
    expect(css).toContain('.tile[data-focused] {');
    expect(css).not.toMatch(/#[0-9a-f]{3,8}\b/i);
  });
});
