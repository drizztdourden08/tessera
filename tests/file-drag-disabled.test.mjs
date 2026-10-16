/* @layer tooling-scripts @kind test */
import { readFileSync } from 'node:fs';
import { describe, expect, it, vi } from 'vitest';
import { useDropZone } from '../src/primitives/DropZone/behavior/useDropZone';
import { useFileDrag } from '../src/primitives/DropZone/behavior/useFileDrag';
import { mountHook } from './hook-harness.mjs';

const fileDrag = (types = ['Files']) => ({
  dataTransfer: { types, items: [], files: [{ name: 'Chrono Trigger.sfc', type: '' }], dropEffect: 'copy' },
  relatedTarget: null,
  currentTarget: { contains: () => false },
  preventDefault: vi.fn(),
  stopPropagation: vi.fn(),
});

describe('a file dragged over a target that is off', () => {
  it('is swallowed with the not allowed pointer, and no handler fires', () => {
    const onEnter = vi.fn();
    const onDrop = vi.fn();
    const drag = mountHook(() => useFileDrag({ enabled: false, onEnter, onDrop }));
    const over = fileDrag();
    const drop = fileDrag();
    drag.act((it) => it.handlers.onDragEnter(fileDrag()));
    drag.act((it) => it.handlers.onDragOver(over));
    drag.act((it) => it.handlers.onDrop(drop));
    expect(over.preventDefault).toHaveBeenCalled();
    expect(over.dataTransfer.dropEffect).toBe('none');
    expect(drop.preventDefault).toHaveBeenCalled();
    expect(onEnter).not.toHaveBeenCalled();
    expect(onDrop).not.toHaveBeenCalled();
    expect(drag.current.active).toBe(false);
  });

  it('drops the highlight when the target turns off during the drag', () => {
    let enabled = true;
    const drag = mountHook(() => useFileDrag({ enabled, onDrop: () => undefined }));
    drag.act((it) => it.handlers.onDragOver(fileDrag()));
    expect(drag.current.active).toBe(true);
    enabled = false;
    drag.rerender(() => useFileDrag({ enabled, onDrop: () => undefined }));
    expect(drag.current.active).toBe(false);
    enabled = true;
    drag.act((it) => it.handlers.onDragLeave(fileDrag()));
    expect(drag.current.active).toBe(false);
  });

  it('leaves a drag of text alone, on or off', () => {
    const drag = mountHook(() => useFileDrag({ enabled: false, onDrop: () => undefined }));
    const text = fileDrag(['text/plain']);
    drag.act((it) => it.handlers.onDragOver(text));
    expect(text.preventDefault).not.toHaveBeenCalled();
    expect(text.dataTransfer.dropEffect).toBe('copy');
  });
});

describe('a disabled DropZone', () => {
  it('takes no dropped file and opens no file dialog', () => {
    const onDrop = vi.fn();
    const zone = mountHook(() => useDropZone(undefined, false, onDrop));
    const click = vi.fn();
    zone.current.inputRef.current = { click };
    const drop = fileDrag();
    zone.act((it) => it.dragHandlers.onDrop(drop));
    zone.act((it) => it.handleClick());
    expect(drop.preventDefault).toHaveBeenCalled();
    expect(onDrop).not.toHaveBeenCalled();
    expect(click).not.toHaveBeenCalled();
  });

  it('stays a hit target, so the drag reaches it and not the page under it', () => {
    const css = readFileSync(new URL('../src/primitives/DropZone/DropZone.css', import.meta.url), 'utf8');
    expect(css).toMatch(/\.dropzone--disabled \{[^}]*cursor: default;/);
    expect(css).not.toMatch(/\.dropzone--disabled \{[^}]*pointer-events: none/);
    expect(css).toContain('.dropzone:not(.dropzone--disabled):hover {');
  });
});

vi.mock('react', async (importOriginal) => ({ ...(await importOriginal()), ...(await import('./hook-harness.mjs')).hooks }));
