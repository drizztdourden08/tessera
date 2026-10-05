/* @layer tooling-scripts @kind logic */
import { runnerImport } from 'vite';

const RUNNER = { configFile: false, logLevel: 'silent' };

const loadBrandArt = async (root) => {
  const load = (path) => runnerImport(path, { ...RUNNER, root }).then((loaded) => loaded.module);
  const [family, markup, files, sizes, rim, ground] = await Promise.all([
    load('/src/brand/family.constants.ts'),
    load('/src/brand/scene/scene-markup.ts'),
    load('/src/brand/icon-files.ts'),
    load('/src/brand/icon-sizes.constants.ts'),
    load('/src/brand/rim.constants.ts'),
    load('/src/brand/ground-paths.ts'),
  ]);
  return {
    family: family.BRAND_FAMILY,
    apps: family.BRAND_APPS,
    sceneMarkup: markup.sceneMarkup,
    iconFiles: files.iconFiles,
    sizes: sizes.ICON_SIZES,
    rim: rim.BRAND_RIM,
    rimTones: rim.BRAND_RIM_TONES,
    groundPaths: ground.groundPaths,
  };
};

export { loadBrandArt };
