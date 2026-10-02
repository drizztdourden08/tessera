/* @layer stories @kind story */
import type { StoryLiteMeta, StoryLiteStoryDefinition } from '@storylite/storylite';
import { overviewStory } from '../_template/overview-story';
import { GuideTopicView } from './_samples/GuideTopicView';
import { PROVIDER_MORE } from './_samples/provider-more.constants';
import { PART_TEXT, PROVIDER_PARTS } from './_samples/provider-part-text.constants';
import { PROVIDER_SECTIONS } from './_samples/provider-sections';
import { FullSetup } from './_samples/provider-full-setup';

const meta = {
  title: 'Core · Setup/TesseraProvider',
  parameters: { renderer: 'react' },
} satisfies StoryLiteMeta;

const Setup = {
  name: 'Full setup',
  render: () => <FullSetup />,
} satisfies StoryLiteStoryDefinition;

const Overview = overviewStory({
  component: 'TesseraProvider',
  description: 'Wrap the app once at the root to swap Tessera parts for its own. Anything left out keeps the Tessera default. An app can override:',
  points: PROVIDER_PARTS.map((part) => PART_TEXT[part].point),
  variants: [],
  sections: [
    ...PROVIDER_SECTIONS,
    { title: 'Full setup', node: <FullSetup /> },
    { title: PROVIDER_MORE.title, node: <GuideTopicView topic={PROVIDER_MORE} /> },
  ],
  code: false,
});

export default meta;
export { Overview, Setup };
