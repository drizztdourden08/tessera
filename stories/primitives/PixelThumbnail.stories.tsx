/* @layer stories @kind story */
import type { StoryLiteMeta, StoryLiteStoryDefinition } from '@storylite/storylite';
import { PixelThumbnail } from '../../src/primitives';
import type { PixelThumbnailBackdrop, PixelThumbnailFit } from '../../src/primitives';
import { axis } from '../_template/axis';
import type { PlaygroundArgTypes, PlaygroundStory } from '../_template/controls/playground.type';
import { Demonstrator } from '../_template/Demonstrator';
import { overviewStory } from '../_template/overview-story';
import type { StateProps } from '../_template/states/states.type';
import { discImage } from './_samples/disc-image';
import { heartFrames } from './_samples/heart-frames';
import { PixelThumbnailBoxes } from './_samples/PixelThumbnailBoxes';
import { PixelThumbnailFluid } from './_samples/PixelThumbnailFluid';
import { PixelThumbnailShrunk } from './_samples/PixelThumbnailShrunk';
import { DISC_SIZE, HEART_INDEXED, THUMBNAIL_ALL_BOX_KEYS, THUMBNAIL_ALL_BOXES } from './_samples/pixel-samples.constants';
import './PixelThumbnail.stories.css';

type Picture = 'heart' | 'badge' | 'none';

type PixelThumbnailArgs = {
  picture: Picture;
  box: string;
  fit: PixelThumbnailFit;
  backdrop: PixelThumbnailBackdrop;
  animated: boolean;
  playing: boolean;
  label: string;
};

const PICTURES: readonly Picture[] = ['heart', 'badge', 'none'];

const FITS: readonly PixelThumbnailFit[] = ['step', 'contain'];

const BACKDROPS: readonly PixelThumbnailBackdrop[] = ['checker', 'none'];

const DISC = discImage(DISC_SIZE);

const BEAT = heartFrames();

const ARGS: Partial<PixelThumbnailArgs> = {
  picture: 'heart', box: '40', fit: 'step', backdrop: 'checker', animated: false, playing: true, label: 'A heart',
};

const ARG_TYPES: PlaygroundArgTypes<PixelThumbnailArgs> = {
  picture: { group: 'Content', control: 'select', options: [...PICTURES], description: 'None clears the box and keeps the checker.' },
  label: { group: 'Content', control: 'text', description: 'Names the picture. Empty keeps it decorative.' },
  box: { group: 'Appearance', control: 'select', options: [...THUMBNAIL_ALL_BOX_KEYS], description: 'Fluid fills the width of its container.' },
  fit: { group: 'Appearance', control: 'select', options: [...FITS], description: 'Step scales up in whole numbers; contain takes any scale.' },
  backdrop: { group: 'Appearance', control: 'select', options: [...BACKDROPS] },
  animated: { group: 'Motion', control: 'boolean', description: 'Uses four frames instead of the picture.' },
  playing: { group: 'Motion', control: 'boolean', description: 'Plays the frames in a loop. Reduced motion shows the first frame.' },
};

const meta = {
  title: 'Primitives · Display/PixelThumbnail',
  parameters: { renderer: 'react' },
} satisfies StoryLiteMeta<PixelThumbnailArgs>;

const Playground = {
  name: 'Playground',
  args: ARGS,
  argTypes: ARG_TYPES,
  render: (args) => (
    <PixelThumbnail
      indexed={args.picture === 'heart' ? HEART_INDEXED : undefined}
      image={args.picture === 'badge' ? DISC : null}
      frames={args.animated ? BEAT : undefined}
      playing={args.playing}
      box={THUMBNAIL_ALL_BOXES[args.box]}
      fit={args.fit}
      backdrop={args.backdrop}
      label={args.label || undefined}
    />
  ),
} satisfies PlaygroundStory<PixelThumbnailArgs>;

const Boxes = {
  name: 'Boxes and fits',
  render: () => <PixelThumbnailBoxes />,
} satisfies StoryLiteStoryDefinition<PixelThumbnailArgs>;

const Shrunk = {
  name: 'A larger picture shrinks',
  render: () => <PixelThumbnailShrunk />,
} satisfies StoryLiteStoryDefinition<PixelThumbnailArgs>;

const Fluid = {
  name: 'Wide and fluid',
  render: () => <PixelThumbnailFluid />,
} satisfies StoryLiteStoryDefinition<PixelThumbnailArgs>;

const MOTION = ['stopped', 'playing'] as const;

const Animated = {
  name: 'Frames',
  render: () => (
    <Demonstrator
      columns={axis(MOTION)}
      valign="end"
      cell={(_row, motion) => <PixelThumbnail frames={BEAT} playing={motion === 'playing'} box={40} label="A beating heart" />}
    />
  ),
} satisfies StoryLiteStoryDefinition<PixelThumbnailArgs>;

const renderState = (props: StateProps) => (
  <PixelThumbnail indexed={HEART_INDEXED} box={40} label="A heart" {...props} />
);

const Overview = overviewStory({
  component: 'PixelThumbnail',
  description: 'A small square that draws a pixel picture crisp, with a checker behind the clear pixels.',
  points: [
    '`image` takes RGBA bytes and `indexed` takes palette pixels; `null` clears the box.',
    '`box` sets the square, 16 to 256 px, or `fluid` to fill the container; `step` keeps whole-number scales.',
    '`lazy` draws when the box scrolls into view; `throttleMs` spaces redraws of a live source.',
    '`frames` and `playing` loop a short animation; reduced motion keeps the first frame.',
    'With no `label` it is hidden from screen readers, since the row or tile names the picture.',
  ],
  instead: '[Image] for a file or URL.',
  playground: Playground,
  variants: [Boxes, Shrunk, Fluid, Animated],
  states: {
    render: renderState,
    list: [
      { name: 'Drawn' },
      { name: 'Empty', props: { indexed: undefined, image: null } },
      { name: 'Lazy', props: { lazy: true } },
      { name: 'Animating', props: { indexed: undefined, frames: BEAT, playing: true } },
      { name: 'Dimmed', props: { className: 'pixel-thumbnail-demo--dimmed' } },
    ],
  },
});

export default meta;
export { Animated, Boxes, Fluid, Overview, Playground, Shrunk };
