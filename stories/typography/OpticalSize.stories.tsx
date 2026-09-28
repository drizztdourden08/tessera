/* @layer stories @kind story */
import type { StoryLiteMeta, StoryLiteStoryDefinition } from '@storylite/storylite';
import { Box, Text } from '../../src/primitives';
import type { OpticalSize } from '../../src/primitives';
import './variable-type.css';

const SIZES = [14, 20, 32, 48, 64] as const;
const OPTICAL: readonly { label: string; value: OpticalSize }[] = [
  { label: 'Auto (follows size)', value: 'auto' },
  { label: 'Text (opsz 14)', value: 'text' },
  { label: 'Display (opsz 32)', value: 'display' },
];
const ITALIC_WEIGHTS = [300, 400, 600, 800] as const;
const WORD = 'Hookshot 1920';

const meta = {
  title: 'Typography/Optical size and italic',
  parameters: { renderer: 'react' },
} satisfies StoryLiteMeta;

const OpticalSizes = {
  name: 'Optical size',
  render: () => (
    <Box className="story-column type-section">
      <Text className="story-label">
        Inter's second axis. Small text gets looser spacing and sturdier details, display text gets tighter and finer. With auto, the browser picks it from the font size.
      </Text>
      <Box className="variable-type__grid">
        <Text className="variable-type__head">Size</Text>
        {OPTICAL.map((column) => <Text key={column.label} className="variable-type__head">{column.label}</Text>)}
        {SIZES.map((size) => (
          <Box key={size} className="variable-type__row">
            <Text className="variable-type__label">{`${size}px`}</Text>
            {OPTICAL.map((column) => (
              <Text key={column.label} className={`variable-type__size-${size}`} opticalSize={column.value}>{WORD}</Text>
            ))}
          </Box>
        ))}
      </Box>
    </Box>
  ),
} satisfies StoryLiteStoryDefinition;

const Italic = {
  name: 'Italic',
  render: () => (
    <Box className="story-column type-section">
      <Text className="story-label">A true italic, drawn as its own face with the same two axes, not a slanted roman.</Text>
      <Box className="variable-type__grid variable-type__grid--pair">
        <Text className="variable-type__head">Weight</Text>
        <Text className="variable-type__head">Roman</Text>
        <Text className="variable-type__head">Italic</Text>
        {ITALIC_WEIGHTS.map((weight) => (
          <Box key={weight} className="variable-type__row">
            <Text className="variable-type__label">{weight}</Text>
            <Text className="variable-type__size-32" weight={weight}>{WORD}</Text>
            <Text className="variable-type__size-32" weight={weight} italic>{WORD}</Text>
          </Box>
        ))}
      </Box>
    </Box>
  ),
} satisfies StoryLiteStoryDefinition;

export default meta;
export { Italic, OpticalSizes };
