/* @layer root-config @kind config */
import { standardsEslint } from '@drizztdourden08/standards/eslint';

const TOKEN_STORIES = [
  'stories/colours/**',
  'stories/tokens/**',
  'stories/typography/**',
];

const DEMONSTRATOR = ['stories/_template/Demonstrator.tsx'];

const SAMPLE_STORIES = ['stories/data/_samples/engine-grid.tsx'];

export default standardsEslint({
  ignores: ['dist-storylite/**'],
  defaultExportGlobs: ['.storylite/config.ts', 'scripts/standards/stylelint/*.mjs'],
  consoleGlobs: ['**/bin/**', '**/scripts/**', '**/tooling/**', '**/*.test.{ts,tsx,js,mjs}', 'src/primitives/dom/dev-warn.ts'],
  glyphContent: [
    { files: ['src/primitives/EmojiIcon/**', 'stories/icons/EmojiIcon.stories.tsx'], why: 'EmojiIcon is the primitive that draws an emoji' },
    { files: ['stories/primitives/_samples/picker-emoji.tsx'], why: 'the Select and Combobox samples map build states and categories to emoji' },
    { files: ['stories/primitives/_samples/password-samples.constants.ts'], why: 'the PasswordInput samples list the mask characters a host can pick, which are glyphs by nature' },
  ],
  inlineStyle: [
    { files: ['src/composites/Widget/Widget.tsx'], why: 'the frame opacity is set per widget and turns solid on hover' },
    { files: ['src/composites/DockLayout/sub-components/**'], why: 'panes, dividers, drop hints and floating widgets sit at rectangles computed from the layout tree and the pointer' },
    { files: ['src/composites/SplitPane/SplitPane.tsx'], why: 'the split share is dragged by the user' },
    { files: ['src/composites/FloatingSwitch/FloatingSwitch.tsx'], why: 'the thumb is placed and sized from the measured lit item' },
    { files: ['src/composites/DropdownMenu/sub-components/SubMenuPanel.tsx', 'src/composites/DropdownMenu/sub-components/SubMenuJoinPieces.tsx'], why: 'a sub-menu and the pieces that join it to its parent sit where the measured parent edge and trigger row put them' },
    { files: ['src/composites/ControlMenu/sub-components/ControlSubPanel.tsx', 'src/composites/ControlMenu/sub-components/ControlSubUnder.tsx'], why: 'a ControlMenu sub-panel joins its row the way a DropdownMenu sub-menu does, from the measured join, or takes the width of its row' },
    { files: ['src/composites/DataTable/DataTable.tsx'], why: 'column widths are sized and resized per table' },
    { files: ['src/composites/DataTable/sub-components/GroupRow.tsx'], why: 'a group row indents by its depth' },
    { files: ['src/composites/GroupTree/sub-components/GroupTreeRow.tsx', 'src/composites/GroupTree/sub-components/GroupTreeGuides.tsx'], why: 'a tree row indents by its depth and draws a guide per ancestor' },
    { files: ['src/composites/ListItemRow/ListItemRow.tsx', 'src/composites/ListItemRow/sub-components/ListItemList.tsx'], why: 'the grid tracks follow the number of columns the rows pass in' },
    { files: ['src/primitives/CodeBlock/CodeBlock.tsx'], why: 'the highlighter returns each line and token style' },
    { files: ['src/composites/Hero/sub-components/HeroBackdropLayer.tsx'], why: 'the backdrop image, its place and its colour are passed in by the host' },
    { files: ['src/composites/LogPanel/LogPanel.tsx'], why: 'a fixed panel height in pixels is passed in by the host' },
    { files: ['src/composites/SettingsRow/sub-components/SettingsRowDescription.tsx'], why: 'a long description folds to the number of lines the host passes in' },
    { files: ['src/composites/PixelWordmark/PixelWordmark.tsx'], why: 'the aspect ratio comes from the laid out letters' },
    { files: ['src/composites/Emphasis/**'], why: 'the weights, timing and each letter delay are set per instance' },
    { files: ['src/composites/KeyboardLayout/**'], why: 'each key is placed and sized from the layout data, in key units' },
    { files: ['src/composites/ShortcutTour/**'], why: 'the camera transform and the speed are computed per frame' },
    { files: ['src/brand/InteractiveTessera/**'], why: 'each tile carries its app ink and each callout its computed place' },
    { files: TOKEN_STORIES, why: 'a token story draws the token or value it documents' },
    { files: SAMPLE_STORIES, why: 'a sample passes live depths through, as an app would' },
    { files: DEMONSTRATOR, why: 'the grid tracks follow the number of columns each story passes in' },
  ],
});
