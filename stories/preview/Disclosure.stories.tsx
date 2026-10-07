/* @layer stories @kind story */
import type { StoryLiteMeta, StoryLiteStoryDefinition } from '@storylite/storylite';
import { Box, Paragraph, Pre } from '../../src/primitives';
import { axis } from '../_template/axis';
import type { PlaygroundArgTypes, PlaygroundStory } from '../_template/controls/playground.type';
import { Demonstrator } from '../_template/Demonstrator';
import { overviewStory } from '../_template/overview-story';
import { STATE } from '../_template/states/states.constants';
import type { StateProps } from '../_template/states/states.type';
import { Disclosure } from './Disclosure/Disclosure';
import type { DisclosureSize } from './Disclosure/Disclosure.type';
import { SESSIONS } from './LoadError/_samples/load-error-samples.constants';
import './LoadError.stories.css';
import './LoadError/LoadError.css';

type DisclosureArgs = {
  summary: string;
  size: DisclosureSize;
  open: boolean;
};

const NOTES = 'Sessions now keep their players when the server restarts. The map loads twice as fast on large seeds.';

const ARGS: Partial<DisclosureArgs> = { summary: 'Details', size: 'md', open: false };

const ARG_TYPES: PlaygroundArgTypes<DisclosureArgs> = {
  summary: { group: 'Content', control: 'text', description: 'The line the user clicks to show or hide the rest.' },
  size: { group: 'Appearance', control: 'select', options: ['sm', 'md'] },
  open: { group: 'State', control: 'boolean', description: 'Starts open (defaultOpen); the user can still close it.' },
};

const meta = {
  title: 'Preview · For approval/Disclosure',
  parameters: { renderer: 'react' },
} satisfies StoryLiteMeta<DisclosureArgs>;

const Sample = ({ summary = 'Details', size, open }: Partial<DisclosureArgs>) => (
  <Box className="load-error-story__frame">
    <Disclosure summary={summary} size={size} defaultOpen={open}>
      <Pre className="load-error__raw">{SESSIONS.raw}</Pre>
    </Disclosure>
  </Box>
);

const Playground = {
  name: 'Playground',
  args: ARGS,
  argTypes: ARG_TYPES,
  render: (args) => <Sample key={String(args.open)} {...args} />,
} satisfies PlaygroundStory<DisclosureArgs>;

const Uses = {
  name: 'A raw error, and notes',
  render: () => (
    <Demonstrator
      rows={axis(['Raw error', 'Notes'])}
      align="start"
      cell={(row) => (row === 'Notes'
        ? <Disclosure summary="What is new" defaultOpen><Paragraph tone="dim">{NOTES}</Paragraph></Disclosure>
        : <Sample open />)}
    />
  ),
} satisfies StoryLiteStoryDefinition<DisclosureArgs>;

const Sizes = {
  name: 'Sizes',
  render: () => <Demonstrator rows={axis(['md', 'sm'] as const)} cell={(size) => <Sample size={size} />} />,
} satisfies StoryLiteStoryDefinition<DisclosureArgs>;

const Overview = overviewStory({
  component: 'Disclosure',
  description: 'For approval, not a released part: a line that shows or hides more content under it when clicked.',
  points: [
    '**For approval:** this page lives in the gallery only, and nothing on it ships until the owner picks an option.',
    'Built on the browser details element: [[Enter]] and [[Space]] toggle it, and screen readers say open or closed.',
    'It keeps no state of its own; `defaultOpen` starts it open and `onOpenChange` reports each toggle.',
    'Closed content stays in the page, so find in page still reaches it.',
  ],
  instead: '[Tabs] to switch between views, or [Dialog] for content that needs the whole screen.',
  playground: Playground,
  variants: [Uses, Sizes],
  states: {
    render: (props: StateProps) => <Sample {...(props as Partial<DisclosureArgs>)} />,
    list: [STATE.idle, { ...STATE.hover, target: 'summary' }, { ...STATE.focus, target: 'summary' }, { name: 'Open', props: { open: true } }],
  },
});

export default meta;
export { Overview, Playground, Sizes, Uses };
