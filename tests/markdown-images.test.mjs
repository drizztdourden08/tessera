/* @layer tooling-scripts @kind test */
import { createElement as h } from 'react';
import { renderToString } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { Markdown } from '../src/composites/Markdown';
import { imageSource } from '../src/composites/Markdown/behavior/image-source';

const draw = (props, source) => renderToString(h(Markdown, props, source));

describe('K4 Markdown images', { tags: ['critical'] }, () => {
  it('draws no image element by default, only the alt text', () => {
    const source = '![The new card](https://example.com/card.png)';
    expect(draw({}, source)).not.toContain('<img');
    expect(draw({ images: false }, source)).not.toContain('<img');
  });

  it('keeps the alt text for an address that is not http or https', () => {
    for (const src of ['javascript:alert(1)', 'data:image/svg+xml;base64,AAAA', 'file:///C:/a.png', '/files/a.png', 'a.png']) {
      const html = draw({ images: true }, `![Alt text](${src})`);
      expect(html).not.toContain('<img');
      expect(html).toContain('Alt text');
    }
  });

  it('never lets a function return a script or data address', () => {
    expect(imageSource('x.png', () => 'javascript:alert(1)')).toBeUndefined();
    expect(imageSource('x.png', () => 'data:image/svg+xml;base64,AAAA')).toBeUndefined();
    expect(imageSource('x.png', () => 'data:text/html;base64,AAAA')).toBeUndefined();
    expect(imageSource('x.png', () => '//evil.example/x.png')).toBeUndefined();
    expect(imageSource('x.png', () => 'https://example.com/x.png')).toBe('https://example.com/x.png');
    expect(imageSource('x.png', () => '/files/x.png')).toBe('/files/x.png');
    expect(imageSource(undefined, true)).toBeUndefined();
  });
});
