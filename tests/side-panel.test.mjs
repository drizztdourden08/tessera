/* @layer tooling-scripts @kind test */
import { createElement as h } from 'react';
import { renderToString } from 'react-dom/server';
import { describe, expect, it, vi } from 'vitest';
import { railOverflows } from '../src/composites/pane-edge/rail-overflows';
import { SidePanel } from '../src/composites/SidePanel';
import { sidePanelOptionsOf } from '../src/composites/SidePanel/behavior/side-panel-options-of';

const draw = (extra = {}) => renderToString(h(SidePanel, { title: 'Sprites', containers: [{ title: 'Rows', content: h('p', null, 'Rows') }], ...extra }));

describe('K1 the side panel rules', { tags: ['critical'] }, () => {
  it('tells a rail that is taller than its box from one that fits', () => {
    expect(railOverflows({ clientHeight: 200 }, { offsetHeight: 200 })).toBe(false);
    expect(railOverflows({ clientHeight: 200 }, { offsetHeight: 201 })).toBe(false);
    expect(railOverflows({ clientHeight: 200 }, { offsetHeight: 240 })).toBe(true);
  });

  it('keeps its width under storageKey and its fold under storageKey:collapsed', () => {
    const options = sidePanelOptionsOf({ title: 'Sprites', storageKey: 'studio.sprites', width: 300, minWidth: 200, maxWidth: 400 });
    expect(options.width).toEqual({ initial: 300, min: 200, max: 400, storageKey: 'studio.sprites' });
    expect(options.fold.storageKey).toBe('studio.sprites:collapsed');
    vi.stubGlobal('localStorage', { getItem: (name) => ({ 'studio.sprites': '999', 'studio.sprites:collapsed': 'false' })[name] ?? null });
    expect(draw({ storageKey: 'studio.sprites' })).toContain('--side-panel-width:448px');
    expect(sidePanelOptionsOf({ title: 'Profiles', width: 192, storageKey: 'controls.profiles' }).width).toEqual({ initial: 192, min: 192, max: 448, storageKey: 'controls.profiles' });
    expect(draw({ storageKey: 'controls.profiles', width: 192 })).toContain('--side-panel-width:192px');
    vi.unstubAllGlobals();
  });
});
