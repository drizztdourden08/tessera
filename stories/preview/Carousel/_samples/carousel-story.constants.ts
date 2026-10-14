/* @layer stories @kind data */
import type { PreviewCardEntry } from '../../_shared/preview-card.type';

const FEATURED_TEXT = {
  label: 'Featured',
  eyebrow: 'Featured',
  install: 'Install in the app',
  open: 'Open',
  by: (author: string) => `By ${author}.`,
} as const;

const TIPS_TEXT = { title: 'Tips' } as const;

const TIPS = [
  { title: 'Save anywhere', text: 'Press F1 at any time to make a save state, and F2 to load it again.' },
  { title: 'Swap the music', text: 'Music packs from the Hookshop change every track, and you can switch packs while you play.' },
  { title: 'Play together', text: 'Join a multiworld from the Sessions page: your items can turn up in a friend\'s game.' },
] as const;

const CAROUSEL_MAPPING: readonly PreviewCardEntry[] = [
  { name: 'RotP FeaturedHero', badge: 'Replaced', tone: 'warning', text: 'The banner on the Hookshop home page that turns through the featured packs every eight seconds, with dots. It becomes a Carousel of Hero slides.' },
  { name: 'RotP useRotation', badge: 'Replaced', tone: 'warning', text: 'Its timer, which stops under the pointer and on focus. It moves into Carousel, which also stops on a hidden tab and off screen.' },
  { name: 'Hero', badge: 'Stays', tone: 'success', text: 'Each featured slide is a Hero with the pack picture behind it. Hero gains nothing.' },
  { name: 'Grid and ItemCard', badge: 'Not a fit', text: 'They show every item at once. A carousel shows one at a time in the same room.' },
  { name: 'Image', badge: 'Not a fit', text: 'One picture. A carousel can hold pictures, but also any other slide.' },
];

const CAROUSEL_CHOICES: readonly PreviewCardEntry[] = [
  {
    name: 'A. Carousel, a new part for any slides',
    badge: 'Recommended', tone: 'success',
    text: 'One slide at a time with dots and arrows; it can turn by itself, with a button to stop it, and never turns under the pointer, on focus, on a hidden tab or with reduced motion. Store banners, tips and picture sets all use it.',
  },
  {
    name: 'B. A slides prop on Hero',
    badge: 'Considered',
    text: 'Hero takes several slides and turns through them. Smaller, but only banners could turn, and a set of tips or pictures would need its own copy.',
  },
  {
    name: 'C. Keep it in RotP',
    badge: 'Considered',
    text: 'Only the Hookshop home page turns today. Tessera stays smaller, but the next app writes its own timer and dots, and RotP\'s has no stop button.',
  },
];

const CAROUSEL_CODE = `import { Carousel, Hero } from '@drizztdourden08/tessera';

<Carousel
  label="Featured"
  turnEvery={8000}
  slides={featured.map((item) => ({
    id: item.id,
    label: item.name,
    content: <Hero eyebrow="Featured" title={item.name} backdrop={{ kind: 'image', src: item.banner }} actions={buttons(item)} />,
  }))}
/>`;

export { CAROUSEL_CHOICES, CAROUSEL_CODE, CAROUSEL_MAPPING, FEATURED_TEXT, TIPS, TIPS_TEXT };
