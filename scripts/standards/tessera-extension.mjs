/* @layer tooling-scripts @kind logic */
import { relative } from 'node:path';
import { loadTesseraConfig } from '../config/load-tessera-config.mjs';
import { posixPath } from '../config/posix-path.mjs';
import { EXTENSION_DESCRIPTION, EXTENSION_ID } from './standards.constants.mjs';
import { usageFileCheck } from './usage-file-check.mjs';

const fromRoot = (config, path) => posixPath(relative(config.root, path)) || '.';

const lintOptions = (config) => ({
  eslint: { options: { primitivesGlobs: [...config.parts.primitives, ...config.parts.composites].map((dir) => `${fromRoot(config, dir)}/**/*.tsx`) } },
  stylelint: { options: { tokenGlobs: [fromRoot(config, config.theme.css)] } },
});

const tesseraExtension = (fromDir = process.cwd()) => {
  const config = loadTesseraConfig(fromDir);
  return {
    id: EXTENSION_ID,
    description: EXTENSION_DESCRIPTION,
    structure: { checks: [usageFileCheck] },
    ...(config ? lintOptions(config) : {}),
  };
};

export { tesseraExtension };
