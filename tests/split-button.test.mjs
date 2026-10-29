/* @layer tooling-scripts @kind test */
import { createElement as h } from 'react';
import { renderToString } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { SplitButton } from '../src/composites/SplitButton';
import { chevronSizeOf } from '../src/composites/SplitButton/behavior/chevron-size-of';

const ignore = () => undefined;
const ITEMS = [{ id: 'folder', label: 'New folder', onSelect: ignore }];
const draw = (props = {}) => renderToString(h(SplitButton, { label: 'New file', items: ITEMS, onClick: ignore, ...props }));

describe('SplitButton', () => {
  it('joins the main button and the chevron in one named group', () => {
    const html = draw();
    expect(html).toMatch(/role="group"[^>]*aria-label="New file"/);
    expect(html).toContain('split-button__main');
    expect(html).toContain('split-button__chevron');
    expect(html.match(/<button/g)).toHaveLength(2);
    expect(html).toContain('New file</span></button>');
  });

  it('names the chevron Options by default and by menuLabel when given', () => {
    expect(draw()).toMatch(/aria-label="Options"/);
    expect(draw({ menuLabel: 'New options' })).toMatch(/aria-label="New options"/);
  });

  it('marks the chevron as a menu button that starts closed', () => {
    const html = draw();
    expect(html).toContain('aria-haspopup="menu"');
    expect(html).toContain('aria-expanded="false"');
    expect(html).not.toContain('dropdown-menu');
  });

  it('is a plain action without pressed, and a toggle with it', () => {
    expect(draw()).not.toContain('aria-pressed');
    expect(draw({ pressed: false })).toContain('aria-pressed="false"');
    const on = draw({ pressed: true });
    expect(on).toContain('aria-pressed="true"');
    expect(on).toContain('btn--active');
  });

  it('disables both buttons', () => {
    expect(draw({ disabled: true }).match(/disabled=""/g)).toHaveLength(2);
  });

  it('gives the chevron a size to match the button', () => {
    expect(chevronSizeOf('xs')).toBe('xs');
    expect(chevronSizeOf('sm')).toBe('sm');
    expect(chevronSizeOf('md')).toBe('md');
    expect(chevronSizeOf('lg')).toBe('md');
  });
});
