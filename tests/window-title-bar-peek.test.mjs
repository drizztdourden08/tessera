/* @layer tooling-scripts @kind test */
import { readFileSync } from 'node:fs';
import { describe, expect, it, vi } from 'vitest';
import { usePeek } from '../src/composites/WindowTitleBar/behavior/usePeek';
import { mountHook } from './hook-harness.mjs';

vi.mock('react', async (importOriginal) => ({ ...(await importOriginal()), ...(await import('./hook-harness.mjs')).hooks }));

const key = (name) => ({ key: name, defaultPrevented: false, target: null, preventDefault: vi.fn() });

describe('WindowTitleBar peek Escape', () => {
  it('prevents the default of the Escape it handles, and of no other key', () => {
    const view = mountHook(() => usePeek(true, { current: null }, false));
    const escape = key('Escape');
    view.current.handlers.onKeyDown(escape);
    expect(escape.preventDefault).toHaveBeenCalledOnce();
    const letter = key('a');
    view.current.handlers.onKeyDown(letter);
    expect(letter.preventDefault).not.toHaveBeenCalled();
  });
});

describe('WindowTitleBar concealed layer', () => {
  it('stacks the revealed bar on its own token above the floating widgets', () => {
    const css = readFileSync(new URL('../src/composites/WindowTitleBar/WindowTitleBar.css', import.meta.url), 'utf8');
    const tokens = readFileSync(new URL('../src/tokens/z-index.css', import.meta.url), 'utf8');
    const layer = (name) => Number(tokens.match(new RegExp(`--${name}:\\s*(\\d+)`))?.[1]);
    const concealed = css.match(/\.window-title-bar--concealed \{([^}]*)\}/)?.[1] ?? '';
    expect(concealed).toContain('z-index: var(--z-title-bar)');
    expect(layer('z-title-bar')).toBeGreaterThan(layer('z-floating'));
  });
});
