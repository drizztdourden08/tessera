/* @layer tooling-scripts @kind test */
import fs from 'node:fs';
import { describe, expect, it } from 'vitest';
import { stackKey } from '../src/composites/StudioLayout/behavior/stack-key';
import { unstackedEditorWidth } from '../src/composites/StudioLayout/behavior/unstacked-editor-width';
import { DEFAULT_EDITOR_MIN_WIDTH, STACKED_CLASS } from '../src/composites/StudioLayout/StudioLayout.constants';

const classes = (...names) => {
  const set = new Set(names);
  return { contains: (name) => set.has(name), add: (name) => set.add(name), remove: (name) => set.delete(name), has: (name) => set.has(name) };
};

const box = (width, classList = classes()) => ({ classList, getBoundingClientRect: () => ({ width }) });

const studio = ({ stacked, rowWidth, stackedWidth }) => {
  const root = { classList: classes(...(stacked ? [STACKED_CLASS] : [])) };
  const body = { scrollTop: 240 };
  const editor = { getBoundingClientRect: () => ({ width: root.classList.has(STACKED_CLASS) ? stackedWidth : rowWidth }) };
  return { root, body, editor };
};

describe('when StudioLayout stacks its columns', () => {
  it('reads the editor width as it is while the columns sit side by side', () => {
    const parts = studio({ stacked: false, rowWidth: 230, stackedWidth: 600 });
    expect(unstackedEditorWidth(parts)).toBe(230);
    expect(parts.root.classList.has(STACKED_CLASS)).toBe(false);
  });

  it('measures the editor side by side while stacked, then puts the stack and the scroll back', () => {
    const parts = studio({ stacked: true, rowWidth: 180, stackedWidth: 600 });
    parts.body.scrollTop = 312;
    expect(unstackedEditorWidth(parts)).toBe(180);
    expect(parts.root.classList.has(STACKED_CLASS)).toBe(true);
    expect(parts.body.scrollTop).toBe(312);
  });

  it('checks again only when the width of the body or a fold changes, not when a panel is dragged wider', () => {
    const open = box(302, classes('side-panel'));
    const editor = box(384);
    const body = { children: [open, editor, box(302, classes('side-panel'))], getBoundingClientRect: () => ({ width: 992 }) };
    const first = stackKey(body);
    open.getBoundingClientRect = () => ({ width: 402 });
    expect(stackKey(body)).toBe(first);
    open.classList.add('side-panel--collapsed');
    expect(stackKey(body)).not.toBe(first);
    expect(stackKey({ ...body, getBoundingClientRect: () => ({ width: 991 }) })).not.toBe(stackKey(body));
  });

  it('keeps a 192 px editor by default, as editorMinWidth', () => {
    expect(DEFAULT_EDITOR_MIN_WIDTH).toBe(192);
    const type = fs.readFileSync('src/composites/StudioLayout/StudioLayout.type.ts', 'utf8');
    expect(type).toMatch(/editorMinWidth\?: number;/);
    const hook = fs.readFileSync('src/composites/StudioLayout/behavior/useStudioStack.ts', 'utf8');
    expect(hook).toContain('unstackedEditorWidth({ root, body, editor }) < editorMinWidth');
  });
});
