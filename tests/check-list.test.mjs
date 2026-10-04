/* @layer tooling-scripts @kind test */
import { createElement as h } from 'react';
import { renderToString } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { CheckList } from '../src/composites/CheckList';
import { checkStatuses } from '../src/composites/CheckList/behavior/check-statuses';
import { TESSERA_STRINGS } from '../src/primitives/strings';

const CHECKS = [
  { id: 'ssh', label: 'Connect over SSH', state: 'pass', detail: 'ap@nas.local:22' },
  { id: 'python', label: 'Python', state: 'pass' },
  { id: 'port', label: 'Game port', state: 'fail', detail: 'port 38281 is in use', action: h('button', null, 'Pick another port') },
  { id: 'linger', label: 'Keep running after logout', state: 'warn' },
  { id: 'multi', label: 'MultiServer.py', state: 'pending' },
  { id: 'later', label: 'Version', state: 'skip', detail: 'waits for Python' },
];

const counts = (html) => [...html.matchAll(/data-state="(\w+)">(?:<span[^>]*><\/span>)?(\d+ \w+)</g)].map((match) => `${match[1]} ${match[2]}`);
const rows = (html) => [...html.matchAll(/class="check-list__row" data-state="(\w+)"/g)].map((match) => match[1]);

describe('CheckList', () => {
  const html = renderToString(h(CheckList, { checks: CHECKS, summary: 'Home NAS is not ready' }));

  it('declares its five states once, with defineStatuses', () => {
    const table = checkStatuses(TESSERA_STRINGS.items);
    expect(Object.isFrozen(table)).toBe(true);
    expect(Object.keys(table)).toEqual(['pass', 'warn', 'fail', 'pending', 'skip']);
    expect(table.fail).toMatchObject({ tone: 'danger', icon: 'circle-x', label: 'failed' });
  });

  it('counts passes, advice, failures and checks in progress, skipped left out', () => {
    expect(html).toContain('Home NAS is not ready');
    expect(html).toMatch(/role="status" class="check-list__counts"/);
    expect(counts(html)).toEqual(['pass 2 passed', 'warn 1 advice', 'fail 1 failed', 'pending 1 checking']);
  });

  it('draws one list item per check, each named by its state', () => {
    expect(html).toContain('aria-label="Checks"');
    expect(rows(html)).toEqual(['pass', 'pass', 'fail', 'warn', 'pending', 'skip']);
    expect(html).toContain('role="img" aria-label="passed"');
    expect(html).toContain('role="img" aria-label="skipped"');
    expect(html).toMatch(/class="spinner"[^>]*role="status" aria-label="checking"/);
    expect(html).toContain('<button>Pick another port</button>');
    expect(html).toContain('waits for Python');
  });

  it('marks a compact list', () => {
    expect(renderToString(h(CheckList, { checks: CHECKS, compact: true, label: 'Server test' }))).toMatch(/data-compact="" aria-label="Server test"/);
  });
});
