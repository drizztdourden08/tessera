/* @layer stories @kind component */
import { useState } from 'react';
import { Markdown } from '../../../src/composites';
import type { MarkdownImageTarget } from '../../../src/composites';
import { Box, Text } from '../../../src/primitives';
import { IMAGE_NOTE } from './markdown-image-note.constants';

const MarkdownImageClickDemo = () => {
  const [opened, setOpened] = useState<MarkdownImageTarget | undefined>(undefined);
  return (
    <Box className="story-column markdown-story__note">
      <Text className="story-label">{opened ? `onImage got alt "${opened.alt}" and ${opened.src.slice(0, 30)}...` : 'Tab to the picture and press Enter or Space, or click it'}</Text>
      <Markdown source={IMAGE_NOTE} size="sm" images onImage={setOpened} />
    </Box>
  );
};

export { MarkdownImageClickDemo };
