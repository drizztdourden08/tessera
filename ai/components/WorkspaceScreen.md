# WorkspaceScreen

A screen to work in: a side list of pages beside the current page, with its header pills and a body that scrolls.

Import it from `@drizztdourden08/tessera`. It is also exported from `@drizztdourden08/tessera/composites`.

```tsx
import { WorkspaceScreen } from '@drizztdourden08/tessera';
```

The source is `src/composites/WorkspaceScreen/WorkspaceScreen.tsx`. Its gallery page is Composites · Screens/WorkspaceScreen (`#/story/composites-workspacescreen--overview`).

## Where the questions lead here

What are you placing? A full screen view. What is the screen for? Working across pages, picked from a side list.

A side list of pages beside the current page.

## Use it when

- A settings hub, a profile hub or a data manager with several pages.
- The user moves between pages and changes things on them.

## Use something else when

- The screen is read and holds no settings, such as About or credits. Use [InfoScreen](InfoScreen.md) instead.
- The screen runs one short task with a status, such as an update check. Use [UtilityScreen](UtilityScreen.md) instead.
- The screen is one big surface with no pages, such as calibration. Use [StageScreen](StageScreen.md) instead.
- The side list and the page sit inside an app frame, not over it. Use `NavLayout` instead.

## Rules

- The host owns the active page: swap page and children when nav.onSelect fires.
- Set page.anchors for one long page, or page.tabs for views of one area, never both.
- Give the nav a search and set results to search every page; use filterable only to narrow the side list by label.
- Use the floating slot for a switch between sibling workspaces, and hidden to keep the screen mounted while it is closed.

## Accessibility

- The card is a modal dialog named by the title, and each page is a section named by its title.
- The side list is a navigation landmark; set nav.ariaLabel when the screen holds more than one.
- Escape clears a filled search before it reaches the screen.

## Example

```tsx
import { Icon, SettingsGroupList, WorkspaceScreen } from '@drizztdourden08/tessera';
import type { SettingsGroupListSection, SideNavConfig } from '@drizztdourden08/tessera';

interface HubProps {
  config: SideNavConfig;
  active: string;
  onSelect: (id: string) => void;
  sections: SettingsGroupListSection[];
  onClose: () => void;
}

const SettingsHub = ({ config, active, onSelect, sections, onClose }: HubProps) => (
  <WorkspaceScreen
    title="Settings"
    onClose={onClose}
    nav={{ config, activeId: active, onSelect, defaultOpen: true }}
    page={{ icon: <Icon name="settings" />, title: 'General' }}
  >
    <SettingsGroupList sections={sections} />
  </WorkspaceScreen>
);
```

## Props

- `title`: `ReactNode`.
- `onClose`: `() => void`.
- `nav`: `SideNavProps`.
- `page`: `WorkspaceScreenPage`.
- `children`: `ReactNode`.
- `subtitle` (optional): `ReactNode`.
- `extra` (optional): `ReactNode`.
- `floating` (optional): `ReactNode`.
- `hidden` (optional): `boolean`.
- `results` (optional): `ReactNode`.
- `filterable` (optional): `boolean`.
- `filterPlaceholder` (optional): `string`.
- `compact` (optional): `boolean`.
- `className` (optional): `string`. Default `''`.
