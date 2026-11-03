# FileInput

A hidden file picker that a button of your own opens, and that hands back the chosen files.

Import it from `@drizztdourden08/tessera`. It is also exported from `@drizztdourden08/tessera/primitives`.

```tsx
import { FileInput } from '@drizztdourden08/tessera';
```

The source is `src/primitives/FileInput/FileInput.tsx`. Its gallery page is Primitives · Inputs/FileInput (`#/story/primitives-fileinput--overview`).

## Where the questions lead here

What are you placing? A value the user sets. What does the user set? A file.

FileInput is the hidden picker behind a button, for a file the user chooses from a dialog.

## Use it when

- A toolbar or menu button should open the system file dialog and take the files it returns.
- The control that opens the dialog is drawn by the caller, not by a drop area.

## Use something else when

- The user drops or pastes files into a visible area. Use `DropZone` instead.
- The user types or browses to a path on disk. Use [PathInput](PathInput.md) instead.

## Rules

- Keep a ref to the input and call click on it from the button that opens the dialog.
- Pass accept as a list of types, such as image/*, to narrow the dialog.
- Pass multiple to let the user choose several files at once.
- OnFiles gets the chosen files and is not called when the dialog is cancelled.
- The input is cleared after each choice, so the same file can be picked twice in a row.

## Accessibility

- The input is hidden and out of the tab order; the button that opens it carries the name and the focus.

## Example

```tsx
import { useRef } from 'react';
import { Button, FileInput } from '@drizztdourden08/tessera';

const AttachButton = ({ onAttach }: { onAttach: (files: File[]) => void }) => {
  const pick = useRef<HTMLInputElement>(null);
  return (
    <>
      <Button onClick={() => pick.current?.click()}>Attach</Button>
      <FileInput ref={pick} accept={['image/*']} multiple onFiles={onAttach} />
    </>
  );
};
```

## Props

- `accept` (optional): `string[]`.
- `multiple` (optional): `boolean`. Default `false`.
- `disabled` (optional): `boolean`. Default `false`.
- `onFiles`: `(files: File[]) => void`.
- `ref` (optional): `Ref<HTMLInputElement>`.
