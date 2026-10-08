/* @layer tooling-scripts @kind test */
import { createElement as h } from 'react';
import { renderToString } from 'react-dom/server';
import { describe, expect, it, vi } from 'vitest';
import { Markdown } from '../src/composites/Markdown';
import { MarkdownLink } from '../src/composites/Markdown/sub-components/MarkdownLink';

const onLink = vi.fn();

vi.mock('../src/composites/Markdown/behavior/useMarkdownSettings', () => ({ useMarkdownSettings: () => ({ onLink, headingOffset: 1 }) }));

describe('Markdown with onLink', () => {
  it('calls onLink with the address on click and keeps the page where it is', () => {
    const link = MarkdownLink({ href: 'https://example.com/notes', children: 'notes' });
    const preventDefault = vi.fn();
    link.props.onClick({ preventDefault });
    expect(preventDefault).toHaveBeenCalledOnce();
    expect(onLink).toHaveBeenCalledWith('https://example.com/notes');
  });

  it('draws the link without a new tab target', () => {
    const html = renderToString(h(Markdown, { onLink }, 'Read [the notes](https://example.com/notes).'));
    expect(html).toContain('href="https://example.com/notes"');
    expect(html).not.toContain('target=');
  });

  it('leaves an unsafe link as plain text, with nothing to click', () => {
    const html = renderToString(h(Markdown, { onLink }, '[run](javascript:alert(1))'));
    expect(html).not.toContain('<a');
    expect(MarkdownLink({ href: '', children: 'run' }).props.onClick).toBeUndefined();
  });
});
