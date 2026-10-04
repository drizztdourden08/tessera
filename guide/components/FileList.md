# FileList

The files a job made or an app keeps, one row each with its type icon, name, size and date, and buttons to open it or show it in its folder.

Import it from `@drizztdourden08/tessera`. It is also exported from `@drizztdourden08/tessera/composites`.

```tsx
import { FileList } from '@drizztdourden08/tessera';
```

The source is `src/composites/FileList/FileList.tsx`. Its gallery page is Composites · Lists/FileList (`#/story/composites-filelist--overview`).

## Where the questions lead here

What are you placing? Data. What data are you showing? Files, with their size, date, open and reveal.

FileList gives every file the same row, with the size, the date and the two ways to reach it.

## Use it when

- A job writes output files the user opens next, such as a generated seed, a spoiler log or a save.
- A report or a settings page lists log files or attachments the user may open or find on disk.

## Use something else when

- Many files to sort, filter or pick from. Use `DataTable` instead.
- Rows that are not files, with their own columns and action. Use `ListItemRow` instead.
- One path the user reads or copies. Use [CopyValue](CopyValue.md) instead.

## Rules

- Pass size in bytes and modified in milliseconds; the list writes them, so every app shows them the same way.
- Pass onOpen and onReveal when the app can open the file and its folder; leave them out and the buttons go.
- Write empty as why there is nothing yet and when files will show, such as once the seed is generated.
- Give a file an icon only for a type of the app, such as a save file; common types take theirs from the extension.

## Accessibility

- The list is named by label, Files by default, and each file is a list item.
- The buttons are named after the file, such as Open server.log and Show server.log in its folder, with a tooltip.
- The date is a time element with its full timestamp.

## Example

```tsx
import { FileList } from '@drizztdourden08/tessera';
import type { FileEntry } from '@drizztdourden08/tessera';

interface RunOutputProps {
  files: FileEntry[];
  openPath: (path: string) => void;
  showInFolder: (path: string) => void;
}

const RunOutput = ({ files, openPath, showInFolder }: RunOutputProps) => (
  <FileList
    label="Output"
    files={files}
    onOpen={openPath}
    onReveal={showInFolder}
    empty="No output files yet. They show here once the seed is generated."
  />
);
```

## Props

- `files`: `readonly FileEntry[]`.
- `onOpen` (optional): `(path: string) => void`.
- `onReveal` (optional): `(path: string) => void`.
- `empty` (optional): `ReactNode`.
- `dense` (optional): `boolean`. Default `false`.
- `label` (optional): `string`.
- `className` (optional): `string`.

## Tokens

It draws on `--border-width-thin`, `--c-border`, `--c-hairline`, `--c-text`, `--c-text-dim`, `--c-text-muted`, `--radius-md`, `--size-32`, `--size-40`, `--space-2xs`, `--space-md`, `--space-sm`, `--space-xs`, `--text-base`, `--text-sm`, `--text-xs`.
