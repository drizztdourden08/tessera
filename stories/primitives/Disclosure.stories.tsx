/* @layer stories @kind story */
import { useState } from 'react';
import type { StoryLiteMeta, StoryLiteStoryDefinition } from '@storylite/storylite';
import { Box, Button, Disclosure, Flex, Paragraph, StatRow, Stack, Text } from '../../src/primitives';
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

const GROUPS: readonly (readonly [string, string])[] = [
  ['Light World', 'Hyrule Castle, Eastern Palace, Desert Palace and Tower of Hera.'],
  ['Dark World', 'Palace of Darkness, Swamp Palace, Skull Woods and five more.'],
];

const ControlledGroups = () => {
  const [open, setOpen] = useState<readonly string[]>(['Light World']);
  const setOne = (name: string) => (next: boolean) => setOpen((now) => (next ? [...now, name] : now.filter((n) => n !== name)));
  return (
    <Stack gap="sm" className="disclosure-story__frame">
      <Flex gap="xs">
        <Button size="sm" onClick={() => setOpen(GROUPS.map(([name]) => name))}>Open all</Button>
        <Button size="sm" onClick={() => setOpen([])}>Close all</Button>
      </Flex>
      {GROUPS.map(([name, text]) => (
        <Disclosure key={name} summary={name} open={open.includes(name)} onOpenChange={setOne(name)}>
          <Paragraph tone="dim">{text}</Paragraph>
        </Disclosure>
      ))}
    </Stack>
  );
};

const Controlled = {
  name: 'Held open by the app',
  render: () => <ControlledGroups />,
} satisfies StoryLiteStoryDefinition<DisclosureArgs>;

const EndCount = () => {
  const [clicks, setClicks] = useState(0);
  return (
    <Stack gap="xs" className="disclosure-story__frame">
      <Disclosure summary="Players" end={<Button size="sm" variant="secondary" onClick={() => setClicks(clicks + 1)}>Add</Button>}>
        {FACTS.map(([label, value]) => <StatRow key={label} label={label} value={value} />)}
      </Disclosure>
      <Text variant="caption">{`Add pressed ${clicks} times; the list stays as it is.`}</Text>
    </Stack>
  );
};

const AtTheEnd = {
  name: 'A Button at the end of the line',
  render: () => <EndCount />,
} satisfies StoryLiteStoryDefinition<DisclosureArgs>;

const WrapEndRow = (props: { wrap: boolean; width: string }) => (
  <Box className={`disclosure-story__frame disclosure-story__frame--${props.width}`}>
    <Disclosure summary="Players on the server" wrapEnd={props.wrap} end={<Button size="sm" variant="secondary">Add player</Button>}>
      {FACTS.map(([label, value]) => <StatRow key={label} label={label} value={value} />)}
    </Disclosure>
  </Box>
);

const WrapEnd = {
  name: 'The end slot drops under the line when narrow',
  render: () => (
    <Demonstrator
      rows={axis(['wide', 'narrow'] as const)}
      cell={(width) => <WrapEndRow wrap width={width} />}
    />
  ),
} satisfies StoryLiteStoryDefinition<DisclosureArgs>;

const Styled = {
  name: 'A body with a class of its own',
  render: () => (
    <Box className="disclosure-story__frame">
      <Disclosure summary="Recommended next" defaultOpen bodyClassName="disclosure-story__rows">
        {FACTS.map(([label, value]) => <StatRow key={label} label={label} value={value} />)}
      </Disclosure>
    </Box>
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

<Disclosure summary={open ? 'Hide log' : 'Show log'} open={open} onOpenChange={setOpen}>
  {open && <LogPanel rows={rows} />}
</Disclosure>`;

const Overview = overviewStory({
  component: 'Disclosure',
  description: 'A line that shows or hides more content under it when clicked, such as Details under an error.',
  points: [
    'Built on the browser details element: [[Enter]] and [[Space]] toggle it, and screen readers say open or closed.',
    '`defaultOpen` starts it open and `onOpenChange` reports each toggle; a later change opens or closes it.',
    '`open` with `onOpenChange` hands the state to the app, such as an Open all button over a list of groups.',
    '`size` `sm` sets the line in small text; closed content stays in the page, so find in page reaches it.',
    '`end` sits at the right and never toggles; `wrapEnd` drops it under the line below 384 px.',
    '`bodyClassName` styles the body; [LoadError] puts the raw error behind one.',
  ],
  instead: '[Tabs] to switch between views, or [Dialog] for content that needs the whole screen.',
  playground: Playground,
  variants: [Uses, Controlled, AtTheEnd, WrapEnd, Sizes, Styled],
  states: {
    render: (props: StateProps) => <Sample {...(props as Partial<DisclosureArgs>)} />,
    list: [STATE.idle, { ...STATE.hover, target: 'summary' }, { ...STATE.focus, target: 'summary' }, { name: 'Open', props: { open: true } }],
  },
  code: CODE,
});

export default meta;
export { AtTheEnd, Controlled, Overview, Playground, Sizes, Styled, Uses, WrapEnd };
