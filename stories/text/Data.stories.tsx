/* @layer stories @kind story */
import type { StoryLiteMeta } from '@storylite/storylite';
import { Text } from '../../src/primitives';
import { textElementStories } from './text-element-stories';

const meta = {
  title: 'Core · Text/Data',
  parameters: { renderer: 'react' },
} satisfies StoryLiteMeta;

const { InContext, Overview, Playground } = textElementStories({
  name: 'Data',
  element: Text.Data,
  description: 'A value with a machine readable form in its value attribute, such as an item id behind a readable name.',
  points: [
    '`Text.Data`, or `Data` imported on its own, draws a `<data>`.',
    '`value` holds the machine readable form.',
    '`features` sets number forms, such as tabular numbers.',
  ],
  instead: '[Time] for a date or a time.',
  text: 'Hookshot',
  attributes: { value: '0x0A' },
  context: <Text.P>Received <Text.Data value="0x0A">Hookshot</Text.Data> from Tavi.</Text.P>,
});

export default meta;
export { InContext, Overview, Playground };
