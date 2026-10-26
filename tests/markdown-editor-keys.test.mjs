/* @layer tooling-scripts @kind test */
import { createElement as h } from 'react';
import { renderToString } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { MarkdownEditor } from '../src/composites/MarkdownEditor';
import { counterShown } from '../src/composites/MarkdownEditor/behavior/counter-shown';
import { editorKey } from '../src/composites/MarkdownEditor/behavior/editor-key';

const noop = () => undefined;
const press = (key, held = {}) => ({ key, ctrlKey: false, metaKey: false, altKey: false, shiftKey: false, defaultPrevented: false, ...held });

describe('MarkdownEditor keys', () => {
  it('submits on Mod+Enter and not on a plain Enter', () => {
    expect(editorKey(press('Enter', { ctrlKey: true }), false, false)).toBe('submit');
    expect(editorKey(press('Enter', { metaKey: true }), false, false)).toBe('submit');
    expect(editorKey(press('Enter'), false, false)).toBeNull();
    expect(editorKey(press('Enter', { ctrlKey: true, shiftKey: true }), false, false)).toBeNull();
  });

  it('escapes only when no menu or popover is open and nothing handled the key', () => {
    expect(editorKey(press('Escape'), false, false)).toBe('escape');
    expect(editorKey(press('Escape'), false, true)).toBeNull();
    expect(editorKey(press('Escape', { defaultPrevented: true }), false, false)).toBeNull();
  });

  it('leaves keys typed while an input method composes', () => {
    expect(editorKey(press('Enter', { ctrlKey: true }), true, false)).toBeNull();
    expect(editorKey(press('Escape'), true, false)).toBeNull();
  });
});

describe('MarkdownEditor character counter', () => {
  const draw = (value, maxLength) => renderToString(h(MarkdownEditor, { value, onChange: noop, maxLength }));

  it('shows the counter from the last 10 percent of the limit', () => {
    expect(counterShown(89, 100)).toBe(false);
    expect(counterShown(90, 100)).toBe(true);
    expect(counterShown(100, 100)).toBe(true);
    expect(counterShown(500, undefined)).toBe(false);
  });

  it('passes maxLength to the field and draws the counter near the limit', () => {
    const html = draw('x'.repeat(95), 100);
    expect(html).toContain('maxLength="100"');
    expect(html).toContain('95 / 100');
    expect(html).toContain('aria-label="95 of 100 characters"');
  });

  it('draws no counter far from the limit or without one', () => {
    expect(draw('short', 100)).not.toContain('markdown-editor__counter');
    expect(draw('short', undefined)).not.toContain('markdown-editor__counter');
    expect(draw('short', undefined)).not.toContain('maxLength');
  });
});
