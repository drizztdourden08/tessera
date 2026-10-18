/* @layer tooling-scripts @kind test */
import fs from 'node:fs';
import { createElement as h } from 'react';
import { renderToString } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { Box } from '../src/primitives/Box';
import { PressedGrid } from '../src/composites/PressedGrid';

const sheet = (file) => fs.readFileSync(file, 'utf8');
const ruleOf = (css, selector) => {
  const start = css.indexOf(`${selector} {`);
  return start < 0 ? '' : css.slice(start, css.indexOf('}', start));
};

describe('Box surface', () => {
  it('adds no class without a surface and keeps the class it is given', () => {
    expect(renderToString(h(Box, null, 'Plain'))).toBe('<div>Plain</div>');
    expect(renderToString(h(Box, { className: 'mine' }, 'Plain'))).toBe('<div class="mine">Plain</div>');
  });

  it('puts the surface class first, before the class it is given', () => {
    expect(renderToString(h(Box, { surface: 'sunken' }, 'Well'))).toBe('<div class="box--sunken">Well</div>');
    expect(renderToString(h(Box, { as: 'aside', surface: 'raised', className: 'panel' }, 'Panel'))).toBe('<aside class="box--raised panel">Panel</aside>');
  });

  it('paints the fill, the edge and the corner at zero specificity, so any class of the part wins', () => {
    const css = sheet('src/primitives/Box/Box.css');
    expect(css).toMatch(/:where\(\.box--sunken\) \{\s+border: var\(--border-width-thin\) solid var\(--c-border\);\s+border-radius: var\(--radius-md\);\s+background: var\(--c-sunken\);\s+\}/);
    expect(css).toMatch(/:where\(\.box--raised\) \{\s+border: var\(--border-width-thin\) solid var\(--c-border\);\s+border-radius: var\(--radius-lg\);\s+background: var\(--c-surface\);\s+box-shadow: var\(--shadow-1\);\s+\}/);
    expect(css).not.toMatch(/padding/);
  });
});

describe('parts drawn on a Box surface', () => {
  it('a PressedGrid cell is a sunken Box', () => {
    const html = renderToString(h(PressedGrid, { items: [{ id: 'a', label: 'A' }], pressed: [] }));
    expect(html).toContain('class="box--sunken pressed-grid__cell"');
  });

  it('their own rules no longer copy the sunken fill or the raised look', () => {
    const moved = [
      ['src/composites/CodeBlock/CodeBlock.css', '.code-block-editor'],
      ['src/primitives/code-view/CodeView.css', '.code-block'],
      ['src/composites/ColorPicker/ColorPicker.css', '.color-picker__hex-box'],
      ['src/composites/ColorPicker/ColorPicker.css', '.color-picker__quick-assign'],
      ['src/composites/PressedGrid/PressedGrid.css', '.pressed-grid__cell'],
      ['src/theme/record-editor.css', '.record-editor__array-item'],
      ['src/theme/record-editor.css', '.record-editor__fallback'],
      ['src/composites/ListDetailLayout/ListDetailLayout.css', '.list-detail-layout__list'],
      ['src/composites/ShortcutTour/ShortcutTour.css', '.shortcut-tour'],
    ];
    moved.forEach(([file, selector]) => {
      const rule = ruleOf(sheet(file), selector);
      expect(rule, `${selector} in ${file}`).not.toBe('');
      expect(rule, `${selector} in ${file}`).not.toMatch(/background: var\(--c-(sunken|surface)\)|border: var\(--border-width-thin\)|box-shadow: var\(--shadow-1\)/);
    });
  });

  it('each of them asks for its surface', () => {
    const asks = [
      ['src/composites/CodeBlock/sub-components/CodeEditor.tsx', 'sunken'],
      ['src/primitives/code-view/CodeView.tsx', 'sunken'],
      ['src/composites/ColorPicker/sub-components/ColorFields.tsx', 'sunken'],
      ['src/composites/ColorPicker/sub-components/QuickAssign.tsx', 'sunken'],
      ['src/composites/RecordEditor/sub-components/EditorNest.tsx', 'sunken'],
      ['src/composites/RecordEditor/sub-components/ArrayItemFrame.tsx', 'sunken'],
      ['src/composites/ShortcutTour/ShortcutTour.tsx', 'raised'],
    ];
    asks.forEach(([file, surface]) => expect(sheet(file), file).toContain(`surface="${surface}"`));
    expect(sheet('src/composites/ListDetailLayout/ListDetailLayout.tsx')).toContain("surface={listFold.collapsed ? undefined : 'sunken'}");
  });
});
