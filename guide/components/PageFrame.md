# PageFrame

A full-height, padded page that scrolls inside its own frame, for a web app whose html and body stay locked.

Import it from `@drizztdourden08/tessera`. It is also exported from `@drizztdourden08/tessera/primitives`.

```tsx
import { PageFrame } from '@drizztdourden08/tessera';
```

The source is `src/primitives/PageFrame/PageFrame.tsx`. Its gallery page is Primitives · Layout/PageFrame (`#/story/primitives-pageframe--overview`).

## Where the questions lead here

What are you placing? Layout. What are you arranging? A full-height page that scrolls inside one frame.

PageFrame is the page of an app that keeps the root locked; PageRoot is the page of a site that scrolls the document.

## Use it when

- A web app screen is longer than the window and the frame, not the document, should scroll, such as a settings or account page.
- The content should sit in a column of a set width, centred in a wide window.

## Use something else when

- A website page should scroll with the document, with its own scrollbar and a full-bleed Hero. Use [PageRoot](PageRoot.md) instead.
- Only a box inside a screen scrolls, such as a list or a log. Use [ScrollArea](ScrollArea.md) instead.

## Rules

- It is the scroller: the reset keeps html and body locked and the frame is 100dvh tall, so the page behind it never moves.
- Set fill to take the height of its parent instead of the window, such as a page inside a pane.
- Set width to sm, md or lg to centre the content in a column of that size; leave it out for the full width.
- Set padding to md for a 16px page padding in place of the 24px default.
- The padding is the page padding token. It is a ScrollArea, so it takes className and the other ScrollArea props except axis, gutter included: set gutter stable when the page reflows with width.
- PageFrame keeps the root locked and scrolls inside one frame; PageRoot instead lets the whole document scroll.

## Accessibility

- It adds no role, so put a main landmark inside it.
- The frame is a scrolling region the keyboard can scroll once it has focus; give it tabIndex 0 when it holds no focusable content.

## Example

```tsx
import { PageFrame, Title } from '@drizztdourden08/tessera';

const AccountPage = () => (
  <PageFrame width="md">
    <Title>Account</Title>
  </PageFrame>
);
```

## Props

- `width` (optional): `PageFrameWidth`, one of `'sm'`, `'md'`, `'lg'`.
- `padding` (optional): `PageFramePadding`, one of `'md'`, `'lg'`. Default `'lg'`.
- `fill` (optional): `boolean`. Default `false`.
- `children` (optional): `ReactNode`.
- `onScroll` (optional): `(position: ScrollPosition) => void`.
- `fade` (optional): `boolean`.
- `scrollbar` (optional): `ScrollAreaScrollbar`, one of `'native'`, `'slim'`.
- `thumb` (optional): `ScrollAreaThumb`, one of `'always'`, `'auto'`.
- `gutter` (optional): `ScrollAreaGutter`, one of `'auto'`, `'stable'`.
- `scrollTo` (optional): `Partial<ScrollPosition>`.

It also takes the 278 attributes it inherits through `Omit<ScrollAreaProps, 'axis' | 'children'>`, `Omit<ComponentPropsWithRef<'div'>, 'onScroll'>`.

## Tokens

It draws on `--page-frame-w-lg`, `--page-frame-w-md`, `--page-frame-w-sm`, `--space-lg`, `--space-xl`.
