/* @layer tooling-scripts @kind test */
import { readFileSync } from 'node:fs';
import { createElement as h } from 'react';
import { renderToString } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { MasterDetailGuardBar } from '../src/composites/MasterDetail/sub-components/MasterDetailGuardBar';

const ignore = () => undefined;
const GUARD = {
  open: true, message: 'Keysanity has unsaved changes. Save them before you open Short run?', saveLabel: 'Save and open',
  saving: false, onStay: ignore, onDiscard: ignore, onSave: ignore, stayRef: { current: null },
};

describe('the unsaved changes question of MasterDetail', () => {
  it('asks over the editor by default', () => {
    const registry = JSON.parse(readFileSync(new URL('../guide/registry.json', import.meta.url), 'utf8'));
    const props = registry.components.find((component) => component.name === 'MasterDetail').props.own;
    expect(props.find((prop) => prop.name === 'guard').default).toBe("'inline'");
  });

  it('draws the bar as an alertdialog on the shared button row, the message as its lead', () => {
    const html = renderToString(h(MasterDetailGuardBar, GUARD));
    expect(html).toMatch(/^<div[^>]*class="master-detail-guard"[^>]*role="alertdialog"[^>]*aria-label="Unsaved changes"/);
    expect(html).toMatch(/class="[^"]*button-row button-row--plain/);
    expect(html).toMatch(/button-row__lead"><[^>]*id="([^"]+)"[^>]*>Keysanity has unsaved changes/);
    expect(html).toContain('Stay here');
    expect(html).toContain('Discard');
    expect(html).toContain('Save and open');
  });

  it('draws nothing while no move waits', () => {
    expect(renderToString(h(MasterDetailGuardBar, { ...GUARD, open: false }))).toBe('');
  });
});
