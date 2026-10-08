/* @layer tooling-scripts @kind test */
import { readFileSync } from 'node:fs';
import { createElement as h } from 'react';
import { renderToString } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { Button } from '../src/primitives/Button';
import { Grid } from '../src/primitives/Grid';
import { Span } from '../src/primitives/text-elements';

const css = (path) => readFileSync(new URL(`../${path}`, import.meta.url), 'utf8');
const button = (props, ...children) => renderToString(h(Button, props, ...children));

describe('an inline Field in a narrow row', () => {
  it('lets its control shrink below its content width', () => {
    expect(css('src/primitives/Field/Field.css')).toMatch(/\.field--inline \.field__control \{\s*flex: 1;\s*min-width: 0;\s*\}/);
  });
});

describe('Grid minColWidth', () => {
  it('caps the column minimum at the width of the box', () => {
    expect(renderToString(h(Grid, { minColWidth: 240 }))).toContain('grid-template-columns:repeat(auto-fill, minmax(min(100%, 240px), 1fr))');
  });

  it('keeps fixed columns as they were', () => {
    expect(renderToString(h(Grid, { columns: 3 }))).toContain('grid-template-columns:repeat(3, 1fr)');
  });
});

describe('Button with a plain label', () => {
  it('keeps text and numbers on one line', () => {
    expect(button({}, 'Save the slot')).toContain('btn--one-line');
    expect(button({}, 'Delete ', 3, ' rows')).toContain('btn--one-line');
    expect(button({ icon: h('svg') }, 'Retry')).toContain('btn--one-line');
  });

  it('leaves a full width button and one with its own layout to wrap', () => {
    expect(button({ fullWidth: true }, 'Save the slot')).not.toContain('btn--one-line');
    expect(button({}, h(Span, null, 'Slot 1'), h(Span, null, 'Link, 4 checks'))).not.toContain('btn--one-line');
  });

  it('does not shrink or wrap its label in a tight row', () => {
    expect(css('src/primitives/Button/Button.css')).toMatch(/\.btn--one-line \{\s*flex-shrink: 0;\s*white-space: nowrap;\s*\}/);
  });
});
