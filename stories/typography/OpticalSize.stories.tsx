/* @layer stories @kind story */
import type { StoryLiteMeta, StoryLiteStoryDefinition } from '@storylite/storylite';
import type { PlaygroundArgTypes, PlaygroundStory } from '../_template/controls/playground.type';
import { Box, Text } from '../../src/primitives';
import type { OpticalSize } from '../../src/primitives';
import { axis } from '../_template/axis';
import { Demonstrator } from '../_template/Demonstrator';
import type { DemonstratorAxis } from '../_template/Demonstrator.type';
import { overviewStory } from '../_template/overview-story';
import './variable-type.css';

type OpticalArgs = {
  opticalSize: 'auto' | 'text' | 'display';
  weight: number;
  italic: boolean;
  text: string;
};

const ARG_TYPES: PlaygroundArgTypes<OpticalArgs> = {
  text: { group: 'Content', control: 'text' },
  opticalSize: { group: 'Appearance', control: 'select', options: ['auto', 'text', 'display'] },
  weight: { group: 'Appearance', control: 'range', min: 100, max: 900, step: 1, description: 'Any whole number from 100 to 900.' },
  italic: { group: 'Appearance', control: 'boolean' },
};

const SIZES = [14, 20, 32, 48, 64] as const;
const OPTICAL: readonly { label: string; value: OpticalSize }[] = [
  { label: 'Auto (follows size)', value: 'auto' },
  { label: 'Text (opsz 14)', value: 'text' },
  { label: 'Display (opsz 32)', value: 'display' },
];
const ITALIC_WEIGHTS = [300, 400, 600, 800] as const;
const FACES: readonly DemonstratorAxis<'roman' | 'italic'>[] = [{ key: 'roman', label: 'Roman' }, { key: 'italic', label: 'Italic' }];
const WORD = 'Hookshot 1920';

const meta = {
  title: 'Core · Typography/Optical size and italic',
  parameters: { renderer: 'react' },
} satisfies StoryLiteMeta<OpticalArgs>;

const OpticalSizes = {
  name: 'Optical size',
  render: () => (
    <Box className="story-column">
      <Text className="story-label">
        Inter's second axis. Small text gets looser spacing and sturdier details, display text gets tighter and finer. With auto, the browser picks it from the font size.
      </Text>
      <Demonstrator
        className="variable-type__table"
        corner="Size"
        rows={SIZES.map((size) => ({ key: String(size), label: `${size}px` }))}
        columns={OPTICAL.map((column) => ({ key: String(column.value), label: column.label }))}
        align="start"
        fill
        cell={(size, optical) => <Text className={`variable-type__size-${size}`} opticalSize={OPTICAL.find((column) => String(column.value) === optical)?.value}>{WORD}</Text>}
      />
    </Box>
  ),
} satisfies StoryLiteStoryDefinition;

const Italic = {
  name: 'Italic',
  render: () => (
    <Box className="story-column">
      <Text className="story-label">A true italic, drawn as its own face with the same two axes, not a slanted roman.</Text>
      <Demonstrator
        corner="Weight"
        rows={axis(ITALIC_WEIGHTS.map(String))}
        columns={FACES}
        align="start"
        cell={(weight, face) => <Text className="variable-type__size-32" weight={Number(weight)} italic={face === 'italic'}>{WORD}</Text>}
      />
    </Box>
  ),
} satisfies StoryLiteStoryDefinition;

const Playground = {
  name: 'Playground',
  args: { opticalSize: 'auto', weight: 400, italic: false, text: WORD },
  argTypes: ARG_TYPES,
  render: (args) => (
    <Text className="variable-type__size-32" opticalSize={args.opticalSize} weight={args.weight} italic={args.italic}>{args.text}</Text>
  ),
} satisfies PlaygroundStory<OpticalArgs>;

const Overview = overviewStory({
  component: 'Optical size and italic',
  importName: 'Text',
  description: 'Inter\'s optical size axis, which tunes letters for small text or display text, and its true italic.',
  points: [
    '`opticalSize="text"` gives looser spacing and sturdier details for small text.',
    '`opticalSize="display"` gives tighter spacing and finer details for large text.',
    '`auto`, the default, lets the browser follow the font size.',
    '`italic` draws Inter\'s true italic, with the same weight and optical size axes.',
  ],
  playground: Playground,
  variants: [OpticalSizes, Italic],
});

export default meta;
export { Italic, OpticalSizes, Overview, Playground };
