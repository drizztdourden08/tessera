# FormGroupTabs

The top of a long form split into groups: a search over the options, Show advanced, and a tab per group with how many options changed.

Import it from `@drizztdourden08/tessera`. It is also exported from `@drizztdourden08/tessera/composites`.

```tsx
import { FormGroupTabs } from '@drizztdourden08/tessera';
```

The source is `src/composites/FormGroupTabs/FormGroupTabs.tsx`. Its gallery page is Composites · Forms/FormGroupTabs (`#/story/composites-formgrouptabs--overview`).

## Where the questions lead here

What are you placing? A value the user sets. What does the user set? A long form split into tabs.

FormGroupTabs shows where the changes are in a long form and how to find an option, the same way in every app.

## Use it when

- A form has dozens of options in named groups, such as the option groups of a game preset.
- The user needs to find an option by name and see which groups hold changes.

## Use something else when

- The screen is the settings of the app, with a header over a scrolling body. Use `SettingsPage` instead.
- Only the tabs are needed, with no counts or search. Use `Tabs` instead.

## Rules

- Give each tab count, the number of options in the group, and changed, how many differ from their default.
- Pass onQueryChange and filter the rows of the form with the query; the tabs stay.
- Pass onAdvancedChange with advancedCount to show or hide the options tagged advanced.

## Accessibility

- The tabs are Tabs, with their arrow keys, and each tab reads its label, its changed count and its badge.
- The search box and the switch are named by their own words.

## Example

```tsx
import { FormGroupTabs } from '@drizztdourden08/tessera';
import type { FormGroupTab } from '@drizztdourden08/tessera';

const OptionGroups = ({ groups, groupId, setGroupId, query, setQuery }: {
  groups: FormGroupTab[];
  groupId: string;
  setGroupId: (id: string) => void;
  query: string;
  setQuery: (query: string) => void;
}) => <FormGroupTabs tabs={groups} activeTab={groupId} onTabChange={setGroupId} query={query} onQueryChange={setQuery} />;
```

## Props

- `tabs`: `readonly FormGroupTab[]`.
- `activeTab`: `string`.
- `onTabChange`: `(id: string) => void`.
- `query` (optional): `string`.
- `onQueryChange` (optional): `(query: string) => void`.
- `searchPlaceholder` (optional): `string`.
- `advanced` (optional): `boolean`. Default `false`.
- `onAdvancedChange` (optional): `(shown: boolean) => void`.
- `advancedCount` (optional): `number`.
- `className` (optional): `string`.

## Tokens

It draws on `--size-256`, `--space-md`, `--space-sm`.
