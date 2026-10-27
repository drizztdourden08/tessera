/* @layer tooling-scripts @kind test */
import fs from 'node:fs';
import { createElement as h } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { Drawer } from '../src/composites/Drawer';
import { WindowHeader } from '../src/composites/WindowHeader';

const render = (props) => renderToStaticMarkup(h(Drawer, { open: true, onClose: () => {}, title: 'Details', ...props }, 'Body'));

const css = (name) => fs.readFileSync(new URL(`../src/composites/${name}/${name}.css`, import.meta.url), 'utf8');

describe('Drawer record header', () => {
  it('draws the eyebrow above the title and the header actions before close', () => {
    const html = render({
      eyebrow: 'INC-20481',
      headerActions: h('button', { 'aria-label': 'Pin record' }, 'Pin'),
    });
    expect(html).toContain('window-header__eyebrow">INC-20481<');
    expect(html.indexOf('window-header__eyebrow')).toBeLessThan(html.indexOf('window-header__title"'));
    expect(html).toContain('window-header__actions"><button aria-label="Pin record">');
    expect(html.indexOf('window-header__actions')).toBeLessThan(html.indexOf('window-header__close'));
  });

  it('draws a header for an eyebrow alone, and none for a drawer with only a label', () => {
    expect(render({ title: undefined, eyebrow: 'INC-20481' })).toContain('window-header');
    expect(render({ title: undefined, label: 'Notes' })).not.toContain('window-header');
  });

  it('wraps the title by default and can keep it on one line', () => {
    expect(render({})).toContain('window-header--wrap');
    expect(render({ titleWrap: false })).not.toContain('window-header--wrap');
  });

  it('adds a class for the wide size from the 768 px token, between lg and xl', () => {
    expect(render({ size: 'wide' })).toContain('drawer--wide');
    const source = css('Drawer');
    expect(source).toContain('.drawer--wide .drawer__panel {\n  width: min(90vw, var(--size-768));');
    expect(source.indexOf('.drawer--wide')).toBeGreaterThan(source.indexOf('.drawer--lg'));
    expect(source.indexOf('.drawer--wide')).toBeLessThan(source.indexOf('.drawer--xl'));
  });

  it('goes full width under 480 px for any size, and a top drawer keeps its own width', () => {
    const source = css('Drawer');
    expect(source).toMatch(/@container drawer \(width < 480px\) \{\n {2}\.drawer \.drawer__panel \{\n {4}width: 100%;/);
    expect(source.indexOf('@container drawer')).toBeGreaterThan(source.indexOf('.drawer--xl .drawer__panel'));
    expect(source.indexOf('.drawer--top .drawer__panel {')).toBeGreaterThan(source.indexOf('@container drawer'));
  });
});

describe('WindowHeader eyebrow and actions', () => {
  it('draws neither without the props', () => {
    const html = renderToStaticMarkup(h(WindowHeader, { title: 'Save files' }));
    expect(html).not.toContain('window-header__eyebrow');
    expect(html).not.toContain('window-header__actions');
    expect(html).not.toContain('window-header__titles--eyebrow');
  });

  it('wraps the titles row when an eyebrow sits above the title', () => {
    const html = renderToStaticMarkup(h(WindowHeader, { eyebrow: 'Record', title: 'Save files' }));
    expect(html).toContain('window-header__titles window-header__titles--eyebrow');
    expect(css('WindowHeader')).toContain('.window-header__eyebrow {\n  flex: 0 0 100%;');
  });
});

describe('Drawer record look', () => {
  it('adds the record header class only for look record', () => {
    expect(render({ look: 'record' })).toContain('window-header--record');
    expect(render({})).not.toContain('window-header--record');
  });

  it('keeps the eyebrow case and the title colour from the text tokens', () => {
    const source = css('WindowHeader');
    expect(source).toContain('.window-header--record .window-header__title {\n  letter-spacing: normal;\n  text-transform: none;\n  color: var(--c-text);');
    expect(source).toContain('.window-header--record .window-header__eyebrow {\n  letter-spacing: normal;\n  text-transform: none;');
  });
});
