# ItemList

The list side of a list and editor screen: a title with its count, New, a filter, groups, rename, delete and the loading, empty and error states.

Import it from `@drizztdourden08/tessera`. It is also exported from `@drizztdourden08/tessera/composites`.

```tsx
import { ItemList } from '@drizztdourden08/tessera';
```

The source is `src/composites/ItemList/ItemList.tsx`. Its gallery page is Composites · Lists/ItemList (`#/story/composites-itemlist--overview`).

## Where the questions lead here

What are you placing? Data. What data are you showing? A list the user adds to, renames and deletes from.

ItemList draws the count, New, the filter, the groups, rename, delete and every state of such a list the same way in every app.

## Use it when

- The user keeps a set of named things, such as presets, servers or profiles, and adds, renames, deletes and picks them.
- The list loads from disk or the network, so it needs a loading line and an error in place of the rows.

## Use something else when

- The list sits beside an editor whose edits can be lost when the user picks another item. Use [ListDetail](ListDetail.md) instead.
- The rows are read only, or each row has its own set of actions. Use `ListItemRow` instead.
- The items need columns to sort, group and filter. Use `DataTable` instead.

## Rules

- Pass getId and getName; the name feeds the filter, the rename box and the labels of the row buttons.
- Pass create to open a form at the top of the list, such as an InlineCreateForm with more fields, and call its close after a create or a cancel.
- Pass onCreate in place of create when the app opens its own flow, such as a dialog or a wizard.
- Pass createOpen with onCreateOpenChange when the app decides whether the form is open, such as on a first run with no items.
- Pass onActivate when picking an item acts at once, such as switching the active profile, and selectedId for the current one.
- Pass groups with groupBy to set the order of the groups and keep the empty ones, such as an installed game with no preset yet.
- An empty group draws its heading, its empty line and the button of its action, such as New preset; while the filter holds text, it hides.
- Each row carries data-item-id with its id, so app search can find the row and scroll to it; rowData adds more data attributes.
- New carries data-tour="item-list-new" for a GuidedTour step; pass createTour to tell two lists on one screen apart.
- Leave actionVisibility on hover to show rename and delete on the picked row and on any row under the pointer; always shows them on every row.
- Keep the meta of each row to one short line, such as 7 changes · edited 2 hours ago.
- Write empty as what to do next, such as Install a game from Games, then make a preset for it.
- Write error as what failed and why, such as Could not read servers.json: unexpected end of input.
- Put it on a surface: the list pane of ListDetailLayout, a card or a panel. It draws no background of its own.

## Accessibility

- The list is a section named by its title, and each group is a list named by its heading.
- The arrow keys, Home and End move the selection between rows, or only the focus with onActivate; F2 renames the focused row.
- With onActivate the rows are one Tab stop on the focused row; a click, Enter or Space activates it, and Tab reaches its actions.
- An empty group is a group named by its heading; its action is a Tab stop of its own, and the arrow keys skip it.
- In the rename box, Enter keeps the name and Escape cancels; focus goes back to the row.
- New moves focus into the create form; Escape or Cancel closes it and focus goes back to New.
- After a create, focus goes to the new row when the app picks it, and back to New when it does not.
- Delete asks once with its own Cancel, and the error is an alert.

## Example

```tsx
import { ItemList } from '@drizztdourden08/tessera';

interface Server {
  id: string;
  name: string;
  host: string;
}

const ServerList = ({ servers, selectedId, onSelect, onAdd, onRename, onDelete, loading, error }: {
  servers: Server[];
  selectedId: string | null;
  onSelect: (id: string) => void;
  onAdd: () => void;
  onRename: (id: string, name: string) => void;
  onDelete: (id: string) => void;
  loading: boolean;
  error?: string;
}) => (
  <ItemList
    title="Servers"
    items={servers}
    getId={(server) => server.id}
    getName={(server) => server.name}
    render={(server) => ({ meta: server.host })}
    selectedId={selectedId}
    onSelect={onSelect}
    onCreate={onAdd}
    createLabel="Add"
    onRename={onRename}
    onDelete={onDelete}
    loading={loading}
    error={error}
    empty="Add a server to host sessions on."
  />
);
```

## Props

- `title`: `string`.
- `items`: `readonly T[]`.
- `getId`: `(item: T) => string`.
- `getName`: `(item: T) => string`.
- `render` (optional): `(item: T) => ItemListRowParts`.
- `groupBy` (optional): `(item: T) => string | undefined`.
- `groups` (optional): `readonly ItemListGroup[]`.
- `rowData` (optional): `(item: T) => DataAttributes`.
- `selectedId` (optional): `string | null`.
- `onSelect` (optional): `(id: string) => void`.
- `onActivate` (optional): `(id: string) => void`.
- `onCreate` (optional): `() => void`.
- `create` (optional): `ItemListCreate`.
- `createOpen` (optional): `boolean`.
- `onCreateOpenChange` (optional): `(open: boolean) => void`.
- `createLabel` (optional): `string`.
- `createTour` (optional): `string`. Default `'item-list-new'`.
- `onRename` (optional): `(id: string, name: string) => void`.
- `onDelete` (optional): `(id: string) => void`.
- `actionVisibility` (optional): `ListItemRowActionVisibility`, one of `'hover'`, `'always'`.
- `filter` (optional): `ItemListFilter`, one of `'auto'`, `false`, `true`.
- `filterPlaceholder` (optional): `string`.
- `loading` (optional): `boolean`.
- `error` (optional): `ReactNode`.
- `empty` (optional): `ReactNode`.
- `emptyIcon` (optional): `ReactNode`.
- `className` (optional): `string`.

## Tokens

It draws on `--border-width-thin`, `--c-border`, `--c-primary`, `--c-selected`, `--c-text`, `--radius-md`, `--size-32`, `--space-2xs`, `--space-md`, `--space-sm`, `--space-xs`, `--weight-medium`.
