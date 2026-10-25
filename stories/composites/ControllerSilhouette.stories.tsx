/* @layer stories @kind story */
import type { StoryLiteMeta, StoryLiteStoryDefinition } from '@storylite/storylite';
import type { PlaygroundArgTypes, PlaygroundStory } from '../_template/controls/playground.type';
import { CONTROLLER_SILHOUETTE_VARIANTS, ControllerSilhouette } from '../../src/composites';
import type { ControllerSilhouetteVariant } from '../../src/composites';
import { Box, Text } from '../../src/primitives';
import { overviewStory } from '../_template/overview-story';
import { SilhouetteOverlay } from './_samples/SilhouetteOverlay';
import './ControllerSilhouette.stories.css';

type CardWidth = 'small card' | 'large card';

type SilhouetteArgs = {
  variant: ControllerSilhouetteVariant;
  width: CardWidth;
};

const WIDTH_CLASS: Record<CardWidth, string> = { 'small card': 'silhouette-story', 'large card': 'silhouette-story--lg' };

const ARGS: Partial<SilhouetteArgs> = { variant: 'offset', width: 'small card' };

const ARG_TYPES: PlaygroundArgTypes<SilhouetteArgs> = {
  variant: { group: 'Appearance', control: 'select', options: [...CONTROLLER_SILHOUETTE_VARIANTS] },
  width: { group: 'Appearance', control: 'select', options: ['small card', 'large card'], description: 'The width of the card around it.' },
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
      <ControllerSilhouette variant={args.variant} />
    </Box>
  ),
} satisfies PlaygroundStory<SilhouetteArgs>;

const variantStory = (variant: ControllerSilhouetteVariant, name: string) => ({
  name,
  render: () => <Box className="silhouette-story"><ControllerSilhouette variant={variant} /></Box>,
}) satisfies StoryLiteStoryDefinition<SilhouetteArgs>;

const Offset = variantStory('offset', 'Offset sticks, an Xbox shape');
const Symmetric = variantStory('symmetric', 'Sticks side by side, a PlayStation shape');
const Nintendo = variantStory('nintendo', 'A broad offset body, a Switch Pro shape');
const Pad = variantStory('pad', 'A pad with no sticks or triggers, an SNES shape');

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

const CODE = `import { ControllerSilhouette, SvgCircle } from '@drizztdourden08/tessera';

<ControllerSilhouette variant="offset" label="Pad 1">
  <SvgCircle cx={121} cy={72} r={14} />
</ControllerSilhouette>`;

const Overview = overviewStory({
  component: 'ControllerSilhouette',
  description: 'The outline of a controller, one stroked line with no fill. The app draws its own marks on top.',
  points: [
    '`variant` picks the outline: `offset`, `symmetric`, `nintendo`, or `pad` with no sticks or triggers.',
    'Only the outer edge is drawn, shoulders included. Nothing marks a button, stick or trigger.',
    '`children` render inside the SVG, on top of the outline, in viewBox units.',
    'The viewBox is fixed at `0 0 400 260` for every variant, so app coordinates stay valid.',
    'Where each control sits is app data, such as the anchors of Brock. Tessera draws no marks.',
    'It grows with its container. The drawing is hidden from screen readers and `label` names it.',
  ],
  playground: Playground,
  variants: [Offset, Symmetric, Nintendo, Pad, Overlay, Sizes],
  code: CODE,
});

export default meta;
export { Nintendo, Offset, Overlay, Overview, Pad, Playground, Sizes, Symmetric };
