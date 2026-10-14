/* @layer tooling-scripts @kind test */
import { createElement as h } from 'react';
import { renderToString } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { MOUSE_SPECS, Shortcut } from '../src/primitives/Shortcut';

describe('a drag on Shortcut', () => {
  it('draws the held left button with the move arrows and reads as a drag', () => {
    const html = renderToString(h(Shortcut, { mouse: 'drag' }));
    expect(MOUSE_SPECS.drag.icon).toBe(MOUSE_SPECS.left.icon);
    expect(html).toContain('class="shortcut__mouse shortcut__mouse--drag"');
    expect(html).toContain('shortcut__drag');
    expect(html).toContain('<span class="shortcut__spoken">Drag</span>');
  });

  it('follows the keys like any mouse button, and leaves the other buttons as they were', () => {
    const html = renderToString(h(Shortcut, { keys: 'shift', mouse: 'drag', size: 'xs' }));
    expect(html.indexOf('Shift')).toBeLessThan(html.indexOf('shortcut__mouse--drag'));
    expect(html).toContain('shortcut__joiner');
    const left = renderToString(h(Shortcut, { mouse: 'left' }));
    expect(left).toContain('class="shortcut__mouse"');
    expect(left).not.toContain('shortcut__drag');
  });
});
