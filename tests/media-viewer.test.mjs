/* @layer tooling-scripts @kind test */
import { createElement as h } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { useDialogEscape } from '../src/composites/DialogShell/behavior/useDialogEscape';
import { useDialogFocus } from '../src/composites/DialogShell/behavior/useDialogFocus';
import { MediaViewer } from '../src/composites/MediaViewer';
import { pixelatedOf } from '../src/primitives/Image/behavior/pixelated-of';
import { viewerKey } from '../src/composites/MediaViewer/behavior/viewer-key';
import { zoomLevels } from '../src/composites/MediaViewer/behavior/zoom-levels';

vi.mock('../src/primitives/Portal/Portal', () => ({ Portal: ({ children }) => children }));
vi.mock('../src/composites/DialogShell/behavior/useDialogFocus', () => ({ useDialogFocus: vi.fn() }));
vi.mock('../src/composites/DialogShell/behavior/useDialogEscape', () => ({ useDialogEscape: vi.fn() }));

const NODE = { nodeType: 1 };
const ITEMS = [
  { id: 'a', kind: 'image', src: 'a.png', name: 'night-sky-sprite.png' },
  { id: 'b', kind: 'image', src: 'b.png', name: 'Hyrule Field' },
  { id: 'c', kind: 'video', src: 'c.webm', name: 'boss-fight.webm' },
];
const tagsWith = (html, text) => (html.match(/<[a-z0-9]+ [^>]*>/g) ?? []).filter((tag) => tag.includes(text));
const labelledBy = (tag) => /aria-labelledby="([^"]+)"/.exec(tag)?.[1];

const draw = (props) => renderToStaticMarkup(h(MediaViewer, { open: true, items: ITEMS, onClose: () => undefined, ...props }));

describe('MediaViewer as a dialog', () => {
  beforeEach(() => {
    vi.mocked(useDialogFocus).mockReset().mockReturnValue({ node: NODE, ref: () => undefined, onKeyDown: () => undefined });
    vi.mocked(useDialogEscape).mockReset();
  });

  it('is a modal dialog named by the item it shows', () => {
    const html = draw({ defaultIndex: 1 });
    const [dialog] = tagsWith(html, 'role="dialog"');
    expect(dialog).toContain('aria-modal="true"');
    expect(dialog).toContain('tabindex="-1"');
    const [heading] = tagsWith(html, `id="${labelledBy(dialog)}"`);
    expect(heading).toMatch(/^<h3 /);
    expect(html).toContain('>Hyrule Field</h3>');
  });

  it('closes on Escape through the shared Escape stack, and starts focus on the dialog so focus can go back after', () => {
    const onClose = vi.fn();
    draw({ onClose });
    expect(useDialogEscape).toHaveBeenCalledWith(NODE, true, onClose);
    expect(vi.mocked(useDialogFocus).mock.calls[0][0]).toMatchObject({ open: true, initialFocus: 'dialog' });
  });

  it('shows the zoom buttons, Fit, the place in the set and the arrows for a picture in a set', () => {
    const html = draw();
    expect(html).toContain('aria-label="Zoom out"');
    expect(html).toContain('aria-label="Zoom in"');
    expect(tagsWith(html, 'media-viewer__level')[0]).toContain('aria-description="Switch between fit and actual size"');
    expect(html).toContain('<span class="btn__label">Fit</span>');
    expect(tagsWith(html, 'media-viewer__count')[0]).toContain('aria-live="polite"');
    expect(html).toContain('>1 of 3</span>');
    expect(html).toContain('aria-label="Previous"');
    expect(html).toContain('aria-label="Next"');
  });

  it('plays a video in Video with no zoom, and draws one item with no arrows or place', () => {
    const video = draw({ defaultIndex: 2 });
    expect(video).not.toContain('Zoom in');
    expect(video).toContain('class="video__media"');
    const one = draw({ items: ITEMS.slice(0, 1) });
    expect(one).not.toContain('aria-label="Next"');
    expect(one).not.toContain('media-viewer__count');
  });

  it('draws nothing while closed, and nothing for an empty set', () => {
    expect(draw({ open: false })).not.toContain('role="dialog"');
    expect(draw({ items: [] })).toBe('');
  });
});

describe('zoom steps', () => {
  it('sit around Fit, from 100% to 1600%', () => {
    expect(zoomLevels(null)).toEqual(['fit']);
    expect(zoomLevels(0.4)).toEqual(['fit', 1, 2, 4, 8, 16]);
    expect(zoomLevels(4.77)).toEqual([1, 2, 4, 'fit', 8, 16]);
    expect(zoomLevels(4)).toEqual([1, 2, 'fit', 8, 16]);
  });
});

describe('sharp pixels', () => {
  it('turn on by themselves for a picture of 256 pixels or less, or when asked', () => {
    expect(pixelatedOf('auto', { width: 240, height: 120 })).toBe(true);
    expect(pixelatedOf('auto', { width: 1280, height: 720 })).toBe(false);
    expect(pixelatedOf('auto', null)).toBe(false);
    expect(pixelatedOf(true, { width: 1280, height: 720 })).toBe(true);
    expect(pixelatedOf(false, { width: 16, height: 16 })).toBe(false);
  });
});

describe('the keys of the viewer', () => {
  const zoom = () => ({ zoomIn: vi.fn(), zoomOut: vi.fn(), fit: vi.fn() });
  const press = (key, extra = {}) => ({ key, defaultPrevented: false, target: { closest: () => null }, preventDefault: vi.fn(), ...extra });

  it('zoom with plus, equals and minus, and go back to Fit with 0', () => {
    const state = zoom();
    ['+', '=', '-', '0'].forEach((key) => viewerKey(press(key), state, vi.fn()));
    expect(state.zoomIn).toHaveBeenCalledTimes(2);
    expect(state.zoomOut).toHaveBeenCalledOnce();
    expect(state.fit).toHaveBeenCalledOnce();
  });

  it('move through the set with Left and Right', () => {
    const step = vi.fn();
    const event = press('ArrowLeft');
    viewerKey(event, null, step);
    viewerKey(press('ArrowRight'), null, step);
    expect(step.mock.calls).toEqual([[-1], [1]]);
    expect(event.preventDefault).toHaveBeenCalledOnce();
  });

  it('leave alone a key a control took, a shortcut, a video or a slider, and zoom keys on a video', () => {
    const step = vi.fn();
    const state = zoom();
    viewerKey(press('ArrowLeft', { defaultPrevented: true }), state, step);
    viewerKey(press('ArrowLeft', { ctrlKey: true }), state, step);
    viewerKey(press('ArrowLeft', { target: { closest: (selector) => (selector.includes('video') ? {} : null) } }), state, step);
    viewerKey(press('+'), null, step);
    expect(step).not.toHaveBeenCalled();
    expect(state.zoomIn).not.toHaveBeenCalled();
  });
});
