/* @layer tooling-scripts @kind test */
import { createElement as h } from 'react';
import { renderToString } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { defineStatuses, StatusOf } from '../src/primitives/StatusOf';

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

describe('StatusOf', () => {
  it('draws the tone, the pulse and the label of the key', () => {
    const html = renderToString(h(StatusOf, { map: ENGINE, value: 'building', variant: 'pill', dot: true }));
    expect(html).toContain('class="status status--pill status--warning status--dot status--pulse"');
    expect(html).toContain('data-status="building"');
    expect(html).toContain('Setting up</span>');
  });

  it('puts the icon in place of the dot', () => {
    const html = renderToString(h(StatusOf, { map: ENGINE, value: 'ready', dot: true }));
    expect(html).not.toContain('status__dot');
    expect(html).toMatch(/<svg[^>]*aria-hidden="true"/);
  });

  it('draws the fallback for a missing or unknown value, and nothing without one', () => {
    expect(renderToString(h(StatusOf, { map: ENGINE, value: undefined, fallback: 'unknown' }))).toContain('Checking');
    expect(renderToString(h(StatusOf, { map: ENGINE, value: 'gone', fallback: 'unknown' }))).toContain('Checking');
    expect(renderToString(h(StatusOf, { map: ENGINE, value: null }))).toBe('');
  });
});
