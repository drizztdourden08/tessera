/* @layer renderer-components @kind data */
import type { ComponentUsage } from '../../guide/usage.type';

const usage = {
  job: 'A small map of a large surface, such as a canvas or a long timeline, with a frame that marks the visible part and that the user drags to move the view.',
  useWhen: [
    'The user pans a surface much larger than the screen, such as a pixel canvas, a node graph or a tilemap, and needs to see where the view sits.',
    'The user should jump to a far corner of a zoomed surface in one press.',
  ],
  avoidWhen: [
    { case: 'One value moves along one line.', use: 'Slider' },
    { case: 'The page scrolls and the user needs to know where they are in it.', use: 'SectionTimeline' },
    { case: 'The user drags a box to select items on a surface.', use: 'MarqueeBox' },
  ],
  rules: [
    'surface is the size of the whole surface and viewport is the visible rectangle, in the same units. The app owns viewport.',
    'onViewportChange gets the new rectangle while the user drags, so the surface follows the frame at once.',
    'Press anywhere on the map to centre the frame there; the drag then goes on from that point.',
    'Pass the thumbnail as children, such as an Image or a canvas. It fills the map and takes no pointer events.',
    'step is the distance of one arrow key press in surface units; the default is a twentieth of the larger side. Shift multiplies it by five.',
    'The width of the map comes from a class or its parent; its height follows the shape of the surface.',
  ],
  a11y: [
    'The frame is a slider with one Tab stop, named Map or by label.',
    'Arrow keys move the frame, Shift makes the step larger, and Page Up and Page Down move it by its own height.',
    'The value text says how far across and down the frame sits, such as Showing 20% to 60% across and 0% to 50% down.',
  ],
  tree: {
    path: ['navigation', 'around a large surface, from a small map of it'],
    rule: 'Navigator draws any large surface as a small map with a frame the user drags, the same way in every editor.',
  },
  example: `import { Image, Navigator } from '@drizztdourden08/tessera';
import type { NavigatorViewport } from '@drizztdourden08/tessera';

interface CanvasMapProps {
  preview: string;
  view: NavigatorViewport;
  setView: (view: NavigatorViewport) => void;
}

const CanvasMap = ({ preview, view, setView }: CanvasMapProps) => (
  <Navigator surface={{ width: 512, height: 512 }} viewport={view} onViewportChange={setView}>
    <Image src={preview} alt="" fit="fill" pixelated />
  </Navigator>
);
`,
  propsHash: '7721a8658b4c4fcb',
} satisfies ComponentUsage;

export { usage };
