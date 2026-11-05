/* @layer stories @kind story */
import type { StoryLiteMeta, StoryLiteStoryDefinition } from '@storylite/storylite';
import type { RecordCardDensity } from '../../src/composites';
import type { PlaygroundArgTypes, PlaygroundStory } from '../_template/controls/playground.type';
import { overviewStory } from '../_template/overview-story';
import { RecordCardDemo } from './_samples/RecordCardDemo';
import { RecordCardList } from './_samples/RecordCardList';
import './RecordCard.stories.css';

type RecordCardArgs = {
  density: RecordCardDensity;
  open: boolean;
};

const ARGS: Partial<RecordCardArgs> = { density: 'card', open: false };

const ARG_TYPES: PlaygroundArgTypes<RecordCardArgs> = {
  density: { group: 'Appearance', control: 'select', options: ['card', 'row'], description: 'Row is one compact line; card has the card padding.' },
  open: { group: 'Behaviour', control: 'boolean', description: 'Shows the body. Needs children, or there is nothing to open.' },
};

const meta = {
  title: 'Composites · Data views/RecordCard',
  parameters: { renderer: 'react' },
} satisfies StoryLiteMeta<RecordCardArgs>;

const Playground = {
  name: 'Playground',
  args: ARGS,
  argTypes: ARG_TYPES,
  render: (args) => <RecordCardDemo density={args.density} open={args.open} />,
} satisfies PlaygroundStory<RecordCardArgs>;

const Folded = {
  name: 'Folded: the title, code, content and menu on one line',
  render: () => <RecordCardDemo />,
} satisfies StoryLiteStoryDefinition<RecordCardArgs>;

const Open = {
  name: 'Open: the header keeps its content and the title moves above the body',
  render: () => <RecordCardDemo defaultOpen />,
} satisfies StoryLiteStoryDefinition<RecordCardArgs>;

const Brand = {
  name: 'With a BrandMark as the icon',
  render: () => <RecordCardDemo brand />,
} satisfies StoryLiteStoryDefinition<RecordCardArgs>;

const Rows = {
  name: 'Row density: a list of three',
  render: () => <RecordCardList />,
} satisfies StoryLiteStoryDefinition<RecordCardArgs>;

const Controlled = {
  name: 'Controlled: open and onOpenChange, with a button outside',
  render: () => <RecordCardDemo controlled />,
} satisfies StoryLiteStoryDefinition<RecordCardArgs>;

const CODE = `import { RecordCard } from '@drizztdourden08/tessera';

<RecordCard
  title="Fix the login redirect"
  icon={<TypeMark icon="bug" label="Bug" tone="danger" />}
  code="ARG-12"
  content={<Badge variant="inline" value="Open" color="info" />}
  menu={<ActionsMenu />}
>
  <Text>The redirect drops the return path after sign in.</Text>
</RecordCard>
<RecordCard title="Rename the export dialog" density="row" open={open} onOpenChange={setOpen}>
  <Text>The name should say what is exported.</Text>
</RecordCard>`;

const Overview = overviewStory({
  component: 'RecordCard',
  description: 'The one card every item of a list uses. Folded it is a single line; open it shows the title and the body.',
  points: [
    'Header slots in order: chevron, `icon`, `code`, the title with `content`, then `menu` at the end.',
    'The chevron shows only when there are children, and only it toggles the card.',
    'Folded, the title is in the header; open, the title moves above the children.',
    '`open` with `onOpenChange` controls it; `defaultOpen` starts it open and the card keeps its own state.',
    '`density` is `card` for roomy items or `row` for a compact single line.',
  ],
  instead: '[Card] for a plain surface, [ItemCard] for a catalogue tile with media, [Disclosure] for a plain show or hide line.',
  playground: Playground,
  variants: [Folded, Open, Brand, Rows, Controlled],
  code: CODE,
});

export default meta;
export { Brand, Controlled, Folded, Open, Overview, Playground, Rows };
