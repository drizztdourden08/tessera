/* @layer tooling-scripts @kind test */
import { createElement as h } from 'react';
import { renderToString } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { defineStatuses, Status } from '../src/primitives/Status';

const ENGINE = defineStatuses({
  ready: { label: 'Ready', tone: 'success', icon: 'circle-check' },
  building: { label: 'Setting up', tone: 'warning', pulse: true },
  unknown: { label: 'Checking', tone: 'neutral' },
});

describe('defineStatuses', () => {
  it('hands back the same table, frozen', () => {
    expect(ENGINE.building.label).toBe('Setting up');
    expect(Object.isFrozen(ENGINE)).toBe(true);
  });
});

describe('Status with a word', () => {
  it('draws the tone, the dot, the pulse and the word it is given', () => {
    const html = renderToString(h(Status, { tone: 'success', dot: true, pulse: true }, 'Live'));
    expect(html).toContain('class="status status--text status--success status--dot status--pulse"');
    expect(html).toContain('Live</span>');
    expect(html).not.toContain('data-status');
  });

  it('is neutral by default', () => {
    expect(renderToString(h(Status, null, 'Draft'))).toContain('class="status status--text status--neutral"');
  });
});

describe('Status with a map', () => {
  it('draws the tone, the pulse and the label of the key', () => {
    const html = renderToString(h(Status, { map: ENGINE, value: 'building', variant: 'pill', dot: true }));
    expect(html).toContain('class="status status--pill status--warning status--dot status--pulse"');
    expect(html).toContain('data-status="building"');
    expect(html).toContain('Setting up</span>');
  });

  it('puts the icon in place of the dot', () => {
    const html = renderToString(h(Status, { map: ENGINE, value: 'ready', dot: true }));
    expect(html).not.toContain('status__dot');
    expect(html).toMatch(/<svg[^>]*aria-hidden="true"/);
  });

  it('draws the fallback for a missing or unknown value, and nothing without one', () => {
    expect(renderToString(h(Status, { map: ENGINE, value: undefined, fallback: 'unknown' }))).toContain('Checking');
    const unknown = renderToString(h(Status, { map: ENGINE, value: 'gone', fallback: 'unknown' }));
    expect(unknown).toContain('Checking');
    expect(unknown).toContain('data-status="unknown"');
    expect(renderToString(h(Status, { map: ENGINE, value: null }))).toBe('');
    expect(renderToString(h(Status, { map: ENGINE, value: 'toString' }))).toBe('');
  });

  it('passes other props to the span', () => {
    const html = renderToString(h(Status, { map: ENGINE, value: 'ready', role: 'status', className: 'row__state' }));
    expect(html).toContain('role="status"');
    expect(html).toContain('row__state');
  });
});
