# Select

A field that opens a list and picks one option, or several, from plain options, from options in labelled groups, or from your own items.

Import it from `@drizztdourden08/tessera`. It is also exported from `@drizztdourden08/tessera/primitives`.

```tsx
import { Select } from '@drizztdourden08/tessera';
```

The source is `src/primitives/Select/Select.tsx`. Its gallery page is Primitives · Inputs/Select (`#/story/primitives-select--overview`).

## Where the questions lead here

What are you placing? A value the user sets. What does the user set? One choice. How many options are there? Many, in a list.

Select is the field that opens a list of options, plain or grouped, and picks one or several.

## Use it when

- The user picks one value from a list too long to show as buttons, such as a country or a sprite size.
- The user picks several values from a fixed list and the list does not need typing to find them: pass values and onValuesChange.
- The options sit under labelled headings, such as warm and cool colours: pass groups.

## Use something else when

- The user finds the option by typing, or may type a value that is not in the list. Use `Combobox` instead.
- The list is short enough to show all at once. Use [SegmentedControl](SegmentedControl.md) instead.
- The options are actions, not values for a field. Use [DropdownMenu](DropdownMenu.md) instead.

## Rules

- Mixed shows the word Mixed in place of the chosen option, for a selection whose values differ. Choosing an option calls onChange, and the app clears mixed.
- Pass options for a plain list and groups for options under headings. Pass items for objects of your own, with the field that holds the value.
- When options and groups are both given, the options come first with no heading, then each group under its label. A group never hides the options.
- An option that sits in a group is not repeated in options; put it in one place only.
- The app owns the value: pass value and onChange for one choice, values and onValuesChange for several.
- Pass grow={false} to keep a fixed width (the token --field-w-inline, 256 px, shrinking to 160 px) beside other tools in a toolbar; TextInput, SearchInput and Combobox take the same prop.
- Pass width="fit" to size the control to its content, or width="narrow" for a 220 px control; TextInput, SearchInput and Combobox take the same prop.
- Pass width="narrow-fill" for the 220 px control that fills its row when the nearest container is under 420 px wide; it needs an ancestor with a container type, such as a drawer or a window header.
- Use NativeSelect instead of Select for a form that posts to the browser, or on a touch screen.

## Accessibility

- The trigger is a combobox with a listbox; options are option rows, and a group heading names its block.
- The arrow keys, Home and End move through the options, Enter picks, Escape closes and returns focus to the trigger.

## Example

```tsx
import { Select } from '@drizztdourden08/tessera';

interface TintPickerProps {
  tint: string;
  onTint: (tint: string) => void;
}

const TintPicker = ({ tint, onTint }: TintPickerProps) => (
  <Select
    value={tint}
    onChange={onTint}
    options={[{ value: 'none', label: 'No tint' }]}
    groups={[
      { label: 'Warm', options: [{ value: 'red', label: 'Red' }, { value: 'amber', label: 'Amber' }] },
      { label: 'Cool', options: [{ value: 'blue', label: 'Blue' }, { value: 'teal', label: 'Teal' }] },
    ]}
  />
);
```

## Props

- `options` (optional): `readonly SelectOption[]`.
- `groups` (optional): `readonly SelectGroup[]`.
- `value` (optional): `string | ValueOf<T, F> | null`.
- `onChange` (optional): `(value: string) => void | (value: ValueOf<T, F> | null) => void`.
- `values` (optional): `readonly string[] | readonly ValueOf<T, F>[]`.
- `onValuesChange` (optional): `(values: string[]) => void | (values: ValueOf<T, F>[]) => void`.
- `onActiveChange` (optional): `(value: string | null) => void | (value: ValueOf<T, F> | null) => void`.
- `columns` (optional): `readonly ListboxColumn<SelectOption>[] | readonly ListboxColumn<T>[]`.
- `valueDisplay` (optional): `ValueDisplay`, one of `'full'`, `'label'`.
- `renderOption` (optional): `(option: SelectOption, isSelected: boolean) => ReactNode`.
- `items` (optional): `readonly T[]`.
- `searchable` (optional): `boolean`.
- `mixed` (optional): `boolean`.
- `multiDisplay` (optional): `MultiDisplay`, one of `'count'`, `'tags'`.
- `loading` (optional): `boolean`.
- `emptyText` (optional): `ReactNode`.
- `min` (optional): `number`.
- `max` (optional): `number`.
- `placeholder` (optional): `string`.
- `disabled` (optional): `boolean`.
- `invalid` (optional): `boolean`.
- `defaultOpen` (optional): `boolean`.
- `inline` (optional): `boolean`.
- `size` (optional): `ControlSize`, one of `'sm'`, `'md'`.
- `grow` (optional): `boolean`.
- `width` (optional): `FieldWidth`, one of `'fit'`, `'narrow'`, `'narrow-fill'`.
- `className` (optional): `string`.
- `id` (optional): `string`.
- `aria-label` (optional): `string`.
- `aria-labelledby` (optional): `string`.
- `aria-describedby` (optional): `string`.
- `getKey` (optional): `ItemAccessor<T, string | number>`.
- `getLabel` (optional): `ItemAccessor<T, string>`.
- `isItemDisabled` (optional): `ItemAccessor<T, boolean>`.
- `groupBy` (optional): `ItemAccessor<T, string | undefined>`.
- `categories` (optional): `ListboxCategories`.
- `itemComponent` (optional): `ComponentType<ListboxItemProps<T>>`.
- `valueComponent` (optional): `ComponentType<ListboxItemProps<T>>`.
- `tagField` (optional): `ItemAccessor<T, ReactNode>`.
- `valueField` (optional): `F`.

## Tokens

It draws on `--border-width-thick`, `--border-width-thin`, `--c-border`, `--c-border-strong`, `--c-danger`, `--c-danger-soft`, `--c-hover`, `--c-inset`, `--c-primary`, `--c-primary-soft`, `--c-primary-text`, `--c-sunken`, `--c-surface`, `--c-text`, `--c-text-dim`, `--c-text-muted`, `--control-h-md`, `--control-h-sm`, `--control-pad-md`, `--control-pad-sm`, `--field-w-inline`, `--field-w-inline-min`, `--field-w-narrow`, `--leading-normal`, `--listbox-attach`, `--listbox-columns`, `--listbox-space`, `--opacity-disabled`, `--radius-md`, `--radius-sm`, `--shadow-2`, `--size-1`, `--size-14`, `--size-288`, `--size-48`, `--space-2xs`, `--space-md`, `--space-sm`, `--space-xs`, `--text-base`, `--text-sm`, `--text-xs`, `--tracking-wide`, `--transition-fast`, `--transition-normal`, `--weight-medium`, `--z-popover`, `--z-sticky`.

## Also exported from this folder

`NativeSelect`.
