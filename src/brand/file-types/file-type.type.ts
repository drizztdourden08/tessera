/* @layer renderer-components @kind types */
import type { PixelGrid } from '../../primitives/Icon/Icon.type';
import type { PIXEL_GRIDS } from '../../primitives/icon-sets/pixel.constants';
import type { IconArtFiles } from '../icon-files.type';

type FileTypeKind = 'sprite' | 'sheet' | 'animation' | 'palette' | 'tileset' | 'tilemap' | 'project' | 'legacy';

type FileTypeGrid = 16 | 24 | 32;

type FileTypeSmallGrid = Exclude<FileTypeGrid, 32>;

interface FileTypeInk {
  ink: string;
  opacity?: number;
}

interface FileTypePaint {
  grid: PixelGrid;
  inks: Readonly<Record<string, FileTypeInk>>;
}

interface FileTypeLook {
  page: string;
  edge: string;
  fold: string;
  glyph: string;
  badge: Readonly<Record<FileTypeGrid, FileTypePaint>>;
}

interface FileTypeSpec {
  kind: FileTypeKind;
  ext: string;
  name: string;
  icon: keyof typeof PIXEL_GRIDS;
  small: Readonly<Record<FileTypeSmallGrid, PixelGrid>>;
}

interface BrandFileTypes {
  look: FileTypeLook;
  types: readonly FileTypeSpec[];
}

interface FileTypePage {
  left: number;
  right: number;
  top: number;
  bottom: number;
  fold: number;
}

interface FileTypeBox {
  x: number;
  y: number;
  w: number;
  h: number;
}

interface FileTypeLayout {
  page: FileTypePage;
  badge: readonly [x: number, y: number];
  glyph: FileTypeBox;
}

type FilePagePart = 'edge' | 'fold' | 'page';

type FileTypeLayer = (x: number, y: number) => FileTypeInk | undefined;

interface FileTypeArtFiles extends IconArtFiles {
  type: FileTypeSpec;
  svg: string;
  icns: string;
}

export type {
  BrandFileTypes, FilePagePart, FileTypeArtFiles, FileTypeBox, FileTypeGrid, FileTypeInk, FileTypeKind, FileTypeLayer, FileTypeLayout,
  FileTypeLook, FileTypePage, FileTypePaint, FileTypeSmallGrid, FileTypeSpec,
};
