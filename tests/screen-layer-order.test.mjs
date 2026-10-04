/* @layer tooling-scripts @kind test */
import { createElement as h } from 'react';
import { renderToString } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { ScreenLayer } from '../src/composites/ScreenLayer';
import { layerScope } from '../src/composites/ScreenLayer/behavior/layer-scope';

describe('ScreenLayer floating', () => {
  it('puts the switcher first, inside the modal dialog with the card, so it is the first Tab stop and stays in the tree', () => {
    const html = renderToString(h(ScreenLayer, { label: 'Hub', floating: h('button', null, 'Multiworld') }, h('button', null, 'Run a session')));
    expect(html).toMatch(/<div class="screen-layer__frame" role="dialog" aria-modal="true" aria-label="Hub" tabindex="-1"><div class="screen-layer__floating"><button>Multiworld<\/button><\/div><div class="screen-layer__card"/);
  });

  it('draws only the card without floating', () => {
    const html = renderToString(h(ScreenLayer, { label: 'Hub' }, 'body'));
    expect(html).not.toContain('screen-layer__floating');
  });

  it('keeps focus out of the room the layer covers, its parent', () => {
    const parent = { name: 'host' };
    const dialog = { closest: () => ({ parentElement: parent }), ownerDocument: { body: { name: 'body' } } };
    expect(layerScope(dialog)).toBe(parent);
    expect(layerScope({ closest: () => null, ownerDocument: { body: 'body' } })).toBe('body');
  });
});
