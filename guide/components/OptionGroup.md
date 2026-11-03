# OptionGroup

A titled group of option rows, with the title in small capitals over the rows.

Import it from `@drizztdourden08/tessera`. It is also exported from `@drizztdourden08/tessera/composites`.

```tsx
import { OptionGroup } from '@drizztdourden08/tessera';
```

The source is `src/composites/OptionGroup/OptionGroup.tsx`. It has no gallery page yet.

## A building block

No question in [decide.md](../decide.md) leads here. Other components are built on it.

## Use it when

- The rows of one section of a long list of options need a heading, such as the items or the dungeon of a game preset.
- Some groups hold options that can change while a game runs and need to stand out.

## Use something else when

- The groups are tabs of a form with a search and change counts. Use [FormGroupTabs](FormGroupTabs.md) instead.
- The group is a titled section of an app settings page. Use `SettingsSection` instead.

## Rules

- Put OptionRow children inside; the group adds the title and nothing else.
- Pass tone="live" for a group whose options can change while a game runs; its title takes the brighter accent.

## Accessibility

- The group is a labelled group named by its visible title.

## Example

```tsx
import { OptionGroup, OptionRow, Toggle } from '@drizztdourden08/tessera';

const Items = () => (
  <OptionGroup title="Items">
    <OptionRow label="Shuffle" control={<Toggle checked onChange={() => {}} aria-label="Shuffle" />} />
  </OptionGroup>
);
```

## Props

- `title`: `string`.
- `tone` (optional): `OptionGroupTone`, one of `'default'`, `'live'`. Default `'default'`.
- `className` (optional): `string`.
- `children` (optional): `ReactNode`.

## Tokens

It draws on `--c-primary`, `--c-primary-bright`, `--space-xs`, `--text-xs`, `--tracking-caps`.
