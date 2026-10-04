/* @layer stories @kind story */
import type { StoryLiteMeta } from '@storylite/storylite';
import { Text } from '../../src/primitives';
import { textElementStories } from './text-element-stories';

const meta = {
  title: 'Core · Text/Variable',
  parameters: { renderer: 'react' },
} satisfies StoryLiteMeta;

const { InContext, Overview, Playground } = textElementStories({
  name: 'Variable',
  element: Text.Var,
  description: 'A variable in a formula or in prose about code, set in italic.',
  points: [
    '`Text.Var`, or `Var` imported on its own, draws a `<var>`.',
    'Use it for a name that stands for a value, such as _n_ in a formula.',
    'Code someone types goes in [Code].',
  ],
  text: 'n',
  context: <Text.P>With <Text.Var>n</Text.Var> players there are <Text.Var>n</Text.Var> × 216 checks.</Text.P>,
});

export default meta;
export { InContext, Overview, Playground };
