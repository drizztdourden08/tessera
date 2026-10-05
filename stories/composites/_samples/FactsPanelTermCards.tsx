/* @layer stories @kind component */
import { FactsPanel } from '../../../src/composites';
import { Box, Card, Stack, Text } from '../../../src/primitives';
import { RELEASE_TERMS, SHORTCUT_TERMS } from './term-facts.constants';

const FactsPanelTermCards = () => (
  <Box className="story-column">
    <Card>
      <Stack gap="sm">
        <Text variant="title">Keyboard shortcuts</Text>
        <FactsPanel layout="terms" label="Keyboard shortcuts" groups={[SHORTCUT_TERMS]} />
      </Stack>
    </Card>
    <Card>
      <Stack gap="sm">
        <Text variant="title">Release modes</Text>
        <FactsPanel layout="terms" label="Release modes" groups={[RELEASE_TERMS]} />
      </Stack>
    </Card>
  </Box>
);

export { FactsPanelTermCards };
