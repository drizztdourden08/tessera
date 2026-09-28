/* @layer stories @kind story */
import type { StoryLiteMeta, StoryLiteStoryDefinition, StoryLiteArgTypes } from '@storylite/storylite';
import { Box, Button, EmojiIcon, IconButton, Text } from '../../src/primitives';
import type { EmojiIconSize } from '../../src/primitives';
import { overviewStory } from '../_template/overview-story';

type EmojiIconArgs = {
  glyph: string;
  size: EmojiIconSize;
};

const SIZES: readonly EmojiIconSize[] = ['sm', 'md', 'lg'];
const GLYPHS = ['🎮', '💾', '🗺️', '🔊', '⚙️', '🏆', '🧭', '📷'];

const ARGS: Partial<EmojiIconArgs> = { glyph: '🎮', size: 'md' };

const ARG_TYPES: StoryLiteArgTypes<EmojiIconArgs> = {
    glyph: { control: 'text' },
    size: { control: 'select', options: [...SIZES] },
  };

const meta = {
  title: 'Icons/EmojiIcon',
  parameters: { renderer: 'react' },
} satisfies StoryLiteMeta<EmojiIconArgs>;

const Playground = {
  name: 'Playground',
  args: ARGS,
  argTypes: ARG_TYPES,
  render: (args) => <EmojiIcon glyph={args.glyph} size={args.size} />,
} satisfies StoryLiteStoryDefinition<EmojiIconArgs>;

const Sizes = {
  name: 'Sizes',
  render: () => (
    <Box className="story-list">
      {SIZES.map((size) => (
        <Box key={size} className="story-list__item">
          <Text className="story-label">{size}</Text>
          <Box className="story-inline">
            {GLYPHS.map((glyph) => (
              <EmojiIcon key={glyph} glyph={glyph} size={size} />
            ))}
          </Box>
        </Box>
      ))}
    </Box>
  ),
} satisfies StoryLiteStoryDefinition<EmojiIconArgs>;

const InControls = {
  name: 'Inside controls',
  render: () => (
    <Box className="story-column">
      <Text variant="subtitle">The glyph keeps its own colours inside any button variant.</Text>
      <Box className="story-row">
        <Button variant="primary" icon={<EmojiIcon glyph="💾" size="sm" />}>Save state</Button>
        <Button variant="secondary" icon={<EmojiIcon glyph="📷" size="sm" />}>Screenshot</Button>
        <Button variant="ghost" icon={<EmojiIcon glyph="⚙️" size="sm" />}>Settings</Button>
      </Box>
      <Box className="story-row">
        <IconButton label="Mute audio" variant="tertiary"><EmojiIcon glyph="🔊" size="sm" /></IconButton>
        <IconButton label="Open map" variant="tertiary" size="md"><EmojiIcon glyph="🗺️" /></IconButton>
        <IconButton label="Achievements" variant="ghost" active><EmojiIcon glyph="🏆" size="sm" /></IconButton>
      </Box>
    </Box>
  ),
} satisfies StoryLiteStoryDefinition<EmojiIconArgs>;

const Overview = overviewStory({
  component: 'EmojiIcon',
  description: 'A colour emoji used as an icon, in a button, a menu entry or an empty state. It comes in three sizes on the type scale, sm, md and lg, and keeps its own colours inside any control. It is hidden from screen readers, so the control around it carries the accessible name.',
  playground: Playground,
  variants: [Sizes],
});

export default meta;
export { InControls, Overview, Playground, Sizes };
