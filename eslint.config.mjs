/* @layer root-config @kind config */
import { brockEslint } from '@drizztdourden08/brock-lint-config';

const TOKEN_STORIES = [
  'stories/colours/**',
  'stories/tokens/**',
  'stories/typography/**',
  'stories/_template/VariantGrid.tsx',
];

const SAMPLE_STORIES = ['stories/composites/_samples/data-widget-dock.tsx', 'stories/data/_samples/table-demo.tsx'];

export default brockEslint({
  primitivesGlobs: ['src/primitives/**/*.tsx'],
  defaultExportGlobs: ['.storylite/config.ts'],
  glyphContent: [
    { files: ['src/primitives/EmojiIcon/**', 'stories/icons/EmojiIcon.stories.tsx'], why: 'EmojiIcon is the primitive that draws an emoji' },
  ],
  inlineStyle: [
    { files: ['src/composites/Widget/Widget.tsx'], why: 'a widget is placed where it was docked, dragged or resized' },
    { files: ['src/composites/SplitPane/SplitPane.tsx'], why: 'the split share is dragged by the user' },
    { files: ['src/composites/DataTable/DataTable.tsx'], why: 'column widths are sized and resized per table' },
    { files: ['src/composites/DataTable/sub-components/GroupRow.tsx'], why: 'a group row indents by its depth' },
    { files: ['src/composites/CodeBlock/CodeBlock.tsx'], why: 'the highlighter returns each line and token style' },
    { files: ['src/composites/PixelWordmark/PixelWordmark.tsx'], why: 'the aspect ratio comes from the laid out letters' },
    { files: ['src/composites/SearchSpark/SearchSpark.tsx'], why: 'the size prop scales the glyph' },
    { files: ['src/composites/Emphasis/**'], why: 'the weights, timing and each letter delay are set per instance' },
    { files: ['src/brand/TesseraLogo/**'], why: 'each tile carries its app ink and each callout its computed place' },
    { files: TOKEN_STORIES, why: 'a token story draws the token or value it documents' },
    { files: SAMPLE_STORIES, why: 'a sample passes live insets and depths through, as an app would' },
  ],
});
