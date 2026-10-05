# ListDetailLayout

The two panes of a list and detail screen: the list on the left and the detail of the picked item beside it, each on its own surface.

Import it from `@drizztdourden08/tessera`. It is also exported from `@drizztdourden08/tessera/composites`.

```tsx
import { ListDetailLayout } from '@drizztdourden08/tessera';
```

The source is `src/composites/ListDetailLayout/ListDetailLayout.tsx`. Its gallery page is Composites · Layout/ListDetailLayout (`#/story/composites-listdetaillayout--overview`).

## Where the questions lead here

What are you placing? Layout. What are you arranging? A list beside its detail.

ListDetailLayout draws the panes, the resize, the fold and the small window of every list and detail screen the same way.

## Use it when

- A screen lists things on the left and shows the picked one on the right, such as sessions, servers or saves.
- The user needs more room for the detail now and then, so the list folds away to a rail.

## Use something else when

- The detail is an editor whose edits can be lost when the user picks another item. Use [ListDetail](ListDetail.md) instead.
- Two panes of equal weight split the room by share. Use `SplitPane` instead.
- The left side is the navigation of the app. Use `SideNavLayout` instead.

## Rules

- Pass the list and the detail as content; the layout draws the panes, their surfaces and their scroll.
- Leave detail out, or pass null, while nothing is picked; emptyDetail replaces the default placeholder.
- Pass onBack to clear the selection; under 768 px it shows the list again.
- Pass storageKey to keep the width and the fold between visits; the fold is kept under storageKey:collapsed.
- Pass collapsed with onCollapsedChange when the app holds the fold, such as from a menu or its own shortcut.
- Put a SaveBar last in the detail: it sits flush with the foot of the pane.
- Name the panes with listLabel and detailLabel, in lower case, such as presets and preset editor.

## Accessibility

- The divider is a separator: the arrow keys resize it, Home and End jump to the limits, Space and a double click reset it.
- Enter on the divider folds the list and moves focus to the button that brings it back.
- The fold button names the list, Hide presets or Show presets, and reports aria-expanded on the list pane.
- Under 768 px the panes stack and Back sits at the top of the detail.

## Example

```tsx
import { ListDetailLayout, ListItemList, ListItemRow } from '@drizztdourden08/tessera';
import { useState } from 'react';

interface Session {
  id: string;
  name: string;
}

const SessionsScreen = ({ sessions, renderSession }: { sessions: Session[]; renderSession: (session: Session) => React.ReactNode }) => {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const selected = sessions.find((session) => session.id === selectedId);
  return (
    <ListDetailLayout
      list={(
        <ListItemList heading="Sessions">
          {sessions.map((session) => (
            <ListItemRow key={session.id} name={session.name} selected={session.id === selectedId} onClick={() => setSelectedId(session.id)} />
          ))}
        </ListItemList>
      )}
      detail={selected && renderSession(selected)}
      onBack={() => setSelectedId(null)}
      listLabel="sessions"
      storageKey="sessions.list"
    />
  );
};
```

## Props

- `list`: `ReactNode`.
- `detail` (optional): `ReactNode`.
- `emptyDetail` (optional): `ReactNode`.
- `onBack` (optional): `() => void`.
- `backLabel` (optional): `string`.
- `resizable` (optional): `boolean`.
- `listWidth` (optional): `number`.
- `minListWidth` (optional): `number`.
- `maxListWidth` (optional): `number`.
- `collapsible` (optional): `boolean`.
- `collapsed` (optional): `boolean`.
- `defaultCollapsed` (optional): `boolean`.
- `onCollapsedChange` (optional): `(collapsed: boolean) => void`.
- `storageKey` (optional): `string`.
- `listLabel` (optional): `string`.
- `detailLabel` (optional): `string`.
- `className` (optional): `string`.

## Tokens

It draws on `--border-width-thin`, `--c-border`, `--c-sunken`, `--c-surface`, `--c-text-dim`, `--c-text-muted`, `--radius-lg`, `--size-320`, `--space-2xs`, `--space-lg`, `--space-md`, `--space-sm`, `--space-xl`, `--space-xs`, `--text-sm`, `--text-xs`, `--tracking-wide`, `--z-sticky`.
