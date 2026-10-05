/* @layer tooling-scripts @kind test */
import { afterEach, describe, expect, it, vi } from 'vitest';
import { loadLayoutLocal, saveLayoutLocal } from '../src/composites/Widget';
import { readStored } from '../src/primitives/dom/read-stored';
import { writeStored } from '../src/primitives/dom/write-stored';

class MemoryStorage {
  constructor(start) {
    this.items = new Map(Object.entries(start));
  }

  getItem(name) {
    return this.items.has(name) ? this.items.get(name) : null;
  }

  setItem(name, text) {
    this.items.set(name, String(text));
  }
}

const memory = (start = {}) => {
  const storage = new MemoryStorage(start);
  vi.stubGlobal('localStorage', storage);
  return storage.items;
};

const aNumber = (stored) => (typeof stored === 'number' ? stored : undefined);

afterEach(() => vi.unstubAllGlobals());

describe('readStored and writeStored', () => {
  it('writes a value as JSON under its key and reads it back through the check', () => {
    const items = memory();
    expect(writeStored('size', 42)).toBe(true);
    expect(items.get('size')).toBe('42');
    expect(readStored('size', aNumber)).toBe(42);
  });

  it('gives the check null for a missing key, and nothing for broken JSON or a refused value', () => {
    memory({ broken: '{', text: '"wide"' });
    expect(readStored('missing', (stored) => stored)).toBeNull();
    expect(readStored('broken', aNumber)).toBeUndefined();
    expect(readStored('text', aNumber)).toBeUndefined();
  });

  it('does nothing without a key or without storage', () => {
    expect(readStored(undefined, aNumber)).toBeUndefined();
    expect(writeStored(undefined, 1)).toBe(false);
    vi.stubGlobal('localStorage', undefined);
    expect(readStored('size', aNumber)).toBeUndefined();
    expect(writeStored('size', 1)).toBe(false);
  });

  it('keeps a widget layout the same way, falling back to the preset when nothing is stored', () => {
    memory();
    const preset = { version: 2, root: { kind: 'main', id: 'main' }, floating: [] };
    expect(loadLayoutLocal('layout', preset)).toBe(preset);
    const layout = loadLayoutLocal('layout');
    expect(saveLayoutLocal(layout, 'layout')).toBe(true);
    expect(loadLayoutLocal('layout', preset)).toEqual(layout);
  });
});
