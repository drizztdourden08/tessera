/* @layer tooling-scripts @kind test */
import { createElement as h } from 'react';
import { renderToString } from 'react-dom/server';
import { describe, expect, it, vi } from 'vitest';
import { InlineEdit } from '../src/composites/InlineEdit';
import { useInlineEditField } from '../src/composites/InlineEdit/behavior/useInlineEditField';
import { guardCellControl } from '../src/primitives/dom/guard-cell-control';
import { nameEditKey } from '../src/primitives/field-control/name-edit-key';

const noop = () => undefined;
const press = (key, held = {}) => ({ key, ctrlKey: false, metaKey: false, altKey: false, shiftKey: false, nativeEvent: { isComposing: false }, stopPropagation: noop, ...held });

const probe = (input) => {
  const seen = { commits: [], done: [], state: undefined };
  const Probe = () => {
    seen.state = useInlineEditField({
      value: 'old ', validate: undefined, multiline: false, onCommit: (value) => seen.commits.push(value), onDone: (back) => seen.done.push(back), ...input,
    });
    return null;
  };
  renderToString(h(Probe));
  return seen;
};

describe('InlineEdit view', () => {
  const draw = (props) => renderToString(h(InlineEdit, { value: 'Fix login', onCommit: noop, ...props }));

  it('shows the value as a button that names the edit', () => {
    const html = draw({});
    expect(html).toContain('<button');
    expect(html).toContain('aria-label="Edit Fix login"');
    expect(html).toContain('aria-keyshortcuts="F2"');
    expect(html).toContain('>Fix login<');
    expect(html).not.toContain('<input');
  });

  it('names the field with the label when there is one', () => {
    expect(draw({ label: 'Title' })).toContain('aria-label="Edit Title: Fix login"');
  });

  it('shows the placeholder when the value is empty', () => {
    const html = draw({ value: '', placeholder: 'Add a title' });
    expect(html).toContain('>Add a title<');
    expect(html).toContain('aria-label="Edit Add a title"');
  });

  it('turns the button off and drops the pen when disabled', () => {
    const html = draw({ disabled: true });
    expect(html).toContain('disabled=""');
    expect(html).not.toContain('inline-edit__pen');
  });
});

describe('InlineEdit renderValue', () => {
  const draw = (props) => renderToString(h(InlineEdit, { value: 'one **two**', onCommit: noop, renderValue: (text) => h('em', { className: 'drawn' }, text.toUpperCase()), ...props }));

  it('draws the value with renderValue when it is not edited, under the same name', () => {
    const html = draw({});
    expect(html).toContain('<em class="drawn">ONE **TWO**</em>');
    expect(html).toContain('aria-label="Edit one **two**"');
    expect(html).toContain('aria-keyshortcuts="F2"');
  });

  it('keeps the placeholder for an empty value and does not call renderValue', () => {
    const html = draw({ value: '', placeholder: 'Add notes' });
    expect(html).toContain('>Add notes<');
    expect(html).not.toContain('drawn');
  });

  it('does not start the edit for a click on a link inside the drawn value', () => {
    const start = vi.fn();
    const link = { closest: () => link };
    const row = { contains: (other) => other === link };
    const handler = guardCellControl(start);
    handler({ target: link, currentTarget: row });
    expect(start).not.toHaveBeenCalled();
    handler({ target: { closest: () => null }, currentTarget: { contains: () => true } });
    expect(start).toHaveBeenCalledTimes(1);
  });
});

describe('InlineEdit keys', () => {
  it('commits on Enter in a line and in a text area only on Mod+Enter', () => {
    expect(nameEditKey('Enter', false, false, false)).toBe('keep');
    expect(nameEditKey('Enter', false, true, false)).toBeNull();
    expect(nameEditKey('Enter', false, true, true)).toBe('keep');
    expect(nameEditKey('Escape', false, true, false)).toBe('undo');
  });
});

describe('InlineEdit commit and cancel', () => {
  it('commits the trimmed text on Enter and puts focus back on the button', () => {
    const seen = probe({});
    seen.state.onKeyDown(press('Enter'));
    expect(seen.commits).toEqual(['old']);
    expect(seen.done).toEqual([true]);
  });

  it('commits on blur without taking focus back', () => {
    const seen = probe({});
    seen.state.onBlur();
    expect(seen.commits).toEqual(['old']);
    expect(seen.done).toEqual([false]);
  });

  it('does not commit text that did not change, and still closes', () => {
    const seen = probe({ value: 'same' });
    seen.state.onKeyDown(press('Enter'));
    expect(seen.commits).toEqual([]);
    expect(seen.done).toEqual([true]);
  });

  it('cancels on Escape without a commit', () => {
    const seen = probe({});
    seen.state.onKeyDown(press('Escape'));
    expect(seen.commits).toEqual([]);
    expect(seen.done).toEqual([true]);
  });

  it('keeps Enter as a new line in a text area and commits on Mod+Enter', () => {
    const seen = probe({ multiline: true });
    seen.state.onKeyDown(press('Enter'));
    expect(seen.commits).toEqual([]);
    seen.state.onKeyDown(press('Enter', { ctrlKey: true }));
    expect(seen.commits).toEqual(['old']);
  });
});

describe('InlineEdit validate', () => {
  const tooShort = (text) => (text.length < 5 ? 'At least 5 characters' : undefined);

  it('shows the message of validate for the trimmed text', () => {
    expect(probe({ validate: tooShort }).state.error).toBe('At least 5 characters');
    expect(probe({ validate: tooShort, value: 'long enough' }).state.error).toBeUndefined();
  });

  it('keeps editing and commits nothing while the text is not valid', () => {
    const seen = probe({ validate: tooShort });
    seen.state.onKeyDown(press('Enter'));
    seen.state.onBlur();
    expect(seen.commits).toEqual([]);
    expect(seen.done).toEqual([]);
  });
});
