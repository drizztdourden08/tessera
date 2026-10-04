/* @layer stories @kind story */
import type { StoryLiteMeta } from '@storylite/storylite';
import { Text } from '../../src/primitives';
import { textElementStories } from './text-element-stories';

const meta = {
  title: 'Core · Text/Address',
  parameters: { renderer: 'react' },
} satisfies StoryLiteMeta;

const { InContext, Overview, Playground } = textElementStories({
  name: 'Address',
  element: Text.Address,
  description: 'Contact details for the page or the section around it: a person, a server, a place.',
  points: [
    '`Text.Address`, or `Address` imported on its own, draws an `<address>`.',
    'Put it in the section the details belong to, such as a footer.',
    'It is for contact details, not for every postal address in the text.',
  ],
  text: 'Room host: Wren',
  context: <Text.Address>Room host: Wren, at <Text.Code>archipelago.gg:38281</Text.Code></Text.Address>,
});

export default meta;
export { InContext, Overview, Playground };
