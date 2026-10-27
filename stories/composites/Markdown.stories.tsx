/* @layer stories @kind story */
import type { StoryLiteMeta, StoryLiteStoryDefinition } from '@storylite/storylite';
import type { PlaygroundArgTypes, PlaygroundStory } from '../_template/controls/playground.type';
import { Markdown } from '../../src/composites';
import type { MarkdownHeadingOffset, MarkdownSize } from '../../src/composites';
import { Box } from '../../src/primitives';
import { overviewStory } from '../_template/overview-story';
import { HTML_NOTE, NOTE_SAMPLES, README_NOTE, RELEASE_NOTE } from './_samples/markdown-notes.constants';
import { MarkdownExtrasDemo } from './_samples/MarkdownExtrasDemo';
import { MarkdownImageClickDemo } from './_samples/MarkdownImageClickDemo';
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
  note: { group: 'Content', control: 'select', options: ['Release note', 'Raw HTML', 'Long note', 'README'] },
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

const Readme = {
  name: 'A README with a table, tasks and strikethrough',
  render: () => <MarkdownSourcePair source={README_NOTE} />,
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

const ImagesAndIds = {
  name: 'Images, id links and app paths',
  render: () => <MarkdownExtrasDemo />,
} satisfies StoryLiteStoryDefinition<MarkdownArgs>;

const ImageClick = {
  name: 'Base64 images and a click handler',
  render: () => <MarkdownImageClickDemo />,
} satisfies StoryLiteStoryDefinition<MarkdownArgs>;

const TIMES_NOTE = 'Renders at 1920x1080 or 16x9, in a 3x4x5 box. Code keeps `1920x1080`, and 0x1F stays a hex value.';

const TimesSign = {
  name: 'Smart times between digits',
  render: () => (
    <Box className="story-column">
      <Markdown source={TIMES_NOTE} size="inline" />
      <Markdown source={TIMES_NOTE} size="inline" smartTimes />
    </Box>
  ),
} satisfies StoryLiteStoryDefinition<MarkdownArgs>;

const LINK_NOTE = 'Fixed T-5 and I-12, see [the notes](https://example.com/notes).';

const LINK_IDS = { pattern: /[TI]-\d+/, href: (id: string) => `https://example.com/${id}` };

const NeutralLinks = {
  name: 'Links in the text colour',
  render: () => (
    <Box className="story-column">
      <Markdown source={LINK_NOTE} size="inline" linkIds={LINK_IDS} />
      <Markdown source={LINK_NOTE} size="inline" linkIds={LINK_IDS} linkTone="neutral" />
    </Box>
  ),
} satisfies StoryLiteStoryDefinition<MarkdownArgs>;

const CODE =`import { Markdown } from '@drizztdourden08/tessera';

<Markdown source={note} />
<Markdown source={note} size="sm" headingOffset={3} hideTitle onLink={openInBrowser} />
<Markdown source={note} images linkIds={{ pattern: /\\b[TI]-\\d+\\b/, href: itemPath }} onLink={open} />`;

const Overview = overviewStory({
  component: 'Markdown',
  description: 'Shows a Markdown text, such as a release note, drawn with Tessera parts. Raw HTML is dropped.',
  points: [
    'GitHub tables, task lists and strikethrough, with headings, lists, code and quotes, use Tessera parts.',
    'Raw HTML is dropped, and only http, https and mailto links stay links, plus app paths with `onLink`.',
    '`onLink` takes every link click; without it a link opens in a new tab with rel noopener.',
    '`images` draws http, https and base64 png, jpeg, gif and webp, never svg; `onImage` makes each a button.',
    '`linkIds` makes ids such as T-5 links; `linkTone` and `smartTimes` set link colour and 1920x1080 signs.',
    '`headingOffset` moves headings down, `hideTitle` drops the # title, and `size` is sm, md or inline.',
  ],
  instead: '[Text] for text written in the app, or [CodeBlock] for code shown as it is.',
  playground: Playground,
  variants: [ReleaseNote, Readme, RawHtml, NarrowDialog, LinksInApp, ImagesAndIds, ImageClick, TimesSign, NeutralLinks],
  code: CODE,
});

export default meta;
export { ImageClick, ImagesAndIds, LinksInApp, NarrowDialog, NeutralLinks, Overview, Playground, RawHtml, Readme, ReleaseNote, TimesSign };
