/* @layer stories @kind story */
import type { StoryLiteMeta, StoryLiteStoryDefinition } from '@storylite/storylite';
import { PixelPlayer } from '../../src/composites';
import type { PixelPlayerBackdrop, PixelPlayerDirection, PixelPlayerMode } from '../../src/composites';
import { axis } from '../_template/axis';
import type { PlaygroundArgTypes, PlaygroundStory } from '../_template/controls/playground.type';
import { Demonstrator } from '../_template/Demonstrator';
import { overviewStory } from '../_template/overview-story';
import type { StateProps } from '../_template/states/states.type';
import { heartFrames } from '../primitives/_samples/heart-frames';
import { HEART_CELLS, HEART_TAGS, PLAYER_DIRECTIONS, PLAYER_ZOOMS } from './_samples/pixel-player-samples.constants';

type Pictures = 'animation' | 'still' | 'none';

type PixelPlayerArgs = {
  pictures: Pictures;
  mode: PixelPlayerMode;
  zoom: (typeof PLAYER_ZOOMS)[number];
  backdrop: PixelPlayerBackdrop;
  direction: PixelPlayerDirection;
  repeat: number;
  tags: boolean;
  cells: boolean;
  controls: boolean;
  autoPlay: boolean;
};

const FRAMES = heartFrames();

const PICTURES: Readonly<Record<Pictures, typeof FRAMES>> = { animation: FRAMES, still: FRAMES.slice(0, 1), none: [] };

const MODES: readonly PixelPlayerMode[] = ['large', 'compact'];

const BACKDROPS: readonly PixelPlayerBackdrop[] = ['checker', 'none'];

const ARGS: Partial<PixelPlayerArgs> = {
  pictures: 'animation', mode: 'large', zoom: 'fit', backdrop: 'checker', direction: 'forward', repeat: 0, tags: true, cells: false, controls: true, autoPlay: false,
};

const ARG_TYPES: PlaygroundArgTypes<PixelPlayerArgs> = {
  pictures: { group: 'Content', control: 'select', options: ['animation', 'still', 'none'], description: 'One frame is a still. None shows the placeholder.' },
  tags: { group: 'Content', control: 'boolean', description: 'Two named ranges of frames, with a picker in the bar.' },
  cells: { group: 'Content', control: 'boolean', description: 'Two cells that outline and show a caption on hover.' },
  mode: { group: 'Appearance', control: 'select', options: [...MODES], description: 'Compact hides the bar and the counter.' },
  zoom: { group: 'Appearance', control: 'select', options: [...PLAYER_ZOOMS], description: 'Fit is the largest whole number that fits the stage.' },
  backdrop: { group: 'Appearance', control: 'select', options: [...BACKDROPS] },
  controls: { group: 'Appearance', control: 'boolean' },
  direction: { group: 'Behaviour', control: 'select', options: [...PLAYER_DIRECTIONS] },
  repeat: { group: 'Behaviour', control: 'range', min: 0, max: 5, step: 1, description: '0 runs forever; a count ends on Replay.' },
  autoPlay: { group: 'Behaviour', control: 'boolean', description: 'Reduced motion waits for Play.' },
};

const meta = {
  title: 'Composites · Content/PixelPlayer',
  parameters: { renderer: 'react' },
} satisfies StoryLiteMeta<PixelPlayerArgs>;

const Playground = {
  name: 'Playground',
  args: ARGS,
  argTypes: ARG_TYPES,
  render: (args) => (
    <PixelPlayer
      key={`${args.pictures}-${args.direction}-${args.repeat}`}
      label="A heart that changes colour"
      frames={PICTURES[args.pictures]}
      mode={args.mode}
      zoom={args.zoom === 'fit' ? 'fit' : Number(args.zoom)}
      backdrop={args.backdrop}
      loop={{ direction: args.direction, repeat: args.repeat }}
      tags={args.tags ? HEART_TAGS : undefined}
      cells={args.cells ? HEART_CELLS : undefined}
      controls={args.controls}
      autoPlay={args.autoPlay}
    />
  ),
} satisfies PlaygroundStory<PixelPlayerArgs>;

const Modes = {
  name: 'Large and compact',
  render: () => (
    <Demonstrator
      columns={axis(MODES)}
      cell={(_row, mode) => <PixelPlayer label="A heart that changes colour" frames={FRAMES} mode={mode} autoPlay />}
    />
  ),
} satisfies StoryLiteStoryDefinition<PixelPlayerArgs>;

const Loops = {
  name: 'Loop directions',
  render: () => (
    <Demonstrator
      columns={axis(PLAYER_DIRECTIONS)}
      cell={(_row, direction) => (
        <PixelPlayer label={`A heart, ${direction}`} frames={FRAMES} mode="compact" loop={{ direction, repeat: 0 }} autoPlay />
      )}
    />
  ),
} satisfies StoryLiteStoryDefinition<PixelPlayerArgs>;

const Ranges = {
  name: 'Named ranges',
  render: () => <PixelPlayer label="A heart in two ranges" frames={FRAMES} tags={HEART_TAGS} />,
} satisfies StoryLiteStoryDefinition<PixelPlayerArgs>;

const Cells = {
  name: 'Cells outline on hover',
  render: () => <PixelPlayer label="A heart in two cells" frames={FRAMES.slice(0, 1)} cells={HEART_CELLS} zoom={16} />,
} satisfies StoryLiteStoryDefinition<PixelPlayerArgs>;

const renderState = (props: StateProps) => <PixelPlayer label="A heart that changes colour" frames={FRAMES} {...props} />;

const Overview = overviewStory({
  component: 'PixelPlayer',
  description: 'Plays a pixel animation inline, drawn crisp at a whole-number zoom, with a bar, frame ranges and keys.',
  points: [
    '`frames` carry a picture and a duration; one frame is a still with no bar and no counter.',
    '`zoom="fit"` takes the largest whole number that fits the stage, never below 1, and shows it in a corner.',
    '`loop` runs forward, reverse, ping pong or ping pong reverse; `repeat` 0 runs forever.',
    '`tags` limit play to one range, and `cells` outline on hover and report the cell.',
    'Space plays, Left and Right step, Home and End jump; reduced motion never starts by itself.',
  ],
  instead: '[PixelThumbnail] for a small square in a row or tile.',
  playground: Playground,
  variants: [Modes, Loops, Ranges, Cells],
  states: {
    render: renderState,
    list: [
      { name: 'Stopped at start' },
      { name: 'Playing', props: { autoPlay: true } },
      { name: 'Finished', props: { autoPlay: true, loop: { direction: 'forward', repeat: 1 } } },
      { name: 'Still', props: { frames: FRAMES.slice(0, 1) } },
      { name: 'Empty', props: { frames: [] } },
      { name: 'Tag chosen', props: { tags: HEART_TAGS, tagId: 'cool' } },
      { name: 'Compact', props: { mode: 'compact' } },
    ],
  },
});

export default meta;
export { Cells, Loops, Modes, Overview, Playground, Ranges };
