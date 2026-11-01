/* @layer tooling-scripts @kind test */
import { createElement as h } from 'react';
import { describe, expect, it, vi } from 'vitest';
import { copyText } from '../src/composites/CopyValue/behavior/copy-text';
import { enterKeyDown } from '../src/primitives/TextInput/behavior/enter-key-down';

const keyEvent = (key, extra = {}) => ({ key, defaultPrevented: false, nativeEvent: { isComposing: false }, currentTarget: { value: 'say hi' }, ...extra });

describe('K1 onEnter', { tags: ['critical'] }, () => {
  it('gets the value on Enter, after the onKeyDown of the host', () => {
    const order = [];
    const handler = enterKeyDown(() => order.push('keydown'), (value) => order.push(value));
    handler(keyEvent('Enter'));
    handler(keyEvent('a'));
    expect(order).toEqual(['keydown', 'say hi', 'keydown']);
  });

  it('skips Enter while an input method composes or once the host prevented it', () => {
    const onEnter = vi.fn();
    const handler = enterKeyDown(undefined, onEnter);
    handler(keyEvent('Enter', { nativeEvent: { isComposing: true } }));
    handler(keyEvent('Enter', { defaultPrevented: true }));
    expect(onEnter).not.toHaveBeenCalled();
    expect(enterKeyDown(undefined, undefined)).toBeUndefined();
  });
});

describe('K1 StatRow and FactsPanel values', { tags: ['critical'] }, () => {
  it('copies the text value, or the string it is given', () => {
    expect(copyText('127.0.0.1', undefined)).toBe('127.0.0.1');
    expect(copyText(42, undefined)).toBe('42');
    expect(copyText(h('b', null, 'x'), undefined)).toBeUndefined();
    expect(copyText(h('b', null, 'x'), 'seed 12')).toBe('seed 12');
  });
});
