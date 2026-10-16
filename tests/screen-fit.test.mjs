/* @layer tooling-scripts @kind test */
import { createElement as h } from 'react';
import { renderToString } from 'react-dom/server';
import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { InfoScreen } from '../src/composites/InfoScreen';
import { ScreenPage } from '../src/composites/ScreenPage';
import { ScreenWindow } from '../src/composites/ScreenWindow';
import { UtilityScreen } from '../src/composites/UtilityScreen';
import { headerSpace } from '../src/composites/ScreenPage/behavior/header-space';
import { rowFits } from '../src/composites/ScreenPage/behavior/row-fits';
import { stackOf } from '../src/composites/ScreenPage/behavior/stack-of';

const css = (name) => readFileSync(new URL(`../src/composites/${name}/${name}.css`, import.meta.url), 'utf8');
const rule = (source, selector) => {
  const start = source.indexOf(`${selector} {`);
  return start < 0 ? '' : source.slice(start, source.indexOf('}', start));
};

const layerClass = (html) => html.match(/class="overlay[^"]*"/)?.[0] ?? '';
const close = () => undefined;

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

describe('an informational window', () => {
  it('opens InfoScreen on the small info card', () => {
    const html = renderToString(h(InfoScreen, { title: 'About', onClose: close }, h('p', null, 'Version 0.9.2')));
    expect(layerClass(html)).toContain('screen-layer--info');
    expect(html).toContain('class="info-screen__column"');
    expect(html).not.toContain('info-screen__column--');
  });

  it('fits the card to its content, centred, at most 512 px wide, and caps it at the window height', () => {
    const source = css('ScreenLayer');
    expect(rule(source, '.screen-layer__inset')).toContain('align-items: center');
    expect(rule(source, '.screen-layer__inset')).toContain('justify-content: center');
    const frame = rule(source, '.screen-layer--info .screen-layer__frame');
    expect(frame).toContain('width: min(100%, var(--size-512))');
    expect(frame).toContain('height: auto');
    expect(frame).toContain('max-height: 100%');
  });

  it('scrolls only its column, which takes the card width', () => {
    const source = css('InfoScreen');
    expect(rule(source, '.info-screen__body')).toContain('min-height: 0');
    expect(rule(source, '.info-screen__column')).not.toContain('max-width');
  });

  it('keeps the frame of a dialog until the window is narrower than the card and its gutter', () => {
    const source = css('ScreenLayer');
    const narrow = source.slice(source.indexOf('@container screen-layer (width < 560px)'));
    expect(narrow).toMatch(/\.screen-layer--info \.screen-layer__frame \{\s+width: 100%;\s+height: 100%;/);
  });
});

describe('a screen with tools', () => {
  it('keeps its size', () => {
    const status = { tone: 'info', title: 'Updates', message: 'Checking' };
    expect(layerClass(renderToString(h(UtilityScreen, { onClose: close, status })))).toContain('screen-layer--compact');
    expect(layerClass(renderToString(h(ScreenWindow, { title: 'Settings', onClose: close }, 'Body')))).toContain('screen-layer--fill');
  });
});
