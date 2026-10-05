/* @layer stories @kind story */
import type { StoryLiteMeta, StoryLiteStoryDefinition } from '@storylite/storylite';
import type { PlaygroundArgTypes, PlaygroundStory } from '../_template/controls/playground.type';
import { WizardReview } from '../../src/composites';
import type { WizardReviewSection } from '../../src/composites';
import { Code, Tag } from '../../src/primitives';
import { overviewStory } from '../_template/overview-story';
import { STATE } from '../_template/states/states.constants';
import type { StateProps } from '../_template/states/states.type';

type ReviewArgs = {
  withEdit: boolean;
  editLabel: string;
  disabled: boolean;
};

const SECTIONS: readonly WizardReviewSection[] = [
  { stepId: 'basics', title: 'Basics', rows: [{ label: 'Profile name', value: 'Weekly async' }, { label: 'ROM', value: 'The Legend of Zelda: A Link to the Past (USA).sfc' }] },
  { stepId: 'mode', title: 'Mode', rows: [{ label: 'Mode', value: 'Randomizer, online (Archipelago)' }] },
  {
    stepId: 'seed',
    title: 'Seed and connection',
    rows: [
      { label: 'Seed', value: <Code>3f9a0c71be42d580</Code> },
      { label: 'Server URL', value: 'archipelago.gg:38281' },
      { label: 'Slot name', value: 'Mira' },
    ],
  },
  {
    stepId: 'options',
    title: 'Randomizer options',
    rows: [
      { label: 'Changed', value: <><Tag>Big Key Shuffle: Any World</Tag> <Tag>Small Key Shuffle: Universal</Tag> <Tag>Retro Bow: On</Tag></> },
      { label: 'Defaults', value: 'Every other row on the 14 tabs' },
    ],
  },
];

const ARGS: Partial<ReviewArgs> = { withEdit: true, editLabel: 'Edit', disabled: false };

const ARG_TYPES: PlaygroundArgTypes<ReviewArgs> = {
  withEdit: { group: 'Content', control: 'boolean', description: 'An Edit button per block, back to its step.' },
  editLabel: { group: 'Content', control: 'text' },
  disabled: { group: 'State', control: 'boolean', description: 'While the finish runs.' },
};

const meta = {
  title: 'Composites · Wizard/WizardReview',
  parameters: { renderer: 'react' },
} satisfies StoryLiteMeta<ReviewArgs>;

const draw = (args: ReviewArgs) => (
  <WizardReview sections={SECTIONS} onEdit={args.withEdit ? () => undefined : undefined} editLabel={args.editLabel} disabled={args.disabled} />
);

const Playground = {
  name: 'Playground',
  args: ARGS,
  argTypes: ARG_TYPES,
  render: (args) => draw(args),
} satisfies PlaygroundStory<ReviewArgs>;

const ReadOnly = {
  name: 'Without Edit',
  render: () => draw({ withEdit: false, editLabel: 'Edit', disabled: false }),
} satisfies StoryLiteStoryDefinition<ReviewArgs>;

const renderState = (props: StateProps) => draw({ ...(ARGS as ReviewArgs), disabled: props.disabled === true });

const CODE = `import { WizardReview } from '@drizztdourden08/tessera';

<WizardReview
  sections={[
    { stepId: 'basics', title: 'Basics', rows: [{ label: 'Name', value: draft.name }] },
    { stepId: 'seed', title: 'Seed and connection', rows: [{ label: 'Seed', value: <Code>{draft.seed}</Code> }] },
  ]}
  onEdit={wizard.goTo}
  disabled={wizard.busy}
/>`;

const Overview = overviewStory({
  component: 'WizardReview',
  description: 'The last step of a wizard: what was chosen on each step, with an Edit button that goes back to it.',
  points: [
    '`sections` holds one block per step, with label and value rows drawn by a [FactsPanel] with `layout="terms"`.',
    'A value can be text or any node, such as a [Tag].',
    'Pass the wizard\'s `goTo` as `onEdit`.',
    '`disabled` holds the Edit buttons while the finish runs.',
  ],
  playground: Playground,
  variants: [ReadOnly],
  states: {
    render: renderState,
    list: [STATE.idle, STATE.disabled],
  },
  code: CODE,
});

export default meta;
export { Overview, Playground, ReadOnly };
