/* @layer stories @kind story */
import type { StoryLiteMeta, StoryLiteStoryDefinition } from '@storylite/storylite';
import type { PlaygroundArgTypes, PlaygroundStory } from '../_template/controls/playground.type';
import { Box, Button, EmojiIcon, IconButton, Text } from '../../src/primitives';
import type { EmojiIconSize } from '../../src/primitives';
import { axis } from '../_template/axis';
import { Demonstrator } from '../_template/Demonstrator';
import { overviewStory } from '../_template/overview-story';

type EmojiIconArgs = {
  glyph: string;
  size: EmojiIconSize;
};

const SIZES: readonly EmojiIconSize[] = ['sm', 'md', 'lg'];
const GLYPHS = ['🎮', '💾', '🗺️', '🔊', '⚙️', '🏆', '🧭', '📷'];

const ARGS: Partial<EmojiIconArgs> = { glyph: '🎮', size: 'md' };

const ARG_TYPES: PlaygroundArgTypes<EmojiIconArgs> = {
    glyph: { group: 'Content', control: 'text' },
    size: { group: 'Appearance', control: 'select', options: [...SIZES] },
  };

const meta = {
  title: 'Core · Icons/EmojiIcon',
  parameters: { renderer: 'react' },
} satisfies StoryLiteMeta<EmojiIconArgs>;

const Playground = {
  name: 'Playground',
  args: ARGS,
  argTypes: ARG_TYPES,
  render: (args) => <EmojiIcon glyph={args.glyph} size={args.size} />,
} satisfies PlaygroundStory<EmojiIconArgs>;

const Sizes = {
  name: 'Sizes',
  render: () => (
    <Demonstrator
      rows={axis(SIZES)}
      cell={(size) => (
        <Box className="story-inline">
          {GLYPHS.map((glyph) => (
            <EmojiIcon key={glyph} glyph={glyph} size={size} />
          ))}
        </Box>
      )}
    />
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
  description: 'A colour emoji used as an icon, in a button, a menu entry or an empty state.',
  points: [
    '`size` takes `sm`, `md` or `lg`, steps of the type scale.',
    'It keeps its own colours inside any control.',
    '**Screen readers skip it:** the control around it carries the accessible name.',
  ],
  instead: '[Icon] for an icon that follows the text colour.',
  playground: Playground,
  variants: [Sizes],
});

export default meta;
export { InControls, Overview, Playground, Sizes };
