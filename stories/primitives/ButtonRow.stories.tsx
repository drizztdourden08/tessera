/* @layer stories @kind story */
import type { StoryLiteMeta, StoryLiteStoryDefinition, StoryLiteArgTypes } from '@storylite/storylite';
import { Button, ButtonRow, Card, Stack, Text } from '../../src/primitives';
import type { FlexJustify, SpaceToken } from '../../src/primitives';
import { axis } from '../_template/axis';
import { Demonstrator } from '../_template/Demonstrator';
import { overviewStory } from '../_template/overview-story';
import '../_template/story-outline.css';
import './ButtonRow.stories.css';

type ButtonRowArgs = {
  align: FlexJustify;
  gap: SpaceToken;
};

const ALIGNS: readonly FlexJustify[] = ['start', 'center', 'end', 'between', 'around'];

const ARGS: Partial<ButtonRowArgs> = { align: 'end', gap: 'sm' };

const ARG_TYPES: StoryLiteArgTypes<ButtonRowArgs> = {
    align: { control: 'select', options: [...ALIGNS] },
    gap: { control: 'select', options: ['xs', 'sm', 'md', 'lg', 'xl', '2xl'] },
  };

const meta = {
  title: 'Primitives · Actions/ButtonRow',
  parameters: { renderer: 'react' },
} satisfies StoryLiteMeta<ButtonRowArgs>;

const Playground = {
  name: 'Playground',
  args: ARGS,
  argTypes: ARG_TYPES,
  render: (args) => (
    <ButtonRow align={args.align} gap={args.gap} className="story-outline">
      <Button variant="ghost">Cancel</Button>
      <Button variant="primary">Save changes</Button>
    </ButtonRow>
  ),
} satisfies StoryLiteStoryDefinition<ButtonRowArgs>;

const Alignments = {
  name: 'Alignments',
  render: () => (
    <Demonstrator
      rows={axis(ALIGNS)}
      align="stretch"
      cell={(align) => (
        <ButtonRow align={align} className="story-outline">
          <Button size="sm" variant="ghost">Back</Button>
          <Button size="sm" variant="tertiary">Skip</Button>
          <Button size="sm" variant="primary">Continue</Button>
        </ButtonRow>
      )}
    />
  ),
} satisfies StoryLiteStoryDefinition<ButtonRowArgs>;

const DialogFooter = {
  name: 'Dialog footer and wrapping',
  render: () => (
    <Demonstrator
      rows={[{ key: 'card', label: 'dialog footer' }, { key: 'narrow', label: 'narrow container, the row wraps' }]}
      align="stretch"
      cell={(place) => (place === 'card' ? (
        <Card>
          <Stack gap="md">
            <Text variant="title">Leave the session?</Text>
            <Text variant="subtitle">Items you have not sent yet stay in your world until you reconnect.</Text>
            <ButtonRow>
              <Button variant="ghost">Stay</Button>
              <Button variant="danger">Leave session</Button>
            </ButtonRow>
          </Stack>
        </Card>
      ) : (
        <ButtonRow className="story-outline button-row-demo--narrow">
          <Button size="sm" variant="ghost">Export log</Button>
          <Button size="sm" variant="tertiary">Copy seed</Button>
          <Button size="sm" variant="primary">Start</Button>
        </ButtonRow>
      ))}
    />
  ),
} satisfies StoryLiteStoryDefinition<ButtonRowArgs>;

const Overview = overviewStory({
  component: 'ButtonRow',
  description: 'The row of buttons at the foot of a dialog, a card or a toolbar. It is a Flex preset: buttons sit at the end with a small gap, centred on the cross axis, and wrap onto a new line when the container is narrow. The align prop moves them to the start, the centre, or spreads them out, and gap takes any space token.',
  playground: Playground,
  variants: [Alignments],
});

export default meta;
export { Alignments, DialogFooter, Overview, Playground };
