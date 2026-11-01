/* @layer tooling-scripts @kind test */
import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';

const read = (path) => readFileSync(new URL(path, import.meta.url), 'utf8');

describe('Tree rowSize roomy', () => {
  it('allows roomy in the row size type', () => {
    expect(read('../src/composites/Tree/Tree.type.ts')).toMatch(/type TreeRowSize = 'compact' \| 'normal' \| 'roomy';/);
  });

  it('sets a 48 px row height token for roomy rows', () => {
    expect(read('../src/composites/Tree/Tree.css')).toMatch(/\.tree\[data-row-size='roomy'\] \{\s*--tree-row-h: var\(--size-48\);\s*\}/);
  });

  it('keeps the compact and normal row heights', () => {
    const css = read('../src/composites/Tree/Tree.css');
    expect(css).toMatch(/--tree-row-h: var\(--size-28\);/);
    expect(css).toMatch(/\.tree\[data-row-size='compact'\] \{\s*--tree-row-h: var\(--size-24\);/);
  });

  it('centres the row content vertically', () => {
    expect(read('../src/composites/Tree/Tree.css')).toMatch(/\.tree__row \{[^}]*align-items: center;/);
  });
});
