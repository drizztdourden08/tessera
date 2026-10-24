/* @layer stories @kind story */
import type { StoryLiteMeta, StoryLiteStoryDefinition } from '@storylite/storylite';
import type { AnchorPickerVariant } from '../../src/composites';
import type { ControlSize } from '../../src/primitives';
import { axis } from '../_template/axis';
import type { PlaygroundArgTypes, PlaygroundStory } from '../_template/controls/playground.type';
import { Demonstrator } from '../_template/Demonstrator';
import { overviewStory } from '../_template/overview-story';
import { AnchorPickerDemo } from './_samples/AnchorPickerDemo';

type AnchorPickerArgs = { label: string; variant: AnchorPickerVariant; size: ControlSize; disabled: boolean };

const VARIANTS: readonly AnchorPickerVariant[] = ['dots', 'arrows'];
const SIZES: readonly ControlSize[] = ['sm', 'md'];

const ARGS: AnchorPickerArgs = { label: 'Anchor', variant: 'dots', size: 'md', disabled: false };

const ARG_TYPES: PlaygroundArgTypes<AnchorPickerArgs> = {
  label: { group: 'Content', control: 'text', description: 'Names the grid for screen readers.' },
  variant: { group: 'Appearance', control: 'select', options: VARIANTS },
  size: { group: 'Appearance', control: 'select', options: SIZES },
  disabled: { group: 'State', control: 'boolean' },
};

const meta = {
  title: 'Composites · Inputs/AnchorPicker',
  parameters: { renderer: 'react' },
} satisfies StoryLiteMeta<AnchorPickerArgs>;

const Playground = {
  name: 'Playground',
  args: ARGS,
  argTypes: ARG_TYPES,
  render: (args) => <AnchorPickerDemo {...args} frame />,
} satisfies PlaygroundStory<AnchorPickerArgs>;

const Looks = {
  name: 'Dots and arrows',
  render: () => (
    <Demonstrator rows={axis(VARIANTS)} cell={(variant) => <AnchorPickerDemo variant={variant} initial="top-left" />} />
  ),
} satisfies StoryLiteStoryDefinition<AnchorPickerArgs>;

const Sizes = {
  name: 'Sizes',
  render: () => <Demonstrator rows={axis(SIZES)} cell={(size) => <AnchorPickerDemo size={size} />} />,
} satisfies StoryLiteStoryDefinition<AnchorPickerArgs>;

const CanvasResize = {
  name: 'Canvas resize',
  render: () => <AnchorPickerDemo variant="arrows" label="Keep this edge" initial="bottom-right" frame />,
} satisfies StoryLiteStoryDefinition<AnchorPickerArgs>;

const Disabled = {
  name: 'Disabled',
  render: () => <AnchorPickerDemo disabled initial="top" />,
} satisfies StoryLiteStoryDefinition<AnchorPickerArgs>;

const CODE = `import { useState } from 'react';
import { AnchorPicker } from '@drizztdourden08/tessera';
import type { Anchor } from '@drizztdourden08/tessera';

const [anchor, setAnchor] = useState<Anchor>('center');

<AnchorPicker label="Keep this edge" variant="arrows" value={anchor} onChange={setAnchor} />`;

const Overview = overviewStory({
  component: 'AnchorPicker',
  description: 'A three by three grid that picks where something is anchored, as an image editor does for canvas resize.',
  points: [
    'Use it to pick a corner, an edge or the centre, for a canvas resize, an alignment or a placement.',
    'The value is one of nine names, from `top-left` to `bottom-right`, and the app owns it.',
    'The `arrows` variant points away from the chosen cell, the look of a canvas resize dialog.',
    'The arrow keys move in two dimensions and choose; it is one radio group with one Tab stop.',
  ],
  instead: '[SegmentedControl] to pick one of a few named options in a row.',
  playground: Playground,
  variants: [Looks, Sizes, CanvasResize, Disabled],
  code: CODE,
});

export default meta;
export { CanvasResize, Disabled, Looks, Overview, Playground, Sizes };
