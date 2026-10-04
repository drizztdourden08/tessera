/* @layer tooling-scripts @kind test */
import { createElement as h } from 'react';
import { renderToString } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { Toast } from '../src/primitives/Toast';

const noop = () => undefined;
const render = (variant) => renderToString(h(Toast, { item: { id: 't', message: 'Saved', variant }, onDismiss: noop }));

describe('Toast announcements', () => {
  it('makes a danger toast an alert, read at once', () => {
    expect(render('danger')).toMatch(/class="toast toast--danger [^"]*" role="alert"/);
  });

  it('leaves the other toasts to the polite status region of the container', () => {
    for (const variant of ['info', 'success', 'warning']) expect(render(variant)).not.toContain('role=');
  });
});
