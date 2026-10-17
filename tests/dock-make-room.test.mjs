/* @layer tooling-scripts @kind test */
import { createElement as h } from 'react';
import { renderToString } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { layoutTree, mainRectOf } from '../src/composites/DockLayout';
import { DockPanes } from '../src/composites/DockLayout/sub-components/DockPanes';
import { migrateLayout } from '../src/composites/Widget/behavior/migrate-layout';

const STAGE = { x: 0, y: 0, width: 1200, height: 800 };

const savedTree = (left, bottom) => ({
  kind: 'split',
  axis: 'row',
  sizes: [0.25, 0.75],
  children: [
    { kind: 'pane', key: 'left', widgets: ['players'], active: 'players', ...left },
    {
      kind: 'split',
      axis: 'column',
      sizes: [0.7, 0.3],
      children: [{ kind: 'main', key: 'main' }, { kind: 'pane', key: 'bottom', widgets: ['log'], active: 'log', ...bottom }],
    },
  ],
});

const saved = (left = {}, bottom = {}) => ({ v: 2, dock: savedTree(left, bottom), floating: [], popped: [], frame: {} });
const leafRect = (laid, key) => laid.leaves.find((leaf) => leaf.node.key === key).rect;
const panesOf = (node) => {
  if (node.kind === 'pane') return [node];
  return node.kind === 'split' ? node.children.flatMap(panesOf) : [];
};

describe('a layout saved without makeRoom', () => {
  it('lays the main view under both panes when both overlay, as every saved pane read before', () => {
    const laid = layoutTree(saved({ makeRoom: false }, { makeRoom: false }).dock, STAGE);
    const main = mainRectOf(laid);
    expect(main.x).toBe(0);
    expect(main.width).toBe(STAGE.width);
    expect(main.y + main.height).toBe(STAGE.height);
  });

  it('makes room once migrated: every docked pane stores makeRoom true', () => {
    const layout = migrateLayout(saved());
    expect(panesOf(layout.dock).map((pane) => pane.makeRoom)).toEqual([true, true]);
    const laid = layoutTree(layout.dock, STAGE);
    expect(mainRectOf(laid)).toEqual(leafRect(laid, 'main'));
  });

  it('makes room when read without the migration, as a preset the app passes', () => {
    const laid = layoutTree(saved().dock, STAGE);
    const main = mainRectOf(laid);
    expect(main).toEqual(leafRect(laid, 'main'));
    expect(main.x).toBeGreaterThan(leafRect(laid, 'left').x + leafRect(laid, 'left').width);
    expect(main.y + main.height).toBeLessThan(leafRect(laid, 'bottom').y);
    const html = renderToString(h(DockPanes, { laid, renderPane: (pane) => pane.key }));
    expect(html).not.toContain('dock-layout__pane--overlay');
  });

  it('keeps an explicit makeRoom: false as an overlay, through the migration and on read', () => {
    const layout = migrateLayout(saved({ makeRoom: false }));
    expect(panesOf(layout.dock).map((pane) => pane.makeRoom)).toEqual([false, true]);
    const laid = layoutTree(layout.dock, STAGE);
    const main = mainRectOf(laid);
    expect(main.x).toBe(0);
    expect(main.y + main.height).toBeLessThan(leafRect(laid, 'bottom').y);
    const html = renderToString(h(DockPanes, { laid, renderPane: (pane) => pane.key }));
    expect(html.match(/dock-layout__pane--overlay/g)).toHaveLength(1);
    expect(html).toMatch(/dock-layout__pane dock-layout__pane--overlay" data-pane-key="left"/);
  });

  it('leaves a layout that already stores makeRoom as it was', () => {
    const layout = migrateLayout(saved({ makeRoom: true }, { makeRoom: false }));
    expect(layout.dock).toEqual(savedTree({ makeRoom: true }, { makeRoom: false }));
  });
});

describe('a flat layout from before the dock tree', () => {
  const flat = (exclusive) => ({
    widgets: [{
      id: 'players', mode: 'docked', side: 'left', order: 0, opacity: 1, visibility: 'always', visible: true,
      x: 0, y: 0, width: 300, height: 400, dockedSize: 300, ...(exclusive === undefined ? {} : { exclusive }),
    }],
  });

  it('makes room for a docked widget unless it stored exclusive: false', () => {
    expect(panesOf(migrateLayout(flat(undefined)).dock)[0].makeRoom).toBe(true);
    expect(panesOf(migrateLayout(flat(true)).dock)[0].makeRoom).toBe(true);
    expect(panesOf(migrateLayout(flat(false)).dock)[0].makeRoom).toBe(false);
  });
});
