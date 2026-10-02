/* @layer stories @kind story */
import type { StoryLiteMeta } from '@storylite/storylite';
import { guideStories } from './_samples/guide-story';
import { VIEWS_GUIDE } from './_samples/views-guide.constants';

const meta = {
  title: 'Core · Setup/Building views',
  parameters: { renderer: 'react' },
} satisfies StoryLiteMeta;

const { Overview, Example } = guideStories(VIEWS_GUIDE);

export default meta;
export { Example, Overview };
