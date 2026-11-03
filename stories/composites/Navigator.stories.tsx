/* @layer stories @kind story */
import type { StoryLiteMeta, StoryLiteStoryDefinition } from '@storylite/storylite';
import type { PlaygroundArgTypes, PlaygroundStory } from '../_template/controls/playground.type';
import { overviewStory } from '../_template/overview-story';
import { NavigatorDemo } from './_samples/NavigatorDemo';

type NavigatorArgs = { zoom: number; step: number; bigStep: number; unclamped: boolean; label: string };

const ARGS: NavigatorArgs = { zoom: 4, step: 40, bigStep: 200, unclamped: false, label: 'Canvas map' };

const ARG_TYPES: PlaygroundArgTypes<NavigatorArgs> = {
  zoom: { group: 'Value', control: 'range', min: 1, max: 8, step: 1, description: 'How far the surface is zoomed; the frame shrinks as it grows.' },
  step: { group: 'Behaviour', control: 'range', min: 10, max: 100, step: 10, description: 'The distance of one arrow key press, in surface units.' },
  bigStep: { group: 'Behaviour', control: 'range', min: 50, max: 400, step: 50, description: 'The distance of one Shift plus arrow key press, in surface units.' },
  unclamped: { group: 'Behaviour', control: 'boolean', description: 'Lets the frame move past the edge of the surface.' },
  label: { group: 'Content', control: 'text', description: 'Names the frame for screen readers.' },
};

const meta = {
  title: 'Composites · Navigation/Navigator',
  parameters: { renderer: 'react' },
} satisfies StoryLiteMeta<NavigatorArgs>;

const Playground = {
  name: 'Playground',
  args: ARGS,
  argTypes: ARG_TYPES,
  render: (args) => <NavigatorDemo key={args.zoom} {...args} />,
} satisfies PlaygroundStory<NavigatorArgs>;

const Zooms = {
  name: 'The frame shrinks as the surface zooms in',
  render: () => (
    <>
      <NavigatorDemo zoom={2} />
      <NavigatorDemo zoom={8} />
    </>
  ),
} satisfies StoryLiteStoryDefinition<NavigatorArgs>;

const Marked = {
  name: 'Marks on the map: press the sprite mark, or turn the wheel over the map',
  render: () => <NavigatorDemo marked />,
} satisfies StoryLiteStoryDefinition<NavigatorArgs>;

const CODE = `import { Image, Navigator } from '@drizztdourden08/tessera';
import type { NavigatorViewport } from '@drizztdourden08/tessera';

const [view, setView] = useState<NavigatorViewport>({ x: 0, y: 0, width: 200, height: 125 });

<Navigator surface={{ width: 800, height: 500 }} viewport={view} onViewportChange={setView}>
  <Image src={preview} alt="" fit="fill" />
</Navigator>

<Navigator
  surface={{ width: 800, height: 500 }}
  viewport={view}
  onViewportChange={setView}
  overlays={[{ id: 'sprite', rect: { x: 80, y: 60, width: 160, height: 100 }, kind: 'selection', label: 'Sprite', interactive: true }]}
  onOverlayPress={selectSprite}
  onWheelZoom={(direction, at, deltaY) => zoomAt(direction, at, deltaY)}
  unclamped
  caption="Zoom 400%"
  describe="One sprite is selected."
/>`;

const Overview = overviewStory({
  component: 'Navigator',
  description: 'A small map of a large surface with a frame that marks the visible part and that the user drags.',
  points: [
    '`surface` is the size of the whole surface and `viewport` the visible rectangle, in the same units.',
    'Drag the frame, or press the map to centre it there; `onViewportChange` runs while it moves.',
    'The thumbnail goes in as `children`, such as an [Image]; the map takes the shape of the surface.',
    'The frame is a slider: arrows move it by `step`, [[Shift]] by `bigStep`, and Page Up and Page Down by its height.',
    '`overlays` mark the map; `onOverlayPress`, `onWheelZoom` (with `deltaY`) and `onKey` hand input on.',
    '`empty`, `caption` and `describe` fill the map with no surface, a line under it, and a hidden description.',
  ],
  instead: '[Slider] for one value on one line.',
  playground: Playground,
  variants: [Zooms, Marked],
  code: CODE,
});

export default meta;
export { Marked, Overview, Playground, Zooms };
