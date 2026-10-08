/* @layer stories @kind story */
import type { StoryLiteMeta, StoryLiteStoryDefinition } from '@storylite/storylite';
import type { PlaygroundArgTypes, PlaygroundStory } from '../_template/controls/playground.type';
import { Box, Callout, Disclosure, Icon, IconButton, Paragraph } from '../../src/primitives';
import type { CalloutTone, CalloutVariant } from '../../src/primitives';
import { axis } from '../_template/axis';
import { Demonstrator } from '../_template/Demonstrator';
import { overviewStory } from '../_template/overview-story';

type CalloutArgs = {
  text: string;
  tone: CalloutTone;
  variant: CalloutVariant;
  withIcon: boolean;
  withAction: boolean;
};

const TONES: readonly CalloutTone[] = ['primary', 'secondary', 'info', 'success', 'warning', 'danger'];

const PRERELEASE = 'This is a pre-release. It ships before the usual testing, so expect rough edges the stable builds do not have.';

const FOOTNOTE = 'Any earlier version can be picked above if something stops working. Please report it either way, so it gets fixed.';

const CHANGES = 'Sessions keep their players when the server restarts, and the map loads twice as fast on large seeds.';

const BUG_BUTTON = <IconButton tone="danger" size="sm" label="Report a bug"><Icon name="bug" size={14} /></IconButton>;

const ARGS: Partial<CalloutArgs> = { text: PRERELEASE, tone: 'primary', variant: 'box', withIcon: false, withAction: false };

const ARG_TYPES: PlaygroundArgTypes<CalloutArgs> = {
  text: { group: 'Content', control: 'text' },
  withIcon: { group: 'Content', control: 'boolean' },
  withAction: { group: 'Content', control: 'boolean' },
  tone: { group: 'Appearance', control: 'select', options: [...TONES] },
  variant: { group: 'Appearance', control: 'select', options: ['box', 'footnote'] },
};

const meta = {
  title: 'Primitives · Feedback/Callout',
  parameters: { renderer: 'react' },
} satisfies StoryLiteMeta<CalloutArgs>;

const Playground = {
  name: 'Playground',
  args: ARGS,
  argTypes: ARG_TYPES,
  render: (args) => (
    <Box className="story-column">
      <Callout
        tone={args.tone}
        variant={args.variant}
        icon={args.withIcon ? <Icon name="triangle-alert" size={16} /> : undefined}
        action={args.withAction ? BUG_BUTTON : undefined}
      >
        {args.text}
      </Callout>
    </Box>
  ),
} satisfies PlaygroundStory<CalloutArgs>;

const Tones = {
  name: 'Box, every tone',
  render: () => (
    <Demonstrator rows={axis(TONES)} align="stretch" cell={(tone) => <Callout tone={tone}>{`A ${tone} note for the reader.`}</Callout>} />
  ),
} satisfies StoryLiteStoryDefinition<CalloutArgs>;

const WithIcon = {
  name: 'Warning with an icon',
  render: () => (
    <Callout tone="warning" icon={<Icon name="triangle-alert" size={16} />}>{PRERELEASE}</Callout>
  ),
} satisfies StoryLiteStoryDefinition<CalloutArgs>;

const Footnote = {
  name: 'Footnote with an action',
  render: () => <Callout variant="footnote" action={BUG_BUTTON}>{FOOTNOTE}</Callout>,
} satisfies StoryLiteStoryDefinition<CalloutArgs>;

const WithDetails = {
  name: 'With details under the line',
  render: () => (
    <Callout
      tone="info"
      icon={<Icon name="info" size={16} />}
      details={<Disclosure summary="What changed"><Paragraph tone="dim">{CHANGES}</Paragraph></Disclosure>}
    >
      {PRERELEASE}
    </Callout>
  ),
} satisfies StoryLiteStoryDefinition<CalloutArgs>;

const Overview = overviewStory({
  component: 'Callout',
  description: 'A short note set apart from the text around it, such as a pre-release notice or the fine print of a dialog.',
  points: [
    '`box` sits on a soft fill inside a border in its tone, for a warning.',
    '`footnote` is small muted text under a hairline, for the fine print at the end of a dialog.',
    'Either can lead with an `icon` and end with an `action`, such as a report a bug button.',
    '`details` sits under the line across the whole box, such as a [Disclosure]; [LoadError] puts its Details there.',
    'Screen readers read it out as a note.',
  ],
  instead: '[Toast] for a message that comes and goes on its own.',
  playground: Playground,
  variants: [Tones, WithIcon, WithDetails, Footnote],
});

export default meta;
export { Footnote, Overview, Playground, Tones, WithDetails, WithIcon };
