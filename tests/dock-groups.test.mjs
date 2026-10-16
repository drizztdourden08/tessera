/* @layer tooling-scripts @kind test */
import { describe, expect, it, vi } from 'vitest';
import { keepsGroups, layoutTree, mainRectOf } from '../src/composites/DockLayout';
import { NO_MODIFIERS } from '../src/composites/DockLayout/DockLayout.constants';
import { dropOf } from '../src/composites/DockLayout/behavior/drop-of';
import { externalDrop } from '../src/composites/DockLayout/behavior/external-drop';
import { releasePress } from '../src/composites/DockLayout/behavior/release-press';
import { resolveDrop } from '../src/composites/DockLayout/behavior/resolve-drop';
import { viewFor } from '../src/composites/DockLayout/behavior/view-for';
import { createDefaultLayout } from '../src/composites/Widget/behavior/create-default-layout';
import { dockOnEdge } from '../src/composites/Widget/behavior/dock-on-edge';
import { groupDrop } from '../src/composites/Widget/behavior/group-drop';

const STAGE = { x: 0, y: 0, width: 1200, height: 800 };
const VIEW = { innerWidth: 1200, innerHeight: 800, screen: { width: 4000, height: 3000, availLeft: 0, availTop: 0 } };
const GROUPS = { inspector: 'devtools', console: 'devtools' };
const groupOf = (id) => GROUPS[id];
const byGroup = (id, drop) => keepsGroups(groupOf, id, drop);

const layout = dockOnEdge(dockOnEdge(createDefaultLayout(), 'players', 'left'), 'inspector', 'right');
const laid = layoutTree(layout.dock, { x: 8, y: 8, width: 1184, height: 784 });
const leafOf = (id) => laid.leaves.find((l) => l.node.kind === 'pane' && l.node.widgets.includes(id));
const players = leafOf('players').node;
const inspector = leafOf('inspector').node;
const centre = (r) => ({ x: r.x + r.width / 2, y: r.y + r.height / 2 });
const strings = { dragSwapLabel: (s) => s, dragOverlayLabel: (s) => s };

const contextWith = (canDrop) => ({
  laid, layout, mainRect: mainRectOf(laid), stage: STAGE, modifiers: NO_MODIFIERS, labelOf: (id) => id, mainLabel: 'Main view',
  strings, canPopOut: () => false, canDrop, floatSnap: 0,
});

const sourceOf = (id) => {
  const leaf = leafOf(id);
  return {
    id, isMain: false, fromKey: leaf?.node.key ?? null, fromTab: false, floating: null, loneWidget: true,
    start: { x: 0, y: 0 }, grab: { x: 10, y: 10 }, size: { width: 280, height: 200 },
  };
};

const at = (pointer) => ({ pointer, client: pointer, onScreen: { x: pointer.x + 500, y: pointer.y + 500 }, view: VIEW });
const NO_KEYS = { shift: false, ctrl: false };

describe('the drop a host checks', () => {
  it('names the kind, the slot, the pane and the side', () => {
    const pane = leafOf('players').node;
    expect(dropOf({ at: 'tab', key: pane.key }, laid)).toEqual({ kind: 'tab', slot: 'pane', pane, edge: null });
    expect(dropOf({ at: 'leaf', key: pane.key, edge: 'top' }, laid)).toEqual({ kind: 'split', slot: 'pane', pane, edge: 'top' });
    expect(dropOf({ at: 'leaf', key: 'main', edge: 'left' }, laid)).toEqual({ kind: 'split', slot: 'main', pane: null, edge: 'left' });
    expect(dropOf({ at: 'outer', edge: 'bottom' }, laid)).toEqual({ kind: 'split', slot: 'stage', pane: null, edge: 'bottom' });
    expect(dropOf({ at: 'float' }, laid)).toEqual({ kind: 'float', slot: 'main', pane: null, edge: null });
  });
});

describe('widgets in different groups', () => {

  it('never tab or split into each other, and widgets with no group form one group', () => {
    expect(byGroup('console', dropOf({ at: 'tab', key: players.key }, laid))).toBe(false);
    expect(byGroup('console', dropOf({ at: 'leaf', key: players.key, edge: 'bottom' }, laid))).toBe(false);
    expect(byGroup('log', dropOf({ at: 'tab', key: inspector.key }, laid))).toBe(false);
    expect(byGroup('console', dropOf({ at: 'tab', key: inspector.key }, laid))).toBe(true);
    expect(byGroup('log', dropOf({ at: 'tab', key: players.key }, laid))).toBe(true);
  });

  it('still split beside the main view, at the stage edge, and float', () => {
    expect(byGroup('console', dropOf({ at: 'leaf', key: 'main', edge: 'top' }, laid))).toBe(true);
    expect(byGroup('console', dropOf({ at: 'outer', edge: 'left' }, laid))).toBe(true);
    expect(byGroup('console', dropOf({ at: 'float' }, laid))).toBe(true);
  });

  it('leave out every hint on a pane of another group, and keep the rest', () => {
    const view = viewFor(contextWith(byGroup), sourceOf('inspector'), at(centre(leafOf('players').rect)), NO_KEYS);
    expect(view.zones.some((z) => 'key' in z.target && z.target.key === players.key)).toBe(false);
    expect(view.zones.some((z) => z.target.at === 'leaf' && z.target.key === 'main')).toBe(true);
    expect(view.zones.filter((z) => z.target.at === 'outer')).toHaveLength(4);
    expect(view.hot).toBeNull();
    expect(view.preview).toBeNull();
  });

  it('drop nothing on a pane of another group', () => {
    const onEdit = vi.fn();
    const ctx = contextWith(byGroup);
    const source = sourceOf('inspector');
    const view = viewFor(ctx, source, at(centre(leafOf('players').rect)), NO_KEYS);
    releasePress({ source, pointerId: 1, live: true, view }, { context: ctx, onEdit });
    expect(onEdit).not.toHaveBeenCalled();
  });

  it('refuse at drop time a target the view still names', () => {
    const source = sourceOf('inspector');
    const hot = { target: { at: 'tab', key: players.key }, hit: STAGE, preview: STAGE, kind: 'compass' };
    const view = { outside: false, swap: false, hot, preview: STAGE, refused: false, overlay: false };
    expect(resolveDrop(source, view, contextWith(byGroup))).toEqual({});
    expect(resolveDrop(source, view).edit?.type).toBe('move-widget');
  });

  it('refuse an arriving widget the same way', () => {
    const drag = { id: 'console', pointer: centre(leafOf('players').rect) };
    expect(externalDrop(contextWith(byGroup), drag, VIEW)).toEqual({});
    expect(externalDrop(contextWith(undefined), drag, VIEW).edit?.type).toBe('move-widget');
  });

  it('shut a kit pane to a widget with no group, which still tabs with its own', () => {
    const view = viewFor(contextWith(byGroup), sourceOf('players'), at(centre(leafOf('inspector').rect)), NO_KEYS);
    expect(view.hot).toBeNull();
    const own = viewFor(contextWith(byGroup), sourceOf('log'), at(centre(leafOf('players').rect)), NO_KEYS);
    expect(own.hot?.target).toEqual({ at: 'tab', key: players.key });
  });
});

describe('a host rule on any drop', () => {
  it('can refuse floating, and the main view then docks beside itself', () => {
    const ctx = contextWith((id, drop) => drop.kind !== 'float');
    const main = mainRectOf(laid);
    const view = viewFor(ctx, sourceOf('players'), at({ x: main.x + 300, y: main.y + 300 }), NO_KEYS);
    expect(view.zones.some((z) => z.kind === 'float')).toBe(false);
    expect(view.hot?.target).toMatchObject({ at: 'leaf', key: 'main' });
    expect(resolveDrop(sourceOf('players'), view, ctx).edit?.type).toBe('move-widget');
  });

  it('can shut the main view, and then no preview shows and the drop does nothing', () => {
    const ctx = contextWith((id, drop) => drop.slot !== 'main');
    const main = mainRectOf(laid);
    const view = viewFor(ctx, sourceOf('players'), at({ x: main.x + 300, y: main.y + 300 }), NO_KEYS);
    expect(view.hot).toBeNull();
    expect(view.preview).toBeNull();
    expect(resolveDrop(sourceOf('players'), view, ctx)).toEqual({});
  });

  it('keeps floating when only groups apply', () => {
    const main = mainRectOf(laid);
    const view = viewFor(contextWith(byGroup), sourceOf('inspector'), at({ x: main.x + 300, y: main.y + 300 }), NO_KEYS);
    expect(view.preview).not.toBeNull();
    expect(resolveDrop(sourceOf('inspector'), view, contextWith(byGroup)).edit?.type).toBe('float-widget');
  });

  it('is asked after the groups in WidgetManager, and never for a drop the groups refuse', () => {
    const definitionOf = (id) => ({ id, group: groupOf(id) });
    const rule = vi.fn(() => true);
    const check = groupDrop(definitionOf, rule);
    expect(check('console', dropOf({ at: 'tab', key: players.key }, laid))).toBe(false);
    expect(rule).not.toHaveBeenCalled();
    expect(check('console', dropOf({ at: 'tab', key: inspector.key }, laid))).toBe(true);
    expect(rule).toHaveBeenCalledOnce();
  });

  it('changes nothing when left out', () => {
    const pointer = centre(leafOf('players').rect);
    const before = viewFor(contextWith(undefined), sourceOf('inspector'), at(pointer), NO_KEYS);
    expect(before.hot?.target).toEqual({ at: 'tab', key: players.key });
    expect(before.zones).toHaveLength(4 + 5 + 5);
  });
});
