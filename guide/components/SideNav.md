# SideNav

The side list of a window with several sections: a column of icons that a chevron on its edge opens to show the labels.

Import it from `@drizztdourden08/tessera`. It is also exported from `@drizztdourden08/tessera/composites`.

```tsx
import { SideNav } from '@drizztdourden08/tessera';
```

The source is `src/composites/SideNav/SideNav.tsx`. Its gallery page is Composites · Navigation/SideNav (`#/story/composites-sidenav--overview`).

## Where the questions lead here

What are you placing? Navigation. Where does the user go? Between pages, from a side list.

SideNav is the one side list of a window: icons that open to labels, a top block with Home and pages, then labelled groups.

## Use it when

- A window has several top-level sections and the user moves between them from a side list.
- The list needs a top block with Home and a few pages under it, then labelled groups below.

## Use something else when

- The nav sits beside a content pane that shows the page and the search results. Use `SideNavLayout` instead.
- A side panel with a heading folds beside the main view. Use [SidePanel](SidePanel.md) instead.
- The pages are chosen from the header of a site. Use [SiteHeader](SiteHeader.md) instead.

## Rules

- Pass config with groups, each with an id, an optional label and its items; an item has an id, a label and an icon.
- Pass config.home for the Home row at the very top.
- Pass config.top for more top-level pages under Home, in the same top block: no heading, and one divider after the whole block.
- The top block is the search field, then Home, then the top pages; nothing else is drawn between them.
- Leave the label of a group out for a group with no heading and no gap; prefer config.top for pages that belong under Home.
- Pass activeId and onSelect; the host owns the active page.
- Pass badge on an item for a count pill, which shows as a dot over the icon when the nav is collapsed.
- Pass search to add a field that grows when the nav opens; the host owns the query and shows the results.
- Pass defaultOpen, open with onOpenChange, or storageKey to set and keep the choice; overlay slides the open nav over the content.
- Pass variant="rail" for the screen list of an app, flush on the window edge.

## Accessibility

- It is a nav named by ariaLabel, and each group is a group named by its label; a group with no label has no name.
- The edge toggle says Show or Hide the navigation pane and reports aria-expanded.
- The active item reports aria-current; a disabled item stays in the list but takes no click.

## Example

```tsx
import { useState } from 'react';
import { Icon, SideNav } from '@drizztdourden08/tessera';

const HOME = { id: 'home', label: 'Home', icon: <Icon name="menu" /> };
const PAGES = [{ id: 'inbox', label: 'Inbox', icon: <Icon name="list" /> }];
const GROUPS = [{ id: 'play', label: 'Play', items: [{ id: 'sessions', label: 'Sessions', icon: <Icon name="map" /> }] }];

const AppNav = () => {
  const [active, setActive] = useState('home');
  return <SideNav config={{ home: HOME, top: PAGES, groups: GROUPS }} activeId={active} onSelect={setActive} />;
};
```

## Props

- `config`: `SideNavConfig`.
- `activeId`: `string`.
- `onSelect`: `(id: string) => void`.
- `search` (optional): `SideNavSearch`.
- `defaultOpen` (optional): `boolean`. Default `false`.
- `open` (optional): `boolean`.
- `onOpenChange` (optional): `(open: boolean) => void`.
- `storageKey` (optional): `string`.
- `variant` (optional): `SideNavVariant`, one of `'panel'`, `'rail'`. Default `'panel'`.
- `collapsed` (optional): `boolean`. Default `false`.
- `overlay` (optional): `boolean`. Default `false`.
- `ariaLabel` (optional): `string`.
- `className` (optional): `string`. Default `''`.

## Tokens

It draws on `--blur`, `--blur-glow`, `--border-width-thick`, `--border-width-thin`, `--c-border`, `--c-focus`, `--c-glass`, `--c-hover`, `--c-panel`, `--c-primary`, `--c-primary-bright`, `--c-primary-soft`, `--c-sunken`, `--c-surface`, `--c-text-dim`, `--c-text-muted`, `--collapse-toggle-d`, `--leading-normal`, `--opacity-disabled`, `--radius-lg`, `--radius-md`, `--radius-xl`, `--scrollbar-slim-rest`, `--shadow-lg`, `--side-nav-item-h`, `--side-nav-w`, `--side-nav-w-open`, `--size-4`, `--size-6`, `--space-2xs`, `--space-md`, `--space-sm`, `--space-xs`, `--text-base`, `--text-xl`, `--text-xs`, `--tracking-caps`, `--transition-fast`, `--transition-normal`, `--weight-semi`, `--z-base`, `--z-popover`.
