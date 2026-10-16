/* @layer tooling-scripts @kind test */
import fs from 'node:fs';
import { createElement as h } from 'react';
import { renderToString } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { WindowHeader } from '../src/composites/WindowHeader';
import { WindowTitleBar } from '../src/composites/WindowTitleBar';

const ignore = () => undefined;
const sheet = (file) => fs.readFileSync(file, 'utf8');

describe('window chrome', () => {
  it('turns text selection off, and lets a text input, a text area or editable text take it back', () => {
    const css = sheet('src/theme/window-chrome.css');
    expect(css).toMatch(/\.window-chrome \{\s+user-select: none;\s+\}/);
    expect(css).toMatch(/\.window-chrome :is\(input, textarea, \[contenteditable\]:not\(\[contenteditable='false'\]\)\) \{\s+user-select: text;\s+\}/);
  });

  it('covers the whole title bar, its title, status items, buttons and the drag area', () => {
    const html = renderToString(h(WindowTitleBar, { title: 'Relic of the Past', onControl: ignore }));
    expect(html).toMatch(/^<div class="window-title-bar window-chrome" data-app-region="drag"/);
  });

  it('covers a WindowHeader, so dialog, drawer and screen window headers', () => {
    expect(renderToString(h(WindowHeader, { title: 'Settings', onClose: ignore }))).toMatch(/^<div class="window-header window-chrome"/);
    expect(renderToString(h(WindowHeader, { title: 'Settings', className: 'dialog__header' }))).toMatch(/^<div class="window-header dialog__header window-chrome"/);
  });

  it('is the one rule every part of the window chrome draws on', () => {
    const parts = [
      ['src/composites/WindowTitleBar/WindowTitleBar.tsx', null],
      ['src/composites/WindowHeader/WindowHeader.tsx', null],
      ['src/composites/Widget/sub-components/WidgetTitlebar.tsx', 'className="widget__titlebar window-chrome"'],
      ['src/composites/DropdownMenu/sub-components/MenuPanel.tsx', 'className="dropdown__menu window-chrome"'],
    ];
    parts.forEach(([file, marker]) => {
      const source = sheet(file);
      expect(source, file).toContain("theme/window-chrome.css';");
      if (marker) expect(source, file).toContain(marker);
    });
    expect(sheet('src/composites/Widget/Widget.css')).not.toContain('user-select');
    expect(sheet('src/composites/WindowTitleBar/WindowTitleBar.css')).not.toContain('user-select');
  });
});
