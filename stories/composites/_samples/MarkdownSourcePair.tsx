/* @layer stories @kind component */
import { CodeBlock, Markdown } from '../../../src/composites';
import { Box, Text } from '../../../src/primitives';

const MarkdownSourcePair = ({ source }: { source: string }) => (
  <Box className="markdown-story__pair">
    <Box className="story-column">
      <Text className="story-label">The source</Text>
      <CodeBlock code={source} language="text" wrap />
    </Box>
    <Box className="story-column">
      <Text className="story-label">What Markdown shows</Text>
      <Markdown source={source} size="sm" />
    </Box>
  </Box>
);

export { MarkdownSourcePair };
