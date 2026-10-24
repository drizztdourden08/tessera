/* @layer renderer-components @kind logic */
import type { BrandApp } from '../brand.type';
import { BRAND_FAMILY } from '../family.constants';
import type { FileTypeArtFiles } from './file-type.type';

const fileTypeFiles = (app: BrandApp): FileTypeArtFiles[] => (BRAND_FAMILY[app].fileTypes?.types ?? []).map((type) => {
  const dir = `${app}/filetypes/${type.ext}`;
  return {
    kind: 'filetype',
    label: `${type.name} file, .${type.ext}`,
    ladder: (size) => `${dir}/png/icon-${size}.png`,
    ico: `${dir}/icon.ico`,
    type,
    svg: `${dir}/icon.svg`,
    icns: `${dir}/icon.icns`,
  };
});

export { fileTypeFiles };
