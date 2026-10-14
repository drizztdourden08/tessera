/* @layer tooling-scripts @kind test */
import { createElement as h } from 'react';
import { renderToString } from 'react-dom/server';
import { describe, expect, it, vi } from 'vitest';
import { Anchored } from '../src/primitives/Anchored';

const seen = vi.hoisted(() => []);

vi.mock('../src/primitives/Portal/behavior/useDismissListeners', () => ({ useDismissListeners: (params) => seen.push(params) }));

describe('Anchored with onDismiss', () => {
  it('hands its popup, its anchor and both options to the popup stack', () => {
    seen.length = 0;
    const anchorRef = { current: null };
    renderToString(h(Anchored, { anchorRef, dismissOnOutsidePress: false, onDismiss: () => undefined }, 'Panel'));
    expect(seen.at(-1)).toMatchObject({ open: true, triggerRef: anchorRef, escape: true, outsidePress: false });
  });

  it('stays out of the stack without onDismiss, and keeps the options off the element', () => {
    seen.length = 0;
    const html = renderToString(h(Anchored, { anchorRef: { current: null }, dismissOnEscape: false }, 'Panel'));
    expect(seen.at(-1)).toMatchObject({ open: false, escape: false });
    expect(html).not.toMatch(/dismiss/i);
  });
});
