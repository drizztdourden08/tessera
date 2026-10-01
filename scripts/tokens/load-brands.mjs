/* @layer tooling-scripts @kind logic */
import { runnerImport } from 'vite';

const RUNNER = { configFile: false, logLevel: 'silent' };

const loadBrands = async (root) => {
  const [family, css, backdrop, backdropCss] = await Promise.all([
    runnerImport('/src/brand/family.constants.ts', { ...RUNNER, root }),
    runnerImport('/src/brand/brand-gradient-css.ts', { ...RUNNER, root }),
    runnerImport('/src/brand/backdrop-gradient.constants.ts', { ...RUNNER, root }),
    runnerImport('/src/brand/backdrop-gradient-css.ts', { ...RUNNER, root }),
  ]);
  return {
    family: family.module.BRAND_FAMILY,
    apps: family.module.BRAND_APPS,
    gradientCss: css.module.brandGradientCss,
    backdrop: backdropCss.module.backdropGradientCss(backdrop.module.BACKDROP_GRADIENT),
  };
};

export { loadBrands };
