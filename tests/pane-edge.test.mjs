/* @layer tooling-scripts @kind test */
import fs from 'node:fs';
import path from 'node:path';
import { createElement as h } from 'react';
import { renderToString } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { ListDetailLayout } from '../src/composites/ListDetailLayout';
import { SidePanel } from '../src/composites/SidePanel';
import { SplitPane } from '../src/composites/SplitPane';

const sheet = (file) => fs.readFileSync(file, 'utf8');
const rule = (css, selector) => new RegExp(`${selector.replace(/[.*+?^${}()|[\]\\>]/g, '\\$&')} \\{([^}]*)\\}`).exec(css)?.[1] ?? '';

const sourcesIn = (dir) => fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
  const file = path.join(dir, entry.name);
  if (entry.isDirectory()) return sourcesIn(file);
  return /\.(ts|tsx|css)$/.test(entry.name) ? [file] : [];
});

const panel = (extra = {}) => renderToString(h(SidePanel, { title: 'Sprites', ...extra }, 'Rows'));
const list = (extra = {}) => renderToString(h(ListDetailLayout, { list: 'rows', detail: 'detail', ...extra }));
const split = (extra = {}) => renderToString(h(SplitPane, { start: 'a', end: 'b', ...extra }));

const edgeOf = (html) => {
  const edge = html.split('class="pane-edge ')[1] ?? '';
  return edge.split('<div id=')[0].replace(/^[^>]*>/, '');
};

const bare = (edge) => edge.replace(/<button [\s\S]*?<\/button>/g, '').replace(/<div class="resize-handle[^>]*><\/div>/, '');

describe('one pane edge implementation', () => {
  it('leaves no trace of the old lines, grips, gutters and rails anywhere under src', () => {
    const old = /resize-handle--(grip|line|ghost)|resize-handle__grip|side-panel__(line|handle)|list-detail-layout__gutter|split-pane__rail/;
    const files = sourcesIn('src');
    expect(files.length).toBeGreaterThan(100);
    files.forEach((file) => expect(sheet(file), file).not.toMatch(old));
  }, 30_000);

  it('deletes the handle of each pane and the share maths of SplitPane', () => {
    ['SidePanel/sub-components/SidePanelHandle', 'ListDetailLayout/sub-components/ListDetailLayoutGutter'].forEach((name) => {
      expect(fs.existsSync(`src/composites/${name}.tsx`), name).toBe(false);
    });
    ['settle-share', 'step-share', 'value-range-of', 'start-share-of', 'hidden-label-of', 'pixels-per-percent', 'split-limits.type', 'split-handle.type'].forEach((name) => {
      expect(fs.existsSync(`src/composites/SplitPane/behavior/${name}.ts`), name).toBe(false);
    });
    expect(fs.existsSync('src/composites/SplitPane/sub-components')).toBe(false);
    expect(fs.existsSync('src/composites/pane-fold')).toBe(false);
    expect(fs.existsSync('src/composites/pane-edge/PaneEdge.tsx')).toBe(true);
  });

  it('has SidePanel, ListDetailLayout and SplitPane each draw one separator, inside the pane edge', () => {
    [panel(), panel({ side: 'end' }), list(), split(), split({ orientation: 'vertical' })].forEach((html) => {
      expect(html.match(/role="separator"/g)).toHaveLength(1);
      expect(html.match(/class="pane-edge /g)).toHaveLength(1);
      const edge = html.split('class="pane-edge ')[1];
      expect(edge.indexOf('role="separator"')).toBeGreaterThan(0);
      expect(edge.slice(0, edge.indexOf('role="separator"'))).not.toContain('<div id=');
    });
  });

  it('keeps the only role separator of the composites in ResizeHandle, and the only edge in PaneEdge', () => {
    const owners = sourcesIn('src/composites').filter((file) => /role=["{']+separator/.test(sheet(file)) && !/DropdownMenu/.test(file));
    expect(owners.map((file) => path.basename(file))).toEqual(['ResizeHandle.tsx']);
    const edges = sourcesIn('src/composites').filter((file) => file.endsWith('.tsx') && sheet(file).includes('<ResizeHandle'));
    expect(edges.map((file) => path.basename(file)).sort()).toEqual(['ColumnResizeHandle.tsx', 'DockDivider.tsx', 'PaneEdge.tsx']);
  });

  it('declares the line of ResizeHandle once, and the vertical one only moves it', () => {
    const css = sheet('src/composites/ResizeHandle/ResizeHandle.css');
    expect(css.match(/^\.resize-handle::after \{/gm)).toHaveLength(1);
    expect(css.match(/content: '';/g)).toHaveLength(1);
    expect(css.match(/inline-size: var\(--border-width-thin\)/g)).toHaveLength(1);
    expect(rule(css, '.resize-handle--vertical::after')).toMatch(/block-size: var\(--border-width-thin\);/);
    expect(rule(css, '.resize-handle--vertical::after')).not.toContain('background');
  });
});

describe('the fold button sits beside the line', () => {
  const lone = (html) => {
    const edge = edgeOf(html);
    expect(edge.match(/<button /g)).toHaveLength(1);
    expect(edge.match(/role="separator"/g)).toHaveLength(1);
    expect(bare(edge)).toMatch(/^(<\/div>)+$/);
    return edge;
  };

  it('makes the toggle and the separator siblings in a start panel, the line first and the button after', () => {
    [panel(), panel({ defaultCollapsed: true })].forEach((html) => {
      expect(lone(html)).toMatch(/^<div class="resize-handle [^"]*"[^>]*role="separator"[^>]*><\/div><button [^>]*pane-edge__toggle pane-edge__toggle--start/);
    });
  });

  it('makes them siblings in an end panel, the button first and the line after', () => {
    [panel({ side: 'end' }), panel({ side: 'end', defaultCollapsed: true })].forEach((html) => {
      expect(lone(html)).toMatch(/^<button [^>]*pane-edge__toggle pane-edge__toggle--end[^>]*>.*<\/button><div class="resize-handle [^"]*"[^>]*role="separator"/);
    });
  });

  it('does the same in ListDetailLayout and SplitPane, with one button per foldable pane', () => {
    expect(lone(list())).toContain('pane-edge__toggle--start');
    const both = edgeOf(list({ detailCollapsible: true }));
    expect(both.match(/<button /g)).toHaveLength(2);
    expect(bare(both)).toMatch(/^(<\/div>)+$/);
    const pair = edgeOf(split());
    expect(pair.match(/<button /g)).toHaveLength(2);
    expect(pair.match(/pane-edge__toggle--(start|end)/g)).toHaveLength(2);
    expect(bare(pair)).toMatch(/^(<\/div>)+$/);
  });

  it('spaces them by a gap token, and never overlaps the line or leaves the flow', () => {
    const edge = sheet('src/composites/pane-edge/PaneEdge.css');
    expect(rule(edge, '.pane-edge')).toContain('--pane-edge-gap: var(--space-xs);');
    expect(rule(edge, '.pane-edge')).toContain('column-gap: var(--pane-edge-gap);');
    expect(edge).not.toMatch(/position:|calc\(-|margin[^;]*: -|translate|inset/);
    ['CollapseToggle/CollapseToggle.css', 'edge-button/EdgeButton.css'].forEach((file) => {
      expect(sheet(`src/composites/${file}`), file).not.toMatch(/position:|calc\(-|margin[^;]*: -/);
    });
    sourcesIn('src/composites').filter((file) => file.endsWith('.css')).forEach((file) => {
      for (const [, selector, body] of sheet(file).matchAll(/([^{}]*pane-edge__toggle[^{}]*)\{([^}]*)\}/g)) {
        expect(body, `${file} ${selector.trim()}`).not.toMatch(/position: (absolute|fixed)|margin[^;]*calc\(-|margin[^;]*: -/);
      }
    });
  });
});

describe('the line is subtle', () => {
  const css = sheet('src/composites/ResizeHandle/ResizeHandle.css');

  it('is a border-strong line at rest, and text-muted on hover, keyboard focus and drag', () => {
    expect(rule(css, '.resize-handle::after')).toContain('background: var(--c-border-strong);');
    const states = /\.resize-handle:hover::after,\n\.resize-handle:focus-visible::after,\n\.resize-handle--dragging::after \{([^}]*)\}/.exec(css)?.[1];
    expect(states).toContain('background: var(--c-text-muted);');
    expect(css.match(/background:/g)).toHaveLength(2);
  });

  it('uses no primary colour, no shadow and no glow', () => {
    expect(css).not.toContain('--c-primary');
    expect(css).not.toContain('box-shadow');
    expect(css).not.toMatch(/blur-glow|glow|filter/);
  });
});
