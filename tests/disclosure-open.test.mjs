/* @layer tooling-scripts @kind test */
import { createElement as h } from 'react';
import { renderToString } from 'react-dom/server';
import { describe, expect, it, vi } from 'vitest';
import { Disclosure } from '../src/primitives/Disclosure';
import { disclosureHandlers } from '../src/primitives/Disclosure/behavior/disclosure-handlers';

const toggleTo = (open) => ({ currentTarget: { open } });
const click = () => ({ preventDefault: vi.fn() });

describe('Disclosure open', () => {
  it('draws the state the app holds, over defaultOpen', () => {
    expect(renderToString(h(Disclosure, { summary: 'Log', open: true }, 'Rows'))).toMatch(/^<details open=""/);
    expect(renderToString(h(Disclosure, { summary: 'Log', open: false, defaultOpen: true }, 'Rows'))).toMatch(/^<details class=/);
  });

  it('turns a click on the line into a request and leaves the element as it is', () => {
    const onOpenChange = vi.fn();
    const event = click();
    disclosureHandlers(false, onOpenChange).onSummaryClick(event);
    expect(event.preventDefault).toHaveBeenCalled();
    expect(onOpenChange).toHaveBeenCalledWith(true);
    disclosureHandlers(true, onOpenChange).onSummaryClick(click());
    expect(onOpenChange).toHaveBeenLastCalledWith(false);
  });

  it('reports a toggle that did not come from the app, such as find in page, and stays quiet on its own', () => {
    const onOpenChange = vi.fn();
    disclosureHandlers(false, onOpenChange).onToggle(toggleTo(false));
    expect(onOpenChange).not.toHaveBeenCalled();
    disclosureHandlers(false, onOpenChange).onToggle(toggleTo(true));
    expect(onOpenChange).toHaveBeenCalledWith(true);
  });

  it('without open lets the element toggle itself and reports each toggle', () => {
    const onOpenChange = vi.fn();
    const handlers = disclosureHandlers(undefined, onOpenChange);
    expect(handlers.onSummaryClick).toBeUndefined();
    handlers.onToggle(toggleTo(true));
    expect(onOpenChange).toHaveBeenCalledWith(true);
    expect(disclosureHandlers(undefined, undefined).onToggle).toBeUndefined();
  });
});
