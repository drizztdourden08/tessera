/* @layer tooling-scripts @kind test */
import { describe, expect, it } from 'vitest';
import { restoreFocus } from '../src/primitives/dom/restore-focus';

const BODY = { name: 'body' };
const ROOT = { name: 'root' };

const fakeTarget = (active, connected = true) => {
  const doc = { body: BODY, documentElement: ROOT, activeElement: active };
  return { isConnected: connected, ownerDocument: doc, focused: false, focus() { this.focused = true; } };
};

describe('restoreFocus after a controlled close', () => {
  it('returns focus to the trigger when the closed menu left focus on the body', () => {
    const target = fakeTarget(BODY);
    expect(restoreFocus(target)).toBe(true);
    expect(target.focused).toBe(true);
  });

  it('returns focus when nothing holds it', () => {
    const target = fakeTarget(null);
    expect(restoreFocus(target)).toBe(true);
    expect(target.focused).toBe(true);
  });

  it('does not steal focus from an element the user clicked into', () => {
    const target = fakeTarget({ name: 'input' });
    expect(restoreFocus(target)).toBe(false);
    expect(target.focused).toBe(false);
  });

  it('leaves a trigger that left the page alone', () => {
    const target = fakeTarget(BODY, false);
    expect(restoreFocus(target)).toBe(false);
    expect(restoreFocus(null)).toBe(false);
  });
});
