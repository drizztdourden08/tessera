# OptionsPanel

The panel of a game preset editor: a small title with a toolbar, a row of tabs, the groups of the open tab, and an optional panel beside them.

Import it from `@drizztdourden08/tessera`. It is also exported from `@drizztdourden08/tessera/composites`.

```tsx
import { OptionsPanel } from '@drizztdourden08/tessera';
```

The source is `src/composites/OptionsPanel/OptionsPanel.tsx`. Its gallery page is Composites · Forms/OptionsPanel (`#/story/composites-optionspanel--overview`).

## Where the questions lead here

What are you placing? A value the user sets. What does the user set? The options of a game, in tabs and groups.

OptionsPanel lays out the tabs, groups and rows of a game preset the same way in every app.

## Use it when

- An app edits or shows the options of a randomizer or a game preset, split into tabs of OptionGroup and OptionRow.
- A side panel, such as the item pool, sits next to the options and the options panel must leave it room.

## Use something else when

- The tabs need a search, Show advanced and counts of changed options. Use [FormGroupTabs](FormGroupTabs.md) instead.
- The page is the settings of the app. Use `SettingsPage` instead.

## Rules

- Give tabs, activeTab and onTabChange; the app owns which tab is open and what each tab shows.
- Put OptionGroup children inside; the body scrolls when they are taller than the panel.
- Pass toolbar for the buttons at the end of the title line and aside for a panel beside the options.
- A tab with a zero badge hides the badge.

## Accessibility

- The tabs are Tabs, with their arrow keys, and the tab names are their labels.

## Example

```tsx
import { OptionGroup, OptionRow, OptionsPanel, ValueTag } from '@drizztdourden08/tessera';

const Preset = ({ tab, setTab }: { tab: string; setTab: (tab: string) => void }) => (
  <OptionsPanel title="Randomizer options" tabs={[{ id: 'items', label: 'Items' }, { id: 'world', label: 'World' }]} activeTab={tab} onTabChange={setTab}>
    <OptionGroup title="Shuffle">
      <OptionRow label="Chests" control={<ValueTag value />} />
    </OptionGroup>
  </OptionsPanel>
);
```

## Props

- `title`: `string`.
- `tabs`: `TabItem[]`.
- `activeTab`: `string`.
- `onTabChange`: `(tabId: string) => void`.
- `toolbar` (optional): `ReactNode`.
- `aside` (optional): `ReactNode`.
- `className` (optional): `string`.
- `children` (optional): `ReactNode`.

## Tokens

It draws on `--c-text-muted`, `--space-2xs`, `--space-md`, `--space-sm`, `--text-xs`, `--tracking-caps`.
