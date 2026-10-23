/* @layer stories @kind story */
import type { StoryLiteMeta, StoryLiteStoryDefinition } from '@storylite/storylite';
import type { PlaygroundArgTypes, PlaygroundStory } from '../_template/controls/playground.type';
import { CONTROLLER_SILHOUETTE_VARIANTS, ControllerSilhouette } from '../../src/composites';
import type { ControllerSilhouetteVariant } from '../../src/composites';
import { Box, Text } from '../../src/primitives';
import { overviewStory } from '../_template/overview-story';
import { SilhouetteAnchorDots } from './_samples/SilhouetteAnchorDots';
import { SilhouetteAnchorTable } from './_samples/SilhouetteAnchorTable';
import { SilhouetteOverlay } from './_samples/SilhouetteOverlay';
import './ControllerSilhouette.stories.css';

type CardWidth = 'small card' | 'large card';

type SilhouetteArgs = {
  variant: ControllerSilhouetteVariant;
  anchors: boolean;
  width: CardWidth;
};

const WIDTH_CLASS: Record<CardWidth, string> = { 'small card': 'silhouette-story', 'large card': 'silhouette-story--lg' };

const ARGS: Partial<SilhouetteArgs> = { variant: 'offset', anchors: false, width: 'small card' };

const ARG_TYPES: PlaygroundArgTypes<SilhouetteArgs> = {
  variant: { group: 'Appearance', control: 'select', options: [...CONTROLLER_SILHOUETTE_VARIANTS] },
  width: { group: 'Appearance', control: 'select', options: ['small card', 'large card'], description: 'The width of the card around it.' },
  anchors: { group: 'Content', control: 'boolean', description: 'Overlays a dot at every anchor, as children of the drawing.' },
};

const meta = {
  title: 'Composites · Input devices/ControllerSilhouette',
  parameters: { renderer: 'react' },
} satisfies StoryLiteMeta<SilhouetteArgs>;

const Playground = {
  name: 'Playground',
  args: ARGS,
  argTypes: ARG_TYPES,
  render: (args) => (
    <Box className={WIDTH_CLASS[args.width]}>
      <ControllerSilhouette variant={args.variant}>{args.anchors ? <SilhouetteAnchorDots variant={args.variant} /> : null}</ControllerSilhouette>
    </Box>
  ),
} satisfies PlaygroundStory<SilhouetteArgs>;

const variantStory = (variant: ControllerSilhouetteVariant, name: string) => ({
  name,
  render: () => <Box className="silhouette-story"><ControllerSilhouette variant={variant} /></Box>,
}) satisfies StoryLiteStoryDefinition<SilhouetteArgs>;

const Offset = variantStory('offset', 'Offset sticks, an Xbox shape');
const Symmetric = variantStory('symmetric', 'Sticks side by side, a PlayStation shape');
const Nintendo = variantStory('nintendo', 'A rounder offset body, a Switch Pro shape');
const Pad = variantStory('pad', 'A pad with no sticks or triggers, an SNES shape');

const WithAnchors = {
  name: 'With anchors',
  render: () => (
    <Box className="silhouette-story__grid">
      {CONTROLLER_SILHOUETTE_VARIANTS.map((variant) => (
        <Box key={variant}>
          <Text className="story-label">{variant}</Text>
          <ControllerSilhouette variant={variant}><SilhouetteAnchorDots variant={variant} /></ControllerSilhouette>
          <SilhouetteAnchorTable variant={variant} />
        </Box>
      ))}
    </Box>
  ),
} satisfies StoryLiteStoryDefinition<SilhouetteArgs>;

const Overlay = {
  name: 'The app draws on it',
  render: () => <Box className="silhouette-story"><SilhouetteOverlay /></Box>,
} satisfies StoryLiteStoryDefinition<SilhouetteArgs>;

const Sizes = {
  name: 'At a small and a large card',
  render: () => (
    <Box className="story-column">
      <Text className="story-label">small card</Text>
      <Box className="silhouette-story"><ControllerSilhouette variant="nintendo" /></Box>
      <Text className="story-label">large card</Text>
      <Box className="silhouette-story--lg"><ControllerSilhouette variant="symmetric" /></Box>
    </Box>
  ),
} satisfies StoryLiteStoryDefinition<SilhouetteArgs>;

const CODE = `import { CONTROLLER_SILHOUETTE_ANCHORS, ControllerSilhouette, SvgCircle } from '@drizztdourden08/tessera';

const stick = CONTROLLER_SILHOUETTE_ANCHORS.offset['stick.left'];

<ControllerSilhouette variant="offset" label="Pad 1">
  <SvgCircle cx={stick.x} cy={stick.y} r={stick.r * 0.6} />
</ControllerSilhouette>`;

const Overview = overviewStory({
  component: 'ControllerSilhouette',
  description: 'An empty controller body with soft shading and quiet wells. The app draws its own marks on top.',
  points: [
    '`variant` picks the body: `offset`, `symmetric`, `nintendo`, or `pad` with no sticks or triggers.',
    'The drawing has no buttons, glyphs or labels. Wells show where the controls sit.',
    '`children` render inside the SVG, on top of the body, in viewBox units.',
    'The viewBox is fixed at `0 0 400 260` for every variant, so app coordinates stay valid.',
    '`CONTROLLER_SILHOUETTE_ANCHORS` gives the centre and radius of each well per variant.',
    'It grows with its container. The drawing is hidden from screen readers and `label` names it.',
  ],
  playground: Playground,
  variants: [Offset, Symmetric, Nintendo, Pad, WithAnchors, Overlay, Sizes],
  code: CODE,
});

export default meta;
export { Nintendo, Offset, Overlay, Overview, Pad, Playground, Sizes, Symmetric, WithAnchors };
