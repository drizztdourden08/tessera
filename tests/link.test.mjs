/* @layer tooling-scripts @kind test */
import { describe, expect, it } from 'vitest';
import { isPlainClick } from '../src/primitives/Link/behavior/is-plain-click';
import { navigateClick } from '../src/primitives/Link/behavior/navigate-click';

const anchor = (attributes = {}) => ({
  getAttribute: (name) => attributes[name] ?? null,
  hasAttribute: (name) => name in attributes,
});

const click = (overrides = {}) => {
  const event = {
    button: 0, metaKey: false, ctrlKey: false, shiftKey: false, altKey: false, defaultPrevented: false,
    currentTarget: anchor(), prevented: false, ...overrides,
  };
  event.preventDefault = () => { event.prevented = true; event.defaultPrevented = true; };
  return event;
};

const follow = (href, event, onClick) => {
  const went = [];
  navigateClick(href, (to) => went.push(to), onClick)(event);
  return { went };
};

describe('K1 Link with navigate', { tags: ['critical'] }, () => {
  it('keeps the plain onClick when it has no navigate', () => {
    const onClick = () => undefined;
    expect(navigateClick('/saves/2', undefined, onClick)).toBe(onClick);
  });

  it('hands a plain click to navigate instead of loading the page', () => {
    const event = click();
    const { went } = follow('/saves/2', event);
    expect(went).toEqual(['/saves/2']);
    expect(event.prevented).toBe(true);
  });

  it('leaves modified, middle and new tab clicks to the browser', () => {
    const cases = [{ ctrlKey: true }, { metaKey: true }, { shiftKey: true }, { altKey: true }, { button: 1 }, { currentTarget: anchor({ target: '_blank' }) }, { currentTarget: anchor({ download: '' }) }];
    for (const overrides of cases) {
      const event = click(overrides);
      expect(follow('/saves/2', event).went).toEqual([]);
      expect(event.prevented).toBe(false);
    }
  });

  it('runs its own onClick first, which can stop the navigation', () => {
    const event = click();
    const { went } = follow('/saves/2', event, (e) => e.preventDefault());
    expect(went).toEqual([]);
    expect(isPlainClick(click({ defaultPrevented: true }))).toBe(false);
  });
});
