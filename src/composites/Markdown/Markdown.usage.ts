/* @layer renderer-components @kind data */
import type { ComponentUsage } from '../../guide/usage.type';

const usage = {
  job: 'Shows a Markdown text, such as the release note of a version, as formatted text drawn with Tessera parts: headings, paragraphs, lists, bold, italic, links, inline code, code blocks, quotes and rules. Raw HTML is dropped.',
  useWhen: [
    'The app shows a release note written in Markdown, in an update dialog or an about page.',
    'The text comes as Markdown from a file or a server and the app only shows it.',
  ],
  avoidWhen: [
    { case: 'The text is written in the app itself.', use: 'Text' },
    { case: 'The text is code to show as it is.', use: 'CodeBlock' },
  ],
  rules: [
    'Pass the Markdown as children or as source; the part keeps no state.',
    'Write each release note as release-notes/v<version>.md: a # <Product> v<version> title, a summary paragraph, ## sections and plain bullets.',
    'Set headingOffset so the headings sit under the heading of the place: 1, the default, makes # an h2.',
    'Set hideTitle when the frame around the note already names the version, such as the notes box of a UtilityScreen.',
    'Set size sm in a dialog or a notes box.',
    'Pass onLink in a desktop app to open a link in the system browser; without it a link opens in a new tab.',
    'Only http, https and mailto links are kept. Any other link, raw HTML and images become plain text or nothing.',
  ],
  a11y: [
    'Headings keep their order, moved down by headingOffset, so a screen reader can jump between sections.',
    'A link that opens a new tab says so in its label.',
    'Lists are real lists, read with their length and position.',
  ],
  tree: {
    path: ['text', 'formatted text from Markdown, such as release notes'],
    rule: 'Markdown shows a Markdown text drawn with Tessera parts, with raw HTML and unsafe links dropped.',
  },
  example: `import { Markdown } from '@drizztdourden08/tessera';

const UpdateNotes = ({ source, openExternal }: { source: string; openExternal: (href: string) => void }) => (
  <Markdown source={source} size="sm" headingOffset={2} hideTitle onLink={openExternal} />
);
`,
  propsHash: 'f3abfe3beb0c9304',
} satisfies ComponentUsage;

export { usage };
