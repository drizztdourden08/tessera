/* @layer root-config @kind config */
import { brockEslint } from '@drizztdourden08/brock-lint-config';

const TOKEN_STORIES = [
  'stories/colours/**',
  'stories/tokens/**',
  'stories/typography/**',
];

const DEMONSTRATOR = ['stories/_template/Demonstrator.tsx'];

const SAMPLE_STORIES = ['stories/data/_samples/table-demo.tsx'];

export default brockEslint({
  ignores: ['dist-storylite/**'],
  primitivesGlobs: ['src/primitives/**/*.tsx'],
  defaultExportGlobs: ['.storylite/config.ts'],
  consoleGlobs: ['**/bin/**', '**/scripts/**', '**/tooling/**', '**/*.test.{ts,tsx,js,mjs}', 'src/primitives/dom/dev-warn.ts'],
  glyphContent: [
    { files: ['src/primitives/EmojiIcon/**', 'stories/icons/EmojiIcon.stories.tsx'], why: 'EmojiIcon is the primitive that draws an emoji' },
    { files: ['stories/primitives/_samples/picker-emoji.tsx'], why: 'the Select and Combobox samples map build states and categories to emoji' },
  ],
  inlineStyle: [
    { files: ['src/composites/Widget/Widget.tsx'], why: 'the frame opacity is set per widget and turns solid on hover' },
    { files: ['src/composites/DockLayout/sub-components/**'], why: 'panes, dividers, drop hints and floating widgets sit at rectangles computed from the layout tree and the pointer' },
    { files: ['src/composites/SplitPane/SplitPane.tsx'], why: 'the split share is dragged by the user' },
    { files: ['src/composites/FloatingSwitch/FloatingSwitch.tsx'], why: 'the thumb is placed and sized from the measured lit item' },
    { files: ['src/composites/DataTable/DataTable.tsx'], why: 'column widths are sized and resized per table' },
    { files: ['src/composites/DataTable/sub-components/GroupRow.tsx'], why: 'a group row indents by its depth' },
    { files: ['src/primitives/CodeBlock/CodeBlock.tsx'], why: 'the highlighter returns each line and token style' },
    { files: ['src/composites/PixelWordmark/PixelWordmark.tsx'], why: 'the aspect ratio comes from the laid out letters' },
    { files: ['src/composites/SearchSpark/SearchSpark.tsx'], why: 'the size prop scales the glyph' },
    { files: ['src/composites/Emphasis/**'], why: 'the weights, timing and each letter delay are set per instance' },
    { files: ['src/composites/KeyboardLayout/**'], why: 'each key is placed and sized from the layout data, in key units' },
    { files: ['src/composites/ShortcutTour/**'], why: 'the camera transform and the speed are computed per frame' },
    { files: ['src/brand/InteractiveTessera/**'], why: 'each tile carries its app ink and each callout its computed place' },
    { files: TOKEN_STORIES, why: 'a token story draws the token or value it documents' },
    { files: SAMPLE_STORIES, why: 'a sample passes live depths through, as an app would' },
    { files: DEMONSTRATOR, why: 'the grid tracks follow the number of columns each story passes in' },
  ],
});
