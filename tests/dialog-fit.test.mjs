/* @layer tooling-scripts @kind test */
import { createElement as h } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { readFileSync } from 'node:fs';
import { describe, expect, it, vi } from 'vitest';
import { DialogShell } from '../src/composites/DialogShell';

vi.mock('../src/primitives/Portal/Portal', () => ({ Portal: ({ children }) => children }));

const css = readFileSync(new URL('../src/composites/DialogShell/DialogShell.css', import.meta.url), 'utf8');

const render = () => renderToStaticMarkup(h(DialogShell, { open: true, onClose: vi.fn(), title: 'Long', actions: h('button', null, 'Save') }, h('p', null, 'Body')));

describe('a dialog that fits the window', () => {
  it('keeps the header and the actions outside the scrolling body', () => {
    const html = render();
    const body = html.match(/<div [^>]*class="[^"]*dialog__body[^"]*"[^>]*>.*?<\/div>/s)?.[0] ?? '';
    expect(body).toContain('scroll-area');
    expect(body).toContain('Body');
    expect(body).not.toContain('dialog__header');
    expect(body).not.toContain('dialog__actions');
    expect(html).toContain('dialog__actions');
  });

  it('caps the panel to the viewport as a column whose body can shrink', () => {
    expect(css).toMatch(/\.dialog \{[^}]*flex-direction: column;[^}]*max-block-size: calc\(100vh/s);
    expect(css).toMatch(/\.dialog__body \{[^}]*min-block-size: 0;/s);
    expect(css).toMatch(/\.dialog__header \{[^}]*flex: none;/s);
    expect(css).toMatch(/\.dialog__actions \{[^}]*flex: none;/s);
  });

  it('fades in without scaling and stills under reduced motion', () => {
    const keyframes = css.match(/@keyframes dialog-fade-in \{.*?\n\}/s)?.[0] ?? '';
    expect(keyframes).toContain('opacity');
    expect(keyframes).not.toContain('transform');
    expect(css).toMatch(/prefers-reduced-motion: reduce\) \{\s*\.dialog-backdrop \{\s*animation: none;/s);
  });
});
