/* @layer tooling-scripts @kind test */
import { describe, expect, it } from 'vitest';
import { headerSpace } from '../src/composites/ScreenPage/behavior/header-space';
import { rowFits } from '../src/composites/ScreenPage/behavior/row-fits';
import { stackOf } from '../src/composites/ScreenPage/behavior/stack-of';

const view = {
  getComputedStyle: (el) => el.computed ?? { position: 'static', display: 'flex' },
};

const part = (name, width, extra = {}) => {
  const style = {};
  return {
    nodeType: 1,
    offsetHeight: 20,
    style,
    classList: { contains: (value) => value === name },
    getAttribute: () => null,
    removeAttribute: () => undefined,
    setAttribute: () => undefined,
    querySelector: () => null,
    getBoundingClientRect: () => ({ width: style.width === 'min-content' ? extra.least ?? width : width }),
    scrollWidth: extra.full ?? width,
    ...extra,
  };
};

const header = (children, room) => {
  const classes = new Set(['content-header', 'screen-page__header--stacked']);
  return {
    children,
    clientWidth: room + 48,
    ownerDocument: { defaultView: view },
    computed: { columnGap: '12px', paddingLeft: '24px', paddingRight: '24px' },
    classes,
    classList: { contains: (c) => classes.has(c), remove: (...names) => names.forEach((c) => classes.delete(c)), add: (...names) => names.forEach((c) => classes.add(c)) },
  };
};

describe('K1 the ScreenPage header row', { tags: ['critical'] }, () => {
  it('fits while every part has its width', () => {
    const space = { widths: [24, 180, 80], strip: 300, gap: 12, room: 620 };
    expect(rowFits(space, true)).toBe(true);
    expect(rowFits({ ...space, room: 600 }, true)).toBe(false);
    expect(rowFits({ widths: [24, 0, 180], strip: 0, gap: 12, room: 216 }, true)).toBe(true);
  });

  it('moves the strip under the title first, then the actions', () => {
    const space = { widths: [24, 180, 80], strip: 300, gap: 12, room: 620 };
    expect(stackOf(space)).toBe('row');
    expect(stackOf({ ...space, room: 400 })).toBe('strip');
    expect(stackOf({ ...space, room: 250 })).toBe('all');
    expect(stackOf({ ...space, strip: 0, room: 250 })).toBe('all');
  });

  it('counts the full title and the least width of the strip, measured on one row', () => {
    const title = part('content-header__title', 90, { full: 180 });
    const strip = part('stage-screen__toolbar', 520, { least: 300 });
    const backdrop = part('content-header__backdrop', 900, { computed: { position: 'absolute', display: 'block' } });
    const room = 590;
    const host = header([backdrop, part('content-header__icon', 24), title, strip, part('content-header__actions', 60)], room);
    const space = headerSpace(host);
    expect(space).toEqual({ widths: [24, 180, 60], strip: 300, gap: 12, room });
    expect(host.classes.has('screen-page__header--stacked')).toBe(true);
    expect(stackOf(space)).toBe('strip');
  });
});
