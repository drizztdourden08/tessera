/* @layer tooling-scripts @kind test */
import { createElement as h, Fragment } from 'react';
import { renderToString } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { RadioGroup } from '../src/primitives/RadioGroup';

const OPTIONS = [{ value: 'a', label: 'A' }, { value: 'b', label: 'B' }];
const group = (props = {}) => h(RadioGroup, { value: 'a', options: OPTIONS, onChange: () => undefined, ...props });
const namesIn = (html) => [...new Set([...html.matchAll(/type="radio" class="radio-group__input" name="([^"]+)"/g)].map((match) => match[1]))];

describe('RadioGroup', () => {
  it('gives two groups without a name their own names', () => {
    const names = namesIn(renderToString(h(Fragment, null, group(), group())));
    expect(names).toHaveLength(2);
  });

  it('keeps a name it is given', () => {
    expect(namesIn(renderToString(group({ name: 'difficulty' })))).toEqual(['difficulty']);
  });

  it('makes the legend the first child of the fieldset, so it names the group', () => {
    expect(renderToString(group({ label: 'Difficulty' }))).toMatch(/<fieldset[^>]*><legend class="radio-group__label">Difficulty<\/legend>/);
  });

  it('describes the group with its description', () => {
    const html = renderToString(group({ label: 'Difficulty', description: 'New sessions only' }));
    const id = html.match(/<fieldset[^>]*aria-describedby="([^"]+)"/)[1];
    expect(html).toContain(`id="${id}"`);
  });
});
