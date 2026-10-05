# MasterDetail

A ManagedList beside the editor of the picked item, that asks before a pick, New or Back throws unsaved edits away.

Import it from `@drizztdourden08/tessera`. It is also exported from `@drizztdourden08/tessera/composites`.

```tsx
import { MasterDetail } from '@drizztdourden08/tessera';
```

The source is `src/composites/MasterDetail/MasterDetail.tsx`. Its gallery page is Composites · Layout/MasterDetail (`#/story/composites-masterdetail--overview`).

## Where the questions lead here

What are you placing? Layout. What are you arranging? A list beside an editor, with unsaved edits guarded.

MasterDetail joins ManagedList and MasterDetailLayout and asks the same question before edits are lost in every app.

## Use it when

- A screen lists saved things on the left and edits the picked one on the right, such as presets or servers.
- The editor holds edits until the user saves, so moving away must ask first.

## Use something else when

- The detail is read only, or every edit saves at once. Use `MasterDetailLayout` instead.
- Only the list is needed, with no editor beside it. Use [ManagedList](ManagedList.md) instead.

## Rules

- Set dirty from the editor: true while its value differs from the saved one.
- Pass onSave so the question offers Save and open; return false, or reject, when the save fails.
- Pass onDiscard to throw the draft away; onSelect runs after it.
- Keep the list props in list; MasterDetail adds the selection and guards New.
- A create form in list opens without the question, since it throws no edits away; picking the new item is up to the app.
- The question is a bar over the editor by default; pass guard dialog to ask in a modal dialog instead.
- Put a SaveBar at the foot of the editor, for Save and Discard while the user stays on the item.

## Accessibility

- The question takes focus on Stay here, and Escape stays; focus goes back where it was.
- By default the question is an alertdialog over the editor; with guard dialog it is a modal dialog.
- The list keeps every key of ManagedList, and under 768 px Back sits at the top of the editor.

## Example

```tsx
import { MasterDetail } from '@drizztdourden08/tessera';
import { useState } from 'react';

interface Preset {
  id: string;
  name: string;
  options: Record<string, number>;
}

const PresetsScreen = ({ presets, save }: { presets: Preset[]; save: (preset: Preset) => Promise<void> }) => {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [draft, setDraft] = useState<Preset | null>(null);
  const saved = presets.find((preset) => preset.id === selectedId);
  return (
    <MasterDetail
      list={{ title: 'Presets', items: presets, getId: (preset) => preset.id, getName: (preset) => preset.name }}
      selectedId={selectedId}
      onSelect={(id) => { setDraft(null); setSelectedId(id); }}
      detail={saved ? <pre>{JSON.stringify(draft ?? saved)}</pre> : null}
      dirty={draft !== null}
      onSave={async () => { if (draft) await save(draft); }}
      onDiscard={() => setDraft(null)}
      storageKey="presets.list-width"
    />
  );
};
```

## Props

- `list`: `MasterDetailList<T>`.
- `selectedId`: `string | null`.
- `onSelect`: `(id: string | null) => void`.
- `detail`: `ReactNode`.
- `emptyDetail` (optional): `ReactNode`.
- `dirty` (optional): `boolean`. Default `false`.
- `onSave` (optional): `MasterDetailSave`.
- `onDiscard` (optional): `() => void`.
- `guard` (optional): `MasterDetailGuardLook`, one of `'dialog'`, `'inline'`. Default `'inline'`.
- `className` (optional): `string`.
- `resizable` (optional): `boolean`.
- `listWidth` (optional): `number`.
- `minListWidth` (optional): `number`.
- `maxListWidth` (optional): `number`.
- `storageKey` (optional): `string`.
- `backLabel` (optional): `string`.
- `listLabel` (optional): `string`.
- `detailLabel` (optional): `string`.

## Tokens

It draws on `--border-width-thin`, `--c-warning`, `--c-warning-soft`, `--radius-md`, `--size-256`, `--space-md`, `--space-sm`.
