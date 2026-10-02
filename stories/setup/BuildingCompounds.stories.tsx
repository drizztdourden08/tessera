/* @layer stories @kind story */
import type { StoryLiteMeta } from '@storylite/storylite';
import { guideStories } from './_samples/guide-story';
import { COMPOUNDS_GUIDE } from './_samples/compounds-guide.constants';

const meta = {
  title: 'Core · Setup/Building compounds',
  parameters: { renderer: 'react' },
} satisfies StoryLiteMeta;

const { Overview, Example } = guideStories(COMPOUNDS_GUIDE);

export default meta;
export { Example, Overview };
