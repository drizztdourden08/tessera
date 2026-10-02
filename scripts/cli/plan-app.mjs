/* @layer tooling-scripts @kind logic */
import { componentFiles } from './component-files.mjs';
import { APP_TIERS, STORY_FOLDERS, STORYLITE } from './new.constants.mjs';
import { storySource } from './story-source.mjs';

const hasStoryLite = (manifest) => Boolean(manifest.dependencies?.[STORYLITE] ?? manifest.devDependencies?.[STORYLITE]);

const planApp = (manifest, spec) => {
  const { kind, names, group } = spec;
  const storyTitle = `${APP_TIERS[kind]}${group ? ` · ${group}` : ''}/${names.name}`;
  const story = hasStoryLite(manifest) ? [{ path: `${STORY_FOLDERS[kind]}/${names.name}.stories.tsx`, content: storySource({ ...spec, storyTitle }) }] : [];
  return { files: [...componentFiles(spec), ...story], edits: [], problems: [] };
};

export { planApp };
