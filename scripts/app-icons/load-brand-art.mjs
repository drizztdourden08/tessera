/* @layer tooling-scripts @kind logic */
import { runnerImport } from 'vite';

const RUNNER = { configFile: false, logLevel: 'silent' };

const inked = (brand, markInk) => ({
  ...brand,
  mark: markInk(brand.mark, 'light'),
  ...(brand.iconMark ? { iconMark: markInk(brand.iconMark, 'light') } : {}),
});

const loadBrandArt = async (root) => {
  const load = (path) => runnerImport(path, { ...RUNNER, root }).then((loaded) => loaded.module);
  const [family, markup, files, sizes, rim, ground, ink, fileArt, fileGrid, fileFiles] = await Promise.all([
    load('/src/brand/family.constants.ts'),
    load('/src/brand/scene/scene-markup.ts'),
    load('/src/brand/icon-files.ts'),
    load('/src/brand/icon-sizes.constants.ts'),
    load('/src/brand/rim.constants.ts'),
    load('/src/brand/ground-look.ts'),
    load('/src/brand/mark-ink.ts'),
    load('/src/brand/file-types/file-type-art.ts'),
    load('/src/brand/file-types/file-type-grid-for.ts'),
    load('/src/brand/file-types/file-type-files.ts'),
  ]);
  return {
    family: Object.fromEntries(Object.entries(family.BRAND_FAMILY).map(([id, brand]) => [id, inked(brand, ink.markInk)])),
    drawn: family.BRAND_FAMILY,
    markInk: ink.markInk,
    apps: family.BRAND_APPS,
    sceneMarkup: markup.sceneMarkup,
    iconFiles: files.iconFiles,
    sizes: sizes.ICON_SIZES,
    rim: rim.BRAND_RIM,
    rimTones: rim.BRAND_RIM_TONES,
    groundLook: ground.groundLook,
    fileTypeArt: fileArt.fileTypeArt,
    fileTypeGridFor: fileGrid.fileTypeGridFor,
    fileTypeFiles: fileFiles.fileTypeFiles,
  };
};

export { loadBrandArt };
