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
- Use the faint tone for the quietest text, such as a keyboard hint beside a field. It stays at or above 4.5:1 on the main ground, but it is dimmer than muted, so keep it to short secondary hints.
- Never colour text with --c-text-disabled; it is under 2:1 and only for text inside a disabled control, borders and decoration.
- Set size md for the 13 px step between the small and base sizes, such as a dense row of values; with no size the variant sets it.
- Set size lead for the 15 px step between the base and large sizes.
- Set leading 16 to fix the line height at 16 px, so a caption in a card head row stays one 16 px line beside a 2xs IconButton and an Icon with a hue.
- Set font title to draw the text in the title face at weight 600 without changing its size, such as a 14 px name in a list; weight still overrides the 600.
- Set smartTimes to draw a multiplication sign for an x between two digits, as in a size written 1920x1080; only text children change, and a nested element is left as it is.
- Set clamp to a line count to cut longer text with an ellipsis; the full text shows in a tooltip only when it is cut.
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
- `size` (optional): `TextSize`, one of `'md'`, `'lead'`.
- `font` (optional): `TextFont`.
- `leading` (optional): `TextLeading`.
- `tone` (optional): `TextTone | 'faint'`, one of `'danger'`, `'dim'`, `'faint'`, `'info'`, `'muted'`, `'primary'`, `'secondary'`, `'success'`, `'tertiary'`, `'warning'`.
- `mono` (optional): `boolean`.
- `numeric` (optional): `boolean`.
- `smartTimes` (optional): `boolean`.
- `clamp` (optional): `number`.
- `children` (optional): `ReactNode`.
- `weight` (optional): `number`.
- `italic` (optional): `boolean`.
- `opticalSize` (optional): `OpticalSize`.
- `features` (optional): `readonly TypeFeature[]`.

It also takes the 277 attributes it inherits through `HTMLAttributes<HTMLElement>`.

## Tokens

It draws on `--c-danger`, `--c-info`, `--c-primary-text`, `--c-secondary`, `--c-success`, `--c-tertiary`, `--c-text`, `--c-text-dim`, `--c-text-faint`, `--c-text-muted`, `--c-warning`, `--font-mono`, `--font-title`, `--leading-16`, `--text-base`, `--text-lead`, `--text-lg`, `--text-md`, `--text-sm`, `--text-xs`, `--tracking-caps`, `--weight-semi`.

## Also exported from this folder

`featureSettings`, `typesettingStyle`.
