/* @layer tooling-scripts @kind logic */
import { absolutePath } from './absolute-path.mjs';
import { DEFAULTS, PART_KINDS } from './config.constants.mjs';

const optional = (key, value, change = (same) => same) => (value === undefined ? {} : { [key]: change(value) });

const partFolders = (parts, kind, { root, appRoot }) =>
  parts[kind] === undefined ? [absolutePath(kind === 'views' ? appRoot : root, `src/${kind}`)] : [parts[kind]].flat().map((path) => absolutePath(root, path));

const resolveParts = (parts, roots) => Object.fromEntries(PART_KINDS.map((kind) => [kind, partFolders(parts, kind, roots)]));

const resolveTheme = (theme, { root, appRoot }) => ({
  css: theme.css === undefined ? absolutePath(appRoot, DEFAULTS.themeCss) : absolutePath(root, theme.css),
  ...optional('palette', theme.palette),
});

const resolveGuide = (guide, root) => ({
  usage: guide.usage ?? DEFAULTS.guideUsage,
  out: absolutePath(root, guide.out ?? DEFAULTS.guideOut),
  ...optional('tree', guide.tree, (tree) => absolutePath(root, tree)),
  ...optional('tsconfig', guide.tsconfig, (tsconfig) => absolutePath(root, tsconfig)),
  ...optional('parts', guide.parts, (parts) => absolutePath(root, parts)),
});

const resolveGallery = (gallery, root) => ({
  ...optional('title', gallery.title),
  ...optional('port', gallery.port),
  ...optional('review', gallery.review, (review) => absolutePath(root, review)),
});

const resolveConfig = (raw, { file, root, appRoot = root }) => ({
  ...optional('file', file),
  root,
  ...optional('package', raw.package),
  parts: resolveParts(raw.parts ?? {}, { root, appRoot }),
  layer: raw.layer ?? DEFAULTS.layer,
  stories: absolutePath(root, raw.stories ?? DEFAULTS.stories),
  theme: resolveTheme(raw.theme ?? {}, { root, appRoot }),
  guide: resolveGuide(raw.guide ?? {}, root),
  ...optional('gallery', raw.gallery, (gallery) => resolveGallery(gallery, root)),
  ...optional('overrides', raw.overrides, (overrides) => absolutePath(root, overrides)),
  apps: Object.keys(raw.apps ?? {}).map((app) => absolutePath(root, app)),
});

export { resolveConfig };
