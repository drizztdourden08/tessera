/* @layer stories @kind story */
import type { StoryLiteMeta } from '@storylite/storylite';
import { Text } from '../../src/primitives';
import { textElementStories } from './text-element-stories';

const meta = {
  title: 'Core · Text/Time',
  parameters: { renderer: 'react' },
} satisfies StoryLiteMeta;

const { InContext, Overview, Playground } = textElementStories({
  name: 'Time',
  element: Text.Time,
  description: 'A date or a time. dateTime carries the machine readable value, so the visible text can say it in any form.',
  text: 'tonight at 21:04',
  attributes: { dateTime: '2026-09-28T21:04' },
  context: <Text.P>Room opened <Text.Time dateTime="2026-09-28T21:04">tonight at 21:04</Text.Time>.</Text.P>,
});

export default meta;
export { InContext, Overview, Playground };
