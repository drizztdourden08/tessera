/* @layer stories @kind component */
import { useState } from 'react';
import { Markdown } from '../../../src/composites';
import { Box, Text } from '../../../src/primitives';
import { HERO_SAMPLE_URLS } from './hero-sample-urls.constants';
import { EXTRAS_NOTE } from './markdown-notes.constants';

const IDS = [{ pattern: /\b[TI]-\d+\b/, href: (match: string) => `/items/${match}` }];

const resolveImage = (src: string): string | undefined => (src === 'dunes.svg' ? HERO_SAMPLE_URLS.dunes : undefined);

const MarkdownExtrasDemo = () => {
  const [last, setLast] = useState('');
  return (
    <Box className="story-column markdown-story__note">
      <Text className="story-label">{last ? `onLink got ${last}` : 'Click an id or the file link: onLink gets the path'}</Text>
      <Markdown source={EXTRAS_NOTE} size="sm" onLink={setLast} linkIds={IDS} images={resolveImage} />
    </Box>
  );
};

export { MarkdownExtrasDemo };
