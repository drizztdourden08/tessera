/* @layer tooling-scripts @kind test */
import { createElement as h } from 'react';
import { renderToString } from 'react-dom/server';
import { describe, expect, it, vi } from 'vitest';
import { Markdown } from '../src/composites/Markdown';
import { isAppPath } from '../src/composites/Markdown/behavior/app-path';

const TASK = { pattern: /\b[TI]-\d+\b/, href: (match) => `/items/${match}` };

const draw = (props, source) => renderToString(h(Markdown, props, source));

describe('Markdown linkIds', () => {
  const onLink = vi.fn();

  it('turns an id in a text node into a link handed to onLink', () => {
    const html = draw({ onLink, linkIds: [TASK] }, 'See T-5 and I-3 today.');
    expect(html).toContain('href="/items/T-5"');
    expect(html).toContain('href="/items/I-3"');
    expect(html.match(/<a /g)).toHaveLength(2);
    expect(html).toContain('>T-5</a>');
  });

  it('takes a single rule as well as a list', () => {
    expect(draw({ onLink, linkIds: TASK }, 'T-5')).toContain('href="/items/T-5"');
  });

  it('leaves code and existing links alone', () => {
    const html = draw({ onLink, linkIds: [TASK] }, '`T-5`\n\n```\nI-3\n```\n\n[T-7](https://example.com) and https://example.com/T-9');
    expect(html).not.toContain('href="/items/');
    expect(html.match(/<a /g)).toHaveLength(2);
  });

  it('drops an id the resolver gives no address for', () => {
    const none = { pattern: /\bT-\d+\b/, href: () => undefined };
    expect(draw({ onLink, linkIds: [none] }, 'T-5')).not.toContain('<a');
  });

  it('keeps an id as text when its address is unsafe, or an app path with no onLink', () => {
    const unsafe = { pattern: /\bT-\d+\b/, href: () => 'javascript:alert(1)' };
    expect(draw({ onLink, linkIds: [unsafe] }, 'T-5')).not.toContain('<a');
    expect(draw({ linkIds: [TASK] }, 'T-5')).not.toContain('<a');
    const web = { pattern: /\bT-\d+\b/, href: (match) => `https://example.com/${match}` };
    expect(draw({ linkIds: [web] }, 'T-5')).toContain('href="https://example.com/T-5"');
  });

  it('works with a pattern that carries the g flag', () => {
    const html = draw({ onLink, linkIds: [{ ...TASK, pattern: /\bT-\d+\b/g }] }, 'T-1 T-2');
    expect(html.match(/<a /g)).toHaveLength(2);
  });
});

describe('Markdown app path links', () => {
  const onLink = vi.fn();

  it('keeps a link that starts with a slash only when onLink is passed', () => {
    expect(draw({ onLink }, '[file](/files/notes.md)')).toContain('href="/files/notes.md"');
    expect(draw({}, '[file](/files/notes.md)')).not.toContain('<a');
    expect(draw({}, '[file](/files/notes.md)')).toContain('file');
  });

  it('still drops javascript, data and protocol relative addresses', () => {
    const html = draw({ onLink }, '[a](javascript:alert(1)) [b](data:text/html,x) [c](//evil.example/x) [e](JaVaScRiPt:x)');
    expect(html).not.toContain('<a');
  });

  it('knows an app path from anything else', () => {
    expect(isAppPath('/files/a.md')).toBe(true);
    expect(isAppPath('/')).toBe(true);
    expect(isAppPath('//evil.example')).toBe(false);
    expect(isAppPath('/\\evil.example')).toBe(false);
    expect(isAppPath('/a\tb')).toBe(false);
    expect(isAppPath('files/a.md')).toBe(false);
    expect(isAppPath('javascript:alert(1)')).toBe(false);
  });
});
