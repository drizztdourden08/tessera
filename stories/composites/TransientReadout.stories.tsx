/* @layer stories @kind story */
import type { StoryLiteMeta, StoryLiteStoryDefinition } from '@storylite/storylite';
import type { PlaygroundArgTypes, PlaygroundStory } from '../_template/controls/playground.type';
import { overviewStory } from '../_template/overview-story';
import { TransientReadoutDemo } from './_samples/TransientReadoutDemo';

type TransientReadoutArgs = {
  corner: 'bottom-end' | 'bottom-start' | 'top-end' | 'top-start';
  showMs: number;
};

const ARGS: Partial<TransientReadoutArgs> = { corner: 'bottom-end', showMs: 1000 };

const ARG_TYPES: PlaygroundArgTypes<TransientReadoutArgs> = {
  corner: { group: 'Layout', control: 'select', options: ['bottom-end', 'bottom-start', 'top-end', 'top-start'] },
  showMs: { group: 'Behaviour', control: 'number', description: 'Milliseconds the value stays after a change.' },
};

const meta = {
  title: 'Composites · Feedback/TransientReadout',
  parameters: { renderer: 'react' },
} satisfies StoryLiteMeta<TransientReadoutArgs>;

const Playground = {
  name: 'Playground',
  args: ARGS,
  argTypes: ARG_TYPES,
  render: (args) => <TransientReadoutDemo {...args} />,
} satisfies PlaygroundStory<TransientReadoutArgs>;

const ValueChange = {
  name: 'Shows when the value changes',
  render: () => <TransientReadoutDemo />,
} satisfies StoryLiteStoryDefinition<TransientReadoutArgs>;

const Corners = {
  name: 'Top start corner',
  render: () => <TransientReadoutDemo corner="top-start" />,
} satisfies StoryLiteStoryDefinition<TransientReadoutArgs>;

const Overview = overviewStory({
  component: 'TransientReadout',
  description: 'A value in the corner of a surface that shows when it changes and fades after a second.',
  points: [
    'Pass the live `value`, such as a zoom of 200%; it stays hidden on first render and shows on each change.',
    '`showMs` sets how long it stays, 1000 by default; a new change restarts the time.',
    '`corner` places it in any of the four corners of the surface; the parent must be positioned.',
    '`onActivate` runs on a double click, such as reset the zoom to 100%.',
    'It is hidden from screen readers, so the control it reports on must carry its own accessible value.',
    'Reduced motion drops the fade, and forced colours draw it with system colours.',
  ],
  instead: '[Toast] for a message the user must be told about.',
  playground: Playground,
  variants: [ValueChange, Corners],
});

export default meta;
export { Corners, Overview, Playground, ValueChange };
