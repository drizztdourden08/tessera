# DropZone

A visible target for files, dropped in, pasted or picked with a click that opens the file dialog.

Import it from `@drizztdourden08/tessera`. It is also exported from `@drizztdourden08/tessera/primitives`.

```tsx
import { DropZone } from '@drizztdourden08/tessera';
```

The source is `src/primitives/DropZone/DropZone.tsx`. Its gallery page is Primitives · Inputs/DropZone (`#/story/primitives-dropzone--overview`).

## Where the questions lead here

What are you placing? A value the user sets. What does the user set? Files dropped or pasted onto an area.

DropZone is the visible area that takes files dragged in, pasted or picked.

## Use it when

- The user brings files onto a screen by dragging them in, such as a ROM, an icon or an avatar picture.
- A header row needs a one line box that takes a file, with the inline variant.

## Use something else when

- A button of your own opens the file dialog and no area takes a drop. Use [FileInput](FileInput.md) instead.
- The user types or browses to a path on disk. Use [PathInput](PathInput.md) instead.

## Rules

- Pass accept as extensions such as .png or media types such as image/*; onDrop gets only the files that pass.
- Pass onReject to hear about the files accept refused, and tell the user why, for example through status.
- Set status after a check, success or error with a message, to show the result under the label.
- Set variant inline for a one line box in a header row; block is the tall target with a glyph and a hint.
- Set disabled to show the not allowed pointer and swallow drops.

## Accessibility

- The inline box is a button: a click, Enter or Space opens the file dialog.
- Ctrl+V pastes files while the box is pointed at or focused.

## Example

```tsx
import { useState } from 'react';
import { DropZone } from '@drizztdourden08/tessera';
import type { DropZoneStatus } from '@drizztdourden08/tessera';

const IconUpload = ({ onIcon }: { onIcon: (file: File) => void }) => {
  const [status, setStatus] = useState<DropZoneStatus | undefined>(undefined);
  return (
    <DropZone
      accept={['.png', '.svg']}
      label="Drop an icon here"
      status={status}
      onDrop={([file]) => {
        if (!file) return;
        setStatus(undefined);
        onIcon(file);
      }}
      onReject={() => setStatus({ tone: 'error', message: 'Only PNG and SVG' })}
    />
  );
};
```

## Props

- `accept` (optional): `string[]`.
- `label` (optional): `string`. Default `fields.dropFiles`.
- `hint` (optional): `string`.
- `disabled` (optional): `boolean`. Default `false`.
- `variant` (optional): `DropZoneVariant`, one of `'block'`, `'inline'`. Default `'block'`.
- `size` (optional): `ControlSize`, one of `'sm'`, `'md'`.
- `icon` (optional): `ReactNode`.
- `status` (optional): `DropZoneStatus`.
- `onDrop`: `(files: File[]) => void`.
- `onReject` (optional): `(files: File[]) => void`.

## Tokens

It draws on `--border-width-thick`, `--border-width-thin`, `--c-bg`, `--c-border`, `--c-danger`, `--c-primary`, `--c-primary-bright`, `--c-primary-soft`, `--c-success`, `--c-success-soft`, `--c-text`, `--control-h-md`, `--control-h-sm`, `--control-pad-md`, `--control-pad-sm`, `--dropzone-inline-w`, `--opacity-muted`, `--radius-lg`, `--radius-md`, `--size-2`, `--space-lg`, `--space-md`, `--space-sm`, `--space-xl`, `--space-xs`, `--text-2xl`, `--text-base`, `--text-lg`, `--text-sm`, `--text-xl`, `--text-xs`, `--weight-medium`.
