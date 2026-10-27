/* @layer tooling-scripts @kind test */
import { createElement as h } from 'react';
import { renderToString } from 'react-dom/server';
import { describe, expect, it, vi } from 'vitest';
import { Disclosure } from '../src/primitives/Disclosure';
import { endClick } from '../src/primitives/Disclosure/behavior/end-click';

const clickOn = (closest) => ({ target: { closest: () => closest }, stopPropagation: vi.fn(), preventDefault: vi.fn() });

describe('Disclosure end', () => {
  it('draws no end slot by default', () => {
    const html = renderToString(h(Disclosure, { summary: 'Log' }, 'Rows'));
    expect(html).not.toContain('disclosure__end');
    expect(html).not.toContain('disclosure--has-end');
  });

  it('draws the end slot inside the summary, after the line', () => {
    const html = renderToString(h(Disclosure, { summary: 'Players', end: h('button', null, 'Add') }, 'Rows'));
    expect(html).toContain('disclosure--has-end');
    expect(html.indexOf('Players')).toBeLessThan(html.indexOf('disclosure__end'));
    expect(html.indexOf('Add')).toBeLessThan(html.indexOf('</summary>'));
  });

  it('keeps every click in the end slot from reaching the summary', () => {
    const event = clickOn({});
    endClick(event);
    expect(event.stopPropagation).toHaveBeenCalled();
  });

  it('lets a control in the slot act on its own and stops plain text from toggling', () => {
    const onControl = clickOn({});
    endClick(onControl);
    expect(onControl.preventDefault).not.toHaveBeenCalled();
    const onText = clickOn(null);
    endClick(onText);
    expect(onText.preventDefault).toHaveBeenCalled();
  });
});
