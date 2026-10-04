/* @layer tooling-scripts @kind test */
import { createElement as h } from 'react';
import { renderToString } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { SettingsRow } from '../src/composites/SettingsRow';
import { keysOfEvent } from '../src/composites/SettingsRow/behavior/key-of-event';
import { lineHints } from '../src/composites/SettingsRow/behavior/line-hints';
import { valueHint } from '../src/composites/SettingsRow/behavior/value-hint';
import { filterSettingsSections } from '../src/composites/SettingsSection';
import { searchWorkspace } from '../src/composites/WorkspaceScreen/behavior/search-workspace';

const noop = () => undefined;
const WORDS = { on: 'On', off: 'Off' };
const CHANNELS = [
  { value: '1', label: 'Mono', hint: 'One channel.' },
  { value: '2', label: 'Stereo', hint: 'Left and right apart.' },
];
const tray = { id: 'tray', title: 'Show a tray icon', noDescription: true, hint: 'Sits by the clock.', input: { kind: 'toggle', value: true, onChange: noop, hints: { on: 'Shown.', off: 'Hidden.' } } };
const channels = { id: 'channels', title: 'Channels', description: 'How many speakers.', hint: 'Pick one.', input: { kind: 'segmented', value: '2', onChange: noop, options: CHANNELS } };
const port = { id: 'port', title: 'Port', noDescription: true, hint: 'Other players connect here.', keywords: 'network', input: { kind: 'number', value: 38281, onChange: noop } };
const SECTIONS = [
  { id: 'window', title: 'Window', rows: [tray] },
  { id: 'sound', title: 'Sound', groups: [{ id: 'output', title: 'Output', rows: [channels] }, { id: 'net', rows: [port] }] },
];

describe('valueHint', () => {
  it('says what the current value does', () => {
    expect(valueHint(tray.input, WORDS)).toEqual({ label: 'On', description: 'Shown.' });
    expect(valueHint(channels.input, WORDS)).toEqual({ label: 'Stereo', description: 'Left and right apart.' });
    expect(valueHint(port.input, WORDS)).toBeUndefined();
  });
});

describe('lineHints', () => {
  it('lists every hint the line can show, so the row keeps room for the longest', () => {
    expect(lineHints(tray.input, WORDS)).toEqual([{ label: 'On', description: 'Shown.' }, { label: 'Off', description: 'Hidden.' }]);
    expect(lineHints(channels.input, WORDS).map((hint) => hint.label)).toEqual(['Mono', 'Stereo']);
    expect(lineHints(port.input, WORDS)).toEqual([]);
  });

  it('samples a slider and pairs each distinct hint with its widest value', () => {
    const slider = { kind: 'slider', value: 50, onChange: noop, min: 0, max: 100, formatValue: (value) => `${value}%`, hintOf: (value) => (value < 50 ? 'Dark.' : 'Bright.') };
    expect(lineHints(slider, WORDS)).toEqual([{ label: '100%', description: 'Dark.' }, { label: '100%', description: 'Bright.' }]);
    expect(lineHints({ ...slider, hintOf: undefined }, WORDS)).toEqual([]);
  });
});

describe('filterSettingsSections', () => {
  it('keeps matching rows by title, keywords and option labels, and drops empty groups', () => {
    expect(filterSettingsSections(SECTIONS, 'mono').map((section) => section.id)).toEqual(['sound']);
    const network = filterSettingsSections(SECTIONS, 'NETWORK');
    expect(network[0].groups.map((group) => group.id)).toEqual(['net']);
    expect(filterSettingsSections(SECTIONS, 'zebra')).toEqual([]);
  });

  it('matches the row hint and the description', () => {
    expect(filterSettingsSections(SECTIONS, 'clock').map((section) => section.id)).toEqual(['window']);
    expect(filterSettingsSections(SECTIONS, 'speakers').map((section) => section.id)).toEqual(['sound']);
  });

  it('keeps a whole section or group when its title matches', () => {
    expect(filterSettingsSections(SECTIONS, 'output')[0].groups.map((group) => group.id)).toEqual(['output']);
    expect(filterSettingsSections(SECTIONS, 'window')[0].rows).toHaveLength(1);
  });
});

describe('searchWorkspace', () => {
  it('counts rows per page and lists the pages whose name matches', () => {
    const pages = [{ id: 'audio', title: 'Audio', sections: SECTIONS }, { id: 'home', title: 'Home', keywords: 'channels overview' }];
    const found = searchWorkspace(pages, 'channel');
    expect(found.total).toBe(1);
    expect(found.withRows.map((match) => match.page.id)).toEqual(['audio']);
    expect(found.byName.map((page) => page.id)).toEqual(['home']);
    expect(searchWorkspace(pages, '  ').total).toBe(0);
  });
});

describe('keysOfEvent', () => {
  it('reads modifiers and the main key, and waits on a lone modifier', () => {
    const press = (key, held = {}) => keysOfEvent({ key, ctrlKey: false, altKey: false, shiftKey: false, metaKey: false, ...held });
    expect(press('k', { ctrlKey: true })).toEqual(['ctrl', 'K']);
    expect(press('ArrowUp', { shiftKey: true })).toEqual(['shift', 'up']);
    expect(press('F5')).toEqual(['F5']);
    expect(press('Control', { ctrlKey: true })).toBeNull();
  });
});

describe('SettingsRow', () => {
  it('draws the control, the key and the hint of the current value', () => {
    const html = renderToString(h(SettingsRow, channels));
    expect(html).toContain('data-setting-key="channels"');
    expect(html).toContain('data-kind="segmented"');
    expect(html).toContain('Left and right apart.');
  });

  it('rests on the description, with every hint laid in the same place to hold the height', () => {
    const html = renderToString(h(SettingsRow, channels));
    expect(html).toContain('How many speakers.');
    expect(html).not.toContain('data-pointed');
    expect(html.match(/settings-row__sizer/g)).toHaveLength(3);
  });

  it('rests on the row hint when the row has no description', () => {
    expect(renderToString(h(SettingsRow, port))).toMatch(/settings-row__resting[^>]*>Other players connect here\./);
  });

  it('drops the radio subtitles when compact', () => {
    const radio = { id: 'first', title: 'First page', noDescription: true, hint: 'Where it opens.', input: { kind: 'radio', value: '1', onChange: noop, options: CHANNELS } };
    expect(renderToString(h(SettingsRow, radio))).toContain('radio-group__option-desc');
    expect(renderToString(h(SettingsRow, { ...radio, compact: true }))).not.toContain('radio-group__option-desc');
  });

  it('draws the value as text when read only, and one line when compact', () => {
    expect(renderToString(h(SettingsRow, { ...tray, readOnly: true }))).toContain('settings-row__state--on');
    expect(renderToString(h(SettingsRow, { ...port, readOnly: true }))).toContain('38281');
    expect(renderToString(h(SettingsRow, { ...channels, compact: true, description: 'How many speakers.' }))).toContain('settings-row--compact');
  });
});
