/* @layer stories @kind data */
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

export { CAROUSEL_CODE, FEATURED_TEXT, TIPS, TIPS_TEXT };
