# CollapseToggle

The round button on the edge of a panel that folds it to a rail and opens it again, with a chevron that points where the panel goes.

Import it from `@drizztdourden08/tessera`. It is also exported from `@drizztdourden08/tessera/composites`.

```tsx
import { CollapseToggle } from '@drizztdourden08/tessera';
```

The source is `src/composites/CollapseToggle/CollapseToggle.tsx`. Its gallery page is Composites · Layout/CollapseToggle (`#/story/composites-collapsetoggle--overview`).

## Where the questions lead here

What are you placing? Layout. What are you arranging? The button that folds a panel to its edge.

CollapseToggle is the one fold button of every Tessera panel: SideNav, SidePanel, StudioLayout and ListDetailLayout all draw it.

## Use it when

- A part draws its own panel that folds to its edge and needs the one fold button every Tessera panel uses.
- A rail of an app sits beside the main view and folds away, such as a list of profiles.

## Use something else when

- A side panel with a heading folds beside the main view. Use [SidePanel](SidePanel.md) instead.
- A list sits beside the detail of the picked item. Use [ListDetailLayout](ListDetailLayout.md) instead.
- The left side is the navigation of the app. Use `SideNav` instead.
- A block of content shows or hides below its line. Use [Disclosure](Disclosure.md) instead.

## Rules

- Pass side="start" for a panel on the left and side="end" for one on the right: the chevron points toward that edge to fold and away from it to unfold.
- Pass label with the name of the panel, such as profiles: the button reads Hide profiles or Show profiles.
- Pass controls with the id of the panel, and collapsed with onToggle from the state that folds it.
- In a pane, place it beside the edge line of the panel, level with its heading, with a 4 px gap (--space-xs) between the line and the button; SidePanel, ListDetailLayout and SplitPane do this for you through their edge. Only the navigation panel SideNav keeps it half over its border.
- Prefer SidePanel; a panel of your own folds to its rail: the sunken surface, --side-nav-w wide, the title written sideways.
- Use it as it is: it draws at 24 px and takes clicks on 28 by 28 px, and the chevron turns on its own.

## Accessibility

- It is a button named Hide or Show and the panel name, with aria-expanded and aria-controls.
- The name shows as a tooltip; the chevron is hidden from screen readers.
- Keep focus on it when the panel folds, as SidePanel, ListDetailLayout and SideNav do.

## Example

```tsx
import { CollapseToggle } from '@drizztdourden08/tessera';
import { useId, useState } from 'react';
import type { ReactNode } from 'react';

const ProfileRail = ({ children }: { children: ReactNode }) => {
  const [collapsed, setCollapsed] = useState(false);
  const id = useId();
  return (
    <div className="profile-rail" id={id}>
      <CollapseToggle collapsed={collapsed} onToggle={() => setCollapsed(!collapsed)} label="profiles" controls={id} className="profile-rail__toggle" />
      {!collapsed && children}
    </div>
  );
};
```

## Props

- `collapsed`: `boolean`.
- `onToggle`: `() => void`.
- `label`: `string`.
- `side` (optional): `CollapseToggleSide`, one of `'start'`, `'end'`. Default `'start'`.
- `controls` (optional): `string`.
- `ref` (optional): `Ref<HTMLButtonElement>`.
- `className` (optional): `string`.

## Tokens

It draws on `--transition-fast`.
