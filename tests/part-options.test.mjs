/* @layer tooling-scripts @kind test */
import { createElement as h } from 'react';
import { renderToString } from 'react-dom/server';
import { describe, expect, it, vi } from 'vitest';
import { DialogShell } from '../src/composites/DialogShell';
import { LogPanel } from '../src/composites/LogPanel';
import { SegmentedControl } from '../src/primitives/SegmentedControl';

vi.mock('../src/primitives/Portal', () => ({ Portal: (props) => props.children }));

const noop = () => undefined;
const ROWS = [
  { id: 'a', gutter: '12:00', kind: 'session', tag: 'session', message: 'Connected to the room' },
  { id: 'b', gutter: '12:01', kind: 'check', tag: 'check', message: 'Found the bow' },
];

describe('public options in place of internal classes', () => {
  it('puts the className of a SegmentedControl on its root', () => {
    const html = renderToString(h(SegmentedControl, { value: 'a', options: [{ value: 'a', label: 'A' }], onChange: noop, className: 'globals-flow', 'aria-label': 'Flow' }));
    expect(html).toMatch(/^<div class="segmented control-size--md globals-flow"/);
  });

  it('draws the messages of a strong kind in semibold', () => {
    const html = renderToString(h(LogPanel, { rows: ROWS, toolbar: false, kinds: [{ id: 'session', label: 'Session', strong: true }] }));
    expect(html).toContain('log-panel__msg log-panel__msg--session log-panel__msg--strong');
    expect(html).not.toContain('log-panel__msg--check log-panel__msg--strong');
  });

  it('lets a DialogShell wrap a long title', () => {
    const shell = (titleWrap) => renderToString(h(DialogShell, { open: true, onClose: noop, title: 'Gamepad diagnostics', titleWrap }, 'Body'));
    expect(shell(true)).toContain('window-header window-header--wrap dialog__header');
    expect(shell(false)).not.toContain('window-header--wrap');
  });
});
