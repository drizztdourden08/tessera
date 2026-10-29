# ContentHeader

The big header of a content container: an icon and a title over a fading backdrop, with a strip of controls after the title and actions at the end.

Import it from `@drizztdourden08/tessera`. It is also exported from `@drizztdourden08/tessera/composites`.

```tsx
import { ContentHeader } from '@drizztdourden08/tessera';
```

The source is `src/composites/ContentHeader/ContentHeader.tsx`. Its gallery page is Composites · Layout/ContentHeader (`#/story/composites-contentheader--overview`).

## Where the questions lead here

What are you placing? Layout. What are you arranging? A header with an icon and a title over a block.

ContentHeader is the header with an icon, a title and a backdrop that any container can carry.

## Use it when

- A card, a panel or a page needs a header that names it, with an icon and a title.
- Section pills or a status sit right after the title, and a few buttons at the end.

## Use something else when

- A small heading row inside a panel, with a subtitle and one action. Use `SectionHeader` instead.
- The title bar of a window, dialog or drawer, with a close button. Use `WindowHeader` instead.
- A whole page with a header over a body that scrolls. Use [ScreenPage](ScreenPage.md) instead.

## Rules

- Leave backdrop out for the default art, pass a scene of your own, or pass null for a plain header. For an image or a colour, pass a BackdropLayer.
- Use strip for a few controls after the title, such as HeaderAnchorNav pills, and actions for the end.
- Set variant to plain for a title row with no panel: no backdrop, no gradient and no bottom border.
- Set compact once the content under it scrolls; it shrinks to a slim row.
- On a sub-page, pass back: label names the parent page and onSelect returns to it. It reads Back to and the label, or Back alone with no label, before the icon, and folds to an arrow when the row has no room for it.
- Level sets the heading tag, h2 by default; pick the level that fits the page outline.
- For the header of one subject, such as a sprite or a project, put its kind as a Tag, its path as a Link and its marks as Badge nodes in strip, and a pin Toggle in actions.

## Accessibility

- The title is a real heading; pass titleId to name the container with aria-labelledby.
- With live, a screen reader reads each new title, as a status does.
- The icon is hidden from screen readers; the title carries the name.
- The back button sits outside the heading, so the title stays the name of the page. Folded, the arrow keeps Back to and the page name as its label and shows them as a tooltip.

## Example

```tsx
import { Badge, ContentHeader, HeaderAnchorNav, Icon, Link, Tag, Toggle } from '@drizztdourden08/tessera';

const GeneralHeader = ({ section, onSection }: { section: string; onSection: (id: string) => void }) => (
  <ContentHeader
    icon={<Icon name="settings" />}
    title="General"
    strip={<HeaderAnchorNav items={[{ id: 'startup', label: 'Startup' }, { id: 'tray', label: 'Tray' }]} activeId={section} onSelect={onSection} ariaLabel="General sections" />}
  />
);

interface SubjectHeaderProps {
  name: string;
  path: string;
  pinned: boolean;
  onPin: (pinned: boolean) => void;
  openFolder: (path: string) => void;
}

const SubjectHeader = ({ name, path, pinned, onPin, openFolder }: SubjectHeaderProps) => (
  <ContentHeader
    icon={<Icon name="image" />}
    title={name}
    strip={
      <>
        <Tag>Sprite</Tag>
        <Link variant="subtle" href={path} navigate={openFolder}>{path}</Link>
        <Badge variant="inline" value={3} label="Frame count" />
      </>
    }
    actions={<Toggle checked={pinned} onChange={onPin} aria-label="Pin to the sidebar" size="sm" />}
  />
);
```

## Props

- `title`: `ReactNode`.
- `icon` (optional): `ReactNode`.
- `back` (optional): `BackAction`.
- `backdrop` (optional): `ReactNode`.
- `strip` (optional): `ReactNode`.
- `actions` (optional): `ReactNode`.
- `compact` (optional): `boolean`. Default `false`.
- `variant` (optional): `ContentHeaderVariant`, one of `'panel'`, `'plain'`.
- `level` (optional): `ContentHeaderLevel`, one of `1`, `2`, `3`, `4`. Default `2`.
- `titleId` (optional): `string`.
- `live` (optional): `boolean`. Default `false`.
- `className` (optional): `string`.

## Tokens

It draws on `--blur-glow`, `--border-width-thin`, `--c-border`, `--c-layer`, `--c-primary`, `--c-primary-bright`, `--c-primary-dim`, `--c-secondary`, `--c-text`, `--c-text-dim`, `--size-40`, `--size-64`, `--space-md`, `--space-xl`, `--text-2xl`, `--text-lg`, `--text-xl`, `--transition-fast`, `--weight-bold`.
