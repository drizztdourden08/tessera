/* @layer tooling-scripts @kind test */
import { readFileSync } from 'node:fs';
import { createElement as h } from 'react';
import { renderToString } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { PageFrame } from '../src/primitives/PageFrame';

const read = (path) => readFileSync(new URL(`../${path}`, import.meta.url), 'utf8');
const html = (props) => renderToString(h(PageFrame, props, 'Hello'));

describe('PageFrame', () => {
  it('is a vertical scroll area with a content box inside', () => {
    const out = html({});
    expect(out).toContain('class="scroll-area page-frame"');
    expect(out).toContain('data-axis="y"');
    expect(out).toContain('<div class="page-frame__content">Hello</div>');
  });

  it('marks the width and the fill, and keeps the class it is given', () => {
    const out = html({ width: 'md', fill: true, className: 'account' });
    expect(out).toContain('data-width="md"');
    expect(out).toContain('data-fill="true"');
    expect(out).toContain('page-frame account');
    expect(html({})).not.toContain('data-width');
  });

  it('is the scroller: a window high, padded from a token, with the column centred and capped by tokens', () => {
    const css = read('src/primitives/PageFrame/PageFrame.css');
    expect(css).toMatch(/\.page-frame \{\s*block-size: 100dvh;\s*padding: var\(--space-xl\);/);
    expect(css).toMatch(/\.page-frame\[data-fill='true'\] \{\s*block-size: 100%;/);
    expect(css).toMatch(/\.page-frame__content \{\s*margin-inline: auto;/);
    expect(css).toContain('max-inline-size: var(--page-frame-w-lg);');
  });

  it('leaves the locked root alone', () => {
    expect(read('src/tokens/reset.css')).toMatch(/html, body, #root \{[^}]*overflow: hidden;/);
  });
});
