/* @layer stories @kind story */
import type { StoryLiteMeta, StoryLiteStoryDefinition } from '@storylite/storylite';
import type { PlaygroundArgTypes, PlaygroundStory } from '../_template/controls/playground.type';
import { overviewStory } from '../_template/overview-story';
import { PointerPaletteDemo } from './_samples/PointerPaletteDemo';
import type { PointerPaletteDemoArgs as PointerPaletteArgs } from './_samples/PointerPaletteDemo';

const ARGS: PointerPaletteArgs = { holding: true };

const ARG_TYPES: PlaygroundArgTypes<PointerPaletteArgs> = {
  holding: { group: 'Behaviour', control: 'boolean', description: 'The opening press is still held, so letting go over a cell picks it.' },
};

const meta = {
  title: 'Composites · Menus/PointerPalette',
  parameters: { renderer: 'react' },
} satisfies StoryLiteMeta<PointerPaletteArgs>;

const Playground = {
  name: 'Playground',
  args: ARGS,
  argTypes: ARG_TYPES,
  render: (args) => <PointerPaletteDemo {...args} />,
} satisfies PlaygroundStory<PointerPaletteArgs>;

const Tap = {
  name: 'Tap: stays open for clicks and keys',
  render: () => <PointerPaletteDemo holding={false} />,
} satisfies StoryLiteStoryDefinition<PointerPaletteArgs>;

const CODE = `import { PointerPalette } from '@drizztdourden08/tessera';

<PointerPalette
  aria-label="Tools"
  open={at !== null}
  at={at}
  sections={sections}
  value={tool}
  holding
  onPick={setTool}
  onClose={() => setAt(null)}
/>`;

const Overview = overviewStory({
  component: 'PointerPalette',
  description: 'A sectioned grid of icon cells that opens at a point, for the hand that stays on the canvas.',
  points: [
    'Pass `at` and `sections`; each item has an icon, a label and an optional key shown in its cell.',
    'With `holding` set, letting go over a cell picks it; a tap leaves the grid open for clicks.',
    'Arrows move across sections, Enter picks, Escape or a press outside closes and focus returns.',
    'The grid flips above or to the left of the point when there is no room.',
  ],
  instead: '[ContextMenu] when the choices are commands in a list.',
  playground: Playground,
  variants: [Tap],
  code: CODE,
});

export default meta;
export { Overview, Playground, Tap };
