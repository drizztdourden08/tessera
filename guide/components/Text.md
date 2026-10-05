# Text

Interface text in a role, such as a title, a caption or an overline, and the namespace for every text element, such as Text.P or Text.Strong.

Import it from `@drizztdourden08/tessera`. It is also exported from `@drizztdourden08/tessera/primitives`.

```tsx
import { Text } from '@drizztdourden08/tessera';
```

The source is `src/primitives/Text/Text.tsx`. Its gallery page is Core · Text/Text (`#/story/text-text--overview`).

## Where the questions lead here

What are you placing? Text. What kind of text? Running text.

Text sets interface copy in a role from the scale, and its members draw each text element.

## Use it when

- A label, a caption or a short line of interface copy needs a size and a colour from the scale.
- Running text uses the elements under Text, such as Text.P, Text.Strong or Text.Code.

## Use something else when

- A heading that names a page or a section. Use `Title` instead.
- A section title with an action beside it. Use `SectionHeader` instead.

## Rules

- Pick the role with variant: title, subtitle, body, label, caption, or overline over a group; with no variant it takes the size and colour of its parent.
- Colour it with tone, as on Span: muted for quiet captions, danger for an error.
- Use the faint tone for decoration and secondary hints only, such as a keyboard hint beside a field or a watermark; never for text people must read. It measures about 1.6:1 on the surface (1.5:1 to 1.7:1 across the app palettes), under the 4.5:1 that body text needs, so the quietest tone for text is muted.
- The parts of Tessera use muted, never faint; faint is there only for an app that asks for it.
- Set mono for file names, seeds and addresses, and numeric for times and counts that line up.

## Accessibility

- It renders a span unless as names another element; pick p, label or a heading element when the text has that role.
- Faint text fails the contrast a reader needs, so nothing a user must read or act on may use it.

## Example

```tsx
import { Text } from '@drizztdourden08/tessera';

const SyncLine = () => (
  <Text.P>
    <Text variant="caption" tone="muted">Last synced 12 seconds ago</Text>
    <Text variant="caption" tone="faint"> · Hold Shift to snap</Text>
  </Text.P>
);
```

## Props

- `as` (optional): `ElementType`.
- `variant` (optional): `TextVariant`, one of `'body'`, `'label'`, `'title'`, `'subtitle'`, `'caption'`, `'overline'`.
- `tone` (optional): `TextTone | 'faint'`, one of `'danger'`, `'dim'`, `'faint'`, `'info'`, `'muted'`, `'primary'`, `'secondary'`, `'success'`, `'tertiary'`, `'warning'`.
- `mono` (optional): `boolean`.
- `numeric` (optional): `boolean`.
- `children` (optional): `ReactNode`.
- `weight` (optional): `number`.
- `italic` (optional): `boolean`.
- `opticalSize` (optional): `OpticalSize`.
- `features` (optional): `readonly TypeFeature[]`.

It also takes the 277 attributes it inherits through `HTMLAttributes<HTMLElement>`.

## Tokens

It draws on `--c-danger`, `--c-info`, `--c-primary`, `--c-secondary`, `--c-success`, `--c-tertiary`, `--c-text`, `--c-text-dim`, `--c-text-faint`, `--c-text-muted`, `--c-warning`, `--font-mono`, `--text-base`, `--text-lg`, `--text-sm`, `--text-xs`, `--tracking-caps`, `--weight-semi`.

## Also exported from this folder

`featureSettings`, `typesettingStyle`.
