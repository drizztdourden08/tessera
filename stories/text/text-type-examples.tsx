/* @layer stories @kind story */
import type { StoryLiteStoryDefinition } from '@storylite/storylite';
import { Box, Stack, Text } from '../../src/primitives';

const BODY = 'Items found in your world are sent to their owner as soon as you pick them up.';

const Sizes = {
  name: 'The 13 px step',
  render: () => (
    <Stack gap="xs">
      <Text variant="body">Body, 14 px: items found in your world are sent to their owner.</Text>
      <Text variant="body" size="md">Body with size md, 13 px: items found in your world are sent to their owner.</Text>
      <Text variant="caption">Caption, 12 px: items found in your world are sent to their owner.</Text>
    </Stack>
  ),
} satisfies StoryLiteStoryDefinition;

const TitleFace = {
  name: 'The title face at body size, and the 15 px step',
  render: () => (
    <Stack gap="xs">
      <Text font="title">Body size in the title face: Multiworld session</Text>
      <Text>Body size in the interface face: Multiworld session</Text>
      <Text font="title" size="lead">Lead size, 15 px, in the title face: Multiworld session</Text>
      <Text font="title" smartTimes>Frames of 1920x1080 and 3840x2160</Text>
    </Stack>
  ),
} satisfies StoryLiteStoryDefinition;

const Figures = {
  name: 'Code type and tabular figures',
  render: () => (
    <Stack gap="xs">
      <Text variant="overline">Run times</Text>
      <Text numeric>01:12:08 and 11:47:31</Text>
      <Text>01:12:08 and 11:47:31, proportional</Text>
      <Text mono tone="muted">seed 2193847561 · archipelago.gg:38281</Text>
    </Stack>
  ),
} satisfies StoryLiteStoryDefinition;

const Clamped = {
  name: 'clamp: cut at n lines, a tooltip only when cut',
  render: () => (
    <Stack gap="sm">
      <Box className="story-narrow">
        <Text as="p" clamp={3}>{BODY} {BODY} {BODY}</Text>
      </Box>
      <Box className="story-narrow">
        <Text as="p" clamp={1}>{BODY}</Text>
      </Box>
      <Box className="story-narrow">
        <Text as="p" clamp={3}>Short enough to fit, so no tooltip.</Text>
      </Box>
    </Stack>
  ),
} satisfies StoryLiteStoryDefinition;

export { Clamped, Figures, Sizes, TitleFace };
