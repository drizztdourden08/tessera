/* @layer tooling-scripts @kind test */
import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { carriesFiles } from '../src/primitives/DropZone/behavior/carries-files';
import { leftZone } from '../src/primitives/DropZone/behavior/left-zone';

const css = (path) => readFileSync(new URL(path, import.meta.url), 'utf8');

describe('a file dragged in from the desktop', () => {
  it('counts as files from its types alone, the way Chromium sends it before the drop', () => {
    expect(carriesFiles({ types: ['Files'], items: [] })).toBe(true);
    expect(carriesFiles({ types: ['application/x-moz-file'], items: [] })).toBe(true);
  });

  it('counts as files from a file item when the types are empty', () => {
    expect(carriesFiles({ types: [], items: [{ kind: 'file', type: '' }] })).toBe(true);
  });

  it('leaves a drag of text or a link alone', () => {
    expect(carriesFiles({ types: ['text/plain', 'text/uri-list'], items: [{ kind: 'string', type: 'text/plain' }] })).toBe(false);
    expect(carriesFiles(null)).toBe(false);
  });

  it('knows a drag left the zone only when it moved to an element outside it', () => {
    const inner = { nodeType: 1 };
    const zone = { contains: (node) => node === inner };
    const event = (relatedTarget) => ({ relatedTarget, currentTarget: zone });
    expect(leftZone(event(inner))).toBe(false);
    expect(leftZone(event({ nodeType: 1 }))).toBe(true);
    expect(leftZone(event(null))).toBe(false);
  });

  it('shows the drop look at once, with no fade in', () => {
    expect(css('../src/composites/PathInput/PathInput.css')).toMatch(/\.path-input__frame\[data-dropping\] \{\s+transition: none;/);
    expect(css('../src/primitives/DropZone/DropZone.css')).toMatch(/\.dropzone--active \{\s+transition: none;/);
  });
});
