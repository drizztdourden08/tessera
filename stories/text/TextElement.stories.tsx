/* @layer stories @kind story */
import type { StoryLiteMeta, StoryLiteStoryDefinition } from '@storylite/storylite';
import type { PlaygroundArgTypes, PlaygroundStory } from '../_template/controls/playground.type';
import { TEXT_TONES, TextElement } from '../../src/primitives';
import type { TextTone } from '../../src/primitives';
import { axis } from '../_template/axis';
import { Demonstrator } from '../_template/Demonstrator';
import { overviewStory } from '../_template/overview-story';
import { CHANGE_TAGS, CHANGES, SHOWN_TAGS } from './_samples/text-element-tags.constants';
import { tonesStory } from './tones-story';

type TextElementArgs = {
  as: (typeof SHOWN_TAGS)[number];
  text: string;
  tone: TextTone | 'none';
  weight: number;
  italic: boolean;
};

const ARGS: Partial<TextElementArgs> = { as: 'span', text: 'Hyrule Castle', tone: 'none', weight: 400, italic: false };

const ARG_TYPES: PlaygroundArgTypes<TextElementArgs> = {
  text: { group: 'Content', control: 'text' },
  tone: { group: 'Appearance', control: 'select', options: ['none', ...TEXT_TONES] },
  weight: { group: 'Appearance', control: 'range', min: 100, max: 900, step: 1, description: 'Any whole number from 100 to 900.' },
  italic: { group: 'Appearance', control: 'boolean' },
  as: { group: 'Behaviour', control: 'select', options: [...SHOWN_TAGS], description: 'Any HTML tag. The ones listed here have a Tessera look.' },
};

const meta = {
  title: 'Core · Text/TextElement',
  parameters: { renderer: 'react' },
} satisfies StoryLiteMeta<TextElementArgs>;

const Playground = {
  name: 'Playground',
  args: ARGS,
  argTypes: ARG_TYPES,
  render: (args) => (
    <TextElement
      as={args.as}
      tone={args.tone === 'none' ? undefined : args.tone}
      weight={args.weight === 400 ? undefined : args.weight}
      italic={args.italic || undefined}
    >
      {args.text}
    </TextElement>
  ),
} satisfies PlaygroundStory<TextElementArgs>;

const Tags = {
  name: 'One element, any tag',
  render: () => (
    <Demonstrator
      corner="as"
      rows={axis(SHOWN_TAGS)}
      cell={(tag) => <TextElement as={tag}>Hyrule Castle</TextElement>}
    />
  ),
} satisfies StoryLiteStoryDefinition<TextElementArgs>;

const FromData = {
  name: 'Tag picked from data',
  render: () => (
    <Demonstrator
      corner="kind"
      rows={axis(CHANGES.map((change) => change.kind))}
      cell={(kind) => {
        const change = CHANGES.find((entry) => entry.kind === kind) ?? CHANGES[0];
        return <TextElement as={CHANGE_TAGS[change.kind]}>{change.text}</TextElement>;
      }}
    />
  ),
} satisfies StoryLiteStoryDefinition<TextElementArgs>;

const Tones = tonesStory(TextElement, 'Hyrule Castle', TEXT_TONES, { as: 'strong' });

const Overview = overviewStory({
  component: 'TextElement',
  description: 'The element every Text member is built on. It draws the tag named by as, with the Tessera look for that tag, an optional tone and the type settings: weight, italic, optical size and OpenType features. In app code, use the named members instead: Text.P, Text.Strong, Text.Code and the rest, or Title for headings. Reach for TextElement only when the tag is picked at run time, such as from data.',
  playground: Playground,
  variants: [Tags, FromData, Tones],
});

export default meta;
export { FromData, Overview, Playground, Tags, Tones };
