/* @layer stories @kind story */
import type { StoryLiteMeta, StoryLiteStoryDefinition } from '@storylite/storylite';
import type { PixelWheel } from '../../src/composites';
import type { PlaygroundStory } from '../_template/controls/playground.type';
import { overviewStory } from '../_template/overview-story';
import { PixelCheckerSample } from './_samples/PixelCheckerSample';
import { PixelControlledSample } from './_samples/PixelControlledSample';
import { PixelSpriteSample } from './_samples/PixelSpriteSample';
import { PIXEL_VIEWPORT_CODE } from './_samples/pixel-viewport-story.constants';
import './PixelViewport.stories.css';

type PixelArgs = { grid: boolean; gridFrom: number; wheel: PixelWheel };

const meta = {
  title: 'Composites · Content/PixelViewport',
  parameters: { renderer: 'react' },
} satisfies StoryLiteMeta<PixelArgs>;

const Playground = {
  name: 'Playground',
  args: { grid: true, gridFrom: 8, wheel: 'zoom' },
  argTypes: {
    grid: { group: 'Appearance', control: 'boolean', description: 'Draws the pixel grid once the zoom reaches gridFrom.' },
    gridFrom: { group: 'Appearance', control: 'range', min: 1, max: 32, step: 1, description: 'The zoom the grid shows from.' },
    wheel: { group: 'Behaviour', control: 'select', options: ['zoom', 'pan'], description: 'What the plain wheel does; Ctrl and a pinch always zoom.' },
  },
  render: (args) => <PixelSpriteSample key={args.wheel} grid={args.grid} gridFrom={args.gridFrom} wheel={args.wheel} />,
} satisfies PlaygroundStory<PixelArgs>;

const Sprite = {
  name: 'A sprite drawn in code, with the pixel under the pointer',
  render: () => <PixelSpriteSample />,
} satisfies StoryLiteStoryDefinition<PixelArgs>;

const CheckerAndGrid = {
  name: 'See-through pixels over the checkerboard, with the grid',
  render: () => <PixelCheckerSample />,
} satisfies StoryLiteStoryDefinition<PixelArgs>;

const Controlled = {
  name: 'Zoom held by the page, with buttons and a readout',
  render: () => <PixelControlledSample />,
} satisfies StoryLiteStoryDefinition<PixelArgs>;

const Overview = overviewStory({
  component: 'PixelViewport',
  description: 'A pixel image the user zooms and pans, sharp at any zoom, over a checkerboard with a pixel grid.',
  points: [
    'The app paints pixels with `draw` or passes a `source`; the viewport owns only the zoom and the pan.',
    'The wheel or a pinch zooms around the pointer by whole steps from 1x; below 1x it halves down to the fit.',
    'Pan with the middle button, Space and drag, or a scroll with Shift for sideways; the image never gets lost.',
    'Plus and minus zoom, 0 fits, 1 shows 100% and the arrows pan; the zoom level is read out once it settles.',
    '`onPointerPixel` reports the pixel under the pointer; the ref maps screen and pixel and calls `fit`.',
    'Leave `zoom` and `pan` out to fit on mount, or hold them with `onZoomChange` and `onPanChange`.',
  ],
  instead: '[MediaViewer] for a picture opened large over the page; [Canvas] for a plain drawing surface with no view.',
  playground: Playground,
  variants: [Sprite, CheckerAndGrid, Controlled],
  code: PIXEL_VIEWPORT_CODE,
});

export default meta;
export { CheckerAndGrid, Controlled, Overview, Playground, Sprite };
