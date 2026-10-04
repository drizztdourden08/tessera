/* @layer stories @kind story */
import type { StoryLiteMeta, StoryLiteStoryDefinition } from '@storylite/storylite';
import { overviewStory } from '../_template/overview-story';
import { GuideTopicView } from './_samples/GuideTopicView';
import { PROVIDER_MORE } from './_samples/provider-more.constants';
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
  description: 'Wraps the app once at the root so Tessera parts, from the spinner to the wording and icons, draw the app\'s own.',
  points: [
    '`overrides` names only what the app changes; every part left out keeps the Tessera default.',
    '`spinner`, `imagePlaceholder` and `emptyArt` swap the loading, image and empty state pictures.',
    '`strings` replaces built in wording key by key, and `icons` swaps the set behind [Icon] names.',
    '`writeText` is what every copy button calls; `errorFallback` is what an [ErrorBoundary] shows.',
    '`portalDocument` is where popups and dialogs render, such as the host page of an app in an iframe.',
  ],
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
