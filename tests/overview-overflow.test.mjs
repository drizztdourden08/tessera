/* @layer tooling-scripts @kind test */
import { readFileSync } from 'node:fs';
import { createElement as h } from 'react';
import { renderToString } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { Demonstrator } from '../stories/_template/Demonstrator';
import { nextLayout } from '../stories/_template/next-layout';

const read = (path) => readFileSync(new URL(`../stories/_template/${path}`, import.meta.url), 'utf8');
const rule = (css, selector) => {
  const start = css.indexOf(`${selector} {`);
  return start < 0 ? '' : css.slice(start, css.indexOf('}', start));
};

describe('the Overview page never scrolls sideways', () => {
  it('lets every block of the page shrink to the content column', () => {
    const css = read('overview.css');
    expect(rule(css, ':where(.overview, .overview__section, .overview__variant) > *')).toMatch(/min-inline-size: 0;\s*max-inline-size: 100%;/);
    expect(rule(css, '.overview')).toContain('min-inline-size: 0;');
  });

  it('scrolls a frame inside its own box when its content cannot shrink', () => {
    const css = read('overview.css');
    expect(rule(css, '.overview__showcase')).toContain('overflow-x: auto;');
    expect(rule(css, '.overview__fit')).toContain('overflow-x: auto;');
  });

  it('puts every extra section and the switcher in a frame', () => {
    const page = read('OverviewPage.tsx');
    expect(page).toContain('<Box className="overview__fit">{section.node}</Box>');
    expect(page).toContain('<Box className="overview__fit">{switcher}</Box>');
    expect(page).not.toMatch(/^\s*\{switcher\}\s*$/m);
  });

  it('caps the Playground stage, its parameters and every Demonstrator cell', () => {
    const controls = read('controls/arg-controls.css');
    expect(rule(controls, ':where(.playground__stage) > *')).toMatch(/min-inline-size: 0;\s*max-inline-size: 100%;/);
    expect(controls).toContain('justify-content: safe center;');
    expect(controls).toContain('minmax(min(var(--size-384), 100%), 1fr)');
    expect(rule(read('Demonstrator.css'), ':where(.demonstrator__cell) > *')).toMatch(/min-inline-size: 0;\s*max-inline-size: 100%;/);
  });
});

describe('the Demonstrator fits its frame', () => {
  const columnsOf = (html) => /grid-template-columns:([^;"]+)/.exec(html)?.[1].trim();

  it('starts on tracks that shrink to their content', () => {
    const html = renderToString(h(Demonstrator, { rows: [{ key: 'a', label: 'A' }], columns: [{ key: 'b', label: 'B' }], cell: () => 'x' }));
    expect(html).toContain('data-layout="grid"');
    expect(columnsOf(html)).toBe('fit-content(40%) minmax(min-content, max-content)');
  });

  it('stacks the rows when the columns run out of room, and scrolls only when stacking does not fit either', () => {
    const need = { grid: 0, stacked: 0 };
    expect(nextLayout('grid', 900, 1000, need)).toBe('grid');
    expect(nextLayout('grid', 900, 600, need)).toBe('stacked');
    expect(nextLayout('stacked', 500, 600, need)).toBe('stacked');
    expect(nextLayout('stacked', 500, 950, need)).toBe('grid');
    expect(nextLayout('stacked', 700, 600, need)).toBe('scroll');
    expect(nextLayout('scroll', 0, 650, need)).toBe('scroll');
    expect(nextLayout('scroll', 0, 750, need)).toBe('stacked');
    expect(nextLayout('scroll', 0, 950, need)).toBe('grid');
  });

  it('skips stacking when the stacked rows are known to be too wide', () => {
    const need = { grid: 0, stacked: 800 };
    expect(nextLayout('grid', 900, 600, need)).toBe('scroll');
  });
});
