/* @layer tooling-scripts @kind logic */
import { existsSync } from 'node:fs';
import { posix, relative } from 'node:path';
import { posixPath } from '../config/posix-path.mjs';
import { readManifest } from '../cli/read-manifest.mjs';
import { pruneTree } from './prune-tree.mjs';
import { tesseraGuideFolder } from './tessera-guide-folder.mjs';
import { TESSERA_ROOT } from './tessera-root.constants.mjs';

const tesseraPages = (tessera, base) => [...tessera.names]
  .filter((name) => existsSync(`${TESSERA_ROOT}/guide/components/${name}.md`))
  .map((name) => ({ name, page: true, pageBase: base }));

const appModel = (collected) => {
  const { config, tessera, components, leaves } = collected;
  const out = config.guide.out;
  const tesseraGuide = tesseraGuideFolder(out, config.root);
  const name = readManifest(config.app ?? config.root).name ?? config.package ?? 'This app';
  const placed = components.flatMap((c) => (Array.isArray(c.usage?.tree?.path) ? [c.usage.tree.path] : []));
  return {
    ...collected,
    app: { name, outDir: posixPath(relative(config.root, out)), tesseraGuide: posix.relative(out, tesseraGuide) },
    links: tesseraPages(tessera, `${posix.relative(`${out}/components`, `${tesseraGuide}/components`)}/`),
    packageName: name,
    specifiers: config.package ? [config.package] : [],
    tree: pruneTree(collected.tree, [...leaves, ...placed]),
  };
};

export { appModel };
