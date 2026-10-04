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
  { stepId: 'basics', title: 'Basics', rows: [{ term: 'Profile name', detail: 'Weekly async' }, { term: 'ROM', detail: 'The Legend of Zelda: A Link to the Past (USA).sfc' }] },
  { stepId: 'mode', title: 'Mode', rows: [{ term: 'Mode', detail: 'Randomizer, online (Archipelago)' }] },
  {
    stepId: 'seed',
    title: 'Seed and connection',
    rows: [
      { term: 'Seed', detail: <Code>3f9a0c71be42d580</Code> },
      { term: 'Server URL', detail: 'archipelago.gg:38281' },
      { term: 'Slot name', detail: 'Mira' },
    ],
  },
  {
    stepId: 'options',
    title: 'Randomizer options',
    rows: [
      { term: 'Changed', detail: <><Tag>Big Key Shuffle: Any World</Tag> <Tag>Small Key Shuffle: Universal</Tag> <Tag>Retro Bow: On</Tag></> },
      { term: 'Defaults', detail: 'Every other row on the 14 tabs' },
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
    { stepId: 'basics', title: 'Basics', rows: [{ term: 'Name', detail: draft.name }] },
    { stepId: 'seed', title: 'Seed and connection', rows: [{ term: 'Seed', detail: <Code>{draft.seed}</Code> }] },
  ]}
  onEdit={wizard.goTo}
  disabled={wizard.busy}
/>`;

const Overview = overviewStory({
  component: 'WizardReview',
  description: 'The last step of a wizard: one block per step with what was chosen, as label and value rows on a TermList, so a value can be text or any node such as a Tag or Code. Each block has an Edit button that goes back to its step; pass the wizard\'s goTo. While the finish runs, the Edit buttons wait.',
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
