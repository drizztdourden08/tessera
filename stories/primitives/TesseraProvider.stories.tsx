/* @layer stories @kind story */
import type { StoryLiteMeta } from '@storylite/storylite';
import { overviewStory } from '../_template/overview-story';
import { PART_TEXT, PROVIDER_PARTS } from './_samples/provider-part-text.constants';
import { PROVIDER_SECTIONS } from './_samples/provider-sections';
import { FullSetup } from './_samples/provider-full-setup';

const meta = {
  title: 'Primitives · Setup/TesseraProvider',
  parameters: { renderer: 'react' },
} satisfies StoryLiteMeta;

const Overview = overviewStory({
  component: 'TesseraProvider',
  description: 'Wrap the app once at the root to swap Tessera parts for its own. Anything left out keeps the Tessera default. An app can override:',
  points: PROVIDER_PARTS.map((part) => PART_TEXT[part].point),
  variants: [],
  sections: [...PROVIDER_SECTIONS, { title: 'Full setup', node: <FullSetup /> }],
  code: false,
});

export default meta;
export { Overview };
