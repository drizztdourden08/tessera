# ResetButton

A small icon button that puts one changed setting back to its default, named after the setting.

Import it from `@drizztdourden08/tessera`. It is also exported from `@drizztdourden08/tessera/composites`.

```tsx
import { ResetButton } from '@drizztdourden08/tessera';
```

The source is `src/composites/ResetButton/ResetButton.tsx`. Its gallery page is Composites · Actions/ResetButton (`#/story/composites-resetbutton--overview`).

## Where the questions lead here

What are you placing? Actions. One action, or several related buttons? One action. What does the action look like? Puts a changed setting back to its default.

ResetButton gives every settings row the same reset icon, name and tooltip.

## Use it when

- A row shows a setting that can differ from its default and the user may want to undo the change.
- A custom row head needs the same reset button as FormRow and OptionRow.

## Use something else when

- A whole form or panel resets at once. Use [ActionBar](ActionBar.md) instead.

## Rules

- Pass the name of the setting as label; the button and its tooltip read Reset followed by that name.
- Pass changed so the button shows only while the value differs from its default.
- It renders nothing without onReset, so a read only row needs no condition around it.

## Accessibility

- The button is named by its label and shows the same name as a tooltip.

## Example

```tsx
import { ResetButton } from '@drizztdourden08/tessera';

const VolumeReset = ({ changed, onReset }: { changed: boolean; onReset: () => void }) => (
  <ResetButton label="Volume" changed={changed} onReset={onReset} />
);
```

## Props

- `label`: `string`.
- `onReset` (optional): `() => void`.
- `changed` (optional): `boolean`. Default `false`.
