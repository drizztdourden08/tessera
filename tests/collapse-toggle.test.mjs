/* @layer tooling-scripts @kind test */
import fs from 'node:fs';
import { createElement as h } from 'react';
import { renderToString } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { CollapseToggle } from '../src/composites/CollapseToggle';
import { pointsTo } from '../src/composites/CollapseToggle/behavior/points-to';
import { ListDetailLayout } from '../src/composites/ListDetailLayout';
import { SideNav } from '../src/composites/SideNav';
import { SidePanel } from '../src/composites/SidePanel';

const draw = (extra = {}) => renderToString(h(CollapseToggle, { collapsed: false, onToggle: () => undefined, label: 'Profiles', ...extra }));
const sheet = (file) => fs.readFileSync(file, 'utf8');
const NAV = { groups: [{ id: 'main', items: [{ id: 'home', label: 'Home', icon: 'H' }] }] };

describe('CollapseToggle', () => {
  it('points toward the edge of its panel to fold it and away from it to unfold it', () => {
    expect(pointsTo('start', false)).toBe('start');
    expect(pointsTo('start', true)).toBe('end');
    expect(pointsTo('end', false)).toBe('end');
    expect(pointsTo('end', true)).toBe('start');
  });

  it('is a button that names the panel, says Hide or Show, and reports aria-expanded and aria-controls', () => {
    expect(draw({ controls: 'pane' })).toBe(
      '<button type="button" class="pressable edge-button hit-area collapse-toggle collapse-toggle--to-start" aria-label="Hide Profiles" title="Hide Profiles" aria-expanded="true" aria-controls="pane">'
      + '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" class="icon" width="14" height="14" viewBox="0 0 24 24">'
      + '<path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m9 18l6-6l-6-6"/></svg></button>',
    );
    expect(draw({ collapsed: true, side: 'end', className: 'host__toggle' })).toContain('class="pressable edge-button hit-area collapse-toggle collapse-toggle--to-start host__toggle" aria-label="Show Profiles" title="Show Profiles" aria-expanded="false"');
  });

  it('draws one look: a round black button with a chevron that turns, still under reduced motion', () => {
    const css = sheet('src/composites/CollapseToggle/CollapseToggle.css');
    expect(sheet('src/composites/edge-button/EdgeButton.css')).toMatch(/\.edge-button \{[^}]*border-radius: var\(--radius-round\);[^}]*background: var\(--c-layer\);/);
    expect(css).toMatch(/\.collapse-toggle--to-start svg \{\s+transform: rotate\(180deg\);/);
    expect(css).toMatch(/prefers-reduced-motion: reduce\) \{\s+\.collapse-toggle svg \{\s+transition: none;/);
  });

  it('sizes every folded rail from a SideNav item, its gutters and borders, so the icons sit in the middle', () => {
    expect(sheet('src/tokens/size.css')).toContain('--side-nav-w: calc(var(--side-nav-item-h) + 2 * (var(--space-sm) + 2 * var(--border-width-thin)));');
    expect(sheet('src/composites/SideNav/sub-components/SideNavItem.css')).toMatch(/\.side-nav__icon \{[^}]*inline-size: var\(--text-xl\);/);
    expect(sheet('src/composites/SideNav/sub-components/SideNavSearch.css')).toMatch(/\.side-nav__search-mark \{[^}]*margin-inline: auto;/);
    expect(sheet('src/composites/SideNav/SideNav.css')).toMatch(/\.side-nav--rail \.side-nav__panel \{[^}]*border-inline: var\(--border-width-thin\) solid transparent;/);
    expect(sheet('src/composites/pane-edge/PaneRail.css')).toMatch(/\.pane-rail--folded \{[^}]*inline-size: var\(--side-nav-w\);/);
  });

  it('is the one fold button of SideNav, SidePanel and ListDetailLayout', () => {
    const toggles = [
      renderToString(h(SideNav, { config: NAV, activeId: 'home', onSelect: () => undefined })),
      renderToString(h(SidePanel, { title: 'Profiles', containers: [{ title: 'Rows', content: 'Rows' }] })),
      renderToString(h(ListDetailLayout, { listContainers: [{ title: 'Rows', content: 'Rows' }], detail: 'Detail', detailCollapsible: true })),
    ].map((html) => html.match(/class="pressable edge-button hit-area collapse-toggle[^"]*"/g) ?? []);
    expect(toggles.map((found) => found.length)).toEqual([1, 1, 2]);
    expect(toggles.flat().every((found) => found.includes('collapse-toggle--to-'))).toBe(true);
    ['SideNav/SideNav.tsx', 'SidePanel/SidePanel.tsx', 'pane-edge/EdgeToggle.tsx'].forEach((file) => {
      expect(sheet(`src/composites/${file}`), file).not.toMatch(/IconButton|panel-left|panel-right/);
    });
  });
});
