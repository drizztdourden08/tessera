/* @layer stories @kind story */
import type { StoryLiteMeta, StoryLiteStoryDefinition } from '@storylite/storylite';
import type { PlaygroundArgTypes, PlaygroundStory } from '../_template/controls/playground.type';
import { Box, Flex, INPUT_ICON_FAMILIES, INPUT_ICON_NAMES, InputIcon } from '../../src/primitives';
import type { InputIconFamily, InputIconSource } from '../../src/primitives';
import { Demonstrator } from '../_template/Demonstrator';
import { overviewStory } from '../_template/overview-story';
import { InputIconGallery } from './InputIconGallery';
import type { InputIconArgs } from './input-icon-args.type';
import { INPUT_ICON_TITLES } from './input-icon-titles.constants';
import { INPUT_ICON_TONES } from './input-icon-tones.constants';
import './icons.stories.css';

const HIGHLIGHTED: readonly InputIconSource[] = [
  { family: 'xbox', name: 'dpad-up' }, { family: 'playstation', name: 'dpad-left' }, { family: 'switch', name: 'dpad-right' },
  { family: 'gamecube', name: 'dpad-down' }, { family: 'snes', name: 'dpad-up' }, { family: 'generic', name: 'dpad-left' },
  { family: 'gamecube', name: 'a' }, { family: 'generic', name: 'joystick-highlight' },
];

const SIZED: readonly InputIconSource[] = [
  { family: 'xbox', name: 'dpad-up' }, { family: 'playstation', name: 'triangle' }, { family: 'generic', name: 'dpad' },
  { family: 'snes', name: 'dpad-right' }, { family: 'snes', name: 'a' }, { family: 'keyboard', name: 'space-icon' },
];

const keyOf = (source: InputIconSource): string => `${source.family}/${source.name}`;

const sourceOf = (family: InputIconFamily, name: string): InputIconSource => ({ family, name }) as InputIconSource;

const ARG_TYPES: PlaygroundArgTypes<InputIconArgs> = {
  family: { group: 'Content', control: 'select', options: INPUT_ICON_FAMILIES, description: 'Every family, from INPUT_ICON_FAMILIES.' },
  name: {
    group: 'Content',
    control: 'select',
    options: (args) => INPUT_ICON_NAMES[args.family],
    optionView: (name, args) => <InputIcon {...sourceOf(args.family, name)} size={20} tone={args.tone} />,
    description: 'The names INPUT_ICON_NAMES lists for the family. A new family keeps the name when it has one.',
  },
  label: { group: 'Content', control: 'text', description: 'Accessible name. Leave empty for a decorative glyph.' },
  size: { group: 'Appearance', control: 'number', min: 8, description: 'Width and height in pixels, as for Icon.' },
  tone: { group: 'Appearance', control: 'select', options: INPUT_ICON_TONES, description: 'color keeps the pack highlight colours. theme paints them in the primary colour, and a Status tone such as success, danger or info paints them in the colour of that tone, each with a thin gap around them.' },
  ink: { group: 'Appearance', control: 'select', options: ['text', 'primary', 'secondary', 'muted'], description: 'The text colour around it. The glyph draws in currentColor.' },
  effect: { group: 'Motion', control: 'select', options: ['none', 'twinkle', 'glint', 'ping', 'burst', 'dot', 'comet', 'shimmer'], description: 'A pop that lands on a drawn point of the glyph, as for Icon.' },
};

const meta = {
  title: 'Core · Icons/InputIcon',
  parameters: { renderer: 'react' },
} satisfies StoryLiteMeta<InputIconArgs>;

const Playground = {
  name: 'Playground',
  args: { family: 'xbox', name: 'a', size: 48, tone: 'color', ink: 'text', label: '', effect: 'none' },
  argTypes: ARG_TYPES,
  render: (args) => (
    <Box className={args.ink === 'text' ? undefined : `icon-demo--${args.ink}`}>
      <InputIcon
        {...sourceOf(args.family, args.name)}
        size={args.size}
        tone={args.tone}
        label={args.label || undefined}
        effect={args.effect === 'none' ? undefined : args.effect}
      />
    </Box>
  ),
} satisfies PlaygroundStory<InputIconArgs>;

const EveryIcon = {
  name: 'Every icon, by family',
  render: () => (
    <Box className="story-column">
      {INPUT_ICON_FAMILIES.map((family) => <InputIconGallery key={family} family={family} title={INPUT_ICON_TITLES[family]} tone="color" />)}
    </Box>
  ),
} satisfies StoryLiteStoryDefinition<InputIconArgs>;

const Tones = {
  name: 'Highlights in colour, the theme and each tone',
  render: () => (
    <Demonstrator
      rows={INPUT_ICON_TONES.map((tone) => ({ key: tone, label: `tone="${tone}"` }))}
      cell={(tone) => (
        <Flex gap="md" align="center" wrap>
          {HIGHLIGHTED.map((source) => <InputIcon key={keyOf(source)} {...source} size={40} tone={tone} label={`${source.family} ${source.name}`} />)}
        </Flex>
      )}
    />
  ),
} satisfies StoryLiteStoryDefinition<InputIconArgs>;

const Sizes = {
  name: 'Sizes',
  render: () => (
    <Demonstrator
      rows={SIZED.map((source) => ({ key: keyOf(source), label: `${source.family} ${source.name}` }))}
      columns={[16, 24, 32, 48, 64].map((size) => ({ key: String(size), label: `${size}px` }))}
      cell={(key, size) => {
        const source = SIZED.find((each) => keyOf(each) === key);
        return source ? <InputIcon {...source} size={Number(size)} /> : null;
      }}
    />
  ),
} satisfies StoryLiteStoryDefinition<InputIconArgs>;

const CODE = `import { INPUT_ICON_NAMES, InputIcon, gamepadInputIcon, isInputIconName } from '@drizztdourden08/tessera';

<InputIcon family="xbox" name="a" />
<InputIcon family="playstation" name="l2" size={24} />
<InputIcon family="switch" name="dpad-up" tone="theme" />
<InputIcon family="generic" name="joystick-highlight" tone="danger" />
<InputIcon family="keyboard" name="space-icon" label="Space" />

// Every accepted name, and a check for one read at run time
INPUT_ICON_NAMES.snes; // ['a', 'b', 'dpad', 'dpad-down', ...]
isInputIconName('snes', 'lb'); // false

// From an SDL button id or a KeyboardEvent.code
const glyph = gamepadInputIcon('switch', 'a'); // { family: 'switch', name: 'b' }, the bottom face button
{glyph && <InputIcon {...glyph} />}`;

const Overview = overviewStory({
  component: 'InputIcon',
  description: 'A button prompt: a controller button, stick, trigger, d-pad direction or keyboard key.',
  points: [
    '`family` picks the controller, such as `xbox`, `playstation`, `switch` or `keyboard`; `name` picks the glyph.',
    'A name the family lacks draws a question mark key and warns in development.',
    '`tone` paints highlights such as a pressed d-pad arm: `color`, `theme` or a Status tone.',
    '`gamepadInputIcon(family, id)` turns an SDL button id or a `KeyboardEvent.code` into a glyph.',
    'It takes the same `size`, `rotate`, `flip`, `label` and `effect` as [Icon].',
    'Glyphs are Kenney Input Prompts (CC0) and SNES art by drizztdourden_; the README lists the credits.',
  ],
  playground: Playground,
  variants: [EveryIcon, Tones, Sizes],
  code: CODE,
});

export default meta;
export { EveryIcon, Overview, Playground, Sizes, Tones };
