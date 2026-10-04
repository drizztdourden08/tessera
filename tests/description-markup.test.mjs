/* @layer tooling-scripts @kind test */
import { createElement as h } from 'react';
import { renderToString } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { galleryPageIndex } from '../stories/_template/description/gallery-page-index';
import { Markup } from '../stories/_template/description/Markup';
import { markupText } from '../stories/_template/description/markup-text';
import { parseMarkup } from '../stories/_template/description/parse-markup';

const kinds = (text) => parseMarkup(text).map((token) => token.kind);
const html = (text) => renderToString(h(Markup, { text }));

describe('description markup: parsing', () => {
  it('reads code, strong, emphasis, keys, pages and links', () => {
    expect(parseMarkup('Set `loading` while it runs.')).toEqual([
      { kind: 'text', text: 'Set ' }, { kind: 'code', text: 'loading' }, { kind: 'text', text: ' while it runs.' },
    ]);
    expect(kinds('**Never** _ever_ [[Ctrl+S]] [Button] [docs](https://example.com)')).toEqual([
      'strong', 'text', 'em', 'text', 'keys', 'text', 'page', 'text', 'link',
    ]);
  });

  it('nests code inside strong and emphasis', () => {
    expect(parseMarkup('**`a` b**')).toEqual([{ kind: 'strong', children: [{ kind: 'code', text: 'a' }, { kind: 'text', text: ' b' }] }]);
  });

  it('leaves markers inside code alone', () => {
    expect(parseMarkup('`**x** _y_ [Z]`')).toEqual([{ kind: 'code', text: '**x** _y_ [Z]' }]);
  });

  it('reads keys by name, letter or function key, and keeps an unknown combo as text', () => {
    expect(parseMarkup('[[ctrl+Shift+z]]')).toEqual([{ kind: 'keys', keys: ['ctrl', 'shift', 'z'] }]);
    expect(parseMarkup('[[Esc]] [[F5]]').filter((t) => t.kind === 'keys')).toEqual([
      { kind: 'keys', keys: ['esc'] }, { kind: 'keys', keys: ['F5'] },
    ]);
    expect(parseMarkup('[[Hyper+Q]]')).toEqual([{ kind: 'text', text: '[[Hyper+Q]]' }]);
    expect(parseMarkup('[[F99]]')).toEqual([{ kind: 'text', text: '[[F99]]' }]);
  });

  it('does not take snake_case or BEM names for emphasis', () => {
    expect(kinds('data_x and row__cell_y')).toEqual(['text']);
  });

  it('takes a folder before a page name and shows only the name', () => {
    expect(parseMarkup('[text/Emphasis]')).toEqual([{ kind: 'page', name: 'Emphasis', path: 'text/Emphasis' }]);
  });

  it('keeps a link to anything but a gallery page or https as text', () => {
    expect(kinds('[x](javascript:alert(1))')).not.toContain('link');
    expect(parseMarkup('[x](javascript:void)')).toEqual([{ kind: 'text', text: '[x](javascript:void)' }]);
    expect(parseMarkup('[x](http://example.com)')).toEqual([{ kind: 'text', text: '[x](http://example.com)' }]);
    expect(parseMarkup('[Setup](#/story/setup-setup--overview)')).toEqual([{ kind: 'link', text: 'Setup', href: '#/story/setup-setup--overview' }]);
  });

  it('counts only the visible text', () => {
    expect(markupText(parseMarkup('**Set** `loading`, press [[Ctrl+S]] or see [text/Emphasis].'))).toBe('Set loading, press ctrl+S or see Emphasis.');
  });
});

describe('description markup: rendering', () => {
  it('draws Tessera text elements, keycaps and links', () => {
    const out = html('Set `loading`, **not** _disabled_; press [[Ctrl+S]]. See [Setup](#/story/setup-setup--overview).');
    expect(out).toContain('<code class="text-el text-el--code">loading</code>');
    expect(out).toContain('<strong class="text-el text-el--strong">not</strong>');
    expect(out).toContain('<em class="text-el text-el--em">disabled</em>');
    expect(out).toContain('class="shortcut');
    expect(out).toContain('href="#/story/setup-setup--overview" target="_top"');
  });

  it('opens an https link in a new tab', () => {
    expect(html('[docs](https://example.com/docs)')).toContain('target="_blank"');
  });

  it('never draws raw HTML', () => {
    const out = html('<img src=x onerror=alert(1)> `<b>`');
    expect(out).not.toContain('<img');
    expect(out).not.toContain('<b>');
    expect(out).toContain('&lt;img');
  });
});

describe('gallery page index', () => {
  it('maps a page name and its folder path to the story id, and drops a name two folders share', () => {
    const index = galleryPageIndex(['../../primitives/Button.stories.tsx', '../../text/Emphasis.stories.tsx', '../../primitives/Emphasis.stories.tsx']);
    expect(index.get('Button')).toBe('primitives-button--overview');
    expect(index.get('primitives/Button')).toBe('primitives-button--overview');
    expect(index.get('Emphasis')).toBeNull();
    expect(index.get('text/Emphasis')).toBe('text-emphasis--overview');
  });
});
