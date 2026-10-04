/* @layer stories @kind story */
import type { StoryLiteMeta, StoryLiteStoryDefinition } from '@storylite/storylite';
import { overviewStory } from '../_template/overview-story';
import { Box, Text } from '../../src/primitives';
import { COLOUR_GROUPS } from '../tokens/token-lists';
import { RoleCard } from './RoleCard';
import '../_template/story-heading.css';
import './Roles.stories.css';

const meta = {
  title: 'Core · Colours/Roles',
  parameters: { renderer: 'react' },
} satisfies StoryLiteMeta;

const Roles = {
  name: 'Roles',
  render: () => (
    <Box className="story-column role-page">
      <Text className="story-label">
        The roles components use, each read from the swatches and palettes. Every card shows the colour the page paints right now, and what it is made from.
      </Text>
      {COLOUR_GROUPS.map((group) => (
        <Box key={group.title} className="role-group">
          <Text className="role-group__title story-heading">{group.title}</Text>
          <Box className="role-group__cards">
            {group.tokens.map((token) => <RoleCard key={token} token={token} />)}
          </Box>
        </Box>
      ))}
    </Box>
  ),
} satisfies StoryLiteStoryDefinition;

const Overview = overviewStory({
  component: 'Roles',
  description: 'The colours components use, by job: surfaces, text, borders, accents and states.',
  points: [
    'Each role is a `--c-*` token built from the [Swatches] and [Palettes].',
    'Every card shows the colour the page paints right now and what it is made from.',
    'App CSS uses these roles, such as `var(--c-primary)`, never a raw colour.',
    'Pin one role in the app `theme.css` when its built value is not the one you want.',
  ],
  variants: [Roles],
});

export default meta;
export { Overview, Roles };
