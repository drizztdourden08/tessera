/* @layer tooling-scripts @kind test */
import { describe, expect, it, vi } from 'vitest';
import { useZoom } from '../src/composites/MediaViewer/behavior/useZoom';
import { mountHook } from './hook-harness.mjs';

vi.mock('react', async (importOriginal) => ({ ...(await importOriginal()), ...(await import('./hook-harness.mjs')).hooks }));

const stage = () => ({ current: { scrollLeft: 0, scrollTop: 0, clientWidth: 800, clientHeight: 400, scrollWidth: 800, scrollHeight: 400 } });

describe('zoom in a viewer', () => {
  it('starts on Fit at the fit scale, and steps up to 1600% and down to Fit', () => {
    const zoom = mountHook(() => useZoom(stage(), 0.5, 'a'));
    expect(zoom.current).toMatchObject({ zoom: 'fit', scale: 0.5, canOut: false, canIn: true });
    for (const expected of [1, 2, 4, 8, 16]) {
      zoom.act((z) => z.zoomIn());
      expect(zoom.current.zoom).toBe(expected);
    }
    expect(zoom.current).toMatchObject({ scale: 16, canIn: false });
    zoom.act((z) => z.zoomIn());
    expect(zoom.current.zoom).toBe(16);
    zoom.act((z) => z.fit());
    expect(zoom.current.zoom).toBe('fit');
  });

  it('swaps Fit and actual size', () => {
    const zoom = mountHook(() => useZoom(stage(), 3.3, 'a'));
    zoom.act((z) => z.toggle());
    expect(zoom.current).toMatchObject({ zoom: 1, scale: 1 });
    zoom.act((z) => z.zoomOut());
    expect(zoom.current.zoom).toBe(1);
    zoom.act((z) => z.zoomIn());
    expect(zoom.current.zoom).toBe(2);
    zoom.act((z) => z.zoomIn());
    expect(zoom.current.zoom).toBe('fit');
    zoom.act((z) => z.toggle());
    expect(zoom.current.zoom).toBe(1);
  });

  it('keeps the middle of the view in the middle when it zooms', () => {
    const held = { zoom: null };
    const grow = () => held.zoom?.current.scale ?? 1;
    const ref = {
      current: {
        scrollLeft: 200, scrollTop: 100, clientWidth: 800, clientHeight: 400,
        get scrollWidth() { return 1600 * grow(); },
        get scrollHeight() { return 800 * grow(); },
      },
    };
    const zoom = mountHook(() => useZoom(ref, 1, 'a'));
    held.zoom = zoom;
    zoom.act((z) => z.zoomIn());
    expect(zoom.current.zoom).toBe(2);
    expect(ref.current.scrollLeft).toBe(800);
    expect(ref.current.scrollTop).toBe(400);
  });

  it('goes back to Fit for the next item', () => {
    let key = 'a';
    const zoom = mountHook(() => useZoom(stage(), 0.5, key));
    zoom.act((z) => z.zoomIn());
    key = 'b';
    zoom.rerender(() => useZoom(stage(), 0.5, key));
    expect(zoom.current.zoom).toBe('fit');
  });
});
