/* @layer tooling-scripts @kind test */
import { createElement as h } from 'react';
import { renderToString } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { ICONS } from '../src/primitives/Icon/Icon.constants';
import { DropdownMenu } from '../src/composites/DropdownMenu';
import { SegmentedControl } from '../src/primitives/SegmentedControl';
import { Tabs } from '../src/primitives/Tabs';
import { Tag } from '../src/primitives/Tag';

const noop = () => undefined;

describe('Tabs size', () => {
  const tabs = [{ id: 'a', label: 'A' }];
  const draw = (props) => renderToString(h(Tabs, { tabs, activeTab: 'a', onTabChange: noop, ...props }));

  it('keeps the default look unless lg is asked', () => {
    expect(draw({})).not.toContain('tabs--lg');
    expect(draw({ size: 'md' })).not.toContain('tabs--lg');
    expect(draw({ size: 'lg' })).toContain('tabs tabs--lg');
  });
});

describe('selectedTone', () => {
  const options = [{ value: 'a', label: 'A' }, { value: 'b', label: 'B' }];
  const segmented = (props) => renderToString(h(SegmentedControl, { value: 'a', options, onChange: noop, ...props }));
  const tag = (props) => renderToString(h(Tag, { selected: true, onSelect: noop, ...props }, 'Pick'));

  it('is the accent look unless neutral is asked', () => {
    expect(segmented({})).not.toContain('segmented--neutral');
    expect(segmented({ selectedTone: 'accent' })).not.toContain('segmented--neutral');
    expect(tag({})).not.toContain('tag--selected-neutral');
  });

  it('marks a neutral segmented control and a neutral selected tag', () => {
    expect(segmented({ selectedTone: 'neutral' })).toContain('segmented--neutral');
    expect(tag({ selectedTone: 'neutral' })).toContain('tag--selected-neutral');
  });

  it('does not mark an unselected tag', () => {
    expect(tag({ selected: false, selectedTone: 'neutral' })).not.toContain('tag--selected-neutral');
  });

  it('does not leak the prop to the page', () => {
    expect(tag({ selectedTone: 'neutral' })).not.toContain('selectedtone');
  });
});

describe('Tag outlined', () => {
  it('adds the outlined class only when asked and keeps pill and icon', () => {
    expect(renderToString(h(Tag, {}, 'Plain'))).not.toContain('tag--outlined');
    const out = renderToString(h(Tag, { outlined: true, pill: true, icon: 'flask' }, 'Lab'));
    expect(out).toContain('tag--outlined');
    expect(out).toContain('tag--pill');
    expect(out).toContain('<svg');
    expect(out).not.toContain('outlined="');
  });
});

describe('DropdownMenu itemSize', () => {
  const groups = [{ id: 'g', items: [{ id: 'one', label: 'One', onSelect: noop }] }];
  const draw = (props) => renderToString(h(DropdownMenu, { groups, inline: true, ...props }));

  it('keeps the compact rows unless roomy is asked', () => {
    expect(draw({})).not.toContain('dropdown-look--roomy');
    expect(draw({ itemSize: 'roomy' })).toContain('dropdown-look--roomy');
  });
});

describe('the book icon', () => {
  it('sits in the set beside robot and flask', () => {
    expect(ICONS.book).toBeDefined();
    expect(ICONS.book).not.toBe(ICONS.robot);
    expect(ICONS.flask).toBeDefined();
  });
});
