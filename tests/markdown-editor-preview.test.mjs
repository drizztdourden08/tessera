/* @layer tooling-scripts @kind test */
import { createElement as h } from 'react';
import { renderToString } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { MarkdownEditor } from '../src/composites/MarkdownEditor';

const noop = () => undefined;
const IDS = [{ pattern: /\bT-\d+\b/, href: (match) => `/items/${match}` }];
const VALUE = 'See T-5.\n\n![Shot](shots/a.png)\n\n[file](/files/a.md)';

const draw = (props) => renderToString(h(MarkdownEditor, { value: VALUE, onChange: noop, layout: 'split', ...props }));

describe('MarkdownEditor preview options', () => {
  it('passes images, linkIds and onLink to the preview', () => {
    const html = draw({ onLink: noop, linkIds: IDS, images: (src) => `/api/${src}` });
    expect(html).toContain('href="/items/T-5"');
    expect(html).toContain('src="/api/shots/a.png"');
    expect(html).toContain('href="/files/a.md"');
  });

  it('keeps the preview plain without them', () => {
    const html = draw({});
    expect(html).not.toContain('<img');
    expect(html).not.toContain('href="/items/');
    expect(html).not.toContain('href="/files/');
  });

  it('keeps ids as text without onLink, since an app path needs it', () => {
    expect(draw({ linkIds: IDS })).not.toContain('href="/items/');
  });
});
