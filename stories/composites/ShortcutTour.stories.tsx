/* @layer stories @kind story */
import type { StoryLiteMeta, StoryLiteStoryDefinition } from '@storylite/storylite';
import type { PlaygroundArgTypes, PlaygroundStory } from '../_template/controls/playground.type';
import { ShortcutTour } from '../../src/composites';
import { Box, MOUSE_SPECS } from '../../src/primitives';
import type { MouseButton, ShortcutKey } from '../../src/primitives';
import { overviewStory } from '../_template/overview-story';
import { SHORTCUT_KEY_OPTIONS } from '../text/_samples/shortcut-samples';
import './ShortcutTour.stories.css';

type TourArgs = {
  keys: readonly ShortcutKey[];
  mouse: MouseButton | 'none';
  zoomOut: boolean;
  loop: boolean;
  speed: number;
};

const MOUSE_BUTTONS = Object.keys(MOUSE_SPECS) as MouseButton[];

const ARG_TYPES: PlaygroundArgTypes<TourArgs> = {
  keys: { group: 'Content', control: 'multiselect', options: SHORTCUT_KEY_OPTIONS, description: 'Keys in the order they are pressed: the order you pick them.' },
  mouse: { group: 'Content', control: 'select', options: ['none', ...MOUSE_BUTTONS], description: 'One mouse button, pressed after the keys.' },
  zoomOut: { group: 'Motion', control: 'boolean', description: 'Ends on a view of the whole combination pressed together.' },
  loop: { group: 'Motion', control: 'boolean', description: 'Releases and starts again. Off, it stops with the keys held.' },
  speed: { group: 'Motion', control: 'range', min: 0.25, max: 4, step: 0.25, description: 'Pace of the walk. 2 is twice as fast.' },
};

const meta = {
  title: 'Composites · Input devices/ShortcutTour',
  parameters: { renderer: 'react' },
} satisfies StoryLiteMeta<TourArgs>;

const Playground = {
  name: 'Playground',
  args: { keys: ['ctrl', 'S'], mouse: 'none', zoomOut: true, loop: true, speed: 1 },
  argTypes: ARG_TYPES,
  render: (args) => (
    <Box className="shortcut-tour-story">
      <ShortcutTour
        keys={args.keys}
        mouse={args.mouse === 'none' ? undefined : args.mouse}
        zoomOut={args.zoomOut}
        loop={args.loop}
        speed={args.speed}
      />
    </Box>
  ),
} satisfies PlaygroundStory<TourArgs>;

const tourStory = (name: string, keys: readonly ShortcutKey[], mouse?: MouseButton, zoomOut = true) => ({
  name,
  render: () => (
    <Box className="shortcut-tour-story">
      <ShortcutTour keys={keys} mouse={mouse} zoomOut={zoomOut} />
    </Box>
  ),
}) satisfies StoryLiteStoryDefinition<TourArgs>;

const Save = tourStory('Ctrl + S', ['ctrl', 'S']);

const Palette = tourStory('Ctrl + Shift + P', ['ctrl', 'shift', 'P']);

const WithMouse = tourStory('Ctrl + left click', ['ctrl'], 'left');

const NoZoomOut = tourStory('No zoom out', ['alt', 'F4'], undefined, false);

const Overview = overviewStory({
  component: 'ShortcutTour',
  description: 'A short visual lesson for a shortcut. A framed keyboard sits behind a camera that zooms onto the first key and presses it, then travels to the next key and presses it once it arrives, holding the earlier keys the way a real combination is held. With zoomOut on, it then pulls back to show every key of the combination at once and presses them together, releases, and starts again. A mouse button joins the walk as the last step, with its pressed part lit in the primary colour. The press look is the one Shortcut uses. With reduced motion the camera stands still on the whole combination, pressed.',
  playground: Playground,
  variants: [Save, Palette, WithMouse, NoZoomOut],
});

export default meta;
export { NoZoomOut, Overview, Palette, Playground, Save, WithMouse };
