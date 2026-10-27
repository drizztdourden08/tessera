/* @layer tooling-scripts @kind test */
import { createElement as h } from 'react';
import { renderToString } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { Callout } from '../src/primitives/Callout';

describe('Callout body', () => {
  it('is a div, so block children such as a stack of rows are valid inside it', () => {
    const html = renderToString(h(Callout, { title: 'Heads up' }, h('div', null, 'row')));
    expect(html).not.toMatch(/<p[\s>]/);
    expect(html).toMatch(/<div class="[^"]*callout__text[^"]*"><div>row<\/div><\/div>/);
  });
});
