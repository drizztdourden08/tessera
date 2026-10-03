/* @layer tooling-scripts @kind logic */
import { existsSync } from 'node:fs';
import { posix, relative } from 'node:path';
import { posixPath } from '../config/posix-path.mjs';
import { readManifest } from '../cli/read-manifest.mjs';
import { pruneTree } from './prune-tree.mjs';
import { tesseraAiFolder } from './tessera-ai-folder.mjs';
import { TESSERA_ROOT } from './tessera-root.constants.mjs';

const tesseraPages = (tessera, base) => [...tessera.names]
  .filter((name) => existsSync(`${TESSERA_ROOT}/ai/components/${name}.md`))
  .map((name) => ({ name, page: true, pageBase: base }));

const appModel = (collected) => {
  const { config, tessera, components, leaves } = collected;
  const out = config.ai.out;
  const tesseraAi = tesseraAiFolder(out, config.root);
  const name = readManifest(config.app ?? config.root).name ?? config.package ?? 'This app';
  const placed = components.flatMap((c) => (Array.isArray(c.usage?.tree?.path) ? [c.usage.tree.path] : []));
  return {
    ...collected,
    app: { name, outDir: posixPath(relative(config.root, out)), tesseraAi: posix.relative(out, tesseraAi) },
    links: tesseraPages(tessera, `${posix.relative(`${out}/components`, `${tesseraAi}/components`)}/`),
    packageName: name,
    specifiers: config.package ? [config.package] : [],
    tree: pruneTree(collected.tree, [...leaves, ...placed]),
  };
};

export { appModel };
