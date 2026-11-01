/* @layer tooling-scripts @kind test */
import { createElement as h } from 'react';
import { renderToString } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { Markdown } from '../src/composites/Markdown';
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

describe('K4 Markdown renders the release note subset', { tags: ['critical'] }, () => {
  it('opens a link in a new tab with rel noopener when no onLink is given', () => {
    const html = draw({});
    expect(html).toMatch(/<a target="_blank" rel="noopener noreferrer" href="https:\/\/example.com\/guide" class="link"[^>]*>the guide/);
  });
});

describe('K4 Markdown drops what is outside the subset', { tags: ['critical'] }, () => {
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

describe('K4 Markdown draws GitHub tables, task lists and strikethrough with Tessera parts', { tags: ['critical'] }, () => {
  it('still drops raw HTML inside a table and a task item', () => {
    const html = draw({}, `| a |
|---|
| <i>x</i><b>y</b> |

- [ ] <img src="x" onerror="alert(2)"> task`);
    expect(html).not.toMatch(/<b>|<i>|<img|onerror/);
    expect(html).toContain('table__cell');
    expect(html).toContain('checkbox');
  });
});
