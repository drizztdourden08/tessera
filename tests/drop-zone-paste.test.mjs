/* @layer tooling-scripts @kind test */
import { describe, expect, it, vi } from 'vitest';
import { usePasteFiles } from '../src/primitives/DropZone/behavior/usePasteFiles';
import { mountHook } from './hook-harness.mjs';

const file = (name, type) => ({ name, type });

describe('Ctrl+V on a DropZone', () => {
  const zoneIn = () => {
    const listeners = new Map();
    const view = { addEventListener: (type, fn) => listeners.set(type, fn), removeEventListener: (type) => listeners.delete(type) };
    return { zone: { ownerDocument: { defaultView: view } }, listeners };
  };

  it('listens for a paste only while the pointer is over the zone or it has focus, and hands over the files', () => {
    const { zone, listeners } = zoneIn();
    const onFiles = vi.fn();
    const paste = mountHook(() => usePasteFiles(zone, true, onFiles));
    expect(listeners.has('paste')).toBe(false);
    paste.act((handlers) => handlers.onPointerEnter());
    const event = { clipboardData: { files: [file('shot.png', 'image/png')] }, preventDefault: vi.fn() };
    listeners.get('paste')(event);
    expect(onFiles).toHaveBeenCalledWith([file('shot.png', 'image/png')]);
    expect(event.preventDefault).toHaveBeenCalled();
    paste.act((handlers) => handlers.onPointerLeave());
    expect(listeners.has('paste')).toBe(false);
    paste.act((handlers) => handlers.onFocus());
    expect(listeners.has('paste')).toBe(true);
  });

  it('leaves a paste of text alone, so text fields keep working', () => {
    const { zone, listeners } = zoneIn();
    const onFiles = vi.fn();
    const paste = mountHook(() => usePasteFiles(zone, true, onFiles));
    paste.act((handlers) => handlers.onPointerEnter());
    const text = { clipboardData: { files: [] }, preventDefault: vi.fn() };
    listeners.get('paste')(text);
    expect(onFiles).not.toHaveBeenCalled();
    expect(text.preventDefault).not.toHaveBeenCalled();
  });
});

vi.mock('react', async (importOriginal) => ({ ...(await importOriginal()), ...(await import('./hook-harness.mjs')).hooks }));
