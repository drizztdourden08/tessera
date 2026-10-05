/* @layer tooling-scripts @kind test */
import { createElement as h } from 'react';
import { renderToString } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { ActionTile } from '../src/composites/ActionTile';
import { SettingsRow } from '../src/composites/SettingsRow';
import { StageScreen } from '../src/composites/StageScreen';
import { UtilityScreen } from '../src/composites/UtilityScreen';

const noop = () => undefined;

describe('one shape for an action written as data', () => {
  it('takes label, onSelect, tone and disabled in SettingsRow, UtilityScreen and ActionTile', () => {
    const row = renderToString(h(SettingsRow, { title: 'Cache', actions: [{ id: 'forget', label: 'Forget', tone: 'danger', onSelect: noop }] }));
    expect(row).toMatch(/btn--danger[^>]*>.*Forget/);
    const screen = renderToString(h(UtilityScreen, {
      onClose: noop,
      status: { tone: 'info', title: 'Update' },
      actions: [{ label: 'Install', tone: 'primary', onSelect: noop }, { label: 'Later', disabled: true, onSelect: noop }],
      report: { onSelect: noop },
    }));
    expect(screen).toMatch(/btn--primary[^>]*>.*Install/);
    expect(screen).toContain('Later');
    expect(screen).toContain('utility-screen__report');
    const tile = renderToString(h(ActionTile, { label: 'Room', value: 3, action: { label: 'Stop', tone: 'danger', onSelect: noop } }));
    expect(tile).toContain('btn--danger');
  });

  it('takes onSelect for the done button of StageScreen', () => {
    const html = renderToString(h(StageScreen, { title: 'Pad', icon: 'i', heading: 'Pad', onClose: noop, done: { onSelect: noop } }, 'body'));
    expect(html).toContain('>Done<');
  });
});
