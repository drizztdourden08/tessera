# WindowTitleBar

The title bar of a frameless desktop window: the brand in the middle, the main menu at the start and the window buttons at the end.

Import it from `@drizztdourden08/tessera`. It is also exported from `@drizztdourden08/tessera/composites`.

```tsx
import { WindowTitleBar } from '@drizztdourden08/tessera';
```

The source is `src/composites/WindowTitleBar/WindowTitleBar.tsx`. Its gallery page is Composites · Windows/WindowTitleBar (`#/story/composites-windowtitlebar--overview`).

## Where the questions lead here

What are you placing? Layout. What are you arranging? Window chrome. Which part of the window? The title bar.

WindowTitleBar is the one title bar of a frameless window, with the same brand, menu and controls in every app.

## Use it when

- A desktop app draws its own window frame and needs a title bar that drags the window and holds its buttons.
- A few app wide actions earn a place beside the brand, such as Search, Report a bug, or a menu of window groups.

## Use something else when

- The header belongs to one view inside the window, with its own title and actions. Use [ContentHeader](ContentHeader.md) instead.
- The window is a page or a dialog of the app, not the frame of the app itself. Use [ScreenWindow](ScreenWindow.md) instead.

## Rules

- The app owns the window state: pass maximized, fullscreen and pinned, and act on each control in onControl.
- Hide a control the host lacks in controls, such as close: false; controls={false} hides them all, for a host with no window buttons.
- Every action but a volume has a label and an icon; tone and effect mark the icon, the same on a command, a status or a dropdown action.
- Use bar volume for a sound level: the bar draws VolumeControl, and the main menu lists a Mute or Unmute row and a slider row named by label.
- Use bar dropdown for an action with a few choices of its own; narrow windows fold it into the main menu as a sub-menu.
- Keep the actions few: narrow windows move them into the main menu, then shrink the brand.
- The main menu hamburger turns into an X while its menu is open; no other menu button in Tessera does.
- View moves the View sub-menu to a group and position of menu; view={false} hides it, and the main menu then lists pin and full screen while the bar tucks them away.
- Tucked renames, moves or hides the pin and full screen rows the main menu lists with view={false}; group and position work as in view.
- A tucked label names its row in both states and activeLabel the pinned or full screen one; the bar buttons and View keep their names.
- A row hidden with tucked is gone from the menu, so a narrow window that tucks its button leaves that button out of reach.
- OnFitChange hears which bar items a narrow window tucks away, as control:pin, control:fullscreen or action: and the action id; never read the markup for it.
- Pin and full screen are menu actions whose label and icon say what a pick does; a check mark in a title bar menu means on.

## Accessibility

- Each action is an icon button named by its label, with a tooltip and aria-keyshortcuts for its shortcut.
- A dropdown action is a menu button with aria-haspopup; its menu takes the keys of DropdownMenu.
- A concealed bar opens on focus and on Alt, so the keyboard always reaches it.

## Example

```tsx
import { WindowTitleBar } from '@drizztdourden08/tessera';
import type { MenuGroup, WindowControl, WindowTitleBarAction } from '@drizztdourden08/tessera';

interface AppTitleBarProps {
  menu: MenuGroup[];
  grouped: boolean;
  maximized: boolean;
  onGroup: (grouped: boolean) => void;
  onSearch: () => void;
  onControl: (control: WindowControl) => void;
}

const AppTitleBar = ({ menu, grouped, maximized, onGroup, onSearch, onControl }: AppTitleBarProps) => {
  const actions: WindowTitleBarAction[] = [
    { id: 'search', icon: 'search', label: 'Search', shortcut: 'Ctrl+K', tone: 'primary', onSelect: onSearch },
    {
      id: 'group',
      icon: 'group',
      label: 'Window group',
      bar: 'dropdown',
      tone: grouped ? 'info' : undefined,
      effect: grouped ? 'ping' : undefined,
      groups: [{
        id: 'group',
        items: [
          { id: 'alone', kind: 'radio', label: 'No group', checked: !grouped, onSelect: () => onGroup(false) },
          { id: 'grouped', kind: 'radio', label: 'Group with the main window', checked: grouped, onSelect: () => onGroup(true) },
        ],
      }],
    },
  ];
  return <WindowTitleBar title="Brock" menu={menu} actions={actions} maximized={maximized} onControl={onControl} />;
};
```

## Props

- `title`: `ReactNode`.
- `logo` (optional): `string`.
- `instance` (optional): `WindowTitleBarInstance | null`.
- `menu` (optional): `readonly MenuGroup[]`.
- `menuLabel` (optional): `string`.
- `view` (optional): `WindowTitleBarViewPlace | false`.
- `tucked` (optional): `WindowTitleBarTucked`.
- `onFitChange` (optional): `(tucked: readonly WindowTitleBarItemId[]) => void`.
- `onMenuOpenChange` (optional): `(open: boolean) => void`.
- `actions` (optional): `readonly WindowTitleBarAction[]`.
- `controls` (optional): `WindowControlsConfig | false`.
- `maximized` (optional): `boolean`.
- `fullscreen` (optional): `boolean`. Default `false`.
- `pinned` (optional): `boolean`.
- `onControl`: `(control: WindowControl) => void`.
- `concealed` (optional): `boolean`. Default `false`.
- `peek` (optional): `boolean`.
- `className` (optional): `string`. Default `''`.

## Tokens

It draws on `--border-width-thick`, `--border-width-thin`, `--c-border`, `--c-danger`, `--c-hover`, `--c-info`, `--c-on-danger`, `--c-primary`, `--c-secondary`, `--c-success`, `--c-surface`, `--c-tertiary`, `--c-text`, `--c-text-dim`, `--c-warning`, `--duration-fast`, `--duration-normal`, `--duration-slow`, `--duration-status-breathe`, `--ease-in-out`, `--ease-out`, `--ease-standard`, `--font-mono`, `--hamburger-icon-bar`, `--hamburger-icon-h`, `--opacity-glow`, `--radius-sm`, `--size-14`, `--size-20`, `--size-48`, `--space-md`, `--space-sm`, `--space-xs`, `--text-sm`, `--titlebar-height`, `--tracking-caps`, `--tracking-wide`, `--transition-normal`, `--weight-medium`, `--z-panel`.
