/* @layer renderer-components @kind data */
import type { ComponentUsage } from '../../guide/usage.type';

const usage = {
  job: 'Shows one slide at a time from a set, with dots and arrows to move between them, and can turn to the next slide by itself.',
  useWhen: [
    'A home page shows a few featured items in one banner, such as the featured packs of a store.',
    'A small card turns through tips, news or pictures of one pack.',
  ],
  avoidWhen: [
    { case: 'Every item should be seen at once.', use: 'ItemCard' },
    { case: 'Each slide has a name the user picks.', use: 'Tabs' },
    { case: 'A picture or a video is opened large.', use: 'MediaViewer' },
  ],
  rules: [
    'Pass slides as id, label and content; content can be any node, such as a Hero, a Card or an Image.',
    'Write label as the name a screen reader hears for the slide, such as the name of the pack.',
    'Pass turnEvery in milliseconds to turn by itself, 8000 or more; leave it out for a set the user turns by hand.',
    'Pass index and onIndexChange when the app keeps the place, or defaultIndex to start on another slide.',
    'Keep slides about the same height: the box takes the tallest, so the page never jumps.',
  ],
  a11y: [
    'The box is a region named by label, with the carousel role description; each slide is a group named 2 of 3 and its label.',
    'It stops turning under the pointer, while focus is inside, on a hidden tab, off screen and with reduced motion; the stop button stops it for good.',
    'Slides are a polite live region only while it does not turn, so a screen reader hears a slide when a person moves it.',
    'Hidden slides are inert, so Tab never lands in a slide that is not shown.',
  ],
  tree: {
    path: ['layout', 'one slide at a time from a set'],
    rule: 'Carousel shows one slide at a time with dots and arrows, and can turn by itself.',
  },
  example: `import { Carousel, Hero } from '@drizztdourden08/tessera';

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
`,
  propsHash: 'f3fd5dbba3660b5d',
} satisfies ComponentUsage;

export { usage };
