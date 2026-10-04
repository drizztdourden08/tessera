# ScreenPage

Building block: the page header container WorkspaceScreen and StageScreen show, a card with a header of icon, title and fading backdrop over a body that compacts the header once it scrolls.

Import it from `@drizztdourden08/tessera`. It is also exported from `@drizztdourden08/tessera/composites`.

```tsx
import { ScreenPage } from '@drizztdourden08/tessera';
```

The source is `src/composites/ScreenPage/ScreenPage.tsx`. Its gallery page is Composites · Screens/ScreenPage (`#/story/composites-screenpage--overview`).

## A building block

No question in [decide.md](../decide.md) leads here. Other components are built on it.

## Use it when

- You build a new kind of screen and it must look like the others, with the same header.
- A page in an app frame needs the same header as the pages of a screen.

## Use something else when

- The screen has pages the user moves between from a side list. Use [WorkspaceScreen](WorkspaceScreen.md) instead.
- The screen is read, such as About or credits. Use [InfoScreen](InfoScreen.md) instead.
- The screen runs one short task with a status and actions. Use [UtilityScreen](UtilityScreen.md) instead.
- The screen is one big custom surface. Use [StageScreen](StageScreen.md) instead.
- The page holds settings with a pill per section. Use `SettingsPage` instead.
- Only the header, on a card or a panel of your own. Use [ContentHeader](ContentHeader.md) instead.

## Rules

- WorkspaceScreen and StageScreen render it, and neither can turn it off. UtilityScreen shows its header at the top of the window instead, and InfoScreen has none.
- Always pass an icon and a title; without them it warns in development.
- Leave backdrop out for the default art, pass your own scene, or pass null for a plain header.
- Use strip for a few controls after the title, such as section pills or a status, and actions for the end of the header.
- Put buttons that stay in view in footer; the body scrolls between the header and the footer.
- Set scroll={false} when the content scrolls by itself; the header then stays full size.

## Accessibility

- The card is a section named by its title, which is a level 2 heading.
- With live, a screen reader reads each new title, as a status does.

## Example

```tsx
import { Icon, ScreenPage, ScreenWindow } from '@drizztdourden08/tessera';

const SessionsScreen = ({ onClose }: { onClose: () => void }) => (
  <ScreenWindow title="Sessions" onClose={onClose}>
    <ScreenPage icon={<Icon name="layers" />} title="Friday async">
      Sessions list
    </ScreenPage>
  </ScreenWindow>
);
```

## Props

- `icon`: `ReactNode`.
- `title`: `ReactNode`.
- `children`: `ReactNode`.
- `backdrop` (optional): `ReactNode`.
- `strip` (optional): `ReactNode`.
- `actions` (optional): `ReactNode`.
- `footer` (optional): `ReactNode`.
- `live` (optional): `boolean`. Default `false`.
- `scroll` (optional): `boolean`. Default `true`.
- `compact` (optional): `boolean`.
- `bodyRef` (optional): `RefObject<HTMLDivElement | null>`.
- `bodyClassName` (optional): `string`.
- `className` (optional): `string`.

## Tokens

It draws on `--blur`, `--border-width-thin`, `--c-border`, `--c-hairline`, `--c-panel`, `--radius-xl`, `--space-md`, `--space-xl`.
