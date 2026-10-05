/* @layer tooling-scripts @kind test */
import { readFileSync } from 'node:fs';
import { createElement as h } from 'react';
import { renderToString } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { ListDetailGuardBar } from '../src/composites/ListDetail/sub-components/ListDetailGuardBar';

const ignore = () => undefined;
const GUARD = {
  open: true, message: 'Keysanity has unsaved changes. Save them before you open Short run?', saveLabel: 'Save and open',
  saving: false, onStay: ignore, onDiscard: ignore, onSave: ignore, stayRef: { current: null },
};

describe('the unsaved changes question of ListDetail', () => {
  it('asks over the editor by default', () => {
    const registry = JSON.parse(readFileSync(new URL('../guide/registry.json', import.meta.url), 'utf8'));
    const props = registry.components.find((component) => component.name === 'ListDetail').props.own;
    expect(props.find((prop) => prop.name === 'guard').default).toBe("'inline'");
  });

  it('draws the bar as an alertdialog on the shared button row, the message as its lead', () => {
    const html = renderToString(h(ListDetailGuardBar, GUARD));
    expect(html).toMatch(/^<div[^>]*class="list-detail__guard"[^>]*role="alertdialog"[^>]*aria-label="Unsaved changes"/);
    expect(html).toMatch(/class="[^"]*button-row button-row--plain/);
    expect(html).toMatch(/button-row__lead"><[^>]*id="([^"]+)"[^>]*>Keysanity has unsaved changes/);
    expect(html).toContain('Stay here');
    expect(html).toContain('Discard');
    expect(html).toContain('Save and open');
  });

  it('draws nothing while no move waits', () => {
    expect(renderToString(h(ListDetailGuardBar, { ...GUARD, open: false }))).toBe('');
  });
});
