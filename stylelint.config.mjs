/* @layer root-config @kind config */
import { brockStylelint } from '@drizztdourden08/brock-lint-config/stylelint';

const RAW_VALUE_FILES = ['src/tokens/palette.css', 'src/tokens/brand.css', 'src/tokens/scale.css', 'src/fonts/**/*.css'];

const base = brockStylelint({
  uiGlobs: ['src/**/*.css'],
  tokenGlobs: ['src/tokens/**/*.css'],
  rawValueGlobs: RAW_VALUE_FILES,
});

const logoScalesByEm = {
  files: ['src/brand/TesseraLogo/**/*.css'],
  rules: {
    'unit-disallowed-list': [['px', 'rem'], { ignoreMediaFeatureNames: { rem: ['width', 'min-width', 'max-width'] } }],
    'declaration-property-value-disallowed-list': {
      '/^--/': ['/^(?!var\\(|[0-9.]+em$).+$/'],
      'font-weight': ['/^[0-9]+$/'],
      'z-index': ['/^[1-9][0-9]*$/'],
      'font-family': ['/^(?!var\\(|inherit$|initial$|unset$).+$/'],
    },
  },
};

export default { ...base, overrides: [...base.overrides, logoScalesByEm] };
