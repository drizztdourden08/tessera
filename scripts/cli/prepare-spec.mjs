/* @layer tooling-scripts @kind logic */
import { checkIcon } from './check-icon.mjs';
import { componentNames } from './component-names.mjs';
import { confirmAppPart } from './confirm-app-part.mjs';
import { nameTaken } from './name-taken.mjs';
import { APP_PART_KINDS, DEFAULT_ICON, LAYER_RULE, TESSERA_KINDS, TESSERA_LAYER } from './new.constants.mjs';
import { pickGroup } from './pick-group.mjs';
import { pickTree } from './pick-tree.mjs';
import { placeFiles } from './place-files.mjs';

const refusal = ({ mode }, { kind, name }) =>
  (mode === 'tessera' && !TESSERA_KINDS.includes(kind)
    ? `a ${kind} is an app's own part, so Tessera does not hold one. Run "tessera new ${kind} ${name}" in the folder of the app that needs it`
    : undefined);

const layerOf = ({ mode, config }, flags) => {
  const layer = mode === 'tessera' ? TESSERA_LAYER : flags.layer ?? config.layer;
  if (mode === 'tessera' && flags.layer !== undefined) return { problem: `a Tessera part always takes @layer ${layer}; --layer is for an app part` };
  if (!LAYER_RULE.test(layer)) return { problem: `--layer ${layer} is not a layer name; it takes lowercase words joined by hyphens, such as renderer-shell` };
  return { layer };
};

const placeInGallery = async (io, project, { kind }, flags) => {
  const icon = flags.icon ?? DEFAULT_ICON;
  if (project.mode === 'app') return { group: flags.group };
  const iconProblem = checkIcon(project.root, icon);
  if (iconProblem) return { problem: iconProblem };
  return { ...(await pickGroup(io, { root: project.root, kind, group: flags.group })), icon };
};

const prepareSpec = async (io, project, request, flags) => {
  const { kind, name } = request;
  const { layer, problem: layerProblem } = layerOf(project, flags);
  const problem = refusal(project, request) ?? layerProblem ?? nameTaken(project, name);
  if (problem) return { problem };
  const place = placeFiles(project, request, flags.into);
  if (place.problem) return { problem: place.problem };
  const appPart = project.mode === 'app' && APP_PART_KINDS.includes(kind);
  if (appPart && !(await confirmAppPart(io, { yes: flags.yes, kind, name, folder: place.folder }))) return { cancelled: true };
  const gallery = await placeInGallery(io, project, request, flags);
  if (gallery.problem) return { problem: gallery.problem };
  const tree = await pickTree(io, { tree: flags.tree, name, project });
  if (tree.problem) return { problem: tree.problem };
  const spec = { mode: project.mode, kind, ...place, layer, names: componentNames(name), tree: tree.path, ...gallery };
  return { spec };
};

export { prepareSpec };
