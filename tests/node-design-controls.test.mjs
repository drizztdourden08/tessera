/* @layer tooling-scripts @kind test */
import { readFileSync } from 'node:fs';
import { createElement as h } from 'react';
import { renderToString } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { DropdownMenu } from '../src/composites/DropdownMenu';
import { ITEM_ROLES } from '../src/composites/DropdownMenu/behavior/item-role.constants';
import { MENU_ITEM_SELECTOR } from '../src/composites/DropdownMenu/behavior/menu-items-of.constants';
import { Markdown } from '../src/composites/Markdown';
import { Disclosure } from '../src/primitives/Disclosure';
import { Tabs } from '../src/primitives/Tabs';
import { Tag } from '../src/primitives/Tag';
import { TagPicker } from '../src/primitives/TagPicker';
import { Text } from '../src/primitives/Text';

const read = (path) => readFileSync(new URL(`../${path}`, import.meta.url), 'utf8');
const escape = (text) => text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
const rule = (css, selector) => css.match(new RegExp(`${escape(selector)} \\{([^}]*)\\}`))?.[1] ?? '';
const noop = () => undefined;

describe('a select row in a menu', () => {
  const options = [{ value: 'todo', label: 'To do' }, { value: 'done', label: 'Done' }];
  const groups = [{
    id: 'card',
    items: [
      { id: 'status', label: 'Status', kind: 'select', options, selected: 'done', onPick: noop },
      { id: 'edit', label: 'Edit', onSelect: noop },
    ],
  }];
  const html = renderToString(h(DropdownMenu, { inline: true, groups }));

  it('draws the label and a Select beside a normal action row', () => {
    expect(html).toContain('class="dropdown__item dropdown__select"');
    expect(html).toContain('role="combobox"');
    expect(html).toContain('aria-label="Status"');
    expect(html).toContain('Done');
    expect(html).toContain('role="menuitem"');
    expect(ITEM_ROLES.select).toBe('menuitem');
  });

  it('lets the menu arrows reach the select trigger', () => {
    expect(MENU_ITEM_SELECTOR).toBe('[role^="menuitem"], .dropdown__slider .slider__input, .dropdown__select .select-trigger');
  });

  it('never closes the menu on a pick, hands closed keys to the menu and leaves open keys to the select', () => {
    const item = read('src/composites/DropdownMenu/sub-components/MenuSelectItem.tsx');
    expect(item).not.toContain('MenuContext');
    expect(item).toContain("getAttribute('aria-expanded') === 'false'");
    expect(item).toContain('onKeyDownCapture={walkMenu}');
    expect(read('src/composites/DropdownMenu/sub-components/MenuPanel.tsx')).toContain('<MenuKeysContext value={onKeyDown}>');
    expect(read('src/composites/DropdownMenu/behavior/useMenuKeys.ts')).toContain('inOpenSelect(event.target)');
  });
});

describe('Markdown linkTone', () => {
  const draw = (props) => renderToString(h(Markdown, { source: 'See [the notes](https://example.com).', ...props }));

  it('keeps the link accent unless a tone is asked', () => {
    expect(draw({})).toContain('data-tone="primary"');
    expect(draw({ linkTone: 'neutral' })).toContain('data-tone="neutral"');
    expect(draw({ linkTone: 'neutral' })).not.toContain('linktone');
  });

  it('applies to links made from ids', () => {
    const out = draw({ source: 'Fixed T-5.', linkIds: { pattern: /T-\d+/, href: (id) => `/${id}` }, onLink: noop, linkTone: 'neutral' });
    expect(out).toContain('data-tone="neutral"');
  });
});

describe('Link tone info', () => {
  it('underlines at rest in the info colour from the existing tokens', () => {
    const css = read('src/primitives/Link/Link.css');
    const body = rule(css, ':where(.link[data-tone="info"])');
    expect(body).toContain('--link-ink: var(--c-info-bright)');
    expect(body).toContain('text-decoration: underline');
  });
});

describe('DataTable edge row state', () => {
  it('draws only the left bar, with no tint', () => {
    const css = read('src/composites/DataTable/DataTable.css');
    const body = rule(css, ".data-table__row[data-state='edge']:not([data-drop])");
    expect(body).toContain('box-shadow: inset var(--size-2) 0 0 0 var(--c-primary)');
    expect(rule(css, ".data-table__row[data-state='edge']")).toBe('');
    expect(read('src/composites/DataTable/DataTable.type.ts')).toMatch(/type RowState = [^;]*'edge'/);
  });
});

describe('Disclosure wrapEnd', () => {
  const draw = (props) => renderToString(h(Disclosure, { summary: 'Players', ...props }, 'Body'));
  const end = h('span', null, 'Add');

  it('keeps the row as it is unless wrapEnd is asked with an end slot', () => {
    expect(draw({ end })).not.toContain('disclosure--wrap-end');
    expect(draw({ wrapEnd: true })).not.toContain('disclosure--wrap-end');
    expect(draw({ end, wrapEnd: true })).toContain('disclosure--wrap-end');
  });

  it('breaks at the pixel width of the disclosure-wrap token', () => {
    expect(read('src/tokens/size.css')).toContain('--disclosure-wrap: var(--size-384)');
    expect(read('src/tokens/scale.css')).toContain('--size-384:  384px');
    const css = read('src/primitives/Disclosure/Disclosure.css');
    expect([...css.matchAll(/@container disclosure \(width < (\d+)px\)/g)].map((m) => m[1])).toEqual(['384']);
  });
});

describe('Tabs selectedTone', () => {
  const tabs = [{ id: 'a', label: 'A' }];
  const draw = (props) => renderToString(h(Tabs, { tabs, activeTab: 'a', onTabChange: noop, ...props }));

  it('keeps the accent label unless neutral is asked', () => {
    expect(draw({})).not.toContain('tabs--neutral');
    expect(draw({ selectedTone: 'accent' })).not.toContain('tabs--neutral');
    expect(draw({ selectedTone: 'neutral', size: 'lg' })).toContain('tabs tabs--lg tabs--neutral');
    expect(rule(read('src/primitives/Tabs/Tabs.css'), '.tabs--neutral .tabs__tab--active')).toContain('color: var(--c-text)');
  });
});

describe('TagPicker pill', () => {
  const groups = [{ id: 'g', options: [{ value: 'a', label: 'A' }] }];
  const draw = (props) => renderToString(h(TagPicker, { value: [], groups, onChange: noop, ...props }));

  it('rounds the chips only when asked', () => {
    expect(draw({})).not.toContain('tag--pill');
    expect(draw({ pill: true })).toContain('tag--pill');
  });
});

describe('Tag size', () => {
  it('is 24 px tall only with lg and does not leak to the page', () => {
    expect(renderToString(h(Tag, {}, 'Plain'))).not.toContain('tag--lg');
    const out = renderToString(h(Tag, { size: 'lg' }, 'Big'));
    expect(out).toContain('tag--lg');
    expect(out).not.toContain('size=');
    expect(rule(read('src/primitives/Tag/Tag.css'), '.tag.tag--lg')).toContain('height: var(--size-24)');
  });
});

describe('Text size', () => {
  it('sets the 13 px step from the text-md token only when asked', () => {
    expect(renderToString(h(Text, { variant: 'body' }, 'Hi'))).not.toContain('text--md');
    expect(renderToString(h(Text, { variant: 'body', size: 'md' }, 'Hi'))).toContain('text text--body text--md');
    expect(rule(read('src/primitives/Text/Text.css'), '.text--md')).toContain('font-size: var(--text-md)');
    expect(read('src/tokens/typography.css')).toContain('--text-md:    var(--size-13)');
  });
});
