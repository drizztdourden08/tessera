/* @layer tooling-scripts @kind test */
import { createElement as h } from 'react';
import { renderToString } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { SegmentedControl } from '../src/primitives/SegmentedControl';
import { ToggleGroup } from '../src/primitives/ToggleGroup';
import { TooltipContent } from '../src/primitives/Tooltip';

const HINT = { label: 'Align left', description: 'Aligns to the left edge.' };
const TIP = { description: 'Pins the text left.', shortcut: 'Mod+L' };
const segments = (options) => renderToString(h(SegmentedControl, { value: 'a', options, onChange: () => undefined }));
const toggles = (options) => renderToString(h(ToggleGroup, { value: [], options, onChange: () => undefined }));

describe('SegmentedControl option tooltip', () => {
  it('wraps an option that has a tooltip, and drops its native title', () => {
    const html = segments([{ value: 'a', icon: 'chevron-left', hint: HINT, title: 'Left', tooltip: TIP }]);
    expect(html).toContain('tooltip-anchor option-tip');
    expect(html).not.toContain('title="Left"');
    expect(html).toContain('aria-label="Left"');
  });

  it('leaves an option without a tooltip alone, and keeps its title', () => {
    const html = segments([{ value: 'a', icon: 'chevron-left', hint: HINT, title: 'Left' }]);
    expect(html).not.toContain('option-tip');
    expect(html).toContain('title="Left"');
  });

  it('shows the reason of a disabled option instead of the tooltip', () => {
    const html = segments([{ value: 'a', label: 'One', tooltip: TIP, disabled: 'Not here.' }]);
    expect(html).toContain('reason-tip');
    expect(html).not.toContain('option-tip');
  });
});

describe('ToggleGroup option tooltip', () => {
  it('wraps only the options that carry a tooltip', () => {
    const html = toggles([{ value: 'a', label: 'Grid', tooltip: TIP }, { value: 'b', label: 'Doors' }]);
    expect(html.match(/option-tip/g)).toHaveLength(1);
  });
});

describe('TooltipContent', () => {
  it('draws the name, the description and the shortcut keys', () => {
    const html = renderToString(h(TooltipContent, { name: 'Align left', ...TIP }));
    expect(html).toContain('<strong');
    expect(html).toContain('Align left');
    expect(html).toContain('Pins the text left.');
    expect(html).toContain('<kbd');
  });

  it('draws only the name when there is nothing else', () => {
    const html = renderToString(h(TooltipContent, { name: 'Grid' }));
    expect(html).not.toContain('<kbd');
    expect(html).not.toContain('<small');
  });
});
