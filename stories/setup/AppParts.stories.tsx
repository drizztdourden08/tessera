/* @layer stories @kind story */
import type { StoryLiteMeta } from '@storylite/storylite';
import { guideStories } from './_samples/guide-story';
import { APP_PARTS_GUIDE } from './_samples/app-parts-guide.constants';

const meta = {
  title: 'Core · Setup/App primitives and composites',
  parameters: { renderer: 'react' },
} satisfies StoryLiteMeta;

const { Overview, Example } = guideStories(APP_PARTS_GUIDE);

export default meta;
export { Example, Overview };
