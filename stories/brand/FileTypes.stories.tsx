/* @layer stories @kind story */
import type { StoryLiteMeta, StoryLiteStoryDefinition } from '@storylite/storylite';
import { overviewStory } from '../_template/overview-story';
import { FileTypeGlyphs } from './_samples/FileTypeGlyphs';
import { FileTypeRows } from './_samples/FileTypeRows';

type FileTypesArgs = Record<string, never>;

const meta = {
  title: 'Core · Brand/File types',
  parameters: { renderer: 'react' },
} satisfies StoryLiteMeta<FileTypesArgs>;

const IconFiles = {
  name: 'Icon files',
  render: () => <FileTypeRows />,
} satisfies StoryLiteStoryDefinition<FileTypesArgs>;

const Glyphs = {
  name: 'Glyphs',
  render: () => <FileTypeGlyphs />,
} satisfies StoryLiteStoryDefinition<FileTypesArgs>;

const Overview = overviewStory({
  component: 'File types',
  description: 'The icons the system shows for an app\'s own files: a dark page, the app mark in a corner and a glyph for the kind.',
  points: [
    'The brand data lists each kind with its file extension, its name and its glyph, in `fileTypes`.',
    '`pnpm icons` writes `brand/<app>/filetypes/<ext>/` with `icon.svg`, `icon.ico`, `icon.icns` and PNGs.',
    'The art is pixel art on a 32 grid, with simpler 24 and 16 grids for the sizes they divide.',
    'Each glyph is also a pixel icon name, so a menu can show the same kind with `Icon`.',
  ],
  instead: '[Logo] for the app icon itself.',
  variants: [IconFiles, Glyphs],
  code: false,
});

export default meta;
export { Glyphs, IconFiles, Overview };
