/* @layer stories @kind story */
import type { StoryLiteMeta, StoryLiteStoryDefinition } from '@storylite/storylite';
import type { PlaygroundArgTypes, PlaygroundStory } from '../_template/controls/playground.type';
import { Box, SpeechBubble } from '../../src/primitives';
import type { CalloutTone, SpeechBubblePointer } from '../../src/primitives';
import { axis } from '../_template/axis';
import { Demonstrator } from '../_template/Demonstrator';
import { overviewStory } from '../_template/overview-story';
import { MascotPaletteTip } from './_samples/MascotPaletteTip';
import './SpeechBubble.stories.css';

type SpeechBubbleArgs = {
  text: string;
  tone: 'none' | CalloutTone;
  pointer: SpeechBubblePointer;
  pointerOffset: number;
  maxWidth: number;
};

const SIDES: readonly SpeechBubblePointer[] = ['top', 'bottom', 'left', 'right'];

const TONES: readonly CalloutTone[] = ['primary', 'info', 'success', 'warning', 'danger'];

const TEXT = 'Type to search screens, settings and actions.';

const ARGS: Partial<SpeechBubbleArgs> = { text: TEXT, tone: 'none', pointer: 'bottom', pointerOffset: 32, maxWidth: 240 };

const ARG_TYPES: PlaygroundArgTypes<SpeechBubbleArgs> = {
  text: { group: 'Content', control: 'text' },
  tone: { group: 'Appearance', control: 'select', options: ['none', ...TONES, 'secondary'] },
  pointer: { group: 'Appearance', control: 'select', options: [...SIDES, 'none'] },
  pointerOffset: { group: 'Appearance', control: 'number', description: 'Pixels from the start of the edge the tail sits on' },
  maxWidth: { group: 'Layout', control: 'number', description: 'The widest the bubble grows, in pixels' },
};

const meta = {
  title: 'Primitives · Feedback/SpeechBubble',
  parameters: { renderer: 'react' },
} satisfies StoryLiteMeta<SpeechBubbleArgs>;

const Playground = {
  name: 'Playground',
  args: ARGS,
  argTypes: ARG_TYPES,
  render: (args) => (
    <Box className="speech-bubble-story__room">
      <SpeechBubble
        tone={args.tone === 'none' ? undefined : args.tone}
        pointer={args.pointer}
        pointerOffset={args.pointerOffset}
        maxWidth={args.maxWidth}
      >
        {args.text}
      </SpeechBubble>
    </Box>
  ),
} satisfies PlaygroundStory<SpeechBubbleArgs>;

const Sides = {
  name: 'The four pointer sides',
  render: () => (
    <Demonstrator
      rows={axis(SIDES)}
      align="start"
      cell={(side) => <Box className="speech-bubble-story__room"><SpeechBubble pointer={side} maxWidth={240}>{`The tail is on the ${side} edge.`}</SpeechBubble></Box>}
    />
  ),
} satisfies StoryLiteStoryDefinition<SpeechBubbleArgs>;

const Tones = {
  name: 'Tones, with a tail',
  render: () => (
    <Demonstrator
      rows={axis(TONES)}
      align="start"
      cell={(tone) => <Box className="speech-bubble-story__room"><SpeechBubble tone={tone} pointer="left" maxWidth={240}>{`A ${tone} bubble.`}</SpeechBubble></Box>}
    />
  ),
} satisfies StoryLiteStoryDefinition<SpeechBubbleArgs>;

const Offset = {
  name: 'Tail moved along the edge',
  render: () => (
    <Box className="speech-bubble-story__room">
      <SpeechBubble pointer="bottom" pointerOffset={24} maxWidth={240}>The tail starts 24 pixels from the left edge.</SpeechBubble>
    </Box>
  ),
} satisfies StoryLiteStoryDefinition<SpeechBubbleArgs>;

const BesideSearch = {
  name: 'A mascot beside the search',
  render: () => <MascotPaletteTip />,
} satisfies StoryLiteStoryDefinition<SpeechBubbleArgs>;

const Overview = overviewStory({
  component: 'SpeechBubble',
  description: 'A box that speaks, with an optional tail toward whoever says it, such as a mascot beside the search palette.',
  points: [
    '`pointer` puts the tail on `top`, `bottom`, `left` or `right`; `none` draws a plain box.',
    '`pointerOffset` moves the tail along its edge, in pixels from the start.',
    '`tone` takes the [Callout] tones: the border and the tail change colour and the fill is tinted.',
    'The fill is opaque with a shadow, so it reads over any page.',
    '[GuidedTour] draws its step card on it; place it yourself, it sets no position.',
    'It adds no role: pass `role="status"` to have it read out.',
  ],
  instead: '[Callout] for a note in the flow of the page, [Tooltip] for a hint on hover.',
  playground: Playground,
  variants: [Sides, Tones, Offset, BesideSearch],
});

export default meta;
export { BesideSearch, Offset, Overview, Playground, Sides, Tones };
