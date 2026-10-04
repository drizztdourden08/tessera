/* @layer tooling-scripts @kind test */
import { describe, expect, it } from 'vitest';
import { layoutTree, mainRectOf } from '../src/composites/DockLayout';
import { createDefaultLayout } from '../src/composites/Widget/behavior/create-default-layout';
import { dockOnEdge } from '../src/composites/Widget/behavior/dock-on-edge';
import { dockedShare } from '../src/composites/Widget/behavior/docked-share';

const STAGE = { x: 0, y: 0, width: 1200, height: 800 };
const rectOf = (layout, id) => layoutTree(layout.dock, STAGE).leaves.find((leaf) => leaf.node.kind === 'pane' && leaf.node.widgets.includes(id))?.rect;

describe('a widget opened on an edge', () => {
  it('takes its defaultDockedSize as its share of the view, within 12 to 45 percent', () => {
    expect(dockedShare('right', 300, 1200)).toBe(0.25);
    expect(dockedShare('right', 50, 1200)).toBe(0.12);
    expect(dockedShare('right', 900, 1200)).toBe(0.45);
    expect(dockedShare('right', undefined, 1200)).toBe(0.22);
  });

  it('joins the pane already on that edge as a split, in place of a new pane further out', () => {
    const one = dockOnEdge(createDefaultLayout(), 'hints', 'right', { size: 280 });
    const two = dockOnEdge(one, 'console', 'right', { size: 300 });
    const hints = rectOf(two, 'hints');
    const consoleRect = rectOf(two, 'console');
    expect(hints.x).toBe(consoleRect.x);
    expect(hints.width).toBe(consoleRect.width);
    expect(consoleRect.y).toBeGreaterThan(hints.y);
    expect(Math.abs(hints.height - consoleRect.height)).toBeLessThan(1);
    expect(mainRectOf(layoutTree(two.dock, STAGE)).width).toBe(mainRectOf(layoutTree(one.dock, STAGE)).width);
  });

  it('splits a third widget evenly with the other two', () => {
    const three = ['a', 'b', 'c'].reduce((layout, id) => dockOnEdge(layout, id, 'left', { size: 260 }), createDefaultLayout());
    const heights = ['a', 'b', 'c'].map((id) => Math.round(rectOf(three, id).height));
    expect(new Set(heights).size).toBe(1);
    expect(new Set(['a', 'b', 'c'].map((id) => rectOf(three, id).x)).size).toBe(1);
  });

  it('still opens a new pane on an edge with none', () => {
    const one = dockOnEdge(createDefaultLayout(), 'log', 'bottom', { size: 170 });
    const two = dockOnEdge(one, 'hints', 'right', { size: 280 });
    expect(rectOf(two, 'log').y).toBeGreaterThan(rectOf(two, 'hints').y);
  });
});
