/* @layer tooling-scripts @kind test */
import { createElement as h } from 'react';
import { renderToString } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { MarkdownEditor } from '../src/composites/MarkdownEditor';

const noop = () => undefined;
const draw = (props) => renderToString(h(MarkdownEditor, { value: 'Some **note**', onChange: noop, ...props }));

describe('MarkdownEditor compact', () => {
  it('draws the toolbar and a 3 row textarea, with no tabs and no preview', () => {
    const html = draw({ compact: true });
    expect(html).toContain('data-layout="compact"');
    expect(html).toContain('role="toolbar"');
    expect(html).toContain('<textarea');
    expect(html).toContain('rows="3"');
    expect(html).not.toContain('role="tab"');
    expect(html).not.toContain('markdown-editor__preview');
  });

  it('puts a Preview toggle at the end of the toolbar, off until pressed', () => {
    const html = draw({ compact: true });
    expect(html).toContain('markdown-editor__toggle');
    expect(html).toMatch(/aria-label="Preview"/);
    expect(html).not.toContain('aria-pressed="true"');
  });

  it('lets rows override the compact height', () => {
    expect(draw({ compact: true, rows: 5 })).toContain('rows="5"');
  });

  it('keeps the other layouts as they were', () => {
    const html = draw({ layout: 'split' });
    expect(html).toContain('data-layout="split"');
    expect(html).toContain('rows="12"');
    expect(html).toContain('markdown-editor__preview');
    expect(html).not.toContain('markdown-editor__toggle');
  });
});
