/* @layer tooling-scripts @kind test */
import { createElement as h } from 'react';
import { renderToString } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { Widget } from '../src/composites/Widget';

const widget = (extra = {}) => renderToString(h(Widget, {
  id: 'log', tabs: [{ id: 'log', label: 'Log' }], activeId: 'log', paneKey: 'p1', opacity: 1,
  onActivateTab: () => undefined, onClose: () => undefined, ...extra,
}, h('p', null, 'Line one')));

const bodyClass = (html) => html.match(/class="(scroll-area widget__content[^"]*)"/)?.[1];

describe('the widget body', () => {
  it('pads the body by sm unless padding says none or md', () => {
    expect(bodyClass(widget())).toBe('scroll-area widget__content widget__content--pad-sm');
    expect(bodyClass(widget({ padding: 'none' }))).toBe('scroll-area widget__content widget__content--pad-none');
    expect(bodyClass(widget({ padding: 'md' }))).toBe('scroll-area widget__content widget__content--pad-md');
  });

  it('marks a fill body, and only a fill body', () => {
    expect(widget({ fill: true })).toMatch(/widget__content--pad-sm" data-axis="both" data-scrollbar="slim" data-fill="true"/);
    expect(widget()).not.toContain('data-fill');
  });
});
