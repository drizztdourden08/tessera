/* @layer tooling-scripts @kind test */
import { afterEach, describe, expect, it, vi } from 'vitest';
import { columnsOf } from '../src/composites/pane-edge/columns-of';
import { edgeLabelOf } from '../src/composites/pane-edge/edge-label-of';
import { foldSidesOf } from '../src/composites/pane-edge/fold-sides-of';
import { foldedPaneOf } from '../src/composites/pane-edge/folded-pane-of';
import { paneEdgeOf } from '../src/composites/pane-edge/pane-edge-of';
import { sharePixels } from '../src/composites/pane-edge/share-pixels';
import { usePaneFold } from '../src/composites/pane-edge/usePaneFold';
import { mountHook } from './hook-harness.mjs';

vi.mock('react', async (importOriginal) => ({ ...(await importOriginal()), ...(await import('./hook-harness.mjs')).hooks }));

afterEach(() => vi.unstubAllGlobals());

const paneFold = (extra = {}) => ({ collapsed: false, toggleRef: { current: null }, toggle: vi.fn(), collapse: vi.fn(), expand: vi.fn(), ...extra });
const sizeOf = () => ({
  size: 300, dragging: false, reset: vi.fn(),
  handle: { value: 300, min: 240, max: 480, onResize: vi.fn(), onResizeEnd: vi.fn(), onDragChange: vi.fn(), onReset: vi.fn() },
});

describe('paneEdgeOf', () => {
  it('hands the size to the handle with its edge, and offers the low side to fold when the pane can', () => {
    const size = sizeOf();
    const { handle, other } = paneEdgeOf({ edge: 'end', size, fold: paneFold() });
    expect(handle).toMatchObject({ value: 300, min: 240, max: 480, edge: 'end' });
    expect(handle.onResize).toBe(size.handle.onResize);
    expect(handle.fold).toMatchObject({ sides: ['low'], folded: null });
    expect(other).toBeUndefined();
    expect('step' in handle).toBe(false);
  });

  it('offers no fold when no pane can, and adds the high side when the other pane can', () => {
    const none = { collapsed: false, toggleRef: { current: null }, toggle: vi.fn(), collapse: undefined, expand: undefined };
    expect(paneEdgeOf({ edge: 'start', size: sizeOf(), fold: none }).handle.fold).toBeUndefined();
    expect(paneEdgeOf({ edge: 'start', size: sizeOf(), fold: none, other: paneFold() }).handle.fold.sides).toEqual(['high']);
    expect(paneEdgeOf({ edge: 'start', size: sizeOf(), fold: paneFold(), other: paneFold() }).handle.fold.sides).toEqual(['low', 'high']);
  });

  it('folds a pane through collapse and unfolds it through expand, then sizes it to where the drag came in', () => {
    const size = sizeOf();
    const fold = paneFold();
    const other = paneFold();
    const { handle } = paneEdgeOf({ edge: 'start', size, fold, other });
    handle.fold.onFold('low');
    handle.fold.onFold('high');
    expect([fold.collapse.mock.calls.length, other.collapse.mock.calls.length]).toEqual([1, 1]);
    handle.fold.onUnfold('low', 240);
    expect(fold.expand).toHaveBeenCalledTimes(1);
    expect(size.handle.onResize).toHaveBeenLastCalledWith(240, { from: 240, by: 'drag' });
    handle.fold.onUnfold('high', 480);
    expect(other.expand).toHaveBeenCalledTimes(1);
    expect(size.handle.onResize).toHaveBeenLastCalledWith(480, { from: 480, by: 'drag' });
  });

  it('reports which side is folded, and forces the other pane open while the first is folded', () => {
    const lowFolded = paneEdgeOf({ edge: 'start', size: sizeOf(), fold: paneFold({ collapsed: true }), other: paneFold({ collapsed: true }) });
    expect(lowFolded.handle.fold.folded).toBe('low');
    expect(lowFolded.other.collapsed).toBe(false);
    const other = paneFold({ collapsed: true });
    const highFolded = paneEdgeOf({ edge: 'start', size: sizeOf(), fold: paneFold(), other });
    expect(highFolded.handle.fold.folded).toBe('high');
    expect(highFolded.other.collapsed).toBe(true);
    expect(highFolded.other.collapse).toBe(other.collapse);
    expect(other.collapsed).toBe(true);
  });

  it('resets by opening both panes and resetting the size, and measures shares when it is given a container', () => {
    const size = sizeOf();
    const fold = paneFold();
    const other = paneFold();
    const { handle } = paneEdgeOf({ edge: 'start', size, fold, other, shares: { panes: { current: null }, orientation: 'horizontal' } });
    handle.onReset();
    expect([fold.expand.mock.calls.length, other.expand.mock.calls.length, size.handle.onReset.mock.calls.length]).toEqual([1, 1, 1]);
    expect(handle).toMatchObject({ step: 2, largeStep: 10 });
    expect(handle.pixelsPerUnit()).toBe(0);
  });
});

describe('the small rules of the pane edge', () => {
  it('writes the columns of a pane pair: pixels, shares, or a folded side in the auto column', () => {
    expect(columnsOf({ size: 320, shares: false, folded: null })).toBe('320px auto minmax(0, 1fr)');
    expect(columnsOf({ size: 60, shares: true, folded: null })).toBe('minmax(0, 60fr) auto minmax(0, 40fr)');
    expect(columnsOf({ size: 320, shares: false, folded: 'start' })).toBe('auto auto minmax(0, 1fr)');
    expect(columnsOf({ size: 60, shares: true, folded: 'end' })).toBe('minmax(0, 1fr) auto auto');
  });

  it('names the folded pane, the start one first, and the sides that can fold', () => {
    const [open, shut] = [paneFold(), paneFold({ collapsed: true })];
    expect([foldedPaneOf(open, open), foldedPaneOf(shut, open), foldedPaneOf(open, shut), foldedPaneOf(shut, shut)]).toEqual([null, 'start', 'end', 'start']);
    expect(foldSidesOf(open, undefined)).toEqual(['low']);
    expect(foldSidesOf(open, open)).toEqual(['low', 'high']);
    expect(foldSidesOf({ ...open, collapse: undefined }, open)).toEqual(['high']);
    expect(foldSidesOf({ ...open, collapse: undefined }, undefined)).toEqual([]);
  });

  it('labels the edge by both panes, or by the one it has', () => {
    const names = { both: (a, b) => `${a} and ${b}`, one: (a) => `only ${a}` };
    expect(edgeLabelOf({ label: 'files' }, { label: 'sheet' }, names)).toBe('files and sheet');
    expect(edgeLabelOf({ label: 'files' }, undefined, names)).toBe('only files');
    expect(edgeLabelOf(undefined, { label: 'sheet' }, names)).toBe('only sheet');
    expect(edgeLabelOf(undefined, undefined, names)).toBe('only ');
  });

  it('counts the pixels of one share from the first and last pane, along the axis', () => {
    const box = (width, height) => ({ getBoundingClientRect: () => ({ width, height }) });
    const panes = { children: [box(300, 100), box(8, 8), box(100, 50)] };
    expect(sharePixels(panes, 'horizontal')).toBe(4);
    expect(sharePixels(panes, 'vertical')).toBe(1.5);
    expect(sharePixels({ children: [box(300, 100)] }, 'horizontal')).toBe(3);
    expect(sharePixels(null, 'horizontal')).toBe(0);
  });
});

describe('usePaneFold', () => {
  const mount = (extra = {}) => {
    const onCollapsedChange = vi.fn();
    const options = { collapsible: true, collapsed: undefined, defaultCollapsed: false, onCollapsedChange, storageKey: undefined, ...extra };
    return { view: mountHook(() => usePaneFold(options)), onCollapsedChange };
  };

  it('collapses, expands and toggles, telling the owner each change once', () => {
    const { view, onCollapsedChange } = mount();
    expect(view.current.collapsed).toBe(false);
    view.act((fold) => fold.collapse());
    expect(view.current.collapsed).toBe(true);
    view.act((fold) => fold.expand());
    expect(view.current.collapsed).toBe(false);
    view.act((fold) => fold.expand());
    view.act((fold) => fold.toggle());
    expect(view.current.collapsed).toBe(true);
    expect(onCollapsedChange.mock.calls).toEqual([[true], [false], [true]]);
  });

  it('offers neither collapse nor expand, and never folds, when it is not collapsible', () => {
    const { view } = mount({ collapsible: false, defaultCollapsed: true });
    expect(view.current).toMatchObject({ collapsed: false, collapse: undefined, expand: undefined });
    expect(typeof view.current.toggle).toBe('function');
  });

  it('follows the owner when controlled, and keeps its fold under its storage key', () => {
    const { view, onCollapsedChange } = mount({ collapsed: true });
    view.act((fold) => fold.expand());
    expect(onCollapsedChange).toHaveBeenCalledWith(false);
    expect(view.current.collapsed).toBe(true);
    const stored = new Map([['panel:collapsed', 'true']]);
    vi.stubGlobal('localStorage', { getItem: (name) => stored.get(name) ?? null, setItem: (name, value) => stored.set(name, value) });
    const kept = mount({ storageKey: 'panel:collapsed' });
    expect(kept.view.current.collapsed).toBe(true);
    kept.view.act((fold) => fold.expand());
    expect(stored.get('panel:collapsed')).toBe('false');
  });
});
