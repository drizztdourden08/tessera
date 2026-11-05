/* @layer stories @kind story */
import type { StoryLiteMeta, StoryLiteStoryDefinition } from '@storylite/storylite';
import type { RecordHeaderDensity } from '../../src/composites';
import type { PlaygroundArgTypes, PlaygroundStory } from '../_template/controls/playground.type';
import { overviewStory } from '../_template/overview-story';
import { RecordHeaderDemo } from './_samples/RecordHeaderDemo';
import './RecordHeader.stories.css';

type RecordHeaderArgs = {
  density: RecordHeaderDensity;
  chevron: boolean;
};

const ARGS: Partial<RecordHeaderArgs> = { density: 'card', chevron: true };

const ARG_TYPES: PlaygroundArgTypes<RecordHeaderArgs> = {
  density: { group: 'Appearance', control: 'select', options: ['card', 'row'], description: 'The gap between the slots: row is tight, card is roomy.' },
  chevron: { group: 'Behaviour', control: 'boolean', description: 'Shows the fold button. Without it the header has no button.' },
};

const meta = {
  title: 'Composites · Data views/RecordHeader',
  parameters: { renderer: 'react' },
} satisfies StoryLiteMeta<RecordHeaderArgs>;

const Playground = {
  name: 'Playground',
  args: ARGS,
  argTypes: ARG_TYPES,
  render: (args) => <RecordHeaderDemo density={args.density} chevron={args.chevron} />,
} satisfies PlaygroundStory<RecordHeaderArgs>;

const WithChevron = {
  name: 'With a chevron: it turns when the header is expanded',
  render: () => <RecordHeaderDemo />,
} satisfies StoryLiteStoryDefinition<RecordHeaderArgs>;

const WithoutChevron = {
  name: 'Without a chevron: no button, for a tree row or a plain bar',
  render: () => <RecordHeaderDemo chevron={false} />,
} satisfies StoryLiteStoryDefinition<RecordHeaderArgs>;

const TypeMarkIcon = {
  name: 'With a TypeMark as the icon',
  render: () => <RecordHeaderDemo />,
} satisfies StoryLiteStoryDefinition<RecordHeaderArgs>;

const BrandIcon = {
  name: 'With a BrandMark as the icon',
  render: () => <RecordHeaderDemo brand />,
} satisfies StoryLiteStoryDefinition<RecordHeaderArgs>;

const RowDensity = {
  name: 'Row density: a tight gap',
  render: () => <RecordHeaderDemo density="row" />,
} satisfies StoryLiteStoryDefinition<RecordHeaderArgs>;

const CardDensity = {
  name: 'Card density: a roomy gap',
  render: () => <RecordHeaderDemo density="card" />,
} satisfies StoryLiteStoryDefinition<RecordHeaderArgs>;

const CODE = `import { RecordHeader } from '@drizztdourden08/tessera';

<RecordHeader
  icon={<TypeMark icon="bug" label="Bug" tone="danger" />}
  code="ARG-12"
  title="Fix the login redirect"
  content={<Badge variant="inline" value="Open" color="info" />}
  menu={<ActionsMenu />}
  chevron={{ expanded: open, onToggle: () => setOpen(!open), controls: 'task-body' }}
/>`;

const Overview = overviewStory({
  component: 'RecordHeader',
  description: 'The one title line every item uses, in RecordCard, in Kanban group bars and in Tree rows.',
  points: [
    'Slots in order: chevron, `icon`, `code`, `title`, then `content` and `menu` at the end.',
    'Every slot is a centred box, so a tall icon and a text line sit on the same centre line.',
    '`chevron` shows a bare fold button, and a click on the row toggles; a tree row has no chevron.',
    'It has no padding and no surface; the card, bar or row around it gives them.',
    '`density` is `row` or `card` and only changes the gap between the slots.',
  ],
  instead: '[RecordCard] for an item with a frame and a body, or [Text] for a plain line.',
  playground: Playground,
  variants: [WithChevron, WithoutChevron, TypeMarkIcon, BrandIcon, RowDensity, CardDensity],
  code: CODE,
});

export default meta;
export { BrandIcon, CardDensity, Overview, Playground, RowDensity, TypeMarkIcon, WithChevron, WithoutChevron };
