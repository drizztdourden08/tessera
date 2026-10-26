/* @layer tooling-scripts @kind test */
import { describe, expect, it, vi } from 'vitest';
import { useLogInput } from '../src/composites/LogPanel/behavior/useLogInput';
import { mountHook } from './hook-harness.mjs';

vi.mock('react', async (importOriginal) => ({ ...(await importOriginal()), ...(await import('./hook-harness.mjs')).hooks }));

const mountInput = () => {
  const sent = [];
  const log = mountHook(() => useLogInput((text) => sent.push(text)));
  const typed = (text) => log.act((input) => input.type(text));
  const send = (text) => {
    typed(text);
    log.act((input) => input.submit(text));
  };
  const press = (key) => {
    const event = { key, preventDefault: vi.fn() };
    log.act((input) => input.onKeyDown(event));
    return event;
  };
  return { log, sent, typed, send, press, value: () => log.current.value };
};

describe('LogPanel input, sending', () => {
  it('sends the line and clears the field', () => {
    const input = mountInput();
    input.send('help');
    expect(input.sent).toEqual(['help']);
    expect(input.value()).toBe('');
  });

  it('keeps a repeated line once in the history and leaves out empty ones', () => {
    const input = mountInput();
    input.send('go');
    input.send('go');
    input.send('');
    expect(input.sent).toEqual(['go', 'go', '']);
    input.press('ArrowUp');
    input.press('ArrowUp');
    expect(input.value()).toBe('go');
  });

  it('leaves other keys alone', () => {
    const input = mountInput();
    expect(input.press('a').preventDefault).not.toHaveBeenCalled();
    expect(input.press('ArrowUp').preventDefault).toHaveBeenCalled();
  });
});

describe('LogPanel input, history', () => {
  it('walks back through what was sent with Up and forward with Down', () => {
    const input = mountInput();
    ['one', 'two', 'three'].forEach(input.send);
    input.press('ArrowUp');
    expect(input.value()).toBe('three');
    input.press('ArrowUp');
    expect(input.value()).toBe('two');
    input.press('ArrowUp');
    input.press('ArrowUp');
    expect(input.value()).toBe('one');
    input.press('ArrowDown');
    expect(input.value()).toBe('two');
  });

  it('brings back the half-typed line after the newest entry', () => {
    const input = mountInput();
    input.send('one');
    input.send('two');
    input.typed('par');
    input.press('ArrowUp');
    expect(input.value()).toBe('two');
    input.press('ArrowDown');
    expect(input.value()).toBe('par');
  });

  it('does nothing on Down before Up, or on Up with nothing sent', () => {
    const input = mountInput();
    input.typed('x');
    input.press('ArrowUp');
    input.press('ArrowDown');
    expect(input.value()).toBe('x');
  });

  it('starts the walk again from the newest entry after a send', () => {
    const input = mountInput();
    input.send('a');
    input.send('b');
    input.press('ArrowUp');
    input.press('ArrowUp');
    input.send('c');
    input.press('ArrowUp');
    expect(input.value()).toBe('c');
  });
});
