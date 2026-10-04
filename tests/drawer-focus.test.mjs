/* @layer tooling-scripts @kind test */
import { createElement as h } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { Drawer } from '../src/composites/Drawer';
import { useDialogEscape } from '../src/composites/DialogShell/behavior/useDialogEscape';
import { useDialogFocus } from '../src/composites/DialogShell/behavior/useDialogFocus';

const PANEL = { nodeType: 1 };
const onKeyDown = () => undefined;

vi.mock('../src/composites/DialogShell/behavior/useDialogFocus', () => ({ useDialogFocus: vi.fn() }));
vi.mock('../src/composites/DialogShell/behavior/useDialogEscape', () => ({ useDialogEscape: vi.fn() }));

const draw = (props) => renderToStaticMarkup(h(Drawer, { onClose: () => undefined, label: 'Filters', ...props }, 'Body'));

describe('Drawer as a modal', () => {
  beforeEach(() => {
    vi.mocked(useDialogFocus).mockReset().mockReturnValue({ node: PANEL, ref: () => undefined, onKeyDown });
    vi.mocked(useDialogEscape).mockReset();
  });

  it('closes on Escape through onClose while open, with the Escape of DialogShell', () => {
    const onClose = vi.fn();
    draw({ open: true, onClose });
    expect(useDialogEscape).toHaveBeenCalledWith(PANEL, true, onClose);
  });

  it('listens for no Escape while closed', () => {
    draw({ open: false });
    expect(vi.mocked(useDialogEscape).mock.calls[0][0]).toBeNull();
  });

  it('keeps focus inside while open with the focus trap of DialogShell, and starts on its title', () => {
    const html = draw({ open: true, label: undefined, title: 'Filters' });
    const [params] = vi.mocked(useDialogFocus).mock.calls[0];
    expect(params.open).toBe(true);
    expect(params.headingId).toMatch(/\S/);
    expect(html).toContain(`aria-labelledby="${params.headingId}"`);
    expect(html).toMatch(/role="dialog" aria-modal="true"[^>]*tabindex="-1"/);
  });

  it('starts on the first stop when it has no title', () => {
    draw({ open: true });
    expect(vi.mocked(useDialogFocus).mock.calls[0][0]).toMatchObject({ open: true, initialFocus: 'first', headingId: undefined });
  });

  it('keeps its controls out of the Tab order while closed', () => {
    expect(draw({ open: false })).toMatch(/^<div class="drawer drawer--right" aria-hidden="true" inert="">/);
    expect(draw({ open: true })).toMatch(/^<div class="drawer drawer--right drawer--open" aria-hidden="false">/);
  });
});
