/* @layer stories @kind story */
import type { StoryLiteMeta, StoryLiteStoryDefinition } from '@storylite/storylite';
import type { PlaygroundArgTypes, PlaygroundStory } from '../_template/controls/playground.type';
import { Box, INPUT_ICON_FAMILIES, INPUT_ICON_NAMES, InputIcon } from '../../src/primitives';
import type { InputIconFamily, InputIconSource } from '../../src/primitives';
import { Demonstrator } from '../_template/Demonstrator';
import { overviewStory } from '../_template/overview-story';
import { InputIconGallery } from './InputIconGallery';
import type { InputIconArgs } from './input-icon-args.type';
import { INPUT_ICON_TITLES } from './input-icon-titles.constants';
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
  tone: { group: 'Appearance', control: 'select', options: ['color', 'theme'], description: 'color keeps the pack highlight colours; theme paints them in the primary colour with a thin gap around them.' },
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
  name: 'Highlights in colour and in the theme',
  render: () => (
    <Demonstrator
      rows={[{ key: 'color', label: 'tone="color"' }, { key: 'theme', label: 'tone="theme"' }]}
      columns={HIGHLIGHTED.map((source) => ({ key: keyOf(source), label: `${source.family} ${source.name}` }))}
      cell={(tone, key) => {
        const source = HIGHLIGHTED.find((each) => keyOf(each) === key);
        return source ? <InputIcon {...source} size={40} tone={tone} /> : null;
      }}
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
<InputIcon family="keyboard" name="space-icon" label="Space" />

// Every accepted name, and a check for one read at run time
INPUT_ICON_NAMES.snes; // ['a', 'b', 'dpad', 'dpad-down', ...]
isInputIconName('snes', 'lb'); // false

// From an SDL button id or a KeyboardEvent.code
const glyph = gamepadInputIcon('switch', 'a'); // { family: 'switch', name: 'b' }, the bottom face button
{glyph && <InputIcon {...glyph} />}`;

const Overview = overviewStory({
  component: 'InputIcon',
  description: 'A button prompt: a controller button, stick, trigger, d-pad direction or keyboard key, drawn by Icon from data bundled with the app. Pick a family, xbox, playstation, switch, gamecube, snes, generic or keyboard, and a name from it. INPUT_ICON_FAMILIES lists the families and INPUT_ICON_NAMES lists the names each one accepts, the same lists the types come from, and isInputIconName(family, name) checks a name at run time. A name the family does not have draws a question mark key and warns in development, so a wrong name never leaves a gap. It takes the same size, rotation, flip, label and effect as Icon and draws in currentColor. A few glyphs carry a highlight: the pressed arm of a d-pad, red in every family, the red ball of a joystick, the coloured GameCube buttons. tone="color" keeps the pack colours. tone="theme" paints them in the primary colour and cuts a thin gap around them, so a pale primary still stands apart from the glyph. The SNES family is full colour art and keeps its own colours, apart from the pressed d-pad arrow, which follows tone. The generic family has a plain d-pad and the four directions, for a controller with no known layout. Every glyph is vector paths only, with no bitmap or blur filter, so it stays sharp at 16 pixels and at 64. gamepadInputIcon(family, id) turns an SDL button id or a KeyboardEvent.code into the right glyph, which is how PressedGrid draws its cells. The Xbox, PlayStation, Switch, GameCube, generic and keyboard glyphs are Kenney Input Prompts (CC0). The SNES art was drawn by drizztdourden_ from scratch for Relic of the Past, inspired by Tiago Alexander\'s "SNES Controller in Sketch".',
  playground: Playground,
  variants: [EveryIcon, Tones, Sizes],
  code: CODE,
});

export default meta;
export { EveryIcon, Overview, Playground, Sizes, Tones };
