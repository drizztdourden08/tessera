/* @layer tooling-scripts @kind test */
import { describe, expect, it, vi } from 'vitest';
import { disclosureHandlers } from '../src/primitives/Disclosure/behavior/disclosure-handlers';

describe('K1 Disclosure end', { tags: ['critical'] }, () => {
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
