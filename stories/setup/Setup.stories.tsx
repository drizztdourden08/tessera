/* @layer stories @kind story */
import type { StoryLiteMeta } from '@storylite/storylite';
import { guideStories } from './_samples/guide-story';
import { SETUP_GUIDE } from './_samples/setup-guide.constants';

const meta = {
  title: 'Core · Setup/Setup',
  parameters: { renderer: 'react' },
} satisfies StoryLiteMeta;

const { Overview, Example } = guideStories(SETUP_GUIDE);

export default meta;
export { Example, Overview };
