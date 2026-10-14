/* @layer tooling-scripts @kind test */
import { createElement as h } from 'react';
import { renderToString } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { Widget } from '../src/composites/Widget';

const POPPED = {
  id: 'hints', tabs: [{ id: 'hints', label: 'Hints' }], activeId: 'hints', paneKey: null, mode: 'out', dragRegion: true, opacity: 1,
};
const ignore = () => undefined;

const widget = (extra = {}) => {
  const props = { ...POPPED, onActivateTab: ignore, onClose: ignore, ...extra };
  return renderToString(h(Widget, props, h('p', null, 'Hint list')));
};

describe('a widget in its own window that is disabled', () => {
  it('covers the body with the disabled state and the reason', () => {
    const html = widget({ disabled: 'Hint sharing is off for this session.' });
    expect(html).toContain('disabled-overlay disabled-overlay--contained');
    expect(html).toMatch(/class="disabled-overlay__content" aria-disabled="true" inert="">.*Hint list/);
    expect(html).toContain('Hint sharing is off for this session.');
  });

  it('shows the default text with true, and Open settings only with onOpenSettings', () => {
    const plain = widget({ disabled: true });
    expect(plain).toContain('disabled-overlay__message');
    expect(plain).not.toContain('btn__label');
    expect(widget({ disabled: true, onOpenSettings: () => undefined })).toContain('<span class="btn__label">Open Settings</span>');
  });

  it('draws the body as before when it is not disabled', () => {
    expect(widget()).not.toContain('disabled-overlay');
    expect(widget({ disabled: false })).not.toContain('disabled-overlay');
  });
});
