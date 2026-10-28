/* @layer stories @kind component */
import { Box, Button, Flex, FoldText } from '../../../src/primitives';
import '../FoldText.stories.css';

const PATHS = [
  'C:/Users/mira/projects/archipelia/src/screens/settings/ProfileSettings.tsx',
  'notes.txt',
] as const;

const FoldTextHug = () => (
  <Flex direction="column" gap="sm">
    {PATHS.map((path) => (
      <Box key={path} className="fold-story__frame">
        <Flex align="center" gap="xs">
          <FoldText truncate="middle" hug>{path}</FoldText>
          <Button size="sm" variant="secondary">Copy</Button>
        </Flex>
      </Box>
    ))}
  </Flex>
);

export { FoldTextHug };
