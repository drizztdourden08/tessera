# Markdown

Shows a Markdown text, such as the release note of a version, as formatted text drawn with Tessera parts: headings, paragraphs, lists, bold, italic, links, inline code, code blocks, quotes and rules. Raw HTML is dropped.

Import it from `@drizztdourden08/tessera`. It is also exported from `@drizztdourden08/tessera/composites`.

```tsx
import { Markdown } from '@drizztdourden08/tessera';
```

The source is `src/composites/Markdown/Markdown.tsx`. Its gallery page is Composites · Content/Markdown (`#/story/composites-markdown--overview`).

## Where the questions lead here

What are you placing? Text. What kind of text? Formatted text from Markdown, such as release notes.

Markdown shows a Markdown text drawn with Tessera parts, with raw HTML and unsafe links dropped.

## Use it when

- The app shows a release note written in Markdown, in an update dialog or an about page.
- The text comes as Markdown from a file or a server and the app only shows it.

## Use something else when

- The text is written in the app itself. Use [Text](Text.md) instead.
- The text is code to show as it is. Use `CodeBlock` instead.

## Rules

- Pass the Markdown as children or as source; the part keeps no state.
- Write each release note as release-notes/v<version>.md: a # <Product> v<version> title, a summary paragraph, ## sections and plain bullets.
- Set headingOffset so the headings sit under the heading of the place: 1, the default, makes # an h2.
- Set hideTitle when the frame around the note already names the version, such as the notes box of a UtilityScreen.
- Set size sm in a dialog or a notes box.
- Pass onLink in a desktop app to open a link in the system browser; without it a link opens in a new tab.
- Only http, https and mailto links are kept. Any other link, raw HTML and images become plain text or nothing.

## Accessibility

- Headings keep their order, moved down by headingOffset, so a screen reader can jump between sections.
- A link that opens a new tab says so in its label.
- Lists are real lists, read with their length and position.

## Example

```tsx
import { Markdown } from '@drizztdourden08/tessera';

const UpdateNotes = ({ source, openExternal }: { source: string; openExternal: (href: string) => void }) => (
  <Markdown source={source} size="sm" headingOffset={2} hideTitle onLink={openExternal} />
);
```

## Props

- `children` (optional): `string`.
- `source` (optional): `string`.
- `onLink` (optional): `MarkdownLinkHandler`.
- `headingOffset` (optional): `MarkdownHeadingOffset`, one of `0`, `1`, `2`, `3`, `4`, `5`. Default `DEFAULT_HEADING_OFFSET`.
- `hideTitle` (optional): `boolean`. Default `false`.
- `size` (optional): `MarkdownSize`, one of `'sm'`, `'md'`. Default `'md'`.
- `className` (optional): `string`.

## Tokens

It draws on `--c-text`, `--c-text-dim`, `--leading-normal`, `--leading-tight`, `--space-2xs`, `--space-lg`, `--space-sm`, `--space-xs`, `--text-base`, `--text-lg`, `--text-sm`, `--text-xl`, `--weight-semi`.
