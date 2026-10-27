/* @layer tooling-scripts @kind test */
import { createElement as h } from 'react';
import { renderToString } from 'react-dom/server';
import { describe, expect, it, vi } from 'vitest';
import { Disclosure } from '../src/primitives/Disclosure';
import { disclosureHandlers } from '../src/primitives/Disclosure/behavior/disclosure-handlers';

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

  it('leaves a click on a control in the end slot to the control, and still handles a click on the line', () => {
    const onOpenChange = vi.fn();
    const summary = { contains: () => true };
    const handlers = disclosureHandlers(false, onOpenChange);
    const onControl = { target: { closest: () => ({}) }, currentTarget: summary, preventDefault: vi.fn() };
    handlers.onSummaryClick(onControl);
    expect(onControl.preventDefault).not.toHaveBeenCalled();
    expect(onOpenChange).not.toHaveBeenCalled();
    const onLine = { target: { closest: () => null }, currentTarget: summary, preventDefault: vi.fn() };
    handlers.onSummaryClick(onLine);
    expect(onLine.preventDefault).toHaveBeenCalled();
    expect(onOpenChange).toHaveBeenCalledWith(true);
  });
});
