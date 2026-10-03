/* @layer tooling-scripts @kind test */
import { describe, expect, it, vi } from 'vitest';
import { releasePress } from '../src/composites/DockLayout/behavior/release-press';
import { createDefaultLayout } from '../src/composites/Widget/behavior/create-default-layout';
import { visibleLayoutOf } from '../src/composites/Widget/behavior/visible-layout-of';

const source = { id: 'hints', fromKey: 'p1', fromTab: false, isMain: false, loneWidget: true, floating: false, start: { x: 0, y: 0 } };
const view = { outside: true, swap: false, hot: null, preview: null, refused: false, overlay: false };

describe('popping a widget out by dragging it past the edge', () => {
  it('hands over the screen point where the pointer let go', () => {
    const onPopOut = vi.fn();
    releasePress({ source, pointerId: 1, live: true, view }, { onEdit: vi.fn(), onPopOut }, { screenX: 1820, screenY: 340 });
    expect(onPopOut).toHaveBeenCalledWith('hints', { screenX: 1820, screenY: 340 });
  });

  it('leaves the point out when none is known', () => {
    const onPopOut = vi.fn();
    releasePress({ source, pointerId: 1, live: true, view }, { onEdit: vi.fn(), onPopOut });
    expect(onPopOut).toHaveBeenCalledWith('hints', undefined);
  });
});

describe('which popped widgets pass the show rules', () => {
  const def = (id, extra = {}) => ({
    id, label: id, defaultVisibility: 'always', defaultSide: 'right', defaultDockedSize: 280,
    defaultFloatingSize: { width: 320, height: 240 }, popOut: true, ...extra,
  });
  const gates = {
    definitions: [def('log'), def('players', { defaultVisibility: 'context-only' }), def('debug', { devOnly: true })],
    contextActive: false, pageOpen: false, developerToolsEnabled: false, forcedIds: [], contentIds: ['log', 'players', 'debug'],
  };
  const layout = { ...createDefaultLayout(), popped: [{ id: 'log' }, { id: 'players' }, { id: 'debug' }] };

  it('keeps only the popped widgets the gates let through', () => {
    expect(visibleLayoutOf(layout, gates).popped.map((p) => p.id)).toEqual(['log']);
  });

  it('shows a context-only widget once a session runs, and a forced one regardless', () => {
    const live = visibleLayoutOf(layout, { ...gates, contextActive: true, forcedIds: ['debug'] });
    expect(live.popped.map((p) => p.id)).toEqual(['log', 'players', 'debug']);
  });
});
