/* @layer tooling-scripts @kind test */
import { describe, expect, it, vi } from 'vitest';
import { applyAction } from '../src/composites/MarkdownEditor/behavior/apply-action';
import { applyEdit } from '../src/composites/MarkdownEditor/behavior/apply-edit';
import { focusAtEnd } from '../src/composites/MarkdownEditor/behavior/focus-at-end';
import { quoteLines } from '../src/composites/MarkdownEditor/behavior/quote-lines';

describe('K1 quoteLines', { tags: ['critical'] }, () => {
  it('puts a quote mark on the line of the caret', () => {
    const text = 'top\nmiddle\nbottom';
    const edit = quoteLines(text, 6, 6);
    expect(applyEdit(text, edit)).toBe('top\n> middle\nbottom');
    expect(edit.selectStart).toBe(8);
  });

  it('removes the mark when every line already has one', () => {
    const text = '> one\n> two';
    expect(applyEdit(text, quoteLines(text, 0, text.length))).toBe('one\ntwo');
  });

  it('quotes every line of a multi-line selection and skips blank ones', () => {
    const text = 'one\n\ntwo';
    const edit = quoteLines(text, 0, text.length);
    const next = applyEdit(text, edit);
    expect(next).toBe('> one\n\n> two');
    expect(next.slice(edit.selectStart, edit.selectEnd)).toBe(next);
  });

  it('adds the mark when only some lines have it', () => {
    const text = '> one\ntwo';
    expect(applyEdit(text, quoteLines(text, 0, text.length))).toBe('> > one\n> two');
  });

  it('is the quote action of the toolbar', () => {
    expect(applyEdit('x', applyAction('quote', 'x', 0, 1))).toBe('> x');
  });
});

describe('K1 focusAtEnd', { tags: ['critical'] }, () => {
  it('focuses the field and puts the caret at the end of the value', () => {
    const area = { value: 'hello', focus: vi.fn(), setSelectionRange: vi.fn() };
    focusAtEnd(area);
    expect(area.focus).toHaveBeenCalledTimes(1);
    expect(area.setSelectionRange).toHaveBeenCalledWith(5, 5);
  });

  it('does nothing without a field', () => {
    expect(() => focusAtEnd(null)).not.toThrow();
  });
});
