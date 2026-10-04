# PathField

A file or folder path the user can type, drop from the desktop or pick with Browse in one field, with copy, reveal and clear.

Import it from `@drizztdourden08/tessera`. It is also exported from `@drizztdourden08/tessera/primitives`.

```tsx
import { PathField } from '@drizztdourden08/tessera';
```

The source is `src/primitives/PathField/PathField.tsx`. Its gallery page is Primitives · Inputs/PathField (`#/story/primitives-pathfield--overview`).

## Where the questions lead here

What are you placing? A value the user sets. What does the user set? A path to a file or folder.

PathField takes a typed, dropped or browsed path in one field and cuts a long one in the middle, the same way in every app.

## Use it when

- A setting holds the path of a file or a folder, such as an SSH key, a ROM, a save folder or an output zip.
- The app shows a path it made, read only, and the user may copy it or open its folder.

## Use something else when

- The app needs the contents of the files, not their path. Use `DropZone` instead.
- The value is free text that is not a path. Use `TextInput` instead.

## Rules

- Pass onBrowse to open the dialog of the app, such as the native dialog through Electron, and return the picked path or null.
- Pass resolvePath in Electron, such as webUtils.getPathForFile, so a drop gives the full path and not only the name.
- Set kind and accept to what the setting takes, so a wrong drop is turned away with a reason.
- Pass onReveal only when the app can show the file in its folder.

## Accessibility

- The input takes the label, hint and error of its Field, and typing edits the path.
- Copy, Reveal, Clear and Browse are buttons with names, in that order after the input.
- A drop that is turned away marks the input invalid and says why in an alert under it.

## Example

```tsx
import { Field, PathField } from '@drizztdourden08/tessera';

interface Bridge {
  pickFile: () => Promise<string | null>;
  showInFolder: (path: string) => void;
  pathOf: (file: File) => string;
}

const KeyFileField = ({ bridge, keyPath, setKeyPath }: { bridge: Bridge; keyPath: string | null; setKeyPath: (path: string | null) => void }) => (
  <Field label="Key file" hint="Only the path is stored.">
    <PathField
      value={keyPath}
      onChange={setKeyPath}
      onBrowse={bridge.pickFile}
      onReveal={bridge.showInFolder}
      resolvePath={bridge.pathOf}
      placeholder="No key file yet"
    />
  </Field>
);
```

## Props

- `value`: `string | null`.
- `onChange` (optional): `(path: string | null) => void`.
- `onBrowse` (optional): `PathBrowse`.
- `onReveal` (optional): `(path: string) => void`.
- `kind` (optional): `PathKind`, one of `'file'`, `'folder'`, `'any'`.
- `accept` (optional): `readonly string[]`.
- `resolvePath` (optional): `(file: File) => string | null | undefined`.
- `placeholder` (optional): `string`.
- `readOnly` (optional): `boolean`.
- `disabled` (optional): `boolean`.
- `invalid` (optional): `boolean`.
- `copyable` (optional): `boolean`. Default `true`.
- `id` (optional): `string`.
- `aria-label` (optional): `string`.
- `aria-describedby` (optional): `string`.
- `className` (optional): `string`.

## Tokens

It draws on `--border-width-thin`, `--c-border`, `--c-danger`, `--c-inset`, `--c-primary`, `--c-primary-soft`, `--c-text`, `--c-text-muted`, `--font-mono`, `--font-sans`, `--opacity-disabled`, `--radius-md`, `--size-40`, `--space-2xs`, `--space-sm`, `--text-sm`, `--transition-normal`.
