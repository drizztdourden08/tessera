# Carousel

Shows one slide at a time from a set, with dots and arrows to move between them, and can turn to the next slide by itself.

Import it from `@drizztdourden08/tessera`. It is also exported from `@drizztdourden08/tessera/composites`.

```tsx
import { Carousel } from '@drizztdourden08/tessera';
```

The source is `src/composites/Carousel/Carousel.tsx`. Its gallery page is Composites · Content/Carousel (`#/story/composites-carousel--overview`).

## Where the questions lead here

What are you placing? Layout. What are you arranging? One slide at a time from a set.

Carousel shows one slide at a time with dots and arrows, and can turn by itself.

## Use it when

- A home page shows a few featured items in one banner, such as the featured packs of a store.
- A small card turns through tips, news or pictures of one pack.

## Use something else when

- Every item should be seen at once. Use [ItemCard](ItemCard.md) instead.
- Each slide has a name the user picks. Use `Tabs` instead.
- A picture or a video is opened large. Use [MediaViewer](MediaViewer.md) instead.

## Rules

- Pass slides as id, label and content; content can be any node, such as a Hero, a Card or an Image.
- Write label as the name a screen reader hears for the slide, such as the name of the pack.
- Pass turnEvery in milliseconds to turn by itself, 8000 or more; leave it out for a set the user turns by hand.
- Pass index and onIndexChange when the app keeps the place, or defaultIndex to start on another slide.
- Keep slides about the same height: the box takes the tallest, so the page never jumps.

## Accessibility

- The box is a region named by label, with the carousel role description; each slide is a group named 2 of 3 and its label.
- It stops turning under the pointer, while focus is inside, on a hidden tab, off screen and with reduced motion; the stop button stops it for good.
- Slides are a polite live region only while it does not turn, so a screen reader hears a slide when a person moves it.
- Hidden slides are inert, so Tab never lands in a slide that is not shown.

## Example

```tsx
import { Carousel, Hero } from '@drizztdourden08/tessera';

interface Featured {
  id: string;
  name: string;
  banner: string;
}

const FeaturedPacks = ({ items }: { items: readonly Featured[] }) => (
  <Carousel
    label="Featured"
    turnEvery={8000}
    slides={items.map((item) => ({
      id: item.id,
      label: item.name,
      content: <Hero eyebrow="Featured" title={item.name} backdrop={{ kind: 'image', src: item.banner }} />,
    }))}
  />
);
```

## Props

- `slides`: `readonly CarouselSlide[]`.
- `label`: `string`.
- `index` (optional): `number`.
- `defaultIndex` (optional): `number`. Default `0`.
- `onIndexChange` (optional): `(index: number) => void`.
- `turnEvery` (optional): `number | null`. Default `null`.
- `className` (optional): `string`.

## Tokens

It draws on `--border-width-thick`, `--c-focus`, `--c-primary`, `--c-text-dim`, `--c-text-muted`, `--duration-fast`, `--duration-normal`, `--ease-standard`, `--radius-pill`, `--size-24`, `--size-8`, `--space-sm`, `--space-xs`.
