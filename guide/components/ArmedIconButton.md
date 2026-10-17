# ArmedIconButton

An icon button pressed twice: the first press arms it and its icon loops a short motion, the second press acts.

Import it from `@drizztdourden08/tessera`. It is also exported from `@drizztdourden08/tessera/composites`.

```tsx
import { ArmedIconButton } from '@drizztdourden08/tessera';
```

The source is `src/composites/ArmedIconButton/ArmedIconButton.tsx`. Its gallery page is Composites · Actions/ArmedIconButton (`#/story/composites-armediconbutton--overview`).

## Where the questions lead here

What are you placing? Actions. One action, or several related buttons? One action. What does the action look like? Irreversible, on a row.

ArmedIconButton shares the one ask of ConfirmIconButton: the same timeout, Escape, blur and focus return.

## Use it when

- A row action replaces or removes something, such as loading a save state, saving over one or deleting one.
- Several such actions sit side by side on a row and each needs its own second press.

## Use something else when

- The second press should be a separate check with a cancel beside it. Use `ConfirmIconButton` instead.
- The action needs a message to explain what it does. Use `Dialog` instead.
- Several actions on one item fold into More when narrow. Use [ActionBar](ActionBar.md) instead.

## Rules

- Pick the icon by what the action does: load-state to load, save-state to save over, trash-2 to delete.
- Name the action and its target in label, such as Load Slot 1: armed, it reads Click again to load Slot 1.
- Give load the info tone, overwrite the warning tone and delete the danger tone, as in a save row.
- Leave the timeout at 4 seconds; pass timeout={false} only where the button must wait until focus leaves.
- Run the action in onConfirm only; onCancel runs when the press times out, loses focus or meets Escape.

## Accessibility

- Armed, its name and its tooltip change to the armed label, and a polite status region says it once.
- Escape, a blur or the timeout disarms it, and focus stays on the button.
- Reduced motion shows the armed pose still, without the loop.

## Example

```tsx
import { ArmedIconButton } from '@drizztdourden08/tessera';

const SaveSlotTools = ({ slot, onLoad, onSave, onDelete }: { slot: string; onLoad: () => void; onSave: () => void; onDelete: () => void }) => (
  <>
    <ArmedIconButton icon="load-state" tone="info" label={`Load ${slot}`} onConfirm={onLoad} />
    <ArmedIconButton icon="save-state" tone="warning" label={`Overwrite ${slot}`} onConfirm={onSave} />
    <ArmedIconButton icon="trash-2" tone="danger" label={`Delete ${slot}`} onConfirm={onDelete} />
  </>
);
```

## Props

- `icon`: `ArmedIconName`, one of `'load-state'`, `'save-state'`, `'trash-2'`.
- `label`: `string`.
- `armedLabel` (optional): `string`.
- `onConfirm`: `() => void`.
- `onCancel` (optional): `() => void`.
- `onArm` (optional): `() => void`.
- `tone` (optional): `ArmedIconButtonTone`, one of `'danger'`, `'info'`, `'primary'`, `'secondary'`, `'success'`, `'tertiary'`, `'warning'`.
- `timeout` (optional): `number | false`.
- `size` (optional): `IconButtonSize`, one of `'xs'`, `'sm'`, `'md'`. Default `'sm'`.
- `disabled` (optional): `boolean`. Default `false`.
- `defaultArmed` (optional): `boolean`.
- `tabIndex` (optional): `number`.
- `className` (optional): `string`.

## Tokens

It draws on `--c-danger`, `--c-info`, `--c-primary`, `--c-secondary`, `--c-success`, `--c-tertiary`, `--c-warning`, `--size-1`.
