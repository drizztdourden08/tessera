/* @layer stories @kind story */
import type { StoryLiteMeta, StoryLiteStoryDefinition } from '@storylite/storylite';
import type { PlaygroundArgTypes, PlaygroundStory } from '../_template/controls/playground.type';
import { Markdown } from '../../src/composites';
import type { MarkdownHeadingOffset, MarkdownSize } from '../../src/composites';
import { Box } from '../../src/primitives';
import { overviewStory } from '../_template/overview-story';
import { HTML_NOTE, NOTE_SAMPLES, RELEASE_NOTE } from './_samples/markdown-notes.constants';
import { MarkdownLinkDemo } from './_samples/MarkdownLinkDemo';
import { MarkdownSourcePair } from './_samples/MarkdownSourcePair';
import { NarrowNoteDialog } from './_samples/NarrowNoteDialog';
import './Markdown.stories.css';

type NoteName = keyof typeof NOTE_SAMPLES;

type MarkdownArgs = {
  note: NoteName;
  size: MarkdownSize;
  headingOffset: MarkdownHeadingOffset;
  hideTitle: boolean;
};

const ARGS: Partial<MarkdownArgs> = { note: 'Release note', size: 'md', headingOffset: 1, hideTitle: false };

const ARG_TYPES: PlaygroundArgTypes<MarkdownArgs> = {
  note: { group: 'Content', control: 'select', options: ['Release note', 'Raw HTML', 'Long note'] },
  size: { group: 'Appearance', control: 'select', options: ['sm', 'md'], description: 'sm for a dialog or a notes box.' },
  headingOffset: { group: 'Content', control: 'select', options: [0, 1, 2, 3, 4, 5], description: 'Levels added to each heading: 1 makes # an h2.' },
  hideTitle: { group: 'Content', control: 'boolean', description: 'Drops the # title when the frame already names the version.' },
};

const meta = {
  title: 'Composites · Content/Markdown',
  parameters: { renderer: 'react' },
} satisfies StoryLiteMeta<MarkdownArgs>;

const Playground = {
  name: 'Playground',
  args: ARGS,
  argTypes: ARG_TYPES,
  render: ({ note = 'Release note', ...rest }) => (
    <Box className="markdown-story__note"><Markdown source={NOTE_SAMPLES[note]} {...rest} /></Box>
  ),
} satisfies PlaygroundStory<MarkdownArgs>;

const ReleaseNote = {
  name: 'A release note',
  render: () => <MarkdownSourcePair source={RELEASE_NOTE} />,
} satisfies StoryLiteStoryDefinition<MarkdownArgs>;

const RawHtml = {
  name: 'Raw HTML and unsafe links dropped',
  render: () => <MarkdownSourcePair source={HTML_NOTE} />,
} satisfies StoryLiteStoryDefinition<MarkdownArgs>;

const NarrowDialog = {
  name: 'A long note in a narrow dialog',
  render: () => <NarrowNoteDialog />,
} satisfies StoryLiteStoryDefinition<MarkdownArgs>;

const LinksInApp = {
  name: 'Links handled by the app',
  render: () => <MarkdownLinkDemo />,
} satisfies StoryLiteStoryDefinition<MarkdownArgs>;

const CODE = `import { Markdown } from '@drizztdourden08/tessera';

<Markdown source={note} />
<Markdown source={note} size="sm" headingOffset={3} hideTitle onLink={openInBrowser} />`;

const Overview = overviewStory({
  component: 'Markdown',
  description: 'Shows a Markdown text, such as a release note, drawn with Tessera parts. Raw HTML is dropped.',
  points: [
    'Headings, paragraphs, lists, bold, italic, links, inline code, code blocks, quotes and rules are drawn.',
    'Raw HTML is dropped; an image shows its alt text and a table stays plain text.',
    'Only http, https and mailto links stay links; any other link becomes plain text.',
    '`onLink` takes every link click; without it a link opens in a new tab with rel noopener.',
    '`headingOffset` moves headings down, 1 by default, so # is an h2; `hideTitle` drops the # title.',
    '`size` sm fits a dialog or a notes box; md fits a page.',
  ],
  instead: '[Text] for text written in the app, or [CodeBlock] for code shown as it is.',
  playground: Playground,
  variants: [ReleaseNote, RawHtml, NarrowDialog, LinksInApp],
  code: CODE,
});

export default meta;
export { LinksInApp, NarrowDialog, Overview, Playground, RawHtml, ReleaseNote };
