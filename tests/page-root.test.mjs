/* @layer tooling-scripts @kind test */
import { readFileSync } from 'node:fs';
import { createElement as h } from 'react';
import { renderToString } from 'react-dom/server';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { PageRoot } from '../src/primitives/PageRoot';
import { useDocumentScroll } from '../src/primitives/PageRoot/behavior/useDocumentScroll';
import { mountHook } from './hook-harness.mjs';

vi.mock('react', async (importOriginal) => ({ ...(await importOriginal()), ...(await import('./hook-harness.mjs')).hooks }));

const read = (path) => readFileSync(new URL(`../${path}`, import.meta.url), 'utf8');

const stubDocument = (initial) => {
  const attributes = new Map(initial === undefined ? [] : [['data-scroll', initial]]);
  const root = {
    getAttribute: (name) => attributes.get(name) ?? null,
    setAttribute: (name, value) => attributes.set(name, value),
    removeAttribute: (name) => attributes.delete(name),
  };
  vi.stubGlobal('document', { documentElement: root });
  return root;
};

afterEach(() => vi.unstubAllGlobals());

describe('document scrolling', () => {
  it('is set on the html element while the page root is mounted and removed after', () => {
    const root = stubDocument();
    const page = mountHook(() => useDocumentScroll());
    expect(root.getAttribute('data-scroll')).toBe('document');
    page.unmount();
    expect(root.getAttribute('data-scroll')).toBeNull();
  });

  it('puts back the value it found', () => {
    const root = stubDocument('panes');
    const page = mountHook(() => useDocumentScroll());
    expect(root.getAttribute('data-scroll')).toBe('document');
    page.unmount();
    expect(root.getAttribute('data-scroll')).toBe('panes');
  });

  it('renders one box with the props it was given', () => {
    expect(renderToString(h(PageRoot, { className: 'home' }, 'Hello'))).toBe('<div class="home">Hello</div>');
  });

  it('is honoured by the reset only under the opt-in, so a desktop app keeps its locked body', () => {
    const reset = read('src/tokens/reset.css');
    expect(reset).toMatch(/html, body, #root \{[^}]*overflow: hidden;/);
    expect(reset).toMatch(/html\[data-scroll='document'\] \{\s*height: auto;\s*overflow: hidden auto;/);
    expect(reset).toMatch(/html\[data-scroll='document'\] body \{[^}]*overflow: visible;/);
  });

  it('locks the page again while a dialog is open', () => {
    expect(read('src/composites/DialogShell/DialogShell.css')).toMatch(/html\[data-scroll='document'\]:has\(\.dialog-backdrop\) \{\s*overflow: hidden;\s*\}/);
  });
});
