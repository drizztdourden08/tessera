/* @layer tooling-scripts @kind test */
import { describe, expect, it } from 'vitest';
import { applyEdit } from '../src/composites/MarkdownEditor/behavior/apply-edit';
import { clearEmptyItem } from '../src/composites/MarkdownEditor/behavior/clear-empty-item';
import { continueList } from '../src/composites/MarkdownEditor/behavior/continue-list';
import { listKeyEdit } from '../src/composites/MarkdownEditor/behavior/list-key-edit';
import { normalizeTask } from '../src/composites/MarkdownEditor/behavior/normalize-task';
import { shiftListLines } from '../src/composites/MarkdownEditor/behavior/shift-list-lines';

const press = (key, held = {}) => ({ key, ctrlKey: false, metaKey: false, altKey: false, shiftKey: false, ...held });

const enter = (text, at = text.length) => {
  const edit = continueList(text, at, at);
  return edit && { text: applyEdit(text, edit), caret: edit.selectStart };
};

describe('MarkdownEditor Enter in a list', () => {
  it('continues a bullet, a star and a task item', () => {
    expect(enter('- one')).toEqual({ text: '- one\n- ', caret: 8 });
    expect(enter('* one')?.text).toBe('* one\n* ');
    expect(enter('- [ ] one')?.text).toBe('- [ ] one\n- [ ] ');
    expect(enter('- [x] done')?.text).toBe('- [x] done\n- [ ] ');
  });

  it('counts a numbered list up', () => {
    expect(enter('1. one')?.text).toBe('1. one\n2. ');
    expect(enter('9. nine')?.text).toBe('9. nine\n10. ');
  });

  it('keeps the indent of a nested item and works on a middle line', () => {
    expect(enter('- a\n  - b\n- c', 9)).toEqual({ text: '- a\n  - b\n  - \n- c', caret: 14 });
  });

  it('removes the marker of an empty item and ends the list', () => {
    expect(enter('- one\n- ')).toEqual({ text: '- one\n', caret: 6 });
    expect(enter('1. one\n2. ')?.text).toBe('1. one\n');
    expect(enter('- [ ] ')?.text).toBe('');
    expect(enter('- a\n  - ')?.text).toBe('- a\n');
  });

  it('leaves Enter alone outside a list, in the middle of an item and over a selection', () => {
    expect(enter('plain text')).toBeNull();
    expect(enter('')).toBeNull();
    expect(enter('- one two', 4)).toBeNull();
    expect(enter('**bold**')).toBeNull();
    expect(enter('1.5 apples')).toBeNull();
    expect(continueList('- one', 0, 5)).toBeNull();
  });
});

describe('MarkdownEditor Tab in a list', () => {
  it('indents the list line by two spaces and moves the caret with it', () => {
    const edit = shiftListLines('- one\n- two', 9, 9, false);
    expect(applyEdit('- one\n- two', edit)).toBe('- one\n  - two');
    expect(edit.selectStart).toBe(11);
  });

  it('outdents by two spaces, and by one tab', () => {
    expect(applyEdit('    - a', shiftListLines('    - a', 7, 7, true))).toBe('  - a');
    expect(applyEdit('\t- a', shiftListLines('\t- a', 3, 3, true))).toBe('- a');
    expect(applyEdit(' - a', shiftListLines(' - a', 4, 4, true))).toBe('- a');
  });

  it('indents every list line in a selection', () => {
    const text = '- a\n- b\n- c';
    const edit = shiftListLines(text, 0, 7, false);
    expect(applyEdit(text, edit)).toBe('  - a\n  - b\n- c');
    expect(edit.selectStart).toBe(0);
  });

  it('does nothing outside a list, so the browser moves the focus', () => {
    expect(shiftListLines('plain', 2, 2, false)).toBeNull();
    expect(shiftListLines('plain', 2, 2, true)).toBeNull();
    expect(shiftListLines('- a\nplain', 0, 9, false)).toBeNull();
  });

  it('does nothing on Shift+Tab when the item has no indent', () => {
    expect(shiftListLines('- a', 3, 3, true)).toBeNull();
  });
});

describe('MarkdownEditor Backspace after a marker', () => {
  const back = (text, at = text.length) => {
    const edit = clearEmptyItem(text, at, at);
    return edit && applyEdit(text, edit);
  };

  it('removes an empty marker', () => {
    expect(back('- one\n- ')).toBe('- one\n');
    expect(back('1. ')).toBe('');
    expect(back('- [ ] ')).toBe('');
    expect(back('- a\n  * ')).toBe('- a\n');
  });

  it('leaves a marker that has text, a caret before the end and a selection', () => {
    expect(back('- one')).toBeNull();
    expect(back('- ', 1)).toBeNull();
    expect(back('plain')).toBeNull();
    expect(clearEmptyItem('- ', 0, 2)).toBeNull();
  });
});

describe('MarkdownEditor task marker', () => {
  const type = (text) => {
    const edit = normalizeTask(text, text.length, text.length);
    return edit && { text: applyEdit(text, edit), caret: edit.selectStart };
  };

  it('turns - [] into a task item when the space is typed', () => {
    expect(type('- []')).toEqual({ text: '- [ ] ', caret: 6 });
    expect(type('  * []')?.text).toBe('  * [ ] ');
  });

  it('leaves - [ ] to the space itself and other text alone', () => {
    expect(type('- [ ]')).toBeNull();
    expect(type('- [x]')).toBeNull();
    expect(type('[]')).toBeNull();
    expect(type('text - []')).toBeNull();
  });
});

describe('MarkdownEditor list keys', () => {
  it('picks the edit for each key', () => {
    expect(listKeyEdit(press('Enter'), '- a', 3, 3)?.insert).toBe('\n- ');
    expect(listKeyEdit(press('Tab'), '- a', 3, 3)?.insert).toBe('  - a');
    expect(listKeyEdit(press('Tab', { shiftKey: true }), '  - a', 5, 5)?.insert).toBe('- a');
    expect(listKeyEdit(press('Backspace'), '- ', 2, 2)?.insert).toBe('');
    expect(listKeyEdit(press(' '), '- []', 4, 4)?.insert).toBe('- [ ] ');
  });

  it('ignores keys with a modifier, and keys outside a list', () => {
    expect(listKeyEdit(press('Enter', { ctrlKey: true }), '- a', 3, 3)).toBeNull();
    expect(listKeyEdit(press('Enter', { shiftKey: true }), '- a', 3, 3)).toBeNull();
    expect(listKeyEdit(press('Tab', { altKey: true }), '- a', 3, 3)).toBeNull();
    expect(listKeyEdit(press('Tab'), 'plain', 2, 2)).toBeNull();
    expect(listKeyEdit(press('a'), '- a', 3, 3)).toBeNull();
  });
});
