/* @layer tooling-scripts @kind logic */
import { absolutePath } from './absolute-path.mjs';
import { DEFAULTS, PART_KINDS } from './config.constants.mjs';

const optional = (key, value, change = (same) => same) => (value === undefined ? {} : { [key]: change(value) });

const resolveParts = (parts, root) =>
  Object.fromEntries(PART_KINDS.map((kind) => [kind, [parts[kind] ?? `src/${kind}`].flat().map((path) => absolutePath(root, path))]));

const resolveTheme = (theme, root) => ({
  css: absolutePath(root, theme.css ?? DEFAULTS.themeCss),
  ...optional('palette', theme.palette),
});

const resolveAi = (ai, root) => ({
  usage: ai.usage ?? DEFAULTS.aiUsage,
  out: absolutePath(root, ai.out ?? DEFAULTS.aiOut),
  ...optional('tree', ai.tree, (tree) => absolutePath(root, tree)),
});

const resolveGallery = (gallery, root) => ({
  ...optional('title', gallery.title),
  ...optional('port', gallery.port),
  ...optional('review', gallery.review, (review) => absolutePath(root, review)),
});

const resolveConfig = (raw, { file, root }) => ({
  ...optional('file', file),
  root,
  ...optional('package', raw.package),
  parts: resolveParts(raw.parts ?? {}, root),
  stories: absolutePath(root, raw.stories ?? DEFAULTS.stories),
  theme: resolveTheme(raw.theme ?? {}, root),
  ai: resolveAi(raw.ai ?? {}, root),
  ...optional('gallery', raw.gallery, (gallery) => resolveGallery(gallery, root)),
  ...optional('overrides', raw.overrides, (overrides) => absolutePath(root, overrides)),
  apps: Object.keys(raw.apps ?? {}).map((app) => absolutePath(root, app)),
});

export { resolveConfig };
