/* @layer stories @kind story */
import type { StoryLiteMeta, StoryLiteStoryDefinition } from '@storylite/storylite';
import { overviewStory } from '../_template/overview-story';
import { ScrollingPage } from './_samples/ScrollingPage';

type PageRootArgs = Record<string, never>;

const meta = {
  title: 'Primitives · Layout/PageRoot',
  parameters: { renderer: 'react' },
} satisfies StoryLiteMeta<PageRootArgs>;

const Page = {
  name: 'A page that scrolls with the document',
  render: () => <ScrollingPage />,
} satisfies StoryLiteStoryDefinition<PageRootArgs>;

const Overview = overviewStory({
  component: 'PageRoot',
  description: 'The root of a website page: it lets the whole document scroll, which a desktop app screen locks.',
  points: [
    'It sets `data-scroll="document"` on the html element while mounted and restores the old value after.',
    'Without it the reset keeps html and body locked, so desktop apps scroll inside their panes as before.',
    'An open dialog locks the page again, so the page behind it does not scroll.',
    'Pair it with a `size="full"` [Hero] that spans the window edge to edge.',
  ],
  instead: '[ScrollArea] for a box that scrolls inside a desktop screen.',
  variants: [Page],
  code: `import { Hero, PageRoot } from '@drizztdourden08/tessera';

<PageRoot>
  <Hero size="full" title="Relic of the Past" art={{ kind: 'image', src: hills, motion: 'pan' }} />
  <main>{sections}</main>
</PageRoot>`,
});

export default meta;
export { Overview, Page };
