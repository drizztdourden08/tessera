/* @layer renderer-components @kind data */
import type { ComponentUsage } from '../../guide/usage.type';

const usage = {
  job: 'Shows a Markdown text, such as the release note of a version, as formatted text drawn with Tessera parts: headings, paragraphs, lists, task lists, tables, bold, italic, strikethrough, links, inline code, code blocks, quotes and rules. Raw HTML is dropped.',
  useWhen: [
    'The app shows a release note written in Markdown, in an update dialog or an about page.',
    'The text comes as Markdown from a file or a server and the app only shows it.',
    'A game or project README with tables and task lists.',
  ],
  avoidWhen: [
    { case: 'The text is written in the app itself.', use: 'Text' },
    { case: 'The text is code to show as it is.', use: 'CodeBlock' },
  ],
  rules: [
    'Pass the Markdown as children or as source; the part keeps no state.',
    'Every piece is drawn with a Tessera part, never styled HTML: Text for headings, Link, List and ListItem, Table, Checkbox, Code, Strong, Em, S, BlockQuote, CodeBlock and Divider.',
    'GitHub tables, task lists, strikethrough and autolinks are on. A table is a Table, so it matches every other table in the app.',
    'A task item (- [x] done, - [ ] to do) is a read-only Checkbox, disabled, with the item text as its label; the box follows the source and the user cannot tick it.',
    'Write each release note as release-notes/v<version>.md: a # <Product> v<version> title, a summary paragraph, ## sections and plain bullets.',
    'Set headingOffset so the headings sit under the heading of the place: 1, the default, makes # an h2.',
    'Set hideTitle when the frame around the note already names the version, such as the notes box of a UtilityScreen.',
    'Set size sm in a dialog or a notes box.',
    'Set size inline inside a card or an InlineEdit display: no block margins, paragraphs as runs, tight lists, and headings as bold text at the text size.',
    'Pass onLink in a desktop app to open a link in the system browser; without it a link opens in a new tab.',
    'Only http, https and mailto links are kept. Any other link and raw HTML become plain text or nothing, and an image shows its alt text.',
    'Pass images to draw images: true allows http and https addresses, and a function gets each src and returns the address to load, or nothing to drop the image.',
    'An image is drawn with Image, with its alt text, lazy loading and no wider than the text; it stays off by default.',
    'With images on, base64 data images of type png, jpeg, gif and webp are drawn too, up to 2 million characters; svg and every other data type are always dropped.',
    'Pass onImage to make each drawn image a button, focusable and pressed with Enter or Space, named by its alt text; it gets { src, alt }, so the app can open a lightbox. Without it images stay inert.',
    'Control characters (except tab and line breaks), private-use characters and lone surrogates are removed from the source before it is parsed; emoji and normal text stay.',
    'Pass linkIds, a rule or a list of rules with a pattern and an href function, so plain ids such as T-5 become links; they are made in text only, never in code or inside a link.',
    'Set linkTone to neutral to draw links, such as the ids made by linkIds, in the text colour with an underline instead of the link accent; the other link tones are available too.',
    'Set idLinkTone to give the links made by linkIds their own tone, such as neutral for ids while web links keep linkTone; without it ids follow linkTone.',
    'Set smartTimes to draw a multiplication sign for an x between two digits, as in a size written 1920x1080; it works in text only, never in code, a link or a hex value such as 0x1F, and no other punctuation changes.',
    'A link that starts with a slash, such as /files/notes.md, is an app path: it is kept only when onLink is passed, and goes to onLink like any link.',
    'Whatever an href function gives still has to be an http, https or mailto address, or an app path with onLink; javascript addresses are always dropped, and data addresses only pass as the image types above.',
  ],
  a11y: [
    'Headings keep their order, moved down by headingOffset, so a screen reader can jump between sections.',
    'A link that opens a new tab says so in its label.',
    'Lists are real lists, read with their length and position.',
    'A table is a real table with a head, so each cell is read with its column heading.',
    'A task item is a disabled Checkbox that a screen reader reads as checked or not checked, with its text as the name.',
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
  propsHash: '04caf6341bd65294',
} satisfies ComponentUsage;

export { usage };
