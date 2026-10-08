/* @layer tooling-scripts @kind logic */
import { readUsage } from './read-usage.mjs';
import { usageSources } from './usage-sources.mjs';

const withUsage = async (root, component, file) => {
  if (!file) return { component };
  const { usage, error } = await readUsage(root, file);
  const problem = error && { kind: 'unreadable-usage', name: component.name, message: error, coverage: false };
  return { component: { ...component, usageSource: file, usage }, problem };
};

const loadUsages = async (root, components, sources) => {
  const { byFolder, stray } = usageSources(root, components, sources);
  const loaded = await Promise.all(components.map((c) => withUsage(root, c, byFolder.get(c.folder))));
  const strays = stray.map(({ file, name }) => ({ kind: 'unknown-usage', name, at: file, message: `${file} matches no component folder`, coverage: false }));
  return { components: loaded.map((entry) => entry.component), strays: [...strays, ...loaded.flatMap((entry) => entry.problem ?? [])] };
};

export { loadUsages };
