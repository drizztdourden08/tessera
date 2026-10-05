/* @layer tooling-scripts @kind test */
import { describe, expect, it, vi } from 'vitest';
import { createDefaultLayout } from '../src/composites/Widget/behavior/create-default-layout';
import { visibleLayoutOf } from '../src/composites/Widget/behavior/visible-layout-of';

const def = (id, extra = {}) => ({
  id, label: id, defaultVisibility: 'context-only', defaultSide: 'right', defaultDockedSize: 280,
  defaultFloatingSize: { width: 320, height: 240 }, ...extra,
});
const DEFINITIONS = [def('log', { defaultVisibility: 'always' }), def('players', { context: 'session' }), def('hints', { context: 'race' })];
const IDS = ['log', 'players', 'hints'];
const layout = { ...createDefaultLayout(), floating: IDS.map((id) => ({ id, x: 0.1, y: 0.1, width: 200, height: 120 })) };
const gates = { definitions: DEFINITIONS, pageOpen: false, developerToolsEnabled: false, forcedIds: [], contentIds: IDS };
const shown = (contextActive, extra = {}) => visibleLayoutOf(layout, { ...gates, contextActive, ...extra }).floating.map((f) => f.id);

describe('the context of each widget', () => {
  it('asks the function once per context only widget, with its own definition', () => {
    const running = { session: true, race: false };
    const ask = vi.fn((definition) => running[definition.context]);
    expect(shown(ask)).toEqual(['log', 'players']);
    expect(ask.mock.calls.map(([definition]) => definition.id)).toEqual(['players', 'hints']);
  });

  it('still takes one flag for the whole dock', () => {
    expect(shown(true)).toEqual(IDS);
    expect(shown(false)).toEqual(['log']);
  });

  it('keeps a forced widget and hides every context only widget while a page is open', () => {
    expect(shown(() => false, { forcedIds: ['hints'] })).toEqual(['log', 'hints']);
    expect(shown(() => true, { pageOpen: true })).toEqual(['log']);
  });

});
