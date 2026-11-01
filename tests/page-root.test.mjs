/* @layer tooling-scripts @kind test */
import { afterEach, describe, expect, it, vi } from 'vitest';
import { useDocumentScroll } from '../src/primitives/PageRoot/behavior/useDocumentScroll';
import { mountHook } from './hook-harness.mjs';

vi.mock('react', async (importOriginal) => ({ ...(await importOriginal()), ...(await import('./hook-harness.mjs')).hooks }));

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

describe('K1 document scrolling', { tags: ['critical'] }, () => {
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
});
