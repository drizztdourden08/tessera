/* @layer stories @kind story */
import type { StoryLiteMeta, StoryLiteStoryDefinition } from '@storylite/storylite';
import type { PlaygroundArgTypes, PlaygroundStory } from '../_template/controls/playground.type';
import { overviewStory } from '../_template/overview-story';
import { AnchoredBarDemo } from './_samples/AnchoredBarDemo';

type AnchoredBarArgs = {
  placement: 'bottom-center' | 'top-center';
  dock: 'none' | 'top-center' | 'bottom-center';
  follow: boolean;
  error: boolean;
};

const ARGS: Partial<AnchoredBarArgs> = { placement: 'bottom-center', dock: 'bottom-center', follow: true, error: false };

const ARG_TYPES: PlaygroundArgTypes<AnchoredBarArgs> = {
  placement: { group: 'Layout', control: 'select', options: ['bottom-center', 'top-center'] },
  dock: { group: 'Layout', control: 'select', options: ['none', 'top-center', 'bottom-center'], description: 'Where the bar waits when its target scrolls out of view.' },
  follow: { group: 'Behaviour', control: 'boolean', description: 'Keep up with the target as the page scrolls.' },
  error: { group: 'State', control: 'boolean' },
};

const meta = {
  title: 'Composites · Overlays/AnchoredBar',
  parameters: { renderer: 'react' },
} satisfies StoryLiteMeta<AnchoredBarArgs>;

const Playground = {
  name: 'Playground',
  args: ARGS,
  argTypes: ARG_TYPES,
  render: (args) => <AnchoredBarDemo {...args} />,
} satisfies PlaygroundStory<AnchoredBarArgs>;

const Rest = {
  name: 'Beside its target',
  render: () => <AnchoredBarDemo />,
} satisfies StoryLiteStoryDefinition<AnchoredBarArgs>;

const Docked = {
  name: 'Docked at the edge',
  render: () => <AnchoredBarDemo dock="top-center" placement="top-center" />,
} satisfies StoryLiteStoryDefinition<AnchoredBarArgs>;

const Failed = {
  name: 'Error',
  render: () => <AnchoredBarDemo error label="Rename failed" />,
} satisfies StoryLiteStoryDefinition<AnchoredBarArgs>;

const Fixed = {
  name: 'Not following',
  render: () => <AnchoredBarDemo follow={false} />,
} satisfies StoryLiteStoryDefinition<AnchoredBarArgs>;

const Overview = overviewStory({
  component: 'AnchoredBar',
  description: 'A small bar or dialog kept beside a rectangle, such as a toolbar over a selection.',
  points: [
    '`anchorRect` returns the target box; the bar sits below or above it and stays inside `boundary`.',
    '`dock` keeps the bar in view at an edge when the target scrolls away, and says so with `dockedText`.',
    '`follow` makes it track the target as `subscribe` reports scrolls and resizes, one measure per frame.',
    '`initialFocus` is a selector focused once the bar is placed; focus goes back where it was on close.',
    '`role` is dialog, alertdialog, toolbar or status; [[Esc]] runs `onEscape` without closing a parent.',
    '`error` draws the danger border; `inline` renders in place instead of the top layer, for a scroll box.',
  ],
  instead: '[Anchored] for a bare panel placed beside a rectangle.',
  playground: Playground,
  variants: [Rest, Docked, Failed, Fixed],
});

export default meta;
export { Docked, Failed, Fixed, Overview, Playground, Rest };
