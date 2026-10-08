/* @layer tooling-scripts @kind test */
import { createElement as h } from 'react';
import { renderToString } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { Markdown } from '../src/composites/Markdown';
import { codeOf } from '../src/composites/Markdown/behavior/code-of';
import { safeHref } from '../src/composites/Markdown/behavior/safe-href';

const NOTE = `<!-- @layer root-config @kind doc -->
# Relic of the Past v0.16.0

A **controllers** release, with _one_ fix. See [the guide](https://example.com/guide) or run \`rotp --check\`.

## Controllers

- Rumble is adjustable.
  - per controller
- Motion sensors show on the card.

3. third
4. fourth

\`\`\`ts
const rumble = 0.5;
\`\`\`

> Quoted line.

---
`;

const draw = (props, text = NOTE) => renderToString(h(Markdown, props, text));

describe('Markdown renders the release note subset', () => {
  it('draws headings one level down by default, sized by their depth in the note', () => {
    const html = draw({});
    expect(html).toMatch(/<h2 class="text markdown__heading markdown__heading--1">Relic of the Past v0.16.0<\/h2>/);
    expect(html).toMatch(/<h3 class="text markdown__heading markdown__heading--2">Controllers<\/h3>/);
    expect(html).not.toContain('<h1');
  });

  it('moves headings by headingOffset and stops at h6', () => {
    expect(draw({ headingOffset: 0 })).toContain('<h1 class="text markdown__heading markdown__heading--1"');
    expect(draw({ headingOffset: 5 }, '# One\n\n## Two')).toMatch(/<h6[^>]*>One<\/h6>\s*<h6[^>]*>Two<\/h6>/);
  });

  it('draws paragraphs, bold, italic, inline code and lists with Tessera parts', () => {
    const html = draw({});
    expect(html).toContain('<p class="text-el text-el--p markdown__paragraph">A <strong');
    expect(html).toMatch(/<strong class="text-el text-el--strong">controllers<\/strong>/);
    expect(html).toMatch(/<em class="text-el text-el--em">one<\/em>/);
    expect(html).toMatch(/<code class="text-el text-el--code">rotp --check<\/code>/);
    expect(html).toContain('<ul class="markdown__list markdown__list--bullets">');
    expect(html).toMatch(/<li class="markdown__item">Rumble is adjustable\.(<!-- -->)?\s*<ul class="markdown__list markdown__list--bullets">/);
    expect(html).toContain('<ol class="markdown__list markdown__list--numbers" start="3">');
  });

  it('draws a fenced block as a CodeBlock in its language, a quote and a rule', () => {
    const html = draw({});
    expect(html).toContain('markdown__code');
    expect(html).toContain('const');
    expect(html).toContain('rumble');
    expect(html).not.toContain('<pre><code class="language-ts">');
    expect(html).toContain('<blockquote class="text-el text-el--blockquote markdown__quote">');
    expect(html).toContain('markdown__rule');
    expect(codeOf({ type: 'element', tagName: 'pre', properties: {}, children: [
      { type: 'element', tagName: 'code', properties: { className: ['language-json'] }, children: [{ type: 'text', value: '{}\n' }] },
    ] })).toEqual({ code: '{}', language: 'json' });
    expect(codeOf({ type: 'element', tagName: 'pre', properties: {}, children: [
      { type: 'element', tagName: 'code', properties: { className: ['language-sh'] }, children: [{ type: 'text', value: 'ls' }] },
    ] })).toEqual({ code: 'ls', language: 'text' });
  });

  it('opens a link in a new tab with rel noopener when no onLink is given', () => {
    const html = draw({});
    expect(html).toMatch(/<a target="_blank" rel="noopener noreferrer" href="https:\/\/example.com\/guide" class="link"[^>]*>the guide/);
  });

  it('takes the text from source, and sets size and className', () => {
    const html = renderToString(h(Markdown, { source: 'Plain words.', size: 'sm', className: 'notes' }));
    expect(html).toBe('<div class="markdown notes" data-size="sm"><p class="text-el text-el--p markdown__paragraph">Plain words.</p></div>');
  });

  it('drops the leading title with hideTitle and keeps later ones', () => {
    const html = draw({ hideTitle: true });
    expect(html).not.toContain('Relic of the Past v0.16.0');
    expect(html).toContain('>Controllers</h3>');
  });
});

describe('Markdown drops what is outside the subset', () => {
  it('drops raw HTML, a script and an HTML comment', () => {
    const html = draw({}, '<!-- note -->\n\n<script>alert(1)</script>\n\nA <b>bold</b> word <img src="x" onerror="alert(2)">.\n\n<div>block</div>');
    expect(html).not.toMatch(/<script|<b>|<img|<div>block|onerror|alert|note/);
    expect(html).toContain('A <!-- -->bold<!-- --> word');
  });

  it('turns javascript, data and relative links into plain text', () => {
    const html = draw({}, '[run](javascript:alert(1)) [data](data:text/html,x) [home](/home) [mail](mailto:help@example.com)');
    expect(html).not.toMatch(/javascript|data:|href="\/home"/);
    expect(html).toContain('run');
    expect(html).toContain('href="mailto:help@example.com"');
    expect(html.match(/<a /g)).toHaveLength(1);
  });

  it('shows an image as its alt text and a table as plain text', () => {
    const html = draw({}, '![The new card](https://example.com/card.png)\n\n| a | b |\n|---|---|\n| 1 | 2 |');
    expect(html).not.toMatch(/<img|<link|<table/);
    expect(html).toContain('<span class="text-el text-el--span markdown__image-text">The new card</span>');
    expect(html).toContain('| a | b |');
  });

  it('keeps only http, https and mailto addresses', () => {
    expect(safeHref('https://example.com/a?b=1')).toBe('https://example.com/a?b=1');
    expect(safeHref('http://example.com')).toBe('http://example.com');
    expect(safeHref('mailto:help@example.com')).toBe('mailto:help@example.com');
    expect(safeHref('javascript:alert(1)')).toBe('');
    expect(safeHref('JaVaScRiPt:alert(1)')).toBe('');
    expect(safeHref('java\tscript:alert(1)')).toBe('');
    expect(safeHref(' javascript:alert(1)')).toBe('');
    expect(safeHref('vbscript:x')).toBe('');
    expect(safeHref('file:///etc/passwd')).toBe('');
    expect(safeHref('/relative')).toBe('');
    expect(safeHref('#top')).toBe('');
  });
});
