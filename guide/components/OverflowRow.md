# OverflowRow

One row of any nodes that never wraps: when the width runs out, the least important ones fold into a popover behind a More button.

Import it from `@drizztdourden08/tessera`. It is also exported from `@drizztdourden08/tessera/composites`.

```tsx
import { OverflowRow } from '@drizztdourden08/tessera';
```

The source is `src/composites/OverflowRow/OverflowRow.tsx`. Its gallery page is Composites · Actions/OverflowRow (`#/story/composites-overflowrow--overview`).

## Where the questions lead here

What are you placing? Actions. One action, or several related buttons? Several related buttons. How do the buttons relate? Any nodes in one row, folding into a popover when narrow.

OverflowRow keeps mixed nodes on one line and folds the lowest priority ones into a popover, never moving what stays.

## Use it when

- A board or page header holds a name, a chip, a few facts and some icon buttons that must stay on one line at any width.
- The items are different kinds of nodes, not only actions, and some matter more than others.

## Use something else when

- Every item is an action on one record, with a primary action and a confirm step. Use [ActionBar](ActionBar.md) instead.
- The items are tools in groups that need hints and side menus. Use [Toolbar](Toolbar.md) instead.
- The items are choices in a menu, not always visible. Use [DropdownMenu](DropdownMenu.md) instead.

## Rules

- List the items in the order the user reads them; folding never reorders the ones that stay.
- Give each item a stable id; the id decides what is folded.
- Give a higher priority to what must stay longer; the lowest priority unpinned item folds first, and the later one on a tie.
- Set pinned on what must always show, such as the name and the settings button.
- Set end on an item to push it and every later item to the far right of the row; the More button stays before them and the fold still counts them.
- Give node as a function of { tight } when a pinned item must shrink: tight is true only when the pinned items alone overflow, after every unpinned item is folded. The hidden measure copy and the menu always get tight false.
- Set shrink on a pinned item that scrolls itself, such as Tabs: when even tight is too wide, it narrows and scrolls sideways so end items stay in the row.
- Set menuNode when an item needs another look inside the popover, such as a label next to an icon button; it defaults to node.
- Set moreLabel only when the default More does not fit the screen.

## Accessibility

- The More button is an icon button with an accessible name, and it shows only when something is folded.
- The popover closes with Escape or a press outside, and focus goes back to the More button.
- The hidden copies used to measure the row are inert and out of the Tab order.

## Example

```tsx
import { OverflowRow } from '@drizztdourden08/tessera';
import type { OverflowRowItem, TabItem } from '@drizztdourden08/tessera';
import { Icon, IconButton, Tabs, Tag, Text } from '@drizztdourden08/tessera';

interface BoardHeaderProps {
  name: string;
  players: number;
  tabs: TabItem[];
  tab: string;
  onTab: (id: string) => void;
  onSettings: () => void;
}

const BoardHeader = ({ name, players, tabs, tab, onTab, onSettings }: BoardHeaderProps) => {
  const items: OverflowRowItem[] = [
    { id: 'name', pinned: true, node: <Text as="span" variant="title">{name}</Text> },
    { id: 'tabs', pinned: true, shrink: true, node: ({ tight }) => <Tabs tabs={tabs} activeTab={tab} onTabChange={onTab} iconOnly={tight} /> },
    { id: 'status', priority: 5, node: <Tag variant="urgency" color="success">Running</Tag> },
    { id: 'players', priority: 3, node: <Text as="span" variant="caption">{`${players} players`}</Text> },
    { id: 'settings', pinned: true, end: true, node: <IconButton label="Settings" onClick={onSettings}><Icon name="settings" /></IconButton> },
  ];
  return <OverflowRow items={items} />;
};
```

## Props

- `items`: `readonly OverflowRowItem[]`.
- `moreLabel` (optional): `string`.
- `className` (optional): `string`.

## Tokens

It draws on `--border-width-thin`, `--c-border`, `--c-surface`, `--radius-md`, `--shadow-dropdown`, `--size-160`, `--size-448`, `--space-xs`, `--z-modal`.
