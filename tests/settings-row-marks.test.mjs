/* @layer tooling-scripts @kind test */
import { createElement as h } from 'react';
import { renderToString } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { SettingsRow } from '../src/composites/SettingsRow';
import { SettingsSection } from '../src/composites/SettingsSection';

const noop = () => undefined;
const toggle = { kind: 'toggle', value: true, onChange: noop };
const row = (extra = {}) => ({ id: 'death', title: 'Death link', description: 'Everyone falls together.', hint: 'Off in races.', input: toggle, ...extra });
const draw = (extra) => renderToString(h(SettingsRow, row(extra)));

describe('a changed SettingsRow', () => {
  it('shows a dot after the title and a reset button that names the setting', () => {
    const html = draw({ changed: true, onReset: noop });
    expect(html).toContain('data-changed="true"');
    expect(html).toMatch(/settings-row__title">Death link<\/span><span class="[^"]*badge--dot[^"]*settings-row__changed[^"]*" role="img" aria-label="Changed"/);
    expect(html).toMatch(/<button[^>]*class="[^"]*settings-row__reset hit-area[^"]*"[^>]*aria-label="Reset Death link"/);
    expect(html).toContain('Puts back the default value.');
  });

  it('draws neither mark when unchanged, and no reset button when read only', () => {
    expect(draw({ onReset: noop })).not.toContain('settings-row__changed');
    expect(draw({ onReset: noop })).not.toContain('settings-row__reset');
    const readOnly = draw({ changed: true, onReset: noop, readOnly: true });
    expect(readOnly).toContain('settings-row__changed');
    expect(readOnly).not.toContain('settings-row__reset');
  });

  it('keeps the dot and the reset button on the one line of a compact row', () => {
    const html = draw({ changed: true, onReset: noop, compact: true });
    expect(html).toMatch(/settings-row__head">.*settings-row__about.*settings-row__changed.*settings-row__reset/);
  });
});

describe('the other marks', () => {
  it('shows a problem under the row as an alert in the danger tone', () => {
    const html = draw({ problem: 'The port is taken.' });
    expect(html).toContain('settings-row--problem');
    expect(html).toMatch(/<small[^>]*class="[^"]*settings-row__problem[^"]*" role="alert">.*The port is taken\./);
    expect(html).toMatch(/settings-row__problem[^"]*"/);
    expect(html.indexOf('settings-row__problem')).toBeGreaterThan(html.indexOf('settings-row__control'));
  });

  it('puts the badge right after the title', () => {
    expect(draw({ badge: h('em', null, 'Advanced') })).toMatch(/Death link<\/span><span class="settings-row__badge"><em>Advanced<\/em>/);
  });

  it('folds a long description to descriptionLines lines', () => {
    const html = draw({ descriptionLines: 2 });
    expect(html).toMatch(/settings-row__description" style="-webkit-line-clamp:2"[^>]*data-folded="true"/);
    expect(draw()).not.toContain('data-folded');
  });

  it('shows the hint under the description at rest', () => {
    const html = draw();
    expect(html.indexOf('Everyone falls together.')).toBeLessThan(html.indexOf('Off in races.'));
    expect(html).toMatch(/settings-row__resting[^>]*>Off in races\./);
  });
});

describe('a SettingsSection of changed rows', () => {
  it('counts the changed rows for its reset button when no count is given', () => {
    const rows = [row({ id: 'a', changed: true }), row({ id: 'b', changed: true }), row({ id: 'c' })];
    expect(renderToString(h(SettingsSection, { id: 's', title: 'Session', rows, onReset: noop }))).toContain('(2 changed)');
    expect(renderToString(h(SettingsSection, { id: 's', title: 'Session', rows, changedCount: 5, onReset: noop }))).toContain('(5 changed)');
  });
});

describe('row actions', () => {
  const forget = { id: 'forget', label: 'Forget the owner id', tone: 'danger', confirm: 'Forget it?', onClick: noop };
  const rebuild = { id: 'rebuild', label: 'Rebuild', onClick: noop };

  it('sit after the control in one end area, the danger one in the danger look', () => {
    const html = draw({ actions: [rebuild, forget] });
    expect(html).toContain('settings-row--actions');
    expect(html).toMatch(/settings-row__end"><div class="settings-row__control".*<\/div><div class="settings-row__actions"><button[^>]*btn--secondary[^>]*>.*Rebuild.*<button[^>]*btn--danger/);
  });

  it('take the place of the control when the row has no input, and the row still sits in a section', () => {
    const html = renderToString(h(SettingsSection, { rows: [{ id: 'owner', title: 'Owner id', noDescription: true, hint: 'Claims the server.', actions: [forget] }] }));
    expect(html).toContain('data-kind="none"');
    expect(html).not.toContain('settings-row__control');
    expect(html).toContain('Forget the owner id');
  });

  it('are left out of a read only row, and a disabled row disables them', () => {
    expect(draw({ actions: [rebuild], readOnly: true })).not.toContain('settings-row__actions');
    expect(draw({ actions: [rebuild], disabled: true })).toMatch(/<button[^>]*disabled=""[^>]*>.*Rebuild/);
  });
});
