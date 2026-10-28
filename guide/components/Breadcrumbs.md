# Breadcrumbs

The trail of places that leads to the one the user is in, each a button, with a menu of its neighbours, a fold for the middle and a click at the end that turns it into a path box.

Import it from `@drizztdourden08/tessera`. It is also exported from `@drizztdourden08/tessera/composites`.

```tsx
import { Breadcrumbs } from '@drizztdourden08/tessera';
```

The source is `src/composites/Breadcrumbs/Breadcrumbs.tsx`. Its gallery page is Composites · Navigation/Breadcrumbs (`#/story/composites-breadcrumbs--overview`).

## Where the questions lead here

What are you placing? Navigation. Where does the user go? Up and down the levels of a path.

Breadcrumbs shows the levels of a path as a trail with neighbour menus, a fold and a path box in one place.

## Use it when

- The user is deep in a nested place, such as a folder in a project, and needs to climb back up in one click.
- A segment has neighbours at the same level, such as the other folders of its parent, that the user may jump to from the trail.
- Items can be dragged onto a place in the trail to move them there.

## Use something else when

- The user steps through the fixed stages of one task. Use `Wizard` instead.
- The user moves between a few views of one area. Use `Tabs` instead.
- The user picks a file or folder path to store, not to move around in. Use [PathInput](PathInput.md) instead.

## Rules

- Segments run from the root to the current place, each with an id and a label, and optionally an icon from the set and siblings.
- The last segment is the current place and carries aria-current. onNavigate gets the id of the segment that was pressed.
- Siblings are the menu nodes of a DropdownMenu. A chevron after the segment opens them; leave it out when a segment has no neighbours.
- Pass maxVisible to fold a long trail: the first segment and the last ones stay, and the middle ones sit behind an ellipsis menu. The smallest value is 3.
- Pass onDropOn to make every segment a drop target. canDrop turns a drag away, such as a drag that is not a file.
- Pass onPathSubmit to let the user click the empty space at the end and type the path in a PathInput. path is the text shown there and defaults to the labels joined by a slash.
- Trailing takes small parts at the end of the bar, such as Tag chips for the kind or state of the place.

## Accessibility

- The bar is a nav named Breadcrumbs, or by label, and the trail is an ordered list.
- Every segment is a button; the current one is marked with aria-current page.
- The sibling menu and the fold menu are named buttons that follow DropdownMenu keys.
- The edit box takes focus at once, Enter goes to the typed path and Escape or leaving the box cancels.

## Example

```tsx
import { Breadcrumbs } from '@drizztdourden08/tessera';
import type { BreadcrumbSegment } from '@drizztdourden08/tessera';

interface FolderBarProps {
  trail: readonly BreadcrumbSegment[];
  open: (id: string) => void;
  openPath: (path: string) => void;
}

const FolderBar = ({ trail, open, openPath }: FolderBarProps) => (
  <Breadcrumbs segments={trail} maxVisible={4} onNavigate={open} onPathSubmit={openPath} />
);
```

## Props

- `segments`: `readonly BreadcrumbSegment[]`.
- `onNavigate`: `(id: string) => void`.
- `maxVisible` (optional): `number`.
- `onDropOn` (optional): `(id: string, event: DragEvent<HTMLElement>) => void`.
- `canDrop` (optional): `(id: string, event: DragEvent<HTMLElement>) => boolean`.
- `path` (optional): `string`.
- `onPathSubmit` (optional): `(path: string) => void`.
- `trailing` (optional): `ReactNode`.
- `label` (optional): `string`.
- `className` (optional): `string`.

## Tokens

It draws on `--border-width-thick`, `--border-width-thin`, `--c-focus`, `--c-hover`, `--c-primary`, `--c-primary-soft`, `--c-text`, `--c-text-dim`, `--c-text-muted`, `--control-h-sm`, `--radius-sm`, `--size-160`, `--size-32`, `--space-2xs`, `--space-sm`, `--space-xs`, `--text-sm`, `--weight-medium`.
