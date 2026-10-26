/* @layer tooling-scripts @kind test */
import { createElement as h } from 'react';
import { renderToString } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { MarkdownEditor } from '../src/composites/MarkdownEditor';
import { applyAction } from '../src/composites/MarkdownEditor/behavior/apply-action';
import { applyEdit } from '../src/composites/MarkdownEditor/behavior/apply-edit';
import { insertCodeBlock } from '../src/composites/MarkdownEditor/behavior/insert-code-block';
import { insertLink } from '../src/composites/MarkdownEditor/behavior/insert-link';
import { prefixLines } from '../src/composites/MarkdownEditor/behavior/prefix-lines';
import { shortcutAction } from '../src/composites/MarkdownEditor/behavior/shortcut-action';
import { wrapSelection } from '../src/composites/MarkdownEditor/behavior/wrap-selection';

const run = (edit, text) => {
  const next = applyEdit(text, edit);
  return { next, picked: next.slice(edit.selectStart, edit.selectEnd) };
};

describe('wrapSelection', () => {
  it('wraps the selection and keeps it selected', () => {
    const text = 'make this loud';
    const { next, picked } = run(wrapSelection(text, 5, 9, '**'), text);
    expect(next).toBe('make **this** loud');
    expect(picked).toBe('this');
  });

  it('puts the caret between the marks when nothing is selected', () => {
    const edit = wrapSelection('ab', 1, 1, '*');
    expect(applyEdit('ab', edit)).toBe('a**b');
    expect(edit.selectStart).toBe(2);
    expect(edit.selectEnd).toBe(2);
  });

  it('unwraps when the selection includes the marks', () => {
    const text = 'a **bold** b';
    const { next, picked } = run(wrapSelection(text, 2, 10, '**'), text);
    expect(next).toBe('a bold b');
    expect(picked).toBe('bold');
  });

  it('unwraps when the marks sit just outside the selection', () => {
    const text = 'a **bold** b';
    const { next, picked } = run(wrapSelection(text, 4, 8, '**'), text);
    expect(next).toBe('a bold b');
    expect(picked).toBe('bold');
  });

  it('tells italic from bold', () => {
    const bold = '**x**';
    expect(applyEdit(bold, wrapSelection(bold, 2, 3, '*'))).toBe('***x***');
    const both = '***x***';
    expect(applyEdit(both, wrapSelection(both, 3, 4, '*'))).toBe('**x**');
    expect(applyEdit(both, wrapSelection(both, 3, 4, '**'))).toBe('*x*');
  });

  it('keeps spaces outside the marks', () => {
    const text = 'a  word  b';
    expect(applyEdit(text, wrapSelection(text, 1, 9, '`'))).toBe('a  `word`  b');
  });
});

describe('prefixLines', () => {
  it('prefixes every line a multi-line selection touches and selects them', () => {
    const text = 'one\ntwo\nthree';
    const edit = prefixLines(text, 2, 9, 'bullet');
    const { next, picked } = run(edit, text);
    expect(next).toBe('- one\n- two\n- three');
    expect(picked).toBe(next);
  });

  it('numbers the lines and skips blank ones', () => {
    const text = 'one\n\ntwo';
    expect(applyEdit(text, prefixLines(text, 0, text.length, 'number'))).toBe('1. one\n\n2. two');
  });

  it('removes the prefix when every line already has it', () => {
    const text = '- one\n- two';
    expect(applyEdit(text, prefixLines(text, 0, text.length, 'bullet'))).toBe('one\ntwo');
  });

  it('turns a bullet list into a numbered one', () => {
    const text = '- one\n- two';
    expect(applyEdit(text, prefixLines(text, 0, text.length, 'number'))).toBe('1. one\n2. two');
  });

  it('moves a lone caret with its line and leaves other lines alone', () => {
    const text = 'top\nmiddle\nbottom';
    const edit = prefixLines(text, 7, 7, 'bullet');
    expect(applyEdit(text, edit)).toBe('top\n- middle\nbottom');
    expect(edit.selectStart).toBe(9);
    expect(edit.selectEnd).toBe(9);
  });

  it('leaves out a last line the selection only touches by its newline', () => {
    const text = 'one\ntwo\n';
    expect(applyEdit(text, prefixLines(text, 0, 4, 'bullet'))).toBe('- one\ntwo\n');
  });
});

describe('insertLink', () => {
  it('makes the selection the label and selects the address to type', () => {
    const text = 'see docs now';
    const { next, picked } = run(insertLink(text, 4, 8), text);
    expect(next).toBe('see [docs](https://) now');
    expect(picked).toBe('https://');
  });

  it('uses a selected address as the target and puts the caret in the label', () => {
    const text = 'https://example.com/a';
    const edit = insertLink(text, 0, text.length);
    expect(applyEdit(text, edit)).toBe('[](https://example.com/a)');
    expect(edit.selectStart).toBe(1);
  });

  it('inserts an empty link with the caret in the label', () => {
    const edit = insertLink('', 0, 0);
    expect(applyEdit('', edit)).toBe('[](https://)');
    expect(edit.selectStart).toBe(1);
  });
});

describe('insertCodeBlock', () => {
  it('fences the selection on lines of its own', () => {
    const text = 'run npm test now';
    const { next, picked } = run(insertCodeBlock(text, 4, 12), text);
    expect(next).toBe('run \n```\nnpm test\n```\n now');
    expect(picked).toBe('npm test');
  });

  it('removes a fence the selection already holds', () => {
    const text = '```ts\nconst a = 1;\n```';
    expect(applyEdit(text, insertCodeBlock(text, 0, text.length))).toBe('const a = 1;');
  });
});

describe('applyAction and shortcuts', () => {
  it('maps each toolbar action to its edit', () => {
    expect(applyEdit('x', applyAction('bold', 'x', 0, 1))).toBe('**x**');
    expect(applyEdit('x', applyAction('italic', 'x', 0, 1))).toBe('*x*');
    expect(applyEdit('x', applyAction('code', 'x', 0, 1))).toBe('`x`');
    expect(applyEdit('x', applyAction('list', 'x', 0, 1))).toBe('- x');
    expect(applyEdit('x', applyAction('numberedList', 'x', 0, 1))).toBe('1. x');
  });

  it('reads Mod+B, Mod+I and Mod+K, with Ctrl or Cmd, and nothing else', () => {
    const key = (name, extra = {}) => shortcutAction({ key: name, ctrlKey: true, metaKey: false, altKey: false, shiftKey: false, ...extra });
    expect(key('b')).toBe('bold');
    expect(key('I')).toBe('italic');
    expect(key('k', { ctrlKey: false, metaKey: true })).toBe('link');
    expect(key('z')).toBeNull();
    expect(key('b', { shiftKey: true })).toBeNull();
    expect(key('b', { ctrlKey: false })).toBeNull();
  });
});

describe('MarkdownEditor toolbar', () => {
  const noop = () => undefined;

  it('draws a named toolbar with one named button per action', () => {
    const html = renderToString(h(MarkdownEditor, { value: '', onChange: noop }));
    expect(html).toContain('role="toolbar" aria-label="Formatting"');
    for (const name of ['Bold', 'Italic', 'Bulleted list', 'Numbered list', 'Link', 'Inline code', 'Code block']) {
      expect(html).toContain(`aria-label="${name}"`);
    }
  });

  it('names the shortcuts in the tooltips and in aria-keyshortcuts', () => {
    const html = renderToString(h(MarkdownEditor, { value: '', onChange: noop }));
    expect(html).toContain('aria-keyshortcuts="Control+B Meta+B"');
    expect(html).toContain('aria-keyshortcuts="Control+K Meta+K"');
    expect(html).not.toContain('aria-keyshortcuts="Control+L');
  });

  it('shows the label, the text and the preview in the split layout', () => {
    const html = renderToString(h(MarkdownEditor, { value: '# Title\n\nsome **text**', onChange: noop, label: 'Note', layout: 'split' }));
    expect(html).toContain('data-layout="split"');
    expect(html).toContain('Note');
    expect(html).toContain('<strong');
    expect(html).not.toContain('role="tablist"');
  });

  it('draws Write and Preview tabs in the tabs layout', () => {
    const html = renderToString(h(MarkdownEditor, { value: 'x', onChange: noop, layout: 'tabs' }));
    expect(html).toContain('data-layout="tabs"');
    expect(html).toContain('role="tablist"');
    expect(html).toContain('>Write<');
    expect(html).toContain('>Preview<');
  });

  it('turns the toolbar and the field off when disabled', () => {
    const html = renderToString(h(MarkdownEditor, { value: '', onChange: noop, disabled: true }));
    expect(html).toContain('disabled=""');
    expect(html.match(/disabled=""/g)?.length).toBeGreaterThanOrEqual(8);
  });

  it('says there is nothing to preview for an empty text', () => {
    expect(renderToString(h(MarkdownEditor, { value: '  ', onChange: noop }))).toContain('Nothing to preview');
  });
});
