/* @layer tooling-scripts @kind test */
import { createElement as h } from 'react';
import { renderToString } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { SeatCard } from '../src/composites/SeatCard';
import { SeatGrid } from '../src/composites/SeatGrid';

const ignore = () => undefined;
const draw = (props) => renderToString(h(SeatCard, props));

describe('SeatCard', () => {
  it('draws a filled seat with its name as a heading, meta and lead', () => {
    const html = draw({ state: 'filled', name: 'Planner', meta: 'Opus', lead: h('span', null, 'L') });
    expect(html).toMatch(/<h3[^>]*seat-card__name[^>]*>Planner<\/h3>/);
    expect(html).toContain('data-state="filled"');
    expect(html).toContain('seat-card__meta');
    expect(html).toContain('seat-card__lead');
    expect(html).not.toContain('<button');
  });

  it('makes the name the one button when onSelect is given', () => {
    const html = draw({ state: 'filled', name: 'Planner', onSelect: ignore });
    expect(html.match(/<button/g)).toHaveLength(1);
    expect(html).toContain('data-opens');
    expect(html).toMatch(/<button[^>]*seat-card__open[^>]*>Planner<\/button>/);
  });

  it('highlights an attention seat with a warning edge and says why in text', () => {
    const html = draw({ state: 'attention', name: 'Builder', reason: 'Waiting for your answer' });
    expect(html).toContain('data-state="attention"');
    expect(html).toContain('card--edge-warning');
    expect(html).toContain('status--warning');
    expect(html).toContain('Waiting for your answer');
  });

  it('draws a quiet empty seat with its label and hint and no button', () => {
    const html = draw({ state: 'empty', label: 'Seat 3', hint: 'Add an agent' });
    expect(html).toContain('data-state="empty"');
    expect(html).toContain('Seat 3');
    expect(html).toContain('Add an agent');
    expect(html).not.toContain('<button');
  });

  it('draws the add seat as a real button', () => {
    const html = draw({ state: 'add', label: 'Add a seat', onSelect: ignore });
    expect(html).toMatch(/<button[^>]*type="button"[^>]*seat-card--add[^>]*>/);
    expect(html).toContain('Add a seat');
  });

  it('disables the add seat', () => {
    expect(draw({ state: 'add', label: 'Add', onSelect: ignore, disabled: true })).toMatch(/<button[^>]*disabled/);
  });
});

describe('SeatGrid', () => {
  it('draws a named group with the default size and gap', () => {
    const html = renderToString(h(SeatGrid, { label: 'Agents' }, h('div', null, 'x')));
    expect(html).toMatch(/role="group"[^>]*aria-label="Agents"|aria-label="Agents"[^>]*role="group"/);
    expect(html).toContain('data-min="md"');
    expect(html).toContain('data-gap="md"');
  });

  it('takes minWidth and gap', () => {
    const html = renderToString(h(SeatGrid, { minWidth: 'lg', gap: 'xs' }, h('div', null, 'x')));
    expect(html).toContain('data-min="lg"');
    expect(html).toContain('data-gap="xs"');
  });
});
