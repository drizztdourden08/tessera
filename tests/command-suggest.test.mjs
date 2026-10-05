/* @layer tooling-scripts @kind test */
import { createElement as h } from 'react';
import { renderToString } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { CommandInput } from '../src/composites/CommandInput';
import { commandEntries } from '../src/composites/CommandInput/behavior/command-entries';
import { suggestCommands } from '../src/composites/CommandInput/behavior/suggest-commands';
import { suggestKey } from '../src/composites/CommandInput/behavior/suggest-key';

const COMMANDS = commandEntries(['/players', '/hint', '/save', '/status', '/release', { command: '/forbid_release', description: 'Stop a release' }]);

const names = (value, limit = 6) => suggestCommands(COMMANDS, value, limit).map((entry) => entry.command);

const key = (name, extra = {}) => ({ key: name, altKey: false, ctrlKey: false, metaKey: false, shiftKey: false, isComposing: false, ...extra });

describe('CommandInput suggestions', () => {
  it('lists the registered commands that hold what was typed, those that start with it first', () => {
    expect(names('/s')).toEqual(['/save', '/status']);
    expect(names('release')).toEqual(['/release', '/forbid_release']);
    expect(names('/re')).toEqual(['/release']);
    expect(names('STAT')).toEqual(['/status']);
  });

  it('lists nothing on an empty line, for a command typed in full, or once its arguments start', () => {
    expect(names('')).toEqual([]);
    expect(names('/save')).toEqual([]);
    expect(names('/hint Ana')).toEqual([]);
  });

  it('keeps to the limit', () => {
    expect(names('/', 2)).toEqual(['/players', '/hint']);
  });

  it('takes plain strings and commands with a description', () => {
    expect(COMMANDS[0]).toEqual({ command: '/players' });
    expect(COMMANDS[5]).toEqual({ command: '/forbid_release', description: 'Stop a release' });
  });
});

describe('CommandInput suggestion keys', () => {
  it('moves with Up and Down, completes with Tab, and closes with Escape', () => {
    expect(suggestKey(key('ArrowDown'), true, false)).toBe('next');
    expect(suggestKey(key('ArrowUp'), true, false)).toBe('previous');
    expect(suggestKey(key('Tab'), false, false)).toBe('complete');
    expect(suggestKey(key('Escape'), true, false)).toBe('close');
  });

  it('completes with Right only with the caret at the end, and with Enter only on a row picked with the arrows', () => {
    expect(suggestKey(key('ArrowRight'), true, false)).toBe('complete');
    expect(suggestKey(key('ArrowRight'), false, false)).toBeNull();
    expect(suggestKey(key('Enter'), true, true)).toBe('complete');
    expect(suggestKey(key('Enter'), true, false)).toBeNull();
  });

  it('leaves keys with a modifier to the field', () => {
    expect(suggestKey(key('Tab', { shiftKey: true }), true, false)).toBeNull();
    expect(suggestKey(key('ArrowDown', { isComposing: true }), true, false)).toBeNull();
  });
});

describe('CommandInput with commands', () => {
  it('is a combobox for its list and shows the Tab key in its hints', () => {
    const html = renderToString(h(CommandInput, { onSubmit: () => undefined, commands: ['/save'] }));
    expect(html).toContain('role="combobox"');
    expect(html).toContain('aria-autocomplete="list"');
    expect(html).toContain('aria-expanded="false"');
    expect(html).toContain('complete</span>');
  });

  it('stays a plain field with no commands', () => {
    const html = renderToString(h(CommandInput, { onSubmit: () => undefined }));
    expect(html).not.toContain('role="combobox"');
    expect(html).not.toContain('complete</span>');
  });
});
