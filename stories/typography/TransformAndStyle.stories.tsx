/* @layer stories @kind story */
import type { StoryLiteMeta, StoryLiteStoryDefinition } from '@storylite/storylite';
import { Box, Text } from '../../src/primitives';
import { overviewStory } from '../_template/overview-story';
import { CASES, LEADING, SPECIMEN, TRACKING } from './type-lists';
import { TypeTable } from './TypeTable';

const LEADING_SAMPLE = 'Wren sent the Hookshot to Tavi. Priya asked for a hint. Marlowe reached their goal and released the rest of their items.';

const meta = {
  title: 'Typography/Transform and style',
  parameters: { renderer: 'react' },
} satisfies StoryLiteMeta;

const TransformAndStyle = {
  name: 'Transform and style',
  render: () => (
    <Box className="story-column type-section">
      <Text variant="subtitle">Case and style</Text>
      <Box className="type-table-wrap">
        <Box as="table" className="type-table">
          <Box as="thead">
            <Box as="tr">
              <Box as="th">Style</Box>
              <Box as="th">Specimen</Box>
              <Box as="th">For</Box>
            </Box>
          </Box>
          <Box as="tbody">
            {CASES.map((entry) => (
              <Box as="tr" key={entry.label}>
                <Box as="td"><Text className="type-table__name">{entry.label}</Text></Box>
                <Box as="td"><Text className="type-table__specimen" style={entry.style}>{SPECIMEN}</Text></Box>
                <Box as="td"><Text className="type-table__use">{entry.use}</Text></Box>
              </Box>
            ))}
          </Box>
        </Box>
      </Box>
      <Text variant="subtitle">Letter spacing</Text>
      <TypeTable entries={TRACKING} property="letterSpacing" specimen={SPECIMEN.toUpperCase()} />
      <Text variant="subtitle">Line height</Text>
      <TypeTable entries={LEADING} property="lineHeight" specimen={LEADING_SAMPLE} />
    </Box>
  ),
} satisfies StoryLiteStoryDefinition;

const Overview = overviewStory({
  component: 'Transform and style',
  description: 'How text is cased, spaced and led: the case and style treatments with what each is for, the letter-spacing tokens, and the line-height tokens for dense lists up to long reading.',
  variants: [TransformAndStyle],
});

export default meta;
export { Overview, TransformAndStyle };
