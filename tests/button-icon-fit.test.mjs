/* @layer tooling-scripts @kind test */
import fs from 'node:fs';
import { createElement as h } from 'react';
import { renderToString } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { Button } from '../src/primitives/Button';
import { Icon } from '../src/primitives/Icon';

const css = fs.readFileSync('src/primitives/Button/Button.css', 'utf8');
const ruleOf = (selector) => {
  const start = css.indexOf(`${selector} {`);
  return start < 0 ? '' : css.slice(start, css.indexOf('}', start));
};

describe('a Button icon', () => {
  it('draws an Icon without a size at the font size of its slot', () => {
    const html = renderToString(h(Button, { icon: h(Icon, { name: 'plus' }) }, 'New save'));
    expect(html).toMatch(/<span class="btn__icon"><svg[^>]* width="1em" height="1em"/);
  });

  it('keeps the size an Icon is given, and the default size outside a Button', () => {
    expect(renderToString(h(Button, { iconEnd: h(Icon, { name: 'chevron-down', size: 14 }) }, 'Open'))).toMatch(/btn__icon--end"><svg[^>]* width="14" height="14"/);
    expect(renderToString(h(Icon, { name: 'plus' }))).toMatch(/<svg[^>]* width="16" height="16"/);
  });

  it('sizes the slot from the tokens, 16, 14 and 12 px, with no fixed box around the glyph', () => {
    expect(ruleOf('.btn__icon')).toContain('font-size: var(--size-16);');
    expect(ruleOf('.btn__icon')).not.toContain('width');
    expect(ruleOf('.btn--sm .btn__icon')).toContain('font-size: var(--size-14);');
    expect(ruleOf('.btn--xs .btn__icon')).toContain('font-size: var(--size-12);');
  });

  it('keeps the padding even on both sides and sets the gap per size', () => {
    expect(ruleOf('.btn--md')).toContain('padding: var(--space-sm) var(--space-md);');
    expect(ruleOf('.btn--sm')).toContain('padding: var(--space-xs) var(--space-sm);');
    expect(ruleOf('.btn--xs')).toContain('padding: 0 var(--space-sm);');
    expect(ruleOf('.btn--sm:has(> .btn__icon)')).toContain('gap: calc(var(--space-xs) + var(--space-2xs));');
    expect(css).not.toMatch(/padding-inline-(start|end)/);
  });
});
