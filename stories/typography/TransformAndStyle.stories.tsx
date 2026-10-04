/* @layer stories @kind story */
import type { StoryLiteMeta, StoryLiteStoryDefinition } from '@storylite/storylite';
import { Box, Text } from '../../src/primitives';
import { axis } from '../_template/axis';
import { Demonstrator } from '../_template/Demonstrator';
import type { DemonstratorAxis } from '../_template/Demonstrator.type';
import { overviewStory } from '../_template/overview-story';
import { CASES, LEADING, SPECIMEN, TRACKING } from './type-lists';
import { TypeTable } from './TypeTable';

const SPECIMEN_COLUMN: readonly DemonstratorAxis<'specimen'>[] = [{ key: 'specimen', label: 'Specimen' }];

const LEADING_SAMPLE = 'Wren sent the Hookshot to Tavi. Priya asked for a hint. Marlowe reached their goal and released the rest of their items.';

const meta = {
  title: 'Core · Typography/Transform and style',
  parameters: { renderer: 'react' },
} satisfies StoryLiteMeta;

const TransformAndStyle = {
  name: 'Transform and style',
  render: () => (
    <Box className="story-column">
      <Text variant="subtitle">Case and style</Text>
      <Demonstrator
        corner="Style"
        rows={axis(CASES.map((entry) => entry.label))}
        columns={SPECIMEN_COLUMN}
        align="start"
        cell={(label) => <Text className="type-table__specimen" style={CASES.find((entry) => entry.label === label)?.style}>{SPECIMEN}</Text>}
      />
      <Text variant="subtitle">Letter spacing</Text>
      <TypeTable entries={TRACKING} property="letterSpacing" specimen={SPECIMEN.toUpperCase()} />
      <Text variant="subtitle">Line height</Text>
      <TypeTable entries={LEADING} property="lineHeight" specimen={LEADING_SAMPLE} />
    </Box>
  ),
} satisfies StoryLiteStoryDefinition;

const Overview = overviewStory({
  component: 'Transform and style',
  description: 'How text is cased, spaced and led: the case and style treatments, letter spacing and line height.',
  points: [
    'Each case and style treatment says what it is for.',
    '`--tracking-tight` to `--tracking-caps` set letter spacing; capitals take `--tracking-caps`.',
    '`--leading-tight` suits dense lists and `--leading-normal` suits long reading.',
  ],
  variants: [TransformAndStyle],
});

export default meta;
export { Overview, TransformAndStyle };
