/* @layer tooling-scripts @kind logic */
import { runnerImport } from 'vite';

const RUNNER = { configFile: false, logLevel: 'silent' };

const loadBrands = async (root) => {
  const [family, css, backdropCss] = await Promise.all([
    runnerImport('/src/brand/family.constants.ts', { ...RUNNER, root }),
    runnerImport('/src/brand/brand-gradient-css.ts', { ...RUNNER, root }),
    runnerImport('/src/brand/backdrop-gradient-css.ts', { ...RUNNER, root }),
  ]);
  return {
    family: family.module.BRAND_FAMILY,
    apps: family.module.BRAND_APPS,
    gradientCss: css.module.brandGradientCss,
    backdropCss: backdropCss.module.backdropGradientCss,
  };
};

export { loadBrands };
