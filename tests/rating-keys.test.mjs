/* @layer tooling-scripts @kind test */
import { describe, expect, it, vi } from 'vitest';
import { useRatingPick } from '../src/composites/Rating/behavior/useRatingPick';
import { mountHook } from './hook-harness.mjs';

vi.mock('react', async (importOriginal) => ({ ...(await importOriginal()), ...(await import('./hook-harness.mjs')).hooks }));

const keyOn = (key, direction = 'ltr', extra = {}, focused = null) => {
  const stars = new Map([1, 2, 3, 4, 5].map((star) => [String(star), { focus: vi.fn() }]));
  const event = {
    key,
    target: focused === null ? { dataset: {} } : { dataset: { star: String(focused) } },
    preventDefault: vi.fn(),
    currentTarget: { direction, querySelector: (selector) => stars.get(selector.match(/"(\d)"/)?.[1]) ?? null },
    ...extra,
  };
  return { event, stars };
};

vi.stubGlobal('getComputedStyle', (node) => ({ direction: node.direction }));

describe('the keys of the picker', () => {
  it('pick the next star and move focus to it', () => {
    const onChange = vi.fn();
    const pick = mountHook(() => useRatingPick(3, 5, onChange));
    const { event, stars } = keyOn('ArrowRight');
    pick.current.onKeyDown(event);
    expect(onChange).toHaveBeenCalledWith(4);
    expect(event.preventDefault).toHaveBeenCalledOnce();
    expect(stars.get('4').focus).toHaveBeenCalledOnce();
  });

  it('send Home and End to the first and last star', () => {
    const onChange = vi.fn();
    const pick = mountHook(() => useRatingPick(3, 5, onChange));
    pick.current.onKeyDown(keyOn('Home').event);
    pick.current.onKeyDown(keyOn('End').event);
    expect(onChange.mock.calls).toEqual([[1], [5]]);
  });

  it('swap Left and Right in a right to left page', () => {
    const onChange = vi.fn();
    const pick = mountHook(() => useRatingPick(3, 5, onChange));
    pick.current.onKeyDown(keyOn('ArrowLeft', 'rtl').event);
    expect(onChange).toHaveBeenCalledWith(4);
  });

  it('start from the first star before a pick, and leave other keys and shortcuts alone', () => {
    const onChange = vi.fn();
    const pick = mountHook(() => useRatingPick(null, 5, onChange));
    expect(pick.current.tabStop).toBe(1);
    const tab = keyOn('Tab');
    pick.current.onKeyDown(tab.event);
    pick.current.onKeyDown(keyOn('ArrowRight', 'ltr', { ctrlKey: true }).event);
    expect(onChange).not.toHaveBeenCalled();
    expect(tab.event.preventDefault).not.toHaveBeenCalled();
    pick.current.onKeyDown(keyOn('ArrowRight').event);
    expect(onChange).toHaveBeenCalledWith(1);
  });

  it('move from the focused star, so the first Right from star one before a pick picks two', () => {
    const onChange = vi.fn();
    const pick = mountHook(() => useRatingPick(null, 5, onChange));
    pick.current.onKeyDown(keyOn('ArrowRight', 'ltr', {}, 1).event);
    expect(onChange).toHaveBeenCalledWith(2);
  });

  it('do not pick again the star already picked at an end', () => {
    const onChange = vi.fn();
    const pick = mountHook(() => useRatingPick(5, 5, onChange));
    const { event, stars } = keyOn('ArrowRight');
    pick.current.onKeyDown(event);
    expect(onChange).not.toHaveBeenCalled();
    expect(stars.get('5').focus).toHaveBeenCalledOnce();
  });

  it('show the hovered star until the pointer leaves', () => {
    const pick = mountHook(() => useRatingPick(2, 5, vi.fn()));
    pick.act((p) => p.hover(4));
    expect(pick.current.shown).toBe(4);
    pick.act((p) => p.hover(null));
    expect(pick.current.shown).toBe(2);
  });
});
