/* @layer tooling-scripts @kind test */
import { describe, expect, it, vi } from 'vitest';
import { DEFS, LAYOUT } from './fixtures/toolbar-dock/toolbar-dock-frame.mjs';
import { createToolbarLayout, hideToolbar, useToolbarLayout } from '../src/composites/ToolbarDock';
import { mountHook } from './hook-harness.mjs';

vi.mock('react', async (importOriginal) => ({ ...(await importOriginal()), ...(await import('./hook-harness.mjs')).hooks }));

const mount = (value = LAYOUT) => {
  const onChange = vi.fn();
  const view = mountHook(() => useToolbarLayout({ value, onChange, definitions: DEFS }));
  return { onChange, view };
};

describe('useToolbarLayout', () => {
  it('returns the controlled value as layout', () => {
    expect(mount().view.current.layout).toBe(LAYOUT);
  });

  it('calls onChange once with the new layout for each edit', () => {
    const { onChange, view } = mount();
    view.current.hide('a');
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenLastCalledWith(hideToolbar(LAYOUT, 'a'));
    view.current.move('c', 'right', 0);
    expect(onChange).toHaveBeenCalledTimes(2);
    expect(onChange.mock.calls[1][0].sides.right).toEqual(['c']);
  });

  it('does not call onChange when the op returns the same layout', () => {
    const { onChange, view } = mount();
    view.current.show('a');
    view.current.hide('missing');
    view.current.move('c', 'top', 0);
    expect(onChange).not.toHaveBeenCalled();
  });

  it('shows and toggles a hidden toolbar', () => {
    const { onChange, view } = mount(hideToolbar(LAYOUT, 'b'));
    expect(view.current.isShown('b')).toBe(false);
    expect(view.current.canShow('b')).toBe(true);
    view.current.show('b');
    view.current.toggle('b');
    expect(onChange).toHaveBeenCalledTimes(2);
    expect(onChange.mock.calls[0][0].sides.top).toContain('b');
  });

  it('resets to the layout the definitions create', () => {
    const { onChange, view } = mount(hideToolbar(LAYOUT, 'a'));
    view.current.reset();
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenCalledWith(createToolbarLayout(DEFS));
  });

  it('works on the value it was last rendered with', () => {
    const { onChange, view } = mount();
    const next = hideToolbar(LAYOUT, 'a');
    view.rerender(() => useToolbarLayout({ value: next, onChange, definitions: DEFS }));
    expect(view.current.layout).toBe(next);
    view.current.hide('a');
    expect(onChange).not.toHaveBeenCalled();
  });
});
