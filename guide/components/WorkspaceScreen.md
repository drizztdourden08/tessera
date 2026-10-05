# WorkspaceScreen

A screen to work in, built from one content object: a side nav of pages, the current page under a header that compacts as it scrolls, and a search over every setting.

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
- The side nav and the page sit inside an app frame, not over it. Use `SideNavLayout` instead.

## Rules

- Describe every page in content: its id, title and icon, and either sections of SettingsRow data or content of its own.
- Every page shows the page header with its icon and title, and nothing turns it off. A screen without it is a custom screen built from ScreenWindow.
- The nav, the header pills, the rows and the search all come from content; never build them by hand beside it.
- Give options a hint, toggles hints for on and off and sliders hintOf, so the live hint says what each value does.
- Pass activeId and onActiveChange, or search.query and search.onQueryChange, only when the host must own them.
- Use the floating slot for a switch between sibling workspaces, and hidden to keep the screen mounted while it is closed.
- The screen follows the room it has, not the viewport: under 640 px the side nav turns into a bar with a menu, and each page header moves its tabs under the title when they no longer fit.

## Accessibility

- The card is a modal dialog named by the title, and each page is a section named by its title.
- The side nav is a navigation landmark, and every row input is named by its row title.
- Escape clears a filled search before it reaches the screen.

## Example

```tsx
import { Icon, WorkspaceScreen } from '@drizztdourden08/tessera';
import type { WorkspaceContent } from '@drizztdourden08/tessera';

interface HubProps {
  volume: number;
  setVolume: (value: number) => void;
  onClose: () => void;
}

const SettingsHub = ({ volume, setVolume, onClose }: HubProps) => {
  const content: WorkspaceContent = {
    groups: [{
      id: 'app',
      label: 'App',
      pages: [{
        id: 'audio',
        title: 'Audio',
        icon: <Icon name="volume-2" />,
        sections: [{
          id: 'output',
          title: 'Output',
          rows: [{ id: 'volume', title: 'Master volume', description: 'The loudness of every sound.', hint: 'Drag or use the arrow keys.', input: { kind: 'slider', value: volume, onChange: setVolume, min: 0, max: 100 } }],
        }],
      }],
    }],
  };
  return <WorkspaceScreen title="Settings" onClose={onClose} content={content} />;
};
```

## Props

- `title`: `ReactNode`.
- `onClose`: `() => void`.
- `content`: `WorkspaceContent`.
- `activeId` (optional): `string`.
- `defaultActiveId` (optional): `string`.
- `onActiveChange` (optional): `(id: string) => void`.
- `backdrop` (optional): `ReactNode`.
- `search` (optional): `WorkspaceSearch | false`.
- `narrow` (optional): `boolean`.
- `subtitle` (optional): `ReactNode`.
- `extra` (optional): `ReactNode`.
- `floating` (optional): `ReactNode`.
- `hidden` (optional): `boolean`.
- `className` (optional): `string`.
- `compactRows` (optional): `boolean`.
- `readOnly` (optional): `boolean`.
- `renderLock` (optional): `SettingsLockRenderer`.
