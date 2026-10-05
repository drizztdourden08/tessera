# SaveBar

The bar at the foot of an editor: whether its edits are saved, the reason a save failed, and Save and Discard.

Import it from `@drizztdourden08/tessera`. It is also exported from `@drizztdourden08/tessera/composites`.

```tsx
import { SaveBar } from '@drizztdourden08/tessera';
```

The source is `src/composites/SaveBar/SaveBar.tsx`. Its gallery page is Composites · Forms/SaveBar (`#/story/composites-savebar--overview`).

## Where the questions lead here

What are you placing? Feedback. What are you telling the user? Whether the edits are saved, with Save and Discard.

SaveBar says whether an editor is saved and holds Save and Discard at its foot, the same way in every app.

## Use it when

- A screen edits one thing, such as a preset or a session, and keeps the edits until the user saves.
- The user needs to see at a glance whether the edits are saved, and to save or drop them from one place.

## Use something else when

- Each setting applies the moment it changes. Use `SettingsRow` instead.
- A new thing is named before it exists. Use `InlineCreateForm` instead.
- The edits are steps of one task with Back and Next. Use `WizardNav` instead.

## Rules

- Put the bar last in the editor, so it stays at the foot of the scrolling area.
- Move state through clean, dirty, saving, then saved or error; the app owns it and the bar only draws it.
- Pass error as a sentence that says what to do, such as Free some space and save again.
- Pass onDiscard to offer Discard; leave it out when the edits cannot be dropped.

## Accessibility

- The save state is a status region, so a screen reader hears Saving, Saved or Not saved with the reason.
- Save and Discard are off while there is nothing to save, and Save shows a spinner while it saves.

## Example

```tsx
import { SaveBar } from '@drizztdourden08/tessera';
import type { SaveBarState } from '@drizztdourden08/tessera';
import type { ReactNode } from 'react';

interface PresetEditorProps {
  fields: ReactNode;
  state: SaveBarState;
  error?: string;
  save: () => void;
  discard: () => void;
}

const PresetEditor = ({ fields, state, error, save, discard }: PresetEditorProps) => (
  <section>
    {fields}
    <SaveBar state={state} error={error} onSave={save} onDiscard={discard} />
  </section>
);
```

## Props

- `state`: `SaveBarState`, one of `'clean'`, `'dirty'`, `'saving'`, `'saved'`, `'error'`.
- `error` (optional): `ReactNode`.
- `onSave`: `() => void`.
- `onDiscard` (optional): `() => void`.
- `saveLabel` (optional): `string`.
- `discardLabel` (optional): `string`.
- `className` (optional): `string`.

## Tokens

It draws on `--c-danger-soft`, `--c-warning-soft`, `--size-256`, `--space-2xs`, `--space-sm`, `--text-sm`, `--transition-normal`.
