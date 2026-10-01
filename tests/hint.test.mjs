/* @layer tooling-scripts @kind test */
import { createElement as h } from 'react';
import { renderToString } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { HintLine } from '../src/primitives/HintLine';
import { HintScope } from '../src/primitives/HintScope';
import { IconButton } from '../src/primitives/IconButton';
import { SegmentedControl } from '../src/primitives/SegmentedControl';
import { Shortcut } from '../src/primitives/Shortcut';
import { Slider } from '../src/primitives/Slider';
import { Toggle } from '../src/primitives/Toggle';
import { nextHintEntries } from '../src/primitives/hint/next-hint-entries';

const LEFT = { label: 'Dock left', description: 'Takes the left edge of the app' };
const FLOAT = { label: 'Float', description: 'Hovers over the main view' };
const noop = () => undefined;

describe('nextHintEntries', () => {
  it('keeps one entry per source, newest last, and drops a cleared source', () => {
    const one = nextHintEntries([], 'a', LEFT);
    const two = nextHintEntries(one, 'b', FLOAT);
    expect(two.map((entry) => entry.source)).toEqual(['a', 'b']);
    expect(nextHintEntries(two, 'a', LEFT).map((entry) => entry.source)).toEqual(['b', 'a']);
    expect(nextHintEntries(two, 'b', null)).toEqual([{ source: 'a', hint: LEFT }]);
  });
});

describe('HintLine', () => {
  it('shows the idle line, then a given hint as value and muted description, as a polite live region', () => {
    const idle = renderToString(h(HintLine, { hint: null }));
    expect(idle).toContain('aria-live="polite"');
    expect(idle).toContain('Point at an option to see what it does');
    const given = renderToString(h(HintLine, { hint: LEFT, lines: 1 }));
    expect(given).toContain('hint-line--1');
    expect(given).toContain('hint-line__label');
    expect(given).toContain('Takes the left edge of the app');
  });

  it('reads the scope it sits in, idle until something reports', () => {
    const html = renderToString(h(HintScope, null, h(HintLine, { idle: 'Nothing yet' })));
    expect(html).toContain('Nothing yet');
  });
});

describe('xs sizes', () => {
  it('draws an icon-only segment named by its hint', () => {
    const options = [{ value: 'left', icon: 'panel-left', hint: LEFT }, { value: 'float', icon: 'picture-in-picture-2', hint: FLOAT }];
    const html = renderToString(h(SegmentedControl, { value: 'left', options, onChange: noop, size: 'xs', 'aria-label': 'Placement' }));
    expect(html).toContain('segmented--xs');
    expect(html).toContain('aria-label="Placement"');
    expect(html).toContain('aria-label="Dock left"');
    expect(html).toContain('<svg');
  });

  it('gives IconButton, Toggle, Slider and Shortcut an xs class', () => {
    expect(renderToString(h(IconButton, { label: 'Reset', size: 'xs', hint: LEFT }, 'x'))).toContain('icon-btn--xs');
    expect(renderToString(h(Toggle, { checked: true, onChange: noop, size: 'xs', hint: LEFT }))).toContain('toggle--xs');
    expect(renderToString(h(Slider, { value: 5, min: 0, max: 10, onChange: noop, size: 'xs', hint: LEFT }))).toContain('slider--xs');
    expect(renderToString(h(Shortcut, { keys: 'esc', size: 'xs' }))).toContain('shortcut--xs');
    expect(renderToString(h(Shortcut, { keys: 'esc' }))).not.toContain('shortcut--md');
  });
});
