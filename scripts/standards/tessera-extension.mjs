/* @layer tooling-scripts @kind logic */
import { relative } from 'node:path';
import { fileURLToPath } from 'node:url';
import { loadTesseraConfig } from '../config/load-tessera-config.mjs';
import { posixPath } from '../config/posix-path.mjs';
import { EXTENSION_DESCRIPTION, EXTENSION_ID } from './standards.constants.mjs';
import { usageFileCheck } from './usage-file-check.mjs';

const STYLELINT_PLUGINS = ['no-faint-text'].map((name) => fileURLToPath(new URL(`./stylelint/${name}.mjs`, import.meta.url)));

const fromBase = (base, path) => posixPath(relative(base, path)) || '.';

const configFor = (base) => {
  try {
    return loadTesseraConfig(base);
  } catch {
    return undefined;
  }
};

const withConfig = (ctx, pick) => {
  const base = ctx?.packageDir ?? ctx?.rootDir ?? process.cwd();
  const config = configFor(base);
  return config ? pick(config, base) : {};
};

const eslintOptions = (ctx) => withConfig(ctx, (config, base) => ({
  primitivesGlobs: config.parts.primitives.map((dir) => `${fromBase(base, dir)}/**/*.tsx`),
}));

const stylelintOptions = (ctx) => withConfig(ctx, (config, base) => ({ tokenGlobs: [fromBase(base, config.theme.css)] }));

const tesseraExtension = () => ({
  id: EXTENSION_ID,
  description: EXTENSION_DESCRIPTION,
  structure: { checks: [usageFileCheck] },
  eslint: { options: eslintOptions },
  stylelint: { plugins: STYLELINT_PLUGINS, rules: { 'tessera/no-faint-text': true }, options: stylelintOptions },
});

export { tesseraExtension };
