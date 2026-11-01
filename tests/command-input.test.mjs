/* @layer tooling-scripts @kind test */
import { afterEach, describe, expect, it, vi } from 'vitest';
import { addToHistory } from '../src/composites/CommandInput/behavior/add-to-history';
import { commandKey } from '../src/composites/CommandInput/behavior/command-key';
import { readStoredHistory } from '../src/composites/CommandInput/behavior/stored-history';
import { walkHistory } from '../src/composites/CommandInput/behavior/walk-history';
import { writeStored } from '../src/primitives/dom/write-stored';

const HISTORY = ['/players', '/hint Ana Wheel', '/save'];

const IDLE = { index: null, draft: '' };

const key = (name, extra = {}) => ({ key: name, altKey: false, ctrlKey: false, metaKey: false, shiftKey: false, isComposing: false, ...extra });

const walk = (directions, typed = '') => {
  let state = { walk: IDLE, value: typed };
  return directions.map((direction) => {
    state = walkHistory(direction, HISTORY, state.walk, state.value) ?? state;
    return state.value;
  });
};

describe('K1 CommandInput keys', { tags: ['critical'] }, () => {
  it('maps Enter, Up, Down and Escape to their actions', () => {
    expect(commandKey(key('Enter'), '/save', false)).toBe('send');
    expect(commandKey(key('ArrowUp'), '', false)).toBe('older');
    expect(commandKey(key('ArrowDown'), '', true)).toBe('newer');
    expect(commandKey(key('Escape'), '/sa', false)).toBe('clear');
    expect(commandKey(key('a'), '', false)).toBeNull();
  });

  it('lets Escape pass on an empty line that is not walking the history', () => {
    expect(commandKey(key('Escape'), '', false)).toBeNull();
    expect(commandKey(key('Escape'), '', true)).toBe('clear');
  });

  it('leaves keys with a modifier and keys typed while an input method composes', () => {
    expect(commandKey(key('Enter', { shiftKey: true }), '/save', false)).toBeNull();
    expect(commandKey(key('ArrowUp', { ctrlKey: true }), '', false)).toBeNull();
    expect(commandKey(key('ArrowUp', { shiftKey: true }), '', false)).toBeNull();
    expect(commandKey(key('Enter', { isComposing: true }), '/save', false)).toBeNull();
  });
});

describe('K1 CommandInput history', { tags: ['critical'] }, () => {
  it('walks from the newest entry back and stops at the oldest', () => {
    expect(walk(['older', 'older', 'older', 'older'])).toEqual(['/save', '/hint Ana Wheel', '/players', '/players']);
  });

  it('walks forward again and brings back what was typed past the newest entry', () => {
    expect(walk(['older', 'older', 'newer', 'newer', 'newer'], '/hint Bram'))
      .toEqual(['/save', '/hint Ana Wheel', '/save', '/hint Bram', '/hint Bram']);
  });

  it('does nothing on Down before Up, or on Up with no history', () => {
    expect(walkHistory('newer', HISTORY, IDLE, 'x')).toBeNull();
    expect(walkHistory('older', [], IDLE, 'x')).toBeNull();
  });

  it('keeps a shrunk history in range', () => {
    expect(walkHistory('older', ['/a'], { index: 3, draft: '' }, '/b')).toEqual({ walk: { index: 0, draft: '' }, value: '/a' });
  });

  it('adds a command once after the same one, and drops the oldest past the limit', () => {
    expect(addToHistory(['/a'], '/a', 5)).toEqual(['/a']);
    expect(addToHistory(['/a', '/b'], '/a', 5)).toEqual(['/a', '/b', '/a']);
    expect(addToHistory(['/a', '/b', '/c'], '/d', 3)).toEqual(['/b', '/c', '/d']);
  });
});

describe('K1 CommandInput storageKey', { tags: ['critical'] }, () => {
  afterEach(() => vi.unstubAllGlobals());

  const stubStorage = (start = {}) => {
    const items = new Map(Object.entries(start));
    vi.stubGlobal('localStorage', { getItem: (name) => items.get(name) ?? null, setItem: (name, text) => items.set(name, text) });
    return items;
  };

  it('keeps the history under its key and reads it back', () => {
    const items = stubStorage();
    writeStored('console.history', ['/players', '/save']);
    expect(items.get('console.history')).toBe('["/players","/save"]');
    expect(readStoredHistory('console.history')).toEqual(['/players', '/save']);
  });

  it('reads nothing without a key, and ignores a stored value that is not a list of commands', () => {
    stubStorage({ bad: '{"a":1}', broken: '[' });
    expect(readStoredHistory(undefined)).toEqual([]);
    expect(readStoredHistory('bad')).toEqual([]);
    expect(readStoredHistory('broken')).toEqual([]);
    expect(readStoredHistory('missing')).toEqual([]);
  });
});
