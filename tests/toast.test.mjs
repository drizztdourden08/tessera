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

  it('draws an action as a button before the close button, and keeps a danger toast an alert', () => {
    const html = renderToString(h(Toast, { item: { id: 't', message: 'Not saved', variant: 'danger', action: { label: 'Retry', onSelect: noop } }, onDismiss: noop }));
    expect(html).toMatch(/role="alert"/);
    expect(html).toMatch(/<button[^>]*class="[^"]*toast__action[^"]*"[^>]*>.*Retry.*<\/button><button type="button" class="toast__close"/);
  });

  it('leaves the other toasts to the polite status region of the container', () => {
    for (const variant of ['info', 'success', 'warning']) expect(render(variant)).not.toMatch(/^<div[^>]*role=/);
  });
});
