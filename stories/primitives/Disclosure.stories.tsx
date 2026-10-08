/* @layer stories @kind story */
import type { StoryLiteMeta, StoryLiteStoryDefinition } from '@storylite/storylite';
import { Box, Disclosure, Paragraph, StatRow } from '../../src/primitives';
import type { DisclosureSize } from '../../src/primitives';
import { axis } from '../_template/axis';
import type { PlaygroundArgTypes, PlaygroundStory } from '../_template/controls/playground.type';
import { Demonstrator } from '../_template/Demonstrator';
import { overviewStory } from '../_template/overview-story';
import { STATE } from '../_template/states/states.constants';
import type { StateProps } from '../_template/states/states.type';
import './Disclosure.stories.css';

type DisclosureArgs = {
  summary: string;
  size: DisclosureSize;
  open: boolean;
};

const NOTES = 'Sessions now keep their players when the server restarts. The map loads twice as fast on large seeds.';

const FACTS: readonly (readonly [string, string])[] = [['Seed', '7f3a9c21'], ['Players', '6'], ['Started', '2 hours ago']];

const ARGS: Partial<DisclosureArgs> = { summary: 'What is new', size: 'md', open: false };

const ARG_TYPES: PlaygroundArgTypes<DisclosureArgs> = {
  summary: { group: 'Content', control: 'text', description: 'The line the user clicks to show or hide the rest.' },
  size: { group: 'Appearance', control: 'select', options: ['sm', 'md'] },
  open: { group: 'State', control: 'boolean', description: 'Starts open (defaultOpen); the user can still close it.' },
};

const meta = {
  title: 'Primitives · Display/Disclosure',
  parameters: { renderer: 'react' },
} satisfies StoryLiteMeta<DisclosureArgs>;

const Sample = ({ summary = 'What is new', size, open }: Partial<DisclosureArgs>) => (
  <Box className="disclosure-story__frame">
    <Disclosure summary={summary} size={size} defaultOpen={open}>
      <Paragraph tone="dim">{NOTES}</Paragraph>
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
  name: 'Notes, and facts',
  render: () => (
    <Demonstrator
      rows={axis(['Notes', 'Facts'])}
      align="start"
      cell={(row) => (row === 'Notes'
        ? <Sample open />
        : (
          <Box className="disclosure-story__frame">
            <Disclosure summary="Session facts" defaultOpen>
              {FACTS.map(([label, value]) => <StatRow key={label} label={label} value={value} />)}
            </Disclosure>
          </Box>
        ))}
    />
  ),
} satisfies StoryLiteStoryDefinition<DisclosureArgs>;

const Sizes = {
  name: 'Sizes',
  render: () => <Demonstrator rows={axis(['md', 'sm'] as const)} cell={(size) => <Sample size={size} />} />,
} satisfies StoryLiteStoryDefinition<DisclosureArgs>;

const CODE = `import { Disclosure } from '@drizztdourden08/tessera';

<Disclosure summary="What is new">
  <ReleaseNotes />
</Disclosure>

<Disclosure summary={open ? 'Hide log' : 'Show log'} defaultOpen={open} onOpenChange={setOpen}>
  {open && <LogPanel rows={rows} />}
</Disclosure>`;

const Overview = overviewStory({
  component: 'Disclosure',
  description: 'A line that shows or hides more content under it when clicked, such as Details under an error.',
  points: [
    'Built on the browser details element: [[Enter]] and [[Space]] toggle it, and screen readers say open or closed.',
    'It keeps no state of its own; `defaultOpen` starts it open and `onOpenChange` reports each toggle.',
    'A later change to `defaultOpen` opens or closes it, so a part can open it when a job fails.',
    'Closed content stays in the page, so find in page still reaches it.',
    '`size` `sm` sets the line in small text, for a row or a settings line.',
    '[LoadError] puts the raw error behind one; [TaskProgress] puts its log behind one.',
  ],
  instead: '[Tabs] to switch between views, or [Dialog] for content that needs the whole screen.',
  playground: Playground,
  variants: [Uses, Sizes],
  states: {
    render: (props: StateProps) => <Sample {...(props as Partial<DisclosureArgs>)} />,
    list: [STATE.idle, { ...STATE.hover, target: 'summary' }, { ...STATE.focus, target: 'summary' }, { name: 'Open', props: { open: true } }],
  },
  code: CODE,
});

export default meta;
export { Overview, Playground, Sizes, Uses };
