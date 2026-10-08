/* @layer stories @kind component */
import { useState } from 'react';
import { Markdown } from '../../../src/composites';
import { Box, Text } from '../../../src/primitives';
import { RELEASE_NOTE } from './markdown-notes.constants';

const MarkdownLinkDemo = () => {
  const [last, setLast] = useState('');
  return (
    <Box className="story-column markdown-story__note">
      <Text className="story-label">{last ? `onLink got ${last}` : 'Click the link: onLink gets it and the page stays'}</Text>
      <Markdown source={RELEASE_NOTE} size="sm" onLink={setLast} />
    </Box>
  );
};

export { MarkdownLinkDemo };
