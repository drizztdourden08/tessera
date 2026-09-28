/* @layer stories @kind logic */
import { createElement } from 'react';
import type { ComponentType } from 'react';
import type { StoryLiteStoryDefinition } from '@storylite/storylite';
import { Box, Text, TEXT_TONES } from '../../src/primitives';

const tonesStory = (element: unknown, text: string, attributes: Readonly<Record<string, string>> = {}) => {
  const Element = element as ComponentType<Record<string, unknown>>;
  return {
    name: 'Tones',
    render: () => (
      <Box className="story-list">
        {TEXT_TONES.map((tone) => (
          <Box key={tone} className="story-list__item">
            <Text className="story-label">{tone}</Text>
            <Box>{createElement(Element, { ...attributes, tone }, text)}</Box>
          </Box>
        ))}
      </Box>
    ),
  } satisfies StoryLiteStoryDefinition;
};

export { tonesStory };
