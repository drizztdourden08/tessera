/* @layer tooling-scripts @kind test */
import { createElement as h } from 'react';
import { renderToString } from 'react-dom/server';
import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { ScreenPage } from '../src/composites/ScreenPage';
import { headerSpace } from '../src/composites/ScreenPage/behavior/header-space';
import { rowFits } from '../src/composites/ScreenPage/behavior/row-fits';
import { stackOf } from '../src/composites/ScreenPage/behavior/stack-of';

const css = (name) => readFileSync(new URL(`../src/composites/${name}/${name}.css`, import.meta.url), 'utf8');
const rule = (source, selector) => {
  const start = source.indexOf(`${selector} {`);
  return start < 0 ? '' : source.slice(start, source.indexOf('}', start));
};

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

describe('the screen roots', () => {
  it('fill their box and never set a width from their content', () => {
    expect(rule(css('ScreenLayer'), '.overlay.screen-layer')).toContain('container: screen-layer / size');
    expect(rule(css('ScreenLayer'), '.screen-layer__card')).toContain('min-width: 0');
    expect(rule(css('ScreenWindow'), '.screen-window')).toContain('container: screen-window / inline-size');
    expect(rule(css('ScreenWindow'), '.screen-window')).toContain('min-width: 0');
    expect(rule(css('ScreenPage'), '.screen-page')).toContain('min-width: 0');
  });

  it('let the title bar put the subtitle on a second line', () => {
    expect(rule(css('ScreenWindow'), '.screen-window__header .window-header__titles')).toContain('flex-wrap: wrap');
  });

  it('stack the page header only through its own class', () => {
    const source = css('ScreenPage');
    expect(rule(source, '.content-header.screen-page__header--stacked')).toContain('flex-wrap: wrap');
    expect(source).not.toMatch(/@media/);
  });
});

describe('the ScreenPage header row', () => {
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

  it('renders the header as a plain row until it measures the room', () => {
    const html = renderToString(h(ScreenPage, { icon: h('i'), title: 'Sessions', strip: h('span', null, 'Live') }, 'Body'));
    expect(html).not.toContain('screen-page__header--stacked');
    expect(html).toContain('Live');
  });
});
