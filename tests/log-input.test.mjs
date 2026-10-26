/* @layer tooling-scripts @kind test */
import { describe, expect, it, vi } from 'vitest';
import { useLogInput } from '../src/composites/LogPanel/behavior/useLogInput';
import { mountHook } from './hook-harness.mjs';

vi.mock('react', async (importOriginal) => ({ ...(await importOriginal()), ...(await import('./hook-harness.mjs')).hooks }));

const mountInput = (answer = () => undefined) => {
  const sent = [];
  const log = mountHook(() => useLogInput((text) => {
    sent.push(text);
    return answer(text);
  }));
  const typed = (text) => log.act((input) => input.type(text));
  const send = (text) => {
    typed(text);
    let pending;
    log.act((input) => {
      pending = input.submit(text);
    });
    return pending;
  };
  const settled = async (pending) => {
    await pending;
    log.act(() => {});
  };
  const press = (key) => {
    const event = { key, preventDefault: vi.fn() };
    log.act((input) => input.onKeyDown(event));
    return event;
  };
  return { log, sent, typed, send, settled, press, value: () => log.current.value };
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

describe('LogPanel input, a refused or pending send', () => {
  it('clears the field when the app answers true or nothing', async () => {
    const input = mountInput(() => true);
    input.send('go');
    expect(input.value()).toBe('');
    const later = mountInput(() => Promise.resolve(true));
    const pending = later.send('go');
    expect(later.value()).toBe('go');
    await later.settled(pending);
    expect(later.value()).toBe('');
  });

  it('keeps the text and leaves the history alone when the app answers false', () => {
    const input = mountInput(() => false);
    input.send('go');
    expect(input.value()).toBe('go');
    input.typed('');
    input.press('ArrowUp');
    expect(input.value()).toBe('');
  });

  it('keeps the text when the promise resolves false', async () => {
    const input = mountInput(() => Promise.resolve(false));
    await input.settled(input.send('go'));
    expect(input.value()).toBe('go');
  });

  it('keeps the text when the promise rejects, and lets it be sent again', async () => {
    const input = mountInput(() => Promise.reject(new Error('down')));
    await input.settled(input.send('go'));
    expect(input.value()).toBe('go');
    await input.settled(input.send('go'));
    expect(input.sent).toEqual(['go', 'go']);
  });

  it('ignores a second Enter while the first is pending, then sends again once it settles', async () => {
    const input = mountInput(() => Promise.resolve(true));
    const first = input.send('go');
    input.send('go');
    expect(input.sent).toEqual(['go']);
    await input.settled(first);
    await input.settled(input.send('again'));
    expect(input.sent).toEqual(['go', 'again']);
  });

  it('keeps what was typed meanwhile when the pending line is accepted', async () => {
    const input = mountInput(() => Promise.resolve(true));
    const pending = input.send('go');
    input.typed('next');
    await input.settled(pending);
    expect(input.value()).toBe('next');
  });
});
