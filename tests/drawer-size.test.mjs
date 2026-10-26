/* @layer tooling-scripts @kind test */
import fs from 'node:fs';
import { createElement as h } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { Drawer } from '../src/composites/Drawer';

const render = (props) => renderToStaticMarkup(h(Drawer, { open: true, onClose: () => {}, title: 'Details', ...props }, 'Body'));

describe('Drawer size', () => {
  it('writes no class for the default md and a class for a wider size', () => {
    expect(render({})).not.toContain('drawer--md');
    expect(render({ size: 'xl' })).toContain('drawer--xl');
  });

  it('widens lg and xl from size tokens, and a top drawer keeps its full width', () => {
    const css = fs.readFileSync(new URL('../src/composites/Drawer/Drawer.css', import.meta.url), 'utf8');
    expect(css).toContain('.drawer--lg .drawer__panel {\n  width: min(86vw, var(--size-640));');
    expect(css).toContain('.drawer--xl .drawer__panel {\n  width: min(92vw, var(--size-1024));');
    expect(css.indexOf('.drawer--top .drawer__panel')).toBeGreaterThan(css.indexOf('.drawer--xl .drawer__panel'));
  });
});
