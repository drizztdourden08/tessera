/* @layer stories @kind story */
import type { StoryLiteMeta, StoryLiteStoryDefinition, StoryLiteArgTypes } from '@storylite/storylite';
import { Box, PathIcon } from '../../src/primitives';
import type { PathIconProps } from '../../src/primitives';
import { overviewStory } from '../_template/overview-story';
import { axis } from '../_template/axis';
import { Demonstrator } from '../_template/Demonstrator';
import './icons.stories.css';

type GlyphName = 'plus' | 'minus' | 'close' | 'check' | 'chevron' | 'folder' | 'play' | 'overflow';
type IconTone = 'text' | 'primary' | 'secondary' | 'warning' | 'danger' | 'muted';

type IconArgs = {
  glyph: GlyphName;
  size: number;
  tone: IconTone;
};

const GLYPHS: Record<GlyphName, Pick<PathIconProps, 'paths' | 'circles'>> = {
  plus: { paths: ['M7 2h2v5h5v2H9v5H7V9H2V7h5z'] },
  minus: { paths: ['M2 7h12v2H2z'] },
  close: { paths: ['M3.4 2 8 6.6 12.6 2 14 3.4 9.4 8l4.6 4.6-1.4 1.4L8 9.4 3.4 14 2 12.6 6.6 8 2 3.4z'] },
  check: { paths: ['M6 10.6 12.6 4 14 5.4l-8 8-4-4L3.4 8z'] },
  chevron: { paths: ['M6 2.6 11.4 8 6 13.4 4.6 12l4-4-4-4z'] },
  folder: { paths: ['M1 3h5l2 2h7v8H1z'] },
  play: { paths: ['M4 2v12l10-6z'] },
  overflow: { circles: [{ cx: 3, cy: 8, r: 1.5 }, { cx: 8, cy: 8, r: 1.5 }, { cx: 13, cy: 8, r: 1.5 }] },
};

const NAMES = Object.keys(GLYPHS) as GlyphName[];
const TONES: readonly IconTone[] = ['text', 'primary', 'secondary', 'warning', 'danger', 'muted'];

const toneClass = (tone: IconTone) => (tone === 'text' ? undefined : `icon-demo--${tone}`);

const ARGS: Partial<IconArgs> = { glyph: 'folder', size: 24, tone: 'primary' };

const ARG_TYPES: StoryLiteArgTypes<IconArgs> = {
    glyph: { control: 'select', options: NAMES },
    size: { control: 'number' },
    tone: { control: 'select', options: [...TONES], description: 'Icons fill with currentColor.' },
  };

const meta = {
  title: 'Core · Icons/PathIcon',
  parameters: { renderer: 'react' },
} satisfies StoryLiteMeta<IconArgs>;

const Playground = {
  name: 'Playground',
  args: ARGS,
  argTypes: ARG_TYPES,
  render: (args) => (
    <PathIcon {...GLYPHS[args.glyph]} size={args.size} className={toneClass(args.tone)} aria-hidden="true" />
  ),
} satisfies StoryLiteStoryDefinition<IconArgs>;

const SIZES = ['12px', '16px', '24px', '32px'] as const;

const GlyphSet = {
  name: 'Glyph set and sizes',
  render: () => (
    <Demonstrator
      rows={axis(NAMES)}
      columns={axis(SIZES)}
      cell={(name, size) => <PathIcon {...GLYPHS[name]} size={Number.parseInt(size, 10)} aria-hidden="true" />}
    />
  ),
} satisfies StoryLiteStoryDefinition<IconArgs>;

const Tones = {
  name: 'Colour follows the text',
  render: () => (
    <Demonstrator
      columns={axis(TONES)}
      cell={(_row, tone) => (
        <Box className={toneClass(tone)}>
          <PathIcon {...GLYPHS.check} size={20} aria-hidden="true" />
        </Box>
      )}
    />
  ),
} satisfies StoryLiteStoryDefinition<IconArgs>;

const Overview = overviewStory({
  component: 'PathIcon',
  description: 'An inline SVG drawn from your own path strings and circles on a 16-unit grid, for a one-off shape no icon set has. For everyday symbols use Icon with a name instead. It fills with currentColor, so it takes the colour of the text around it, and one size sets both width and height.',
  playground: Playground,
  variants: [GlyphSet, Tones],
});

export default meta;
export { GlyphSet, Overview, Playground, Tones };
