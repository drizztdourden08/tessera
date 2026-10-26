/* @layer tooling-scripts @kind test */
import { createElement as h } from 'react';
import { renderToString } from 'react-dom/server';
import { describe, expect, it, vi } from 'vitest';
import { Markdown } from '../src/composites/Markdown';

const IMAGE = '![The new card](https://example.com/card.png)';

const draw = (props, source) => renderToString(h(Markdown, props, source));

describe('Markdown onImage', () => {
  it('keeps images inert without onImage', () => {
    const html = draw({ images: true }, IMAGE);
    expect(html).toContain('<img');
    expect(html).not.toContain('<button');
  });

  it('wraps a drawn image in a button named by its alt text', () => {
    const html = draw({ images: true, onImage: vi.fn() }, IMAGE);
    expect(html).toContain('<button type="button" class="pressable markdown__image-button" aria-label="The new card">');
    expect(html).toContain('<img');
    expect(html).toContain('alt="The new card"');
  });

  it('does not add a name when the alt text is empty', () => {
    const html = draw({ images: true, onImage: vi.fn() }, '![](https://example.com/card.png)');
    expect(html).toContain('<button type="button" class="pressable markdown__image-button">');
  });

  it('draws no button for an image that is not drawn', () => {
    const html = draw({ onImage: vi.fn() }, IMAGE);
    expect(html).not.toContain('<button');
    expect(html).not.toContain('<img');
    expect(draw({ images: true, onImage: vi.fn() }, '![Bad](javascript:alert(1))')).not.toContain('<button');
  });
});
