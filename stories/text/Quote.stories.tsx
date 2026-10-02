/* @layer stories @kind story */
import type { StoryLiteArgTypes, StoryLiteMeta, StoryLiteStoryDefinition } from '@storylite/storylite';
import { Text } from '../../src/primitives';
import { overviewStory } from '../_template/overview-story';

type QuoteArgs = {
  text: string;
  cite: string;
  inline: boolean;
};

const LONG_QUOTE = 'It is dangerous to go alone. Take this sword, and keep it close while you cross the fields to the castle. The rain will not stop tonight, and the guards will not let you pass the gate, so look for the way in under the moat. Your uncle went ahead of you. Find him before the soldiers do.';

const ARG_TYPES: StoryLiteArgTypes<QuoteArgs> = {
  text: { control: 'text', description: 'Long text wraps and switches to the large floating mark.' },
  cite: { control: 'text', description: 'A link to the source of the quotation.' },
  inline: { control: 'boolean', description: 'Forces the in-sentence look outside a paragraph.' },
};

const meta = {
  title: 'Core · Text/Quote',
  parameters: { renderer: 'react' },
} satisfies StoryLiteMeta<QuoteArgs>;

const Playground = {
  name: 'Playground',
  args: { text: 'It is dangerous to go alone. Take this.', cite: 'https://archipelago.gg', inline: false },
  argTypes: ARG_TYPES,
  render: (args) => <Text.Q cite={args.cite || undefined} inline={args.inline || undefined}>{args.text}</Text.Q>,
} satisfies StoryLiteStoryDefinition<QuoteArgs>;

const InSentence = {
  name: 'Inside a sentence',
  render: () => <Text.P>The old man said <Text.Q>take this</Text.Q> and handed over a sword.</Text.P>,
} satisfies StoryLiteStoryDefinition<QuoteArgs>;

const OneLine = {
  name: 'Standalone, one line',
  render: () => <Text.Q cite="https://archipelago.gg">It is dangerous to go alone. Take this.</Text.Q>,
} satisfies StoryLiteStoryDefinition<QuoteArgs>;

const Multiline = {
  name: 'Standalone, multiline',
  render: () => <Text.Q>{LONG_QUOTE}</Text.Q>,
} satisfies StoryLiteStoryDefinition<QuoteArgs>;

const Overview = overviewStory({
  component: 'Quote (Q)',
  importName: 'Q',
  description: 'A quotation that takes its look from where it sits. Inside a paragraph it is set in italics between two small raised quote marks. On its own line it opens with one quote mark beside the text, and once the text wraps the mark grows to two lines tall and the words flow around it. The look follows the layout on its own; pass inline to force the in-sentence look anywhere else. It takes cite for the source.',
  playground: Playground,
  variants: [InSentence, OneLine, Multiline],
});

export default meta;
export { InSentence, Multiline, OneLine, Overview, Playground };
