/* @layer tooling-scripts @kind test */
import { createElement as h } from 'react';
import { renderToString } from 'react-dom/server';
import { describe, expect, it, vi } from 'vitest';
import { Markdown } from '../src/composites/Markdown';
import { imageSource } from '../src/composites/Markdown/behavior/image-source';

const IMAGE = '![The new card](https://example.com/card.png)';

const draw = (props, source) => renderToString(h(Markdown, props, source));

describe('Markdown images', () => {
  it('shows the alt text only by default', () => {
    const html = draw({}, IMAGE);
    expect(html).not.toContain('<img');
    expect(html).toContain('markdown__image-text">The new card</span>');
    expect(draw({ images: false }, IMAGE)).not.toContain('<img');
  });

  it('draws an http or https image with alt text and lazy loading when on', () => {
    const html = draw({ images: true }, IMAGE);
    expect(html).toContain('<img');
    expect(html).toContain('src="https://example.com/card.png"');
    expect(html).toContain('alt="The new card"');
    expect(html).toContain('loading="lazy"');
    expect(html).toContain('markdown__image');
    expect(html).not.toContain('markdown__image-text');
  });

  it('keeps the alt text for an address that is not http or https', () => {
    for (const src of ['javascript:alert(1)', 'data:image/png;base64,AAAA', 'file:///C:/a.png', '/files/a.png', 'a.png']) {
      const html = draw({ images: true }, `![Alt text](${src})`);
      expect(html).not.toContain('<img');
      expect(html).toContain('Alt text');
    }
  });

  it('lets a function rewrite the address, and drops the image when it returns nothing', () => {
    const rewrite = vi.fn((src) => (src.startsWith('shots/') ? `/api/files?path=${src}` : undefined));
    const html = draw({ images: rewrite }, '![Shot](shots/a.png) ![Other](https://example.com/b.png)');
    expect(rewrite).toHaveBeenCalledWith('shots/a.png');
    expect(html).toContain('src="/api/files?path=shots/a.png"');
    expect(html).not.toContain('example.com/b.png');
    expect(html).toContain('markdown__image-text">Other</span>');
  });

  it('never lets a function return a script or data address', () => {
    expect(imageSource('x.png', () => 'javascript:alert(1)')).toBeUndefined();
    expect(imageSource('x.png', () => 'data:image/png;base64,AAAA')).toBeUndefined();
    expect(imageSource('x.png', () => '//evil.example/x.png')).toBeUndefined();
    expect(imageSource('x.png', () => 'https://example.com/x.png')).toBe('https://example.com/x.png');
    expect(imageSource('x.png', () => '/files/x.png')).toBe('/files/x.png');
    expect(imageSource(undefined, true)).toBeUndefined();
  });
});
