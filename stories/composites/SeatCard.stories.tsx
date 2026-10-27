/* @layer stories @kind story */
import type { StoryLiteMeta, StoryLiteStoryDefinition } from '@storylite/storylite';
import { SeatCard } from '../../src/composites';
import type { PlaygroundStory } from '../_template/controls/playground.type';
import { overviewStory } from '../_template/overview-story';
import type { StateProps } from '../_template/states/states.type';
import { SeatBoard } from './_samples/SeatBoard';
import { SEAT_ARG_TYPES, SEAT_ARGS, SEAT_CODE } from './_samples/seat-story.constants';
import type { SeatCardArgs } from './_samples/seat-story.type';
import { SeatSample } from './_samples/SeatSample';
import './SeatCard.stories.css';

const meta = {
  title: 'Composites · Content/SeatCard',
  parameters: { renderer: 'react' },
} satisfies StoryLiteMeta<SeatCardArgs>;

const Playground = {
  name: 'Playground',
  args: SEAT_ARGS,
  argTypes: SEAT_ARG_TYPES,
  render: (args) => <SeatSample key={args.state} {...args} />,
} satisfies PlaygroundStory<SeatCardArgs>;

const FourStates = {
  name: 'The four states: filled, attention, empty and add',
  render: () => <SeatBoard set="states" />,
} satisfies StoryLiteStoryDefinition<SeatCardArgs>;

const Lobby = {
  name: 'A lobby: taken seats, one that needs you, open seats and the add seat in one grid',
  render: () => <SeatBoard set="lobby" />,
} satisfies StoryLiteStoryDefinition<SeatCardArgs>;

const Clickable = {
  name: 'Clickable seats: the name is the one button, a click anywhere on the card goes through it and the focus ring circles the card',
  render: () => <SeatBoard set="clickable" />,
} satisfies StoryLiteStoryDefinition<SeatCardArgs>;

const renderState = (props: StateProps) => (
  <SeatCard
    className="seat-card-story__one"
    state="filled"
    name="Planner"
    meta="Opus, 12 min"
    onSelect={props.disabled === true ? undefined : () => undefined}
  />
);

const Overview = overviewStory({
  component: 'SeatCard',
  description: 'One seat of a lobby: who sits there, an open seat, a seat that needs you, or a dashed card that adds a seat.',
  points: [
    '`state="filled"` shows `name`, an optional `lead` (avatar or icon), a `meta` line and `actions`.',
    '`state="attention"` is a filled seat that waits on you: a warning edge and a `reason` that says why.',
    '`state="empty"` is a quiet open seat with a `label` and a `hint`; it is not clickable.',
    '`state="add"` is a dashed button; `onSelect` only asks, the app adds the seat.',
    'With `onSelect`, the name of a filled seat is its one button; a click on the card goes through it.',
    'Put the cards in a [SeatGrid] so they share one size and wrap.',
  ],
  instead: '[ItemCard] for items of a catalogue with media, tags and details.',
  playground: Playground,
  variants: [FourStates, Lobby, Clickable],
  states: {
    render: renderState,
    list: [
      { name: 'rest', props: {} },
      { name: 'hover', props: {}, pseudo: 'hover' },
      { name: 'focus', props: {}, pseudo: 'focus-visible', target: '.seat-card__open' },
      { name: 'not clickable', props: { disabled: true } },
    ],
  },
  code: SEAT_CODE,
});

export default meta;
export { Clickable, FourStates, Lobby, Overview, Playground };
