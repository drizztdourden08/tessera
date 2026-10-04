/* @layer tooling-scripts @kind test */
import { createElement as h } from 'react';
import { renderToString } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { ScreenLayer } from '../src/composites/ScreenLayer';

describe('ScreenLayer floating', () => {
  it('comes before the card in the page order, so its switcher is the first Tab stop', () => {
    const html = renderToString(h(ScreenLayer, { label: 'Hub', floating: h('button', null, 'Multiworld') }, h('button', null, 'Run a session')));
    expect(html).toMatch(/<div class="screen-layer__frame"><div class="screen-layer__floating"><button>Multiworld<\/button><\/div><div class="screen-layer__card"/);
  });

  it('draws only the card without floating', () => {
    const html = renderToString(h(ScreenLayer, { label: 'Hub' }, 'body'));
    expect(html).not.toContain('screen-layer__floating');
  });
});
