/* @layer tooling-scripts @kind test */
import { createElement as h } from 'react';
import { renderToString } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { FactsPanel } from '../src/composites/FactsPanel';
import { LogPanel } from '../src/composites/LogPanel';
import { CodeBlock } from '../src/composites/CodeBlock';
import { CopyButton } from '../src/composites/CopyButton';
import { CopyValue } from '../src/composites/CopyValue';
import { StatRow } from '../src/primitives/StatRow';

const KEY = 'SHA256:mK3v9Qe1ZtR8wLp2xN6cY4hB0sJ7uF5dA1gH9kT2oE';

describe('CopyButton', () => {
  it('is an icon button named by its label, with a status region for the announcement', () => {
    const html = renderToString(h(CopyButton, { text: 'a', label: 'Copy address', className: 'host' }));
    expect(html).toMatch(/^<span class="copy-button host">/);
    expect(html).toContain('aria-label="Copy address" title="Copy address"');
    expect(html).toContain('<span class="visually-hidden" role="status"></span>');
  });

  it('writes its word with showLabel and falls back to Copy', () => {
    expect(renderToString(h(CopyButton, { text: () => 'b', label: 'Copy debug info', showLabel: true }))).toContain('Copy debug info</');
    expect(renderToString(h(CopyButton, { text: 'c' }))).toContain('aria-label="Copy"');
  });
});

describe('CopyValue', () => {
  it('groups the value and a button named after it', () => {
    const html = renderToString(h(CopyValue, { value: 'archipelago.gg:38281', label: 'room address', mono: true }));
    expect(html).toContain('class="copy-value copy-value--sm" data-mono="" role="group" aria-label="room address"');
    expect(html).toContain('aria-label="Copy room address"');
    expect(html).toContain('>archipelago.gg:38281</span>');
  });

  it('cuts a long value in the middle and keeps it whole for screen readers', () => {
    const html = renderToString(h(CopyValue, { value: KEY, label: 'host key', truncate: 'middle', size: 'md' }));
    expect(html).toContain('copy-value copy-value--md copy-value--middle');
    expect(html).toContain(`<span class="visually-hidden">${KEY}</span>`);
    expect(html).toContain(`<span class="copy-value__tail" aria-hidden="true">${KEY.slice(-8)}</span>`);
    expect(html).toContain(`title="${KEY}"`);
  });

  it('shows any node and copies the text it is given, or draws no button with no text to copy', () => {
    const html = renderToString(h(CopyValue, { value: h('b', null, 'Room 4'), text: 'https://archipelago.gg/room/4', label: 'room page' }));
    expect(html).toContain('<span class="copy-value__text"><b>Room 4</b></span>');
    expect(html).toContain('aria-label="Copy room page"');
    expect(renderToString(h(CopyValue, { value: h('b', null, 'Room 4'), label: 'room page' }))).not.toContain('copy-button');
  });

  it('leaves a short value whole and takes a copy label of its own', () => {
    const html = renderToString(h(CopyValue, { value: 'seed 42', truncate: 'middle', copyLabel: 'Copy the seed' }));
    expect(html).not.toContain('copy-value__tail');
    expect(html).toContain('aria-label="Copy the seed"');
  });
});

describe('one copy path', () => {
  it('LogPanel and CodeBlock copy through CopyButton', () => {
    const rows = [{ id: '1', gutter: '12:00', tag: 'srv', kind: 'info', message: 'Started' }];
    expect(renderToString(h(LogPanel, { rows }))).toContain('class="copy-button log-panel__copy"');
    const code = renderToString(h(CodeBlock, { code: 'pnpm add tessera', language: 'text', copyable: true }));
    expect(code).toContain('class="copy-button code-block__copy"');
    expect(code).toContain('aria-label="Copy code"');
  });

  it('StatRow copies nothing itself and a FactsPanel fact copies through CopyValue, named after the row', () => {
    expect(renderToString(h(StatRow, { label: 'Seed', value: '2193' }))).not.toContain('copy-button');
    const row = renderToString(h(StatRow, { label: 'Seed', value: h(CopyValue, { value: '2193', label: 'Seed' }) }));
    expect(row).toContain('stat-row__value"><span class="copy-value copy-value--sm" role="group" aria-label="Seed">');
    const facts = renderToString(h(FactsPanel, { groups: [[{ label: 'Port', value: '38281', copyable: true }]] }));
    expect(facts).toContain('class="copy-value copy-value--sm copy-value--end facts-panel__copy"');
    expect(facts).toContain('aria-label="Copy Port" title="Copy Port"');
    expect(facts).toContain('role="status"');
    expect(facts).toContain('icon-btn--xs');
  });
});
